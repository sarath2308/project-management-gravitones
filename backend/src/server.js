import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { connectDB } from './config/connect.mongo.js';
import entryRoutes from './routes/entry.route.js';
import { errorHandler } from './middleware/error.handler.js';
import cookieParser from 'cookie-parser';
import { apiLimiter } from './middleware/ratelimit.middleware.js';

dotenv.config();

const app = express();

async function startServer() {
  await connectDB();

  app.use(cookieParser());
  app.use(express.json());

  // app.use(
  //     cors({
  //         origin: process.env.FRONTEND_URL,
  //         credentials: true,
  //     }),
  // );

  //rate limiter middleware to prevent brute force attacks and DDoS attacks
  app.use(apiLimiter);

  //routes
  app.use('/api', entryRoutes());
  //error handling middleware
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server connected on PORT ${PORT}`);
  });
}

startServer();
