import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';
import path from 'path';

import db from './config/connection';
import { typeDefs, resolvers } from './schemas';
// import { authMiddleware } from './utils/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // TODO: Restore authMiddleware context once integrated by Stephanie

  // app.use(
  //   '/graphql',
  //   expressMiddleware(server, {
  //     context: authMiddleware,
  //   })
  // );

  db.once('open', () => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}/graphql`)
    );
  });
};

startServer();
