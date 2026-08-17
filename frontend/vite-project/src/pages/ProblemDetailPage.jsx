import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { problemsApi } from '../api/problems';
import { progressApi } from '../api/progress';
import { PROBLEMS } from '../data/problems';
import Navbar from '../components/Navbar';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import OutputPanel from '../components/OutputPanel';
import CodeEditorPanel from '../components/CodeEditorPanel';
import ProblemDescription from '../components/ProblemDescription';
import { executeCode } from '../lib/piston';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { aiApi } from '../api/ai';
import AIAssistantModal from '../components/AIAssistantModal';

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
  // savedCode: { language -> code } loaded from backend per problem
  const savedCodeRef = useRef({});

  // AI Assistant State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiModalTitle, setAiModalTitle] = useState("");
  const [aiModalContent, setAiModalContent] = useState("");
  const [aiIsLoading, setAiIsLoading] = useState(false);

  const handleGetHint = async () => {
    if (!currentProblem) return;
    setAiModalTitle("Intelligent Hint");
    setAiModalContent("");
    setAiIsLoading(true);
    setAiModalOpen(true);
    
    try {
      const data = await aiApi.getHint(currentProblem.description);
      setAiModalContent(data.response);
    } catch (error) {
      setAiModalContent("Sorry, I couldn't generate a hint at this time. Please try again.");
      toast.error("Failed to connect to AI Assistant");
    } finally {
      setAiIsLoading(false);
    }
  };

  const handleGetReview = async () => {
    if (!currentProblem || !code) return;
    setAiModalTitle("Code Review");
    setAiModalContent("");
    setAiIsLoading(true);
    setAiModalOpen(true);

    try {
      const data = await aiApi.getCodeReview(currentProblem.description, code, selectedLanguage);
      setAiModalContent(data.response);
    } catch (error) {
      setAiModalContent("Sorry, I couldn't perform a code review at this time. Please try again.");
      toast.error("Failed to connect to AI Assistant");
    } finally {
      setAiIsLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const problemId = id;

        const [problemsResponse, problemResponse, progressResponse] = await Promise.all([
          problemsApi.getAllProblems().catch(() => ({ problems: [] })),
          problemId ? problemsApi.getProblemById(problemId).catch(() => null) : null,
          problemId ? progressApi.getProblemProgress(problemId).catch(() => null) : null,
        ]);

        let problems = problemsResponse?.problems || [];
        if (problems.length === 0) problems = PROBLEMS;

        setAllProblems(problems);

        const savedCode = progressResponse?.progress?.code || {};
        savedCodeRef.current = savedCode;

        const staticFallback = PROBLEMS.find((p) => p.id === problemId);
        const activeProblem = problemResponse || staticFallback || (problems.length > 0 ? problems[0] : null);
        if (activeProblem) {
          setCurrentProblem(activeProblem);
          // Use saved code if available for the current language, else starter code
          const restoredCode =
            savedCode[selectedLanguage] ||
            activeProblem.starterCode?.[selectedLanguage] ||
            '';
          setCode(restoredCode);
        }
      } catch (error) {
        console.error('Error loading problems:', error);
        toast.error('Failed to load problems');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    if (currentProblem) {
      // Use saved code for this language if available, else starter code
      const restored =
        savedCodeRef.current[lang] ||
        currentProblem.starterCode?.[lang] ||
        '';
      setCode(restored);
    }
    setOutput(null);
  };

  const handleProblemChange = async (newProblemId) => {
    try {
      let problemResponse = await problemsApi.getProblemById(newProblemId).catch(() => null);
      if (!problemResponse) {
        problemResponse = PROBLEMS.find((p) => p.id === newProblemId);
      }
      if (!problemResponse) {
        toast.error('Problem not found');
        return;
      }
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

  const getExpectedOutput = (testCase) => {
    return testCase.expectedOutput ?? testCase.output ?? '';
  };

  const handleRunCode = async () => {
    if (!currentProblem?.testCases || currentProblem.testCases.length === 0) {
      toast.error('No test cases available for this problem');
      return;
    }

    setIsRunning(true);
    setOutput(null);

    const testCases = currentProblem.testCases;
    const testResults = [];
    let lastResult = null;
    let allPassed = true;

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const expectedOutput = getExpectedOutput(testCase);
      const stdin = formatInputForStdin(testCase.input);

      const result = await executeCode(selectedLanguage, code, stdin);
      lastResult = result;

      if (!result.success) {
        allPassed = false;
        testResults.push({ testCase: i + 1, passed: false });
        setOutput({ ...result, testResults });
        setIsRunning(false);
        toast.error(result.error || 'Compilation Error or Runtime Error', { duration: 5000 });
        return;
      }

      const passed = expectedOutput
        ? checkIfTestsPassed(result.output, expectedOutput)
        : true;

      testResults.push({ testCase: i + 1, passed });
      if (!passed) allPassed = false;
    }

    const lastExpected = getExpectedOutput(testCases[testCases.length - 1]);
    setOutput({
      ...lastResult,
      testResults,
      expectedOutput: lastExpected,
    });
    setIsRunning(false);

    if (allPassed) {
      triggerConfetti();
      toast.success(`🎉 All ${testCases.length} test case(s) passed!`, {
        duration: 4000,
        style: { background: '#10b981', color: '#fff' },
      });
      if (currentProblem?.id) {
        progressApi
          .saveProblemProgress(currentProblem.id, {
            solved: true,
            code,
            language: selectedLanguage,
          })
          .then(() => {
            savedCodeRef.current[selectedLanguage] = code;
            const saved = localStorage.getItem('solvedProblems');
            let solved = saved ? JSON.parse(saved) : [];
            if (!solved.includes(currentProblem.id)) {
              solved.push(currentProblem.id);
              localStorage.setItem('solvedProblems', JSON.stringify(solved));
            }
            window.dispatchEvent(new Event('solvedProblemsUpdated'));
          })
          .catch(() => {});
      }
    } else {
      const passedCount = testResults.filter(r => r.passed).length;
      toast.error(`${passedCount}/${testCases.length} test cases passed`, { duration: 4000 });
      if (currentProblem?.id) {
        progressApi
          .saveProblemProgress(currentProblem.id, { code, language: selectedLanguage })
          .then(() => { savedCodeRef.current[selectedLanguage] = code; })
          .catch(() => {});
      }
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-[var(--bg-main)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner" />
          <p className="text-lg font-medium text-slate-400">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (!currentProblem) {
    return (
      <div className="h-screen bg-[var(--bg-main)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-4 text-white">Problem not found</h2>
          <button
            onClick={() => navigate('/problems')}
            className="px-6 py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition-colors"
          >
            Back to Problems
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[var(--bg-main)] flex flex-col">
      <Navbar />

      {/* Language Selector Toolbar */}
      <div className="bg-[#14141d] border-b border-white/5 px-6 py-3">
        <div className="flex items-center justify-between max-w-full">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Language
            </span>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                    border text-sm font-semibold
                    ${selectedLanguage === lang
                      ? 'bg-violet-500/10 border-violet-500/30 text-violet-300 shadow-lg'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }
                  `}
                  title={`Switch to ${config.name}`}
                >
                  <img
                    src={config.logo}
                    alt={`${config.name} logo`}
                    className="w-4 h-4 object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span>{config.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblem.id}
              onProblemChange={handleProblemChange}
              allProblems={allProblems}
            />
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-white/5 hover:bg-violet-500/50 transition-colors cursor-col-resize" />

          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                  onGetHint={handleGetHint}
                  onGetReview={handleGetReview}
                />
              </Panel>

              <PanelResizeHandle className="h-1.5 bg-white/5 hover:bg-violet-500/50 transition-colors cursor-row-resize" />

              <Panel defaultSize={30} minSize={20}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>

      <AIAssistantModal 
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        title={aiModalTitle}
        content={aiModalContent}
        isLoading={aiIsLoading}
      />
    </div>
  );
}

export default ProblemDetailPage;
