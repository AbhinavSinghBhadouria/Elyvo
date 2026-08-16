// models/UserProgress.js
import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    problemId: {
      type: String,
      required: true,
    },
    solved: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    // Stores latest code per language: { javascript: "...", python: "...", ... }
    code: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

// Compound unique index: one progress record per user per problem
userProgressSchema.index({ userId: 1, problemId: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;
