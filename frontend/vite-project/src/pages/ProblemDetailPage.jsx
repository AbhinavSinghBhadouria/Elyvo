import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { executeCode } from "../lib/piston";
import { problemsApi } from "../api/problems";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [allProblems, setAllProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [solvedProblems, setSolvedProblems] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch current problem
        const problemResponse = await problemsApi.getProblemById(id);
        setProblem(problemResponse);
        
        // Set initial code based on selected language
        // NOTE: Since you changed to CodeChef style, ensure your DB 
        // has starter code that includes the main() function!
        if (problemResponse.starterCode && problemResponse.starterCode[selectedLanguage]) {
          setCode(problemResponse.starterCode[selectedLanguage]);
        } else {
            // Fallback defaults if DB is empty
            const defaults = {
                cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}",
                java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
                python: "# Write your code here\nimport sys\n",
                javascript: "// Write your code here\n"
            };
            setCode(defaults[selectedLanguage] || "");
        }
        
        // Fetch all problems for the dropdown
        const allProblemsResponse = await problemsApi.getAllProblems();
        const uniqueProblems = (allProblemsResponse.problems || []).filter(
          (problem, index, self) =>
            index === self.findIndex(p => p.id === problem.id)
        );
        setAllProblems(uniqueProblems);
        
        setError(null);
      } catch (err) {
        setError("Failed to load problem. Please try again.");
        console.error("Error fetching problem:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }

    // Load solved problems from localStorage
    const saved = localStorage.getItem('solvedProblems');
    if (saved) {
      try {
        setSolvedProblems(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Error loading solved problems:', e);
      }
    }
  }, [id, selectedLanguage]); // Added selectedLanguage to dependency to handle defaults better

  // Update code when language changes
  useEffect(() => {
    if (problem) {
        if (problem.starterCode && problem.starterCode[selectedLanguage]) {
            setCode(problem.starterCode[selectedLanguage]);
        } else {
             // Fallback defaults when switching language
             const defaults = {
                cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}",
                java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
                python: "# Write your code here\nimport sys\n",
                javascript: "// Write your code here\n"
            };
            setCode(defaults[selectedLanguage] || "");
        }
        setOutput(null);
    }
  }, [selectedLanguage, problem]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
  };

  const handleProblemChange = (newProblemId) => {
    navigate(`/problem/${newProblemId}`);
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

  const normalizeOutput = (str) => {
    if (!str) return "";
    return str
      .trim()
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\n");
  };

  // Helper to convert array inputs into a string for Standard Input
  // Example: [5, [1, 2]] -> "5\n1 2"
  const formatInputForStdIn = (input) => {
    if (Array.isArray(input)) {
      return input.map(item => {
        if (Array.isArray(item)) return item.join(" ");
        return item;
      }).join("\n");
    }
    return String(input);
  };

  const handleRunCode = async () => {
    if (!problem || !problem.testCases || problem.testCases.length === 0) {
        toast.error("No test cases found for this problem.");
        return;
    }

    setIsRunning(true);
    setOutput(null);

    // 1. Get the first test case
    const testCase = problem.testCases[0];
    
    // 2. Format input for Standard I/O (CodeChef style)
    const stdin = formatInputForStdIn(testCase.input);

    // 3. Execute the raw code directly with the input
    const result = await executeCode(selectedLanguage, code, stdin);
    
    setOutput(result);
    setIsRunning(false);

    // check if code executed successfully and matches expected output
    if (result.success) {
      if (problem.expectedOutput && problem.expectedOutput[selectedLanguage]) {
        const expectedOutput = problem.expectedOutput[selectedLanguage];
        
        const cleanActual = normalizeOutput(result.output);
        const cleanExpected = normalizeOutput(expectedOutput);

        if (cleanActual === cleanExpected) {
          triggerConfetti();
          toast.success("Correct Answer!");
          
          // Mark problem as solved
          const updated = new Set(solvedProblems);
          updated.add(problem.id);
          setSolvedProblems(updated);
          localStorage.setItem('solvedProblems', JSON.stringify([...updated]));
          window.dispatchEvent(new Event('solvedProblemsUpdated'));
        } else {
          toast.error("Wrong Answer");
          // Useful for debugging
          // console.log("EXP:", cleanExpected);
          // console.log("ACT:", cleanActual);
        }
      } else {
        toast.success("Code executed successfully!");
      }
    } else {
      toast.error("Compilation Error or Runtime Error");
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-base-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-white/70">Loading problem...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="h-screen bg-base-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-lg text-red-400">{error || "Problem not found"}</p>
            <button 
              onClick={() => navigate('/problems')}
              className="btn btn-primary"
            >
              Back to Problems
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* left panel - problem description */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={problem}
              currentProblemId={problem.id}
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