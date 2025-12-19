// models/Problem.js
import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: { type: String, required: true },
  order: { type: Number },
  videoId: { type: String },
  description: { type: String, required: true },
  examples: [{
    id: Number,
    inputText: String,
    outputText: String,
    explanation: String,
    img: String
  }],
  constraints: [String],
  starterCode: {
    javascript: String,
    cpp: String,
    c: String,
    python: String,
    java: String
  },
  testCases: [{
    input: mongoose.Schema.Types.Mixed,
    output: mongoose.Schema.Types.Mixed,
    hidden: { type: Boolean, default: false }
  }],
  solution: String,
  hints: [String],
  tags: [String],
  expectedOutput: {
    javascript: String,
    cpp: String,
    c: String,
    python: String,
    java: String
  },
  modifiedParameterIndex: Number,
  handlerFunction: String
}, { timestamps: true });

export default mongoose.model('Problem', problemSchema);
