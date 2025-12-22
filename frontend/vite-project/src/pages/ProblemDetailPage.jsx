import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { problemsApi } from '../api/problems';
import Navbar from '../components/Navbar';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import OutputPanel from '../components/OutputPanel';
import CodeEditorPanel from '../components/CodeEditorPanel';
import ProblemDescription from '../components/ProblemDescription';
import { executeCode } from '../lib/piston';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

// OPTION 1: Minimal starter code (just boilerplate, no hints)
const STARTER_CODE_TEMPLATES = {
  javascript: `const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    // Write your code here
});
`,

  python: `# Write your code here
`,

  java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // Write your code here
        
        sc.close();
    }
}
`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}
`,

  c: `#include <stdio.h>

int main() {
    // Write your code here
    
    return 0;
}
`
};

// OPTION 2: Completely blank (uncomment to use)
/*
const STARTER_CODE_TEMPLATES = {
  javascript: '',
  python: '',
  java: '',
  cpp: '',
  c: ''
};
*/

function ProblemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblem, setCurrentProblem] = useState(null);
  const [allProblems, setAllProblems] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load all problems and current problem
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [problemsResponse, problemResponse] = await Promise.all([
          problemsApi.getAllProblems(),
          id ? problemsApi.getProblemById(id) : null
        ]);

        const problems = problemsResponse?.problems || [];
        setAllProblems(problems);

        if (problemResponse) {
          setCurrentProblem(problemResponse);
          const starterCode = problemResponse.starterCode?.[selectedLanguage] || 
                             STARTER_CODE_TEMPLATES[selectedLanguage] || 
                             '// Write your code here\n';
          setCode(starterCode);
        } else if (problems.length > 0) {
          const defaultProblem = problems[0];
          setCurrentProblem(defaultProblem);
          const starterCode = defaultProblem.starterCode?.[selectedLanguage] || 
                             STARTER_CODE_TEMPLATES[selectedLanguage] || 
                             '// Write your code here\n';
          setCode(starterCode);
        }
      } catch (error) {
        console.error('Error loading problems:', error);
        toast.error('Failed to load problems');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    if (currentProblem) {
      const starterCode = currentProblem.starterCode?.[newLang] || 
                         STARTER_CODE_TEMPLATES[newLang] || 
                         '// Write your code here\n';
      setCode(starterCode);
    }
    setOutput(null);
  };

  const handleProblemChange = async (newProblemId) => {
    try {
      const problemResponse = await problemsApi.getProblemById(newProblemId);
      setCurrentProblem(problemResponse);
      const starterCode = problemResponse.starterCode?.[selectedLanguage] || 
                         STARTER_CODE_TEMPLATES[selectedLanguage] || 
                         '// Write your code here\n';
      setCode(starterCode);
      setOutput(null);
      navigate(`/problem/${newProblemId}`);
    } catch (error) {
      console.error('Error loading problem:', error);
      toast.error('Failed to load problem');
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  const normalizeOutput = (output) => {
    return output
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);
    return normalizedActual === normalizedExpected;
  };

  /**
   * Format test case input for standard input
   * Handles arrays and converts them to space/newline separated format
   */
  const formatInputForStdin = (testInput) => {
    if (typeof testInput === 'string') {
      return testInput;
    }
    
    if (Array.isArray(testInput)) {
      return testInput.map(item => {
        if (Array.isArray(item)) {
          return item.join(' ');
        }
        return String(item);
      }).join('\n');
    }
    
    return String(testInput);
  };

  const handleRunCode = async () => {
    if (!currentProblem?.testCases || currentProblem.testCases.length === 0) {
      toast.error('No test cases available for this problem');
      return;
    }

    setIsRunning(true);
    setOutput(null);

    // Get the first test case
    const testCase = currentProblem.testCases[0];
    const stdin = formatInputForStdin(testCase.input);

    console.log('Running with stdin:', stdin);
    console.log('Expected output:', testCase.expectedOutput);

    const result = await executeCode(selectedLanguage, code, stdin);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      // Check if output matches expected
      const expectedOutput = testCase.expectedOutput;
      if (expectedOutput) {
        const testsPassed = checkIfTestsPassed(result.output, expectedOutput);
        if (testsPassed) {
          triggerConfetti();
          toast.success('Test case passed! ✓');
        } else {
          toast.error('Wrong Answer ✗');
          console.log('Expected:', normalizeOutput(expectedOutput));
          console.log('Got:', normalizeOutput(result.output));
        }
      } else {
        toast.success('Code executed successfully!');
      }
    } else {
      toast.error('Compilation Error or Runtime Error');
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-base-100 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!currentProblem) {
    return (
      <div className="h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Problem not found</h2>
          <button onClick={() => navigate('/problems')} className="btn btn-primary">
            Back to Problems
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* left panel - problem desc */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblem.id}
              onProblemChange={handleProblemChange}
              allProblems={allProblems}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* right panel - code editor & output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Top panel - Code editor */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              {/* Bottom panel - Output Panel */}
              <Panel defaultSize={30} minSize={30}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemDetailPage;