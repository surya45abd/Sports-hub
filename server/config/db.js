import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sideline_sports";

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`✅ MongoDB connected successfully: ${uri}`);
  } catch (err) {
    isConnected = false;
    console.warn(`⚠️ MongoDB connection error: ${err.message}`);
    console.warn(
      `💡 Note: If MongoDB is not running locally, the server will continue running using the local JSON storage fallback.`
    );
    console.warn(
      `👉 To connect MongoDB: Start your local MongoDB service ('net start MongoDB') or set MONGODB_URI in server/.env with your MongoDB Atlas connection string.`
    );
  }
}

export function isMongoConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

export default connectDB;
