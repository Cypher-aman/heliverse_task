import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import AppError from './utils/appError.js';
import userRouter from './routes/userRoute.js';
import teamRouter from './routes/teamRoute.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

const app = express();

app.use(cors());
app.use(
  express.json({
    limit: '1mb',
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is up and running',
  });
});

app.use('/api', userRouter);
app.use('/api', teamRouter);

// catch all non existing routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message,
  });
});

export default app;
