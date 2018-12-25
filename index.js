const {ApolloServer, gql} = require('apollo-server');

const products = [
  {
    name: 'Harry Potter and the Chamber of Secrets',
    description: 'J.K. Rowling',
    categoryId: 'cat1',
    rating: 4.5,
    price: 10000,
    colors: ['Pink', 'White'],
    imageIds: [1],
  },
  {
    name: 'Jurassic Park',
    description: 'Michael Crichton',
    categoryId: 'cat2',
    colors: ['Pink', 'Orange'],
    price: 14000,
    rating: 5,
    imageIds: [1, 2],
  },
];

const categories = {
  cat1: {
    id: 'cat1',
    name: 'Cat 1',
  },
  cat2: {
    id: 'cat2',
    name: 'Cat 2',
  },
};

const images = {
  1: {
    url: 'https://placeimg.com/640/480/people',
    alt: 'alt',
  },
  2: {
    url: 'https://placeimg.com/640/480/people',
    alt: 'alt',
  },
};

const typeDefs = gql`
  enum Color {
    Black
    Pink
    White
    Orange
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
    rating: Float
    category: Category
    price: Int
    colors: [Color]
    images: [Image!]!
  }

  type Category {
    id: ID!
    name: String
  }

  type Query {
    products(
      categoryId: ID
      colors: [Color!]
      priceRange: PriceRange
      pagination: Pagination
      sort: Sort
    ): [Product]
  }
`;

const resolvers = {
  Query: {
    products: (_parent, {categoryId, colors, priceRange, pagination, sort}) => {
      let filteredProducts = products;

      if (categoryId) {
        filteredProducts = products.filter(
          (product) => product.categoryId === categoryId,
        );
      }

      if (colors) {
        let colorSet = new Set(colors);
        filteredProducts = products.filter((product) =>
          product.colors.some((color) => colorSet.has(color)),
        );
      }

      if (priceRange) {
        if (priceRange.min) {
          filteredProducts = products.filter(
            (product) => product.price >= priceRange.min,
          );
        }

        if (priceRange.max) {
          filteredProducts = products.filter(
            (product) => product.price <= priceRange.max,
          );
        }
      }

      const page = (pagination && pagination.page) || 0;
      const perpage = (pagination && pagination.perpage) || 20;

      if (sort) {
        direction = sort.direction === 'ASC' ? 1 : -1;
        if (sort.field === 'Price') {
          filteredProducts = filteredProducts.sort(
            (a, b) =>
              direction * (a.price > b.price ? 1 : a.price < b.price ? -1 : 0),
          );
        } else if (sort.field === 'Name') {
          filteredProducts = filteredProducts.sort(
            (a, b) =>
              direction * (a.name > b.name ? 1 : a.name < b.name ? -1 : 0),
          );
        }
      }

      return filteredProducts.slice(page * perpage, (page + 1) * perpage);
    },
  },

  Product: {
    images: (product, {ids}) =>
      (product.imageIds || ids).map((id) => images[id]),
    category: (product, {id}) => categories[product.categoryId || id],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // mocks: true,
  introspection: true,
  playground: true,
});

server.listen({port: process.env.PORT || 4000}).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
