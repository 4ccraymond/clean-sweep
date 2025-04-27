import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import db from '../config/connection';
import typeDefs from '../schema/typeDefs';
import resolvers from '../schema/resolvers';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // optionally add auth logic
  },
});

async function startServer() {
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startServer();
