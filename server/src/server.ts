import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import { authMiddleware } from './utils/auth.js';
import authRoutes from './routes/authRoutes.js';
import type { Request, Response } from 'express';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

  // app.get('/', (_req, res) => {
  //   res.send('Welcome to the Clean Sweep API! Use /graphql for POST requests.');
  // });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/api/auth', authRoutes);

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => authMiddleware({ req }),
    })
  );

  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
    });

  db.once('open', () => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}/graphql`)
    );
  });
};

startServer();
