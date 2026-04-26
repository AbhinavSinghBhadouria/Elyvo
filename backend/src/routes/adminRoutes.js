import express from "express";
import { addProblem, updateProblem, deleteProblem } from "../controllers/AdminController.js";
import { adminAuth } from "../middleware/protectRoute.js";

const router = express.Router();

// All routes here require the x-admin-secret header
router.post("/problems", adminAuth, addProblem);
router.put("/problems/:id", adminAuth, updateProblem);
router.delete("/problems/:id", adminAuth, deleteProblem);

export default router;
