import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_LOCAL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Connected to Database');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
