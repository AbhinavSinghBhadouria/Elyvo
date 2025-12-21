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

// Starter code templates with all necessary imports
const STARTER_CODE_TEMPLATES = {
  javascript: `// Write your code here
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    // Your solution here
});
`,

  python: `# Write your code here
import sys

def solve():
    # Your solution here
    pass

if __name__ == "__main__":
    solve()
`,

  java: `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // Write your code here
        
        sc.close();
    }
}
`,

  cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
#include <set>
#include <queue>
#include <stack>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}
`,

  c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // Write your code here
    
    return 0;
}
`
};

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
          setCode(problemResponse.starterCode?.[selectedLanguage] || '');
        } else if (problems.length > 0) {
          const defaultProblem = problems[0];
          setCurrentProblem(defaultProblem);
          setCode(defaultProblem.starterCode?.[selectedLanguage] || '');
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
      setCode(currentProblem.starterCode?.[newLang] || '');
    }
    setOutput(null);
  };

  const handleProblemChange = async (newProblemId) => {
    try {
      const problemResponse = await problemsApi.getProblemById(newProblemId);
      setCurrentProblem(problemResponse);
      setCode(problemResponse.starterCode?.[selectedLanguage] || '');
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
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, '[')
          .replace(/\s+\]/g, ']')
          .replace(/\s*,\s*/g, ',')
      )
      .filter((line) => line.length > 0)
      .join('\n');
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);
    return normalizedActual === normalizedExpected;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      const expectedOutput = currentProblem?.expectedOutput?.[selectedLanguage];
      if (expectedOutput) {
        const testsPassed = checkIfTestsPassed(result.output, expectedOutput);
        if (testsPassed) {
          triggerConfetti();
          toast.success('All tests passed! Great job!');
        } else {
          toast.error('Tests failed. Check your output!');
        }
      }
    } else {
      toast.error('Code execution failed!');
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
          {/* left panel- problem desc */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblem.id}
              onProblemChange={handleProblemChange}
              allProblems={allProblems}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* right panel- code editor & output */}
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

              {/* Bottom panel - Output Panel*/}
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
