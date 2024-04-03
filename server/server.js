import app from './src/index.js';
import dotenv from 'dotenv';
import dbConnect from './db/dbConnect.js';

dotenv.config();

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down...');

  process.exit(1);
});

await dbConnect();

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
