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

const app = express();


app.use(express.json());
app.use(cors({
   origin:ENV.CLIENT_URL,
   credentials:true
}
));

app.use("/api/inngest", serve({client : inngest, functions}))
app.use(clerkMiddleware()); // this adds the field to request object: req.auth()
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// how can we distinguish between we are in production or in development
// making our application ready for deployment
const MODE = ENV.NODE_ENV || process.env.NODE_ENV || 'development';

if (MODE === 'production') {
   console.log('🔍 Looking for frontend static files...');
   console.log('Current working directory:', process.cwd());
   console.log('__dirname:', __dirname);
   
   // First, allow explicit override via env var (recommended in deployments)
   let staticPath = process.env.FRONTEND_DIST ? path.resolve(process.env.FRONTEND_DIST) : null;

   // If env var not provided or invalid, detect common repo-relative paths
   if (!staticPath) {
     // On Render, the working directory when server starts is usually the backend folder
     // Try multiple possible paths - check backend/public first (where build script copies files)
     const candidates = [
       // First check backend/public (where build script copies dist files) - MOST LIKELY
       path.join(__dirname, '../public'),
       path.join(process.cwd(), 'public'),
       path.resolve(process.cwd(), 'public'),
       // Then check original frontend dist location
       path.join(__dirname, '../../frontend/vite-project/dist'),
       path.join(process.cwd(), '../frontend/vite-project/dist'),
       path.resolve(process.cwd(), '../frontend/vite-project/dist'),
       // Other possible locations
       path.join(__dirname, '../../dist'),
       path.join(process.cwd(), '../dist'),
     ];

     console.log('Checking candidate paths:');
     staticPath = candidates.find(p => {
       try { 
         const exists = fs.existsSync(p);
         if (exists) {
           const isDir = fs.statSync(p).isDirectory();
           const indexPath = path.join(p, 'index.html');
           const hasIndex = fs.existsSync(indexPath);
           console.log(`  ✓ ${p} - exists: ${exists}, isDir: ${isDir}, hasIndex: ${hasIndex}`);
           if (isDir && hasIndex) {
             return true;
           }
         } else {
           console.log(`  ✗ ${p} - does not exist`);
         }
         return false;
       }
       catch (e) { 
         console.log(`  ✗ ${p} - error: ${e.message}`);
         return false; 
       }
     });
   }

   if (staticPath && fs.existsSync(staticPath)) {
      console.log(`✅ Serving static files from: ${staticPath}`);
      app.use(express.static(staticPath));
      // Catch-all handler for SPA routing (Express 5 compatible)
      app.use((req, res, next) => {
         // Don't handle API routes
         if (req.path.startsWith('/api')) return next();
         // Serve index.html for SPA client-side routing
         const indexPath = path.join(staticPath, 'index.html');
         if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
         } else {
            console.error(`❌ index.html not found at: ${indexPath}`);
            res.status(404).json({ error: 'Frontend not found' });
         }
      });
   } else {
      console.error('⚠️  Frontend `dist` folder not found. Static assets will not be served.');
      console.error('Current working directory:', process.cwd());
      console.error('__dirname:', __dirname);
      console.error('Tried paths:', candidates);
   }
} else {
   // Development mode - return JSON response for root route
   app.get('/', (req, res) => {
      res.status(200).json({ msg: 'successs from backend hello' });
   });
}

const startServer = async () => {
   try {
      await connectDB();
      const PORT = ENV.PORT || 5000;
      app.listen(PORT, () => {
         console.log(`Server is running on port: ${PORT}`);
      });
   }  
   catch(error) {
      console.error("Error starting the server", error);
      process.exit(1);
   }
}

startServer();