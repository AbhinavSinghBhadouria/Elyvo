import express from "express";
import { protectionRoute } from "../middleware/protectRoute.js";
import { createSession, getActiveSessions, getMyRecentSessions, getSessionById, joinSession, endSession } from "../controllers/SessionController.js";

const app = express();

app.post("/", protectionRoute, createSession);
app.get("/active", protectionRoute, getActiveSessions);
app.get("/my-recent", protectionRoute, getMyRecentSessions);
app.get("/:id", protectionRoute, getSessionById);

app.post("/:id/join", protectionRoute, joinSession);
app.get("/:id/end", protectionRoute, endSession);

export default app;
