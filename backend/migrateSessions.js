import mongoose from "mongoose";
import Session from "./src/models/Session.js";
import { connectDB } from "./src/lib/db.js";
import dotenv from "dotenv";

dotenv.config();

const migrateSessions = async () => {
  try {
    await connectDB();
    const sessions = await Session.find({ joinCode: { $exists: false } });
    console.log(`🔍 Found ${sessions.length} sessions without join codes.`);
    
    for (const session of sessions) {
      session.joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      await session.save();
    }
    
    console.log(`✅ Migrated ${sessions.length} sessions.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error migrating sessions:", error);
    process.exit(1);
  }
};

migrateSessions();
