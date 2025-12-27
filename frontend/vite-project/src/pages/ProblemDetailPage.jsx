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

// Language configuration with CDN logo URLs
const LANGUAGE_CONFIG = {
  javascript: {
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-400',
    hoverBg: 'hover:bg-yellow-100',
    comment: '// Write your JavaScript code here'
  },
  python: {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-400',
    hoverBg: 'hover:bg-blue-100',
    comment: '# Write your Python code here'
  },
  java: {
    name: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    borderColor: 'border-red-400',
    hoverBg: 'hover:bg-red-100',
    comment: '// Write your Java code here'
  },
  cpp: {
    name: 'C++',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-800',
    borderColor: 'border-indigo-400',
    hoverBg: 'hover:bg-indigo-100',
    comment: '// Write your C++ code here'
  },
  c: {
    name: 'C',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-400',
    hoverBg: 'hover:bg-gray-100',
    comment: '// Write your C code here'
  }
};

// Simple language-specific comments only
const STARTER_CODE_TEMPLATES = {
  javascript: '// Write your JavaScript code here\n',
  python: '# Write your Python code here\n',
  java: '// Write your Java code here\n',
  cpp: '// Write your C++ code here\n',
  c: '// Write your C code here\n'
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
          setCode(STARTER_CODE_TEMPLATES[selectedLanguage]);
        } else if (problems.length > 0) {
          const defaultProblem = problems[0];
          setCurrentProblem(defaultProblem);
          setCode(STARTER_CODE_TEMPLATES[selectedLanguage]);
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

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(STARTER_CODE_TEMPLATES[lang]);
    setOutput(null);
  };

  const handleProblemChange = async (newProblemId) => {
    try {
      const problemResponse = await problemsApi.getProblemById(newProblemId);
      setCurrentProblem(problemResponse);
      setCode(STARTER_CODE_TEMPLATES[selectedLanguage]);
      setOutput(null);
      navigate(`/problem/${newProblemId}`);
    } catch (error) {
      console.error('Error loading problem:', error);
      toast.error('Failed to load problem');
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b']
      });
      
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
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

    const testCase = currentProblem.testCases[0];
    const stdin = formatInputForStdin(testCase.input);

    const result = await executeCode(selectedLanguage, code, stdin);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      const expectedOutput = testCase.expectedOutput;
      if (expectedOutput) {
        const testsPassed = checkIfTestsPassed(result.output, expectedOutput);
        if (testsPassed) {
          triggerConfetti();
          toast.success('🎉 Test case passed!', {
            duration: 4000,
            style: {
              background: '#10b981',
              color: '#fff',
            }
          });
        } else {
          toast.error('Wrong Answer - Check the expected output', {
            duration: 4000
          });
        }
      } else {
        toast.success('Code executed successfully!');
      }
    } else {
      toast.error(result.error || 'Compilation Error or Runtime Error', {
        duration: 5000
      });
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-base-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="text-lg font-medium">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (!currentProblem) {
    return (
      <div className="h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
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

      {/* Enhanced Language Selector Toolbar */}
      <div className="bg-base-200 border-b-2 border-base-300 px-6 py-3.5 shadow-sm">
        <div className="flex items-center justify-between max-w-full">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-base-content uppercase tracking-wider">
              Select Language
            </span>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`
                    flex items-center gap-2.5 px-4 py-2.5 rounded-lg transition-all duration-200
                    border-2 font-semibold text-sm
                    ${selectedLanguage === lang 
                      ? `${config.bgColor} ${config.textColor} ${config.borderColor} shadow-lg scale-105 ring-2 ring-offset-2 ring-offset-base-200` 
                      : `bg-base-100 border-base-300 text-base-content/70 ${config.hoverBg} hover:border-base-400 hover:shadow-md hover:scale-102`
                    }
                  `}
                  title={`Switch to ${config.name}`}
                >
                  <img 
                    src={config.logo} 
                    alt={`${config.name} logo`}
                    className="w-5 h-5 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span>{config.name}</span>
                  {selectedLanguage === lang && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left panel - Problem Description */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblem.id}
              onProblemChange={handleProblemChange}
              allProblems={allProblems}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* Right panel - Code Editor & Output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Top panel - Code Editor */}
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

              {/* Bottom panel - Output */}
              <Panel defaultSize={30} minSize={20}>
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