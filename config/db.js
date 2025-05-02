import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // For development, we'll use a local MongoDB or MongoDB Atlas
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/tasktracker';
    
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;