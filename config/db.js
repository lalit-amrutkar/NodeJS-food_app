const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`.bgGreen.black);
  } catch (e) {
    console.error("❌ MongoDB connection error:", e.message.red);
    process.exit(1); // Exit the app if DB fails to connect
  }
};

module.exports = connectDB;
