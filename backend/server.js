import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import voterRoutes from './routes/voterRoutes.js';
import uploadRoute from './routes/uploadRoute.js';
import cors from 'cors';

dotenv.config();
connectDB();
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api/voters', voterRoutes);
app.use('/api/upload', uploadRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
