const {ApolloServer, gql} = require('apollo-server');

const products = [
  {
    name: 'Harry Potter and the Chamber of Secrets',
    description: 'J.K. Rowling',
  },
  {
    name: 'Jurassic Park',
    description: 'Michael Crichton',
  },
];

const typeDefs = gql`
  type Product {
    name: String
    description: String
  }

  type Query {
    products: [Product]
  }
`;

const resolvers = {
  Query: {
    products: () => products,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.listen({port: process.env.PORT || 4000}).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
