import mongoose from "mongoose";
import Session from "./src/models/Session.js";
import { connectDB } from "./src/lib/db.js";
import dotenv from "dotenv";

dotenv.config();

const clearSessions = async () => {
  try {
    await connectDB();
    const result = await Session.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} sessions.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error clearing sessions:", error);
    process.exit(1);
  }
};

clearSessions();
