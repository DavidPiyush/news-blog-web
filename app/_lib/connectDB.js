import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected 👍👍");
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined.");
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("MongoDB connected successfully 👍👍");
  } catch (error) {
    console.error("Failed to connect to MongoDB: ", error);
    throw error;
  }
};
