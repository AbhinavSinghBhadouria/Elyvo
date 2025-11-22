import express from "express";
import {getStreamToken} from "../controllers/chatController";
import { protectionRoute } from "../middleware/protectRoute";
const app = express();

// /api/chat/token
app.get("/token",protectionRoute, getStreamToken)

export default app;