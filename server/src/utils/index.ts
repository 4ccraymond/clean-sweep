import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import db from '../config/connection';
import typeDefs from '../schemas/typeDefs';
import resolvers from '../schemas/resolvers';
import {authMiddleware} from '../utils/auth';

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/graphql', json(), expressMiddleware(server, {
    context: async ({ req }) => authMiddleware,}));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}/graphql`);

    });
  });
};

startServer();