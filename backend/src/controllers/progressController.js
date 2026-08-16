// controllers/progressController.js
import UserProgress from '../models/UserProgress.js';

/**
 * GET /api/progress
 * Returns all progress records for the authenticated user.
 * Each record contains: problemId, solved, attempts, code (per language).
 */
export const getProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const progress = await UserProgress.find({ userId }).lean();
    res.status(200).json({ progress });
  } catch (error) {
    console.error('Error in getProgress:', error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

/**
 * GET /api/progress/:problemId
 * Returns progress for one specific problem for the authenticated user.
 */
export const getSingleProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { problemId } = req.params;

    const record = await UserProgress.findOne({ userId, problemId }).lean();

    if (!record) {
      return res.status(200).json({
        progress: { problemId, solved: false, attempts: 0, code: {} },
      });
    }

    // Convert Map to plain object for JSON serialization
    const codeObj = record.code instanceof Map
      ? Object.fromEntries(record.code)
      : record.code || {};

    res.status(200).json({ progress: { ...record, code: codeObj } });
  } catch (error) {
    console.error('Error in getSingleProgress:', error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

/**
 * POST /api/progress/:problemId
 * Upserts the progress record for the current user and problem.
 * Body: { solved?, code?, language? }
 *
 * - Always increments attempts by 1 if code is being submitted.
 * - Stores latest code per language if { code, language } is provided.
 * - Marks as solved if { solved: true } is provided.
 */
export const updateProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { problemId } = req.params;
    const { solved, code, language } = req.body;

    // Find existing or create new record
    let record = await UserProgress.findOne({ userId, problemId });

    if (!record) {
      record = new UserProgress({ userId, problemId });
    }

    // Increment attempt counter whenever code is saved
    if (code !== undefined) {
      record.attempts = (record.attempts || 0) + 1;
    }

    // Update solved status (only flip to true, never unsolve from server)
    if (solved === true) {
      record.solved = true;
    }
    // Allow manual unsetting (from the Problems page "Reset" button)
    if (solved === false) {
      record.solved = false;
    }

    // Save code for the given language
    if (code !== undefined && language) {
      if (!record.code) record.code = new Map();
      record.code.set(language, code);
      record.markModified('code'); // Required for Mongoose Map mutations
    }

    await record.save();

    const codeObj = record.code instanceof Map
      ? Object.fromEntries(record.code)
      : record.code || {};

    res.status(200).json({
      msg: 'Progress updated',
      progress: {
        problemId: record.problemId,
        solved: record.solved,
        attempts: record.attempts,
        code: codeObj,
      },
    });
  } catch (error) {
    console.error('Error in updateProgress:', error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};
