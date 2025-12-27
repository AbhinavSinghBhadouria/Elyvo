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
    hoverBg: 'hover:bg-yellow-100'
  },
  python: {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-400',
    hoverBg: 'hover:bg-blue-100'
  },
  java: {
    name: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    borderColor: 'border-red-400',
    hoverBg: 'hover:bg-red-100'
  },
  cpp: {
    name: 'C++',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-800',
    borderColor: 'border-indigo-400',
    hoverBg: 'hover:bg-indigo-100'
  },
  c: {
    name: 'C',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-400',
    hoverBg: 'hover:bg-gray-100'
  }
};

// Empty starter code - users write complete solutions
const STARTER_CODE_TEMPLATES = {
  javascript: '',
  python: '',
  java: '',
  cpp: '',
  c: ''
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

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
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

    console.log('Running with stdin:', stdin);
    console.log('Expected output:', testCase.expectedOutput);

    const result = await executeCode(selectedLanguage, code, stdin);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
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

      {/* Enhanced Language Selector Toolbar */}
      <div className="bg-base-200 border-b border-base-300 px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between max-w-full">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-base-content/70 uppercase tracking-wide">
              Select Language:
            </span>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`
                    flex items-center gap-2.5 px-4 py-2.5 rounded-lg transition-all duration-200
                    border-2 font-medium text-sm
                    ${selectedLanguage === lang 
                      ? `${config.bgColor} ${config.textColor} ${config.borderColor} shadow-md scale-105` 
                      : `bg-base-100 border-base-300 text-base-content/80 ${config.hoverBg} hover:border-base-400 hover:shadow`
                    }
                  `}
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
                    <span className="ml-1">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

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
