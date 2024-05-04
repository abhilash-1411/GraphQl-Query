const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
// const { graphqlUploadExpress } = require('graphql-upload');

// GraphQL schema
const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    description: String!
    date: String!
    location: String!
  }

  type Query {
    allEvents: [Event!]!
  }
`;

const events = [
  {
    id: '1',
    title: 'Event 1',
    description: 'Air show',
    date: '2024-05-03',
    location: 'Bhopal',
  },
  {
    id: '2',
    title: 'Event 2',
    description: 'Water show',
    date: '2024-05-04',
    location: 'Indore',
  },
];

// Resolvers
const resolvers = {
  Query: {
    allEvents: () => events,
  },
};

const app = express();

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  // Start the server and wait for it to be ready before accessing its properties
  await server.start();
//   app.use(graphqlUploadExpress());
  // Apply the ApolloServer GraphQL middleware to Express
//   app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  // Start the Express server
  const PORT = process.env.PORT || 4000;
  app.listen({ port: PORT }, () =>
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startApolloServer().catch((error) => {
  console.error('Error starting server:', error);
});
