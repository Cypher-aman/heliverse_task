import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);

    console.log('MongoDB Connected: ', connect.connection.host);
  } catch (error) {
    console.log(error.name, error.message);
    console.log('UNCAUGHT DB EXCEPTION 💥 Shutting down...');
    process.exit(1);
  }
};

export default dbConnect;
