import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';
import path from 'path';

import { typeDefs, resolvers } from './schemas';
import db from './config/connection';
import { authMiddleware } from './utils/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.get('/', (_req, res) => {
    res.send('Welcome to the Clean Sweep API! Use /graphql for POST requests.');
  });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // TODO: Restore authMiddleware context once integrated by Stephanie

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => authMiddleware({ req }),
    })
  );

  db.once('open', () => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}/graphql`)
    );
  });
};

// Serve static files from the React app (frontend) UNCOMMENT when ready
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// For any request that doesn’t match a backend route, serve the React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

startServer();
