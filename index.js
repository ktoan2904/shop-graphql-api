const { ApolloServer, gql } = require("apollo-server");
const { images } = require("./data/images");
const { categories } = require("./data/categories");
const { products } = require("./data/products");

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
    Price
    Name
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

  type Mutation {
    putCart(productId: ID!, quantity: Int!): APIResponse
    checkout: APIResponse
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
        filteredProducts = products.filter(product => product.id === id);
      }
      if (categoryId) {
        filteredProducts = products.filter(
          product => product.categoryId === categoryId
        );
      }

      if (sizes) {
        let sizeSet = new Set(sizes);
        filteredProducts = products.filter(product =>
          product.sizes.some(size => sizeSet.has(size))
        );
      }

      if (priceRange) {
        if (priceRange.min) {
          filteredProducts = products.filter(
            product => product.price >= priceRange.min
          );
        }

        if (priceRange.max) {
          filteredProducts = products.filter(
            product => product.price <= priceRange.max
          );
        }
      }

      const page = (pagination && pagination.page) || 0;
      const perpage = (pagination && pagination.perpage) || 20;

      if (sort) {
        direction = sort.direction === "ASC" ? 1 : -1;
        if (sort.field === "Price") {
          filteredProducts = filteredProducts.sort(
            (a, b) =>
              direction * (a.price > b.price ? 1 : a.price < b.price ? -1 : 0)
          );
        } else if (sort.field === "Name") {
          filteredProducts = filteredProducts.sort(
            (a, b) =>
              direction * (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
          );
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
  context: ({ req }) => ({
    userId: req.headers.authorization || UNAUTHORIZED_ID
  }),
  // mocks: true,
  introspection: true,
  playground: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
