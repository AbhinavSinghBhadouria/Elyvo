// Save as: backend/importUpdatedProblems.js
// Run with: node importUpdatedProblems.js

import mongoose from 'mongoose';
import Problem from './src/models/Problem.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get MongoDB URI from environment variables
const DB_URL = process.env.MONGODB_URI || process.env.DB_URL || process.env.MONGO_URI;

if (!DB_URL) {
  console.error('❌ Error: MongoDB connection string not found!');
  console.log('Please set MONGODB_URI in your .env file');
  process.exit(1);
}

// Import your problems - ADJUSTED PATH for backend/src/Data/problems.js
import { enhancedProblems } from './src/Data/problems.js';
const problems = enhancedProblems;

/**
 * Transform problem data to match database schema
 */
function transformProblem(problem) {
  return {
    id: problem.id,
    title: problem.title,
    difficulty: problem.difficulty,
    category: problem.category,
    order: problem.order,
    
    // Description with bold text support
    description: problem.description,
    
    // Transform examples if needed
    examples: problem.examples?.map(ex => ({
      input: ex.input || ex.inputText,
      output: ex.output || ex.outputText,
      explanation: ex.explanation
    })) || [],
    
    // Transform test cases
    testCases: problem.testCases?.map(tc => {
      // Handle different formats
      let expectedOutput = tc.expectedOutput || tc.expected;
      
      // Convert to string if needed
      if (typeof expectedOutput !== 'string') {
        if (Array.isArray(expectedOutput)) {
          expectedOutput = expectedOutput.join(' ');
        } else if (typeof expectedOutput === 'boolean') {
          expectedOutput = expectedOutput ? 'true' : 'false';
        } else {
          expectedOutput = String(expectedOutput);
        }
      }
      
      return {
        input: tc.input,
        expectedOutput: expectedOutput
      };
    }) || [],
    
    // Other fields
    constraints: problem.constraints || [],
    tags: problem.tags || [],
    hints: problem.hints || [],
    starterCode: problem.starterCode || {},
    
    // Set modifiedParameterIndex
    modifiedParameterIndex: problem.modifiedParameterIndex !== undefined ? 
                            problem.modifiedParameterIndex : null,
  };
}

async function importProblems() {
  try {
    await mongoose.connect(DB_URL);
    console.log('✓ Connected to database\n');
    console.log('🚀 Importing/Updating Problems...\n');
    console.log('='.repeat(80));

    let imported = 0;
    let updated = 0;
    let errors = 0;
    let skipped = 0;

    for (let i = 0; i < problems.length; i++) {
      const problem = problems[i];
      
      try {
        console.log(`\n[${i + 1}/${problems.length}] ${problem.title}`);
        
        // Check if problem already exists
        const existing = await Problem.findOne({ title: problem.title });
        
        // Transform the problem data
        const transformedProblem = transformProblem(problem);
        
        // Show statistics
        console.log(`  📝 Examples: ${transformedProblem.examples.length}`);
        console.log(`  🧪 Test Cases: ${transformedProblem.testCases.length}`);
        console.log(`  📋 Constraints: ${transformedProblem.constraints.length}`);
        console.log(`  🏷️  Tags: ${transformedProblem.tags.join(', ') || 'None'}`);
        console.log(`  💻 Languages: ${Object.keys(transformedProblem.starterCode).length}`);
        
        if (existing) {
          // Update existing problem
          await Problem.findByIdAndUpdate(existing._id, transformedProblem);
          console.log(`  ✅ Updated`);
          updated++;
        } else {
          // Create new problem
          await Problem.create(transformedProblem);
          console.log(`  ✅ Imported`);
          imported++;
        }
        
      } catch (error) {
        console.error(`  ❌ Error: ${error.message}`);
        errors++;
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log('\n🎉 Import Complete!\n');
    console.log(`  📦 Total Problems: ${problems.length}`);
    console.log(`  ✨ New Imports: ${imported}`);
    console.log(`  🔄 Updated: ${updated}`);
    console.log(`  ❌ Errors: ${errors}`);
    console.log(`  ✅ Success Rate: ${((imported + updated) / problems.length * 100).toFixed(1)}%`);

    // Calculate statistics
    const totalTestCases = problems.reduce((sum, p) => sum + (p.testCases?.length || 0), 0);
    const avgTestCases = problems.length > 0 ? (totalTestCases / problems.length).toFixed(1) : 0;
    
    console.log('\n📊 Statistics:');
    console.log(`  Total Test Cases: ${totalTestCases}`);
    console.log(`  Average per Problem: ${avgTestCases}`);
    console.log(`  Problems with 10+ Tests: ${problems.filter(p => (p.testCases?.length || 0) >= 10).length}`);

    mongoose.connection.close();
    console.log('\n✓ Database connection closed');
    
  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    console.error(error.stack);
    mongoose.connection.close();
    process.exit(1);
  }
}

importProblems();