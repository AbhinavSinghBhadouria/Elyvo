// routes/progressRoutes.js
import express from 'express';
import { protectionRoute } from '../middleware/protectRoute.js';
import {
  getProgress,
  getSingleProgress,
  updateProgress,
} from '../controllers/progressController.js';

const router = express.Router();

// All progress routes require authentication
router.get('/', protectionRoute, getProgress);
router.get('/:problemId', protectionRoute, getSingleProgress);
router.post('/:problemId', protectionRoute, updateProgress);

export default router;
