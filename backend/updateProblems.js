// updateProblems.js - Script to add expectedOutput and modifiedParameterIndex to all problems
import mongoose from 'mongoose';
import Problem from './src/models/Problem.js';
import { ENV } from './src/lib/env.js';

async function updateProblems() {
  try {
    await mongoose.connect(ENV.DB_URL);
    console.log('Connected to database');

    const problems = await Problem.find({});
    console.log(`Found ${problems.length} problems`);

    for (const problem of problems) {
      // Determine if in-place
      const isInPlace = (problem.description && problem.description.toLowerCase().includes('in-place')) ||
                       problem.id.includes('reverse') ||
                       (problem.handlerFunction && problem.handlerFunction.includes('reverse'));

      problem.modifiedParameterIndex = isInPlace ? 0 : null;

      // Set expectedOutput based on first test case
      if (problem.testCases && problem.testCases.length > 0) {
        const firstOutput = problem.testCases[0].output;
        let jsOutput;
        try {
          jsOutput = JSON.stringify(firstOutput);
        } catch (e) {
          jsOutput = String(firstOutput);
        }
        const pyOutput = typeof jsOutput === 'string' ? jsOutput.replace(/"/g, "'") : '';
        problem.expectedOutput = {
          javascript: jsOutput,
          python: pyOutput,
          java: Array.isArray(firstOutput) ? `[${firstOutput.join(', ')}]` : String(firstOutput),
          cpp: Array.isArray(firstOutput) ? `[${firstOutput.join(',')}]` : (firstOutput ? '1' : '0'),
          c: Array.isArray(firstOutput) ? `[${firstOutput.join(',')}]` : (firstOutput ? '1' : '0')
        };
      } else {
        problem.expectedOutput = {
          javascript: '',
          python: '',
          java: '',
          cpp: '',
          c: ''
        };
      }

      await problem.save();
      console.log(`Updated ${problem.title}`);
    }

    console.log('All problems updated');
  } catch (error) {
    console.error('Error updating problems:', error);
  } finally {
    await mongoose.disconnect();
  }
}

updateProblems();