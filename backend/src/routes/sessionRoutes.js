import express from "express";
import { protectionRoute } from "../middleware/protectRoute.js";
import { createSession, getActiveSessions, getMyRecentSessions, getSessionById, joinSession, endSession, joinSessionByCode } from "../controllers/SessionController.js";

const app = express();

app.post("/", protectionRoute, createSession);
app.get("/active", protectionRoute, getActiveSessions);
app.get("/my-recent", protectionRoute, getMyRecentSessions);
app.post("/join-by-code", protectionRoute, joinSessionByCode);
app.get("/:id", protectionRoute, getSessionById);

app.post("/:id/join", protectionRoute, joinSession);
app.post("/:id/end", protectionRoute, endSession);

export default app;
