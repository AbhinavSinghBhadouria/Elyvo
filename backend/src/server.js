import express from 'express';
import {ENV} from "./lib/env.js";
import path from "path";
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
const __dirname = path.resolve(__filename);

// how can we distinguish between we are in production or in development
// making our application ready for deployment
const MODE = ENV.NODE_ENV || process.env.NODE_ENV || 'development';

if (MODE === 'production') {
   // path from backend/src -> ../../frontend/vite-project/dist
   const staticPath = path.join(__dirname, '../../frontend/vite-project/dist');
   app.use(express.static(staticPath));

   // Catch-all handler for SPA routing (Express 5 compatible)
   // This middleware runs after static files and catches all non-API routes
   app.use((req, res, next) => {
      // Don't handle API routes
      if (req.path.startsWith('/api')) {
         return next();
      }
      // Serve index.html for SPA client-side routing
      res.sendFile(path.join(staticPath, 'index.html'));
   });
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