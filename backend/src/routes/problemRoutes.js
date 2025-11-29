// routes/problemRoutes.js
import express from 'express';
import Problem from '../models/Problem.js';

const router = express.Router();

// Get all problems (with pagination and filters)
router.get('/', async (req, res) => {
  try {
    const { 
      difficulty, 
      category, 
      page = 1, 
      limit = 20,
      search 
    } = req.query;

    const query = {};
    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const problems = await Problem.find(query)
      .select('-solution -testCases')
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ order: 1 });

    const total = await Problem.countDocuments(query);

    res.json({
      problems,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get problem categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Problem.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single problem by ID
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findOne({ id: req.params.id })
      .select('-solution');
    
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
