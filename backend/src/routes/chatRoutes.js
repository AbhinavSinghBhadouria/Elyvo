import express from "express";
import {getStreamToken} from "../controllers/chatController.js";
import { protectionRoute } from "../middleware/protectRoute.js";
const app = express();

// /api/chat/token
app.get("/token",protectionRoute, getStreamToken)

export default app;