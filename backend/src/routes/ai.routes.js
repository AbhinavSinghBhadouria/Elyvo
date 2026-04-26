import express from "express";
import { getHint, getReview, getDailyRoast } from "../controllers/ai.controller.js";
import { protectionRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/hint", protectionRoute, getHint);
router.post("/review", protectionRoute, getReview);
router.get("/daily-roast", protectionRoute, getDailyRoast);

export default router;