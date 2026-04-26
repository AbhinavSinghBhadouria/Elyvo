import { generateHint, generateCodeReview, generateDailyRoast } from '../services/ai.services.js';

export const getDailyRoast = async (req, res) => {
  try {
    const userName = req.user.name || "Developer";
    const response = await generateDailyRoast(userName);
    res.json({ response });
  } catch (error) {
    console.error("Error generating daily roast:", error);
    res.status(500).json({ error: "Failed to generate daily roast" });
  }
};

export const getHint = async (req, res) => {
  try {
    const { problemDesc } = req.body;
    if (!problemDesc) {
      return res.status(400).json({ error: "Problem description is required" });
    }
    
    const response = await generateHint(problemDesc);
    res.json({ response });
  } catch (error) {
    console.error("Error generating hint:", error);
    res.status(500).json({ error: "Failed to generate hint" });
  }
};

export const getReview = async (req, res) => {
  try {
    const { problemDesc, userCode, language } = req.body;
    if (!problemDesc || !userCode || !language) {
      return res.status(400).json({ error: "Missing required fields: problemDesc, userCode, language" });
    }

    const response = await generateCodeReview(problemDesc, userCode, language);
    res.json({ response });
  } catch (error) {
    console.error("Error generating code review:", error);
    res.status(500).json({ error: "Failed to generate code review" });
  }
};