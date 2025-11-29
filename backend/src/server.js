// server.js
import express from 'express';
import {ENV} from "./lib/env.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { connectDB } from './lib/db.js';
import cors from "cors";
import {serve} from "inngest/express"
import {inngest, functions} from "./lib/inngest.js"
import {clerkMiddleware} from '@clerk/express'
import { protectionRoute } from './middleware/protectRoute.js';
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";

const app = express();
const MODE = ENV.NODE_ENV || process.env.NODE_ENV || 'development';

// CRITICAL: Handle OPTIONS first, before any other middleware
app.use((req, res, next) => {
  // Allow all localhost origins in development
  const origin = req.headers.origin;
  if (MODE === 'development' && origin && (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:'))) {
    res.header('Access-Control-Allow-Origin', origin);
  } else if (MODE === 'production' && origin === ENV.CLIENT_URL) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.use("/api/inngest", serve({client : inngest, functions}));
app.use("/api/problems", problemRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (MODE === 'production') {
   const staticPath = path.join(__dirname, '../public');
   
   if (fs.existsSync(staticPath) && fs.existsSync(path.join(staticPath, 'index.html'))) {
      app.use(express.static(staticPath));
      app.use((req, res, next) => {
         if (req.path.startsWith('/api')) return next();
         res.sendFile(path.join(staticPath, 'index.html'));
      });
   }
} else {
   app.get('/', (req, res) => {
      res.status(200).json({ 
        msg: 'Backend is running',
        mode: MODE,
        endpoints: {
          problems: '/api/problems (public)',
          sessions: '/api/sessions (auth required)',
          chat: '/api/chat (auth required)'
        }
      });
   });
}

const startServer = async () => {
   try {
      await connectDB();
      const PORT = ENV.PORT || 5000;
      app.listen(PORT, () => {
         console.log(`\n🚀 Server running on port ${PORT}`);
         console.log(`🌍 Mode: ${MODE}`);
         console.log(`✅ CORS: All localhost ports allowed\n`);
      });
   }  
   catch(error) {
      console.error("❌ Error starting server:", error);
      process.exit(1);
   }
}

startServer();