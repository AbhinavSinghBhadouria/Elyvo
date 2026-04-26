// updateProblems.js - Script to add expectedOutput and modifiedParameterIndex to all problems
import mongoose from 'mongoose';
import Problem from './src/models/Problem.js';
import { ENV } from './src/lib/env.js';
import { PROBLEMS } from './src/Data/problems.js';

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isForce = args.includes('--force');

async function updateProblems() {
  console.log(`Starting problem migration script...`);
  if (isDryRun) {
    console.log(`[DRY RUN MODE] No changes will be saved to the database.\n`);
  }

  let updatedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  try {
    await mongoose.connect(ENV.DB_URL);
    console.log('Connected to database\n');

    const problemsDB = await Problem.find({});
    console.log(`Found ${problemsDB.length} problems in database.\n`);

    for (const problem of problemsDB) {
      try {
        const sourceProblem = PROBLEMS.find(p => p.id === problem.id);
        
        if (!sourceProblem) {
          console.warn(`[WARNING] Problem ${problem.id} not found in src/Data/problems.js. Skipping.`);
          skippedCount++;
          continue;
        }

        let changesMade = false;

        // 1. Sync basic fields
        const fieldsToSync = [
          'title', 'difficulty', 'category', 'order', 'description', 
          'constraints', 'examples', 'testCases', 'starterCode', 'hints', 'tags'
        ];

        for (const field of fieldsToSync) {
          if (JSON.stringify(problem[field]) !== JSON.stringify(sourceProblem[field])) {
            problem[field] = sourceProblem[field];
            changesMade = true;
          }
        }

        // 2. Determine if in-place (Logic for AI service)
        const descriptionStr = (sourceProblem.description || '').toLowerCase();
        const isInPlace = descriptionStr.includes('in-place') || 
                          descriptionStr.includes('modify the array in-place') ||
                          problem.id.includes('reverse') || 
                          problem.id.includes('sort') ||
                          (sourceProblem.starterCode?.c && sourceProblem.starterCode.c.includes('void')) ||
                          (sourceProblem.starterCode?.cpp && sourceProblem.starterCode.cpp.includes('void'));

        const newModifiedParameterIndex = isInPlace ? 0 : null;
        
        if (problem.modifiedParameterIndex !== newModifiedParameterIndex) {
          problem.modifiedParameterIndex = newModifiedParameterIndex;
          changesMade = true;
        }

        // 3. Set expectedOutput based on first test case in source data
        if (sourceProblem.testCases && sourceProblem.testCases.length > 0) {
          const firstOutput = sourceProblem.testCases[0].expectedOutput;
          
          let jsOutput;
          if (typeof firstOutput === 'object') {
             jsOutput = JSON.stringify(firstOutput);
          } else {
             jsOutput = String(firstOutput);
          }
          
          const pyOutput = typeof jsOutput === 'string' ? jsOutput.replace(/"/g, "'") : '';
          
          const javaOutput = Array.isArray(firstOutput) ? 
             `[${firstOutput.join(', ')}]` : 
             String(firstOutput);

          const formatCCpp = (output) => {
            if (Array.isArray(output)) return `[${output.join(',')}]`;
            if (output === true || output === "true") return '1';
            if (output === false || output === "false") return '0';
            return String(output);
          };

          const newExpectedOutput = {
            javascript: jsOutput,
            python: pyOutput,
            java: javaOutput,
            cpp: formatCCpp(firstOutput),
            c: formatCCpp(firstOutput)
          };

          if (JSON.stringify(problem.expectedOutput) !== JSON.stringify(newExpectedOutput)) {
            problem.expectedOutput = newExpectedOutput;
            changesMade = true;
          }
        } else if (!problem.expectedOutput) {
          problem.expectedOutput = { javascript: '', python: '', java: '', cpp: '', c: '' };
          changesMade = true;
        }

        if (changesMade) {
          if (!isDryRun) {
            await problem.save();
            console.log(`[UPDATED] ${problem.id}`);
          } else {
            console.log(`[DRY RUN - WOULD UPDATE] ${problem.id} -> in-place: ${isInPlace}, expectedOutput: ${problem.expectedOutput?.javascript}`);
          }
          updatedCount++;
        } else {
          console.log(`[SKIPPED] ${problem.id} - Already up to date.`);
          skippedCount++;
        }

      } catch (err) {
        console.error(`[ERROR] Failed to process ${problem.id}:`, err.message);
        failedCount++;
      }
    }

    console.log('\\n=====================================');
    console.log(`Migration Summary:`);
    console.log(`Total DB Problems: ${problemsDB.length}`);
    console.log(`Updated: ${updatedCount}`);
    console.log(`Skipped: ${skippedCount}`);
    console.log(`Failed:  ${failedCount}`);
    console.log('=====================================');

  } catch (error) {
    console.error('Fatal error updating problems:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
}

updateProblems();