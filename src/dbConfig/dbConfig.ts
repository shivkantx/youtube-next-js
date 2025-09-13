import mongoose from "mongoose";

let isConnected = false; // track connection state

export async function connect() {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL as string);

    isConnected = !!db.connections[0].readyState;

    console.log("🚀 MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }

  const connection = mongoose.connection;

  connection.on("disconnected", () => {
    console.log("⚠️ MongoDB disconnected");
    isConnected = false;
  });
}
