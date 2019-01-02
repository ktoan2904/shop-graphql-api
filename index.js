const jwt = require("jsonwebtoken");
const { ApolloServer, gql } = require("apollo-server");
const { images } = require("./data/images");
const { categories } = require("./data/categories");
const { products } = require("./data/products");

const secretKey = "secret";

const createToken = (payload = {}) => {
  return jwt.sign(payload, secretKey);
};

const readToken = token => {
  try {
    return jwt.verify(token, secretKey);
  } catch (_error) {
    return null;
  }
};

const carts = {};
const orders = {};

const typeDefs = gql`
  enum Size {
    XS
    S
    M
    L
    XL
  }

  input PriceRange {
    min: Int
    max: Int
  }

  enum SortField {
    price
    name
    default
  }

  enum SortDirection {
    ASC
    DESC
  }

  input Sort {
    field: SortField!
    direction: SortDirection!
  }

  type Image {
    id: ID!
    url: String!
    alt: String!
  }

  input Pagination {
    page: Int
    perpage: Int
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    category: Category
    price: Float
    rating: Float
    sizes: [Size]
    images: [Image!]!
  }

  type Category {
    id: ID!
    name: String
  }

  type CartItem {
    product: Product
    quantity: Int
  }

  type Cart {
    items: [CartItem!]!
  }

  type Query {
    products(
      id: ID
      categoryId: ID
      sizes: [Size!]
      priceRange: PriceRange
      pagination: Pagination
      sort: Sort
    ): [Product]
    categories: [Category]!
    cart: Cart!
  }

  type UserError {
    field: String
    message: String!
  }

  type APIResponse {
    success: Boolean!
    userErrors: [UserError!]!
  }

  type Token {
    expiredAt: String!
    token: String!
  }

  type LoginPayload {
    success: Boolean!
    token: Token
  }

  type Mutation {
    putCart(productId: ID!, quantity: Int!): APIResponse
    checkout: APIResponse
    login(userId: String!, password: String!): LoginPayload
  }
`;

const resolvers = {
  Query: {
    products: (
      _parent,
      { id, categoryId, sizes, priceRange, pagination, sort }
    ) => {
      let filteredProducts = products;

      if (id) {
        filteredProducts = filteredProducts.filter(
          product => product.id === id
        );
      }
      if (categoryId) {
        filteredProducts = filteredProducts.filter(
          product => product.categoryId === categoryId
        );
      }

      if (sizes && sizes.length > 0) {
        let sizeSet = new Set(sizes);
        filteredProducts = filteredProducts.filter(product =>
          product.sizes.some(size => sizeSet.has(size))
        );
      }

      if (priceRange) {
        if (priceRange.min) {
          filteredProducts = filteredProducts.filter(
            product => product.price >= priceRange.min
          );
        }

        if (priceRange.max) {
          filteredProducts = filteredProducts.filter(
            product => product.price <= priceRange.max
          );
        }
      }

      const page = (pagination && pagination.page) || 0;
      const perpage = (pagination && pagination.perpage) || 20;

      if (sort) {
        direction = sort.direction === "ASC" ? 1 : -1;
        if (sort.field === "price") {
          filteredProducts = filteredProducts.sort(
            (a, b) =>
              direction * (a.price > b.price ? 1 : a.price < b.price ? -1 : 0)
          );
        } else if (sort.field === "name") {
          filteredProducts = filteredProducts.sort(
            (a, b) =>
              direction * (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
          );
        } else {
          filteredProducts = filteredProducts.sort((a, b) => {
            const aId = parseInt(a.id.slice(1));
            const bId = parseInt(b.id.slice(1));
            return direction * (aId - bId);
          });
        }
      }

      return filteredProducts.slice(page * perpage, (page + 1) * perpage);
    },
    categories: () => {
      let res = [];
      for (let cat in categories) {
        res.push(categories[cat]);
      }
      return res;
    },
    cart: (_parent, _args, { userId }) => {
      if (userId === UNAUTHORIZED_ID) {
        return { items: [] };
      }

      return carts[userId] || { items: [] };
    }
  },

  CartItem: {
    product: ({ productId }) => {
      return products.find(product => product.id === productId);
    }
  },

  Product: {
    images: (product, { ids }) =>
      (product.imageIds || ids).map(id => images[id]),
    category: (product, { id }) => categories[product.categoryId || id]
  },

  Mutation: {
    login: (_root, { userId, password }) => {
      if (password === "password") {
        const expiredAt = new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString();
        const token = createToken({ userId, expiredAt });
        return {
          success: true,
          token: {
            token,
            expiredAt
          }
        };
      }

      return {
        success: false
      };
    },
    putCart(_root, { productId, quantity }, { userId }) {
      if (userId === UNAUTHORIZED_ID) {
        return {
          success: false,
          userErrors: [
            {
              message: "Please use authorization header to call API!"
            }
          ]
        };
      }

      if (quantity <= 0) {
        return {
          success: false,
          userErrors: [
            {
              field: "quantity",
              message: "Quantity must be greater than 0!"
            }
          ]
        };
      }

      const userCart = carts[userId] || { items: [] };
      carts[userId] = userCart;
      let added = false;

      userCart.items = userCart.items.map(cartItem => {
        if (cartItem.productId === productId) {
          added = true;
          return {
            productId,
            quantity
          };
        }

        return cartItem;
      });

      if (!added) {
        userCart.items.push({
          productId,
          quantity
        });
      }

      return {
        success: true,
        userErrors: []
      };
    },

    checkout(_root, _args, { userId }) {
      const cart = carts[userId];
      if (!cart) {
        return {
          success: false,
          userErrors: [
            {
              message: "Please add some items to cart"
            }
          ]
        };
      }

      orders[userId] = carts[userId];
      carts[userId] = null;

      return {
        success: true,
        userErrors: [
          {
            message: "Thank you for your order!"
          }
        ]
      };
    }
  }
};

const UNAUTHORIZED_ID = "unauthorized";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authorization = req.headers.authorization;
    if (/^Bearer/.test(authorization)) {
      const token = authorization.split(" ")[1];
      return (
        readToken(token) || {
          userId: UNAUTHORIZED_ID
        }
      );
    }

    return {
      userId: req.headers.authorization || UNAUTHORIZED_ID
    };
  },
  // mocks: true,
  introspection: true,
  playground: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
