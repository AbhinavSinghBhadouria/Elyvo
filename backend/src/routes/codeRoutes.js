import express from "express";
import { protectionRoute } from "../middleware/protectRoute.js";
import { runCode } from "../controllers/codeController.js";

const router = express.Router();

// POST /api/code/run
router.post("/run", protectionRoute, runCode);

export default router;


