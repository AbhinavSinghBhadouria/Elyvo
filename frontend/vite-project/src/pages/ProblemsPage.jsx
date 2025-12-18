import { useMemo, useState, useEffect } from "react";
import {
  ChevronRight,
  Code2,
  Shield,
  Target,
  Wand2,
  CheckCircle2,
} from "lucide-react";

// Mock data for demonstration
const MOCK_PROBLEMS = [
  {
    id: "1",
    title: "Two Sum",
    category: "Array",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    handlerFunction: "twoSum"
  },
  {
    id: "2",
    title: "Valid Parentheses",
    category: "Stack",
    difficulty: "Easy",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    handlerFunction: "isValid"
  },
  {
    id: "3",
    title: "Binary Tree Level Order",
    category: "Tree",
    difficulty: "Medium",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    handlerFunction: "levelOrder"
  },
  {
    id: "4",
    title: "Merge K Sorted Lists",
    category: "Linked List",
    difficulty: "Hard",
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.",
    handlerFunction: "mergeKLists"
  },
  {
    id: "5",
    title: "LRU Cache",
    category: "Design",
    difficulty: "Medium",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    handlerFunction: "LRUCache"
  }
];

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

const getDifficultyBadgeClass = (difficulty) => {
  const classes = {
    Easy: "bg-green-500/20 text-green-400 border-green-500/30",
    Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Hard: "bg-red-500/20 text-red-400 border-red-500/30"
  };
  return classes[difficulty] || "";
};

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("All");
  const [query, setQuery] = useState("");
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProblems(MOCK_PROBLEMS);
      setLoading(false);
    }, 500);
    
    // Load solved problems from localStorage
    const saved = localStorage.getItem('solvedProblems');
    if (saved) {
      try {
        setSolvedProblems(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Error loading solved problems:', e);
      }
    }
  }, []);

  const toggleSolved = (problemId) => {
    const updated = new Set(solvedProblems);
    if (updated.has(problemId)) {
      updated.delete(problemId);
    } else {
      updated.add(problemId);
    }
    setSolvedProblems(updated);
    localStorage.setItem('solvedProblems', JSON.stringify([...updated]));
  };

  const difficultyStats = useMemo(
    () =>
      problems.reduce(
        (acc, item) => {
          acc[item.difficulty] = (acc[item.difficulty] || 0) + 1;
          return acc;
        },
        { Easy: 0, Medium: 0, Hard: 0 }
      ),
    [problems]
  );

  const solvedStats = useMemo(() => {
    const stats = { total: 0, Easy: 0, Medium: 0, Hard: 0 };
    problems.forEach(problem => {
      if (solvedProblems.has(problem.id)) {
        stats.total++;
        stats[problem.difficulty]++;
      }
    });
    return stats;
  }, [problems, solvedProblems]);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesDifficulty = difficulty === "All" || problem.difficulty === difficulty;
      const matchesQuery =
        query.trim().length === 0 ||
        problem.title.toLowerCase().includes(query.toLowerCase()) ||
        problem.category.toLowerCase().includes(query.toLowerCase());
      return matchesDifficulty && matchesQuery;
    });
  }, [difficulty, problems, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              CodePrep
            </h1>
            <div className="flex gap-4 text-sm">
              <button className="text-white/70 hover:text-white transition-colors">Problems</button>
              <button className="text-white/70 hover:text-white transition-colors">Progress</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-5 py-12 space-y-10">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 backdrop-blur-sm">
          <div className="absolute -top-32 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-[140px]" />
          <div className="relative z-10 flex flex-col lg:flex-row gap-10 justify-between">
            <div className="space-y-5 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.6em] text-white/50 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                Problem archive
              </p>
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                Curated technical problems designed for interview brilliance.
              </h1>
              <p className="text-white/70 text-lg">
                Filter by difficulty, track your momentum, and pair each session with the perfect
                warm-up set.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 flex-shrink-0">
              {[
                { 
                  label: "Total", 
                  value: problems.length, 
                  solved: solvedStats.total,
                  accent: "from-blue-500 to-purple-500" 
                },
                { 
                  label: "Easy", 
                  value: difficultyStats.Easy, 
                  solved: solvedStats.Easy,
                  accent: "from-green-400 to-emerald-400" 
                },
                {
                  label: "Medium+",
                  value: difficultyStats.Medium + difficultyStats.Hard,
                  solved: solvedStats.Medium + solvedStats.Hard,
                  accent: "from-amber-400 to-pink-500",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 p-4 bg-gradient-to-br from-white/5 to-white/0"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60">{stat.label}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold text-white">{stat.solved}</p>
                    <p className="text-lg text-white/50">/ {stat.value}</p>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${stat.accent} transition-all duration-500`}
                      style={{ width: `${stat.value > 0 ? (stat.solved / stat.value) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTROLS */}
        <section className="rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-5 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or category..."
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all border ${
                  difficulty === diff
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg"
                    : "border-white/10 text-white/70 hover:text-white hover:border-white/30"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </section>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_0.3fr] gap-8">
          <div className="space-y-4">
            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-10 text-center">
                <p className="text-lg text-white/70">Loading problems...</p>
              </div>
            ) : filteredProblems.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-10 text-center">
                <p className="text-lg text-white/70">
                  No problems found with the current filter. Try changing difficulty or search terms.
                </p>
              </div>
            ) : (
              filteredProblems.map((problem) => {
                const isSolved = solvedProblems.has(problem.id);
                return (
                  <div
                    key={problem.id}
                    className={`group rounded-3xl p-6 flex flex-col md:flex-row gap-6 border transition-all backdrop-blur-sm cursor-pointer ${
                      isSolved 
                        ? 'border-green-500/30 bg-green-500/5' 
                        : 'border-white/5 hover:border-blue-500/30 bg-slate-900/50'
                    }`}
                    onClick={() => setSelectedProblem(problem)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                          isSolved
                            ? 'bg-gradient-to-br from-green-500/80 to-emerald-500/80 shadow-green-500/30'
                            : 'bg-gradient-to-br from-blue-500/80 to-purple-500/80 shadow-blue-500/30'
                        }`}>
                          {isSolved ? (
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          ) : (
                            <Code2 className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <h2 className="text-2xl font-semibold flex items-center gap-2">
                            {problem.title}
                            {isSolved && (
                              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 font-semibold">
                                SOLVED
                              </span>
                            )}
                          </h2>
                          <p className="text-sm text-white/60 font-medium">{problem.category}</p>
                        </div>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">
                        {problem.description.slice(0, 180) + (problem.description.length > 180 ? '...' : '')}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.4em]">
                        <span className={`px-3 py-1 rounded-full border ${getDifficultyBadgeClass(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        <span className="px-3 py-1 rounded-full border border-white/10 text-white/70">
                          {problem.handlerFunction}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSolved(problem.id);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          isSolved
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                        }`}
                      >
                        {isSolved ? 'Mark Unsolved' : 'Mark Solved'}
                      </button>
                      <div className="flex items-center gap-2 text-blue-400 font-bold">
                        <span>{isSolved ? 'Review' : 'Start'}</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-5">
              <p className="text-sm tracking-[0.4em] uppercase text-white/60 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" /> curated focus
              </p>
              <h3 className="text-xl font-semibold mb-2">Recommended Sprint</h3>
              <p className="text-white/65 text-sm mb-4">
                2 Easy warm-ups, 1 Medium, finish with a system design prompt.
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2">• Array + Hashing</li>
                <li className="flex items-center gap-2">• Graph Traversal</li>
                <li className="flex items-center gap-2">• Behavioural recap</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-5">
              <p className="text-sm tracking-[0.4em] uppercase text-white/60 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" /> daily ritual
              </p>
              <p className="text-white/70 text-sm">
                Spend 45 mins focused deep work, review annotated solutions, then record a quick
                explanation video to sharpen storytelling.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-5">
              <p className="text-sm tracking-[0.4em] uppercase text-white/60 mb-3 flex items-center gap-2">
                <Wand2 className="w-4 h-4" /> tip
              </p>
              <p className="text-white/70 text-sm">
                Tag solved problems as <span className="text-blue-400 font-semibold">"teachable"</span>{" "}
                to surface them in mock interview playlists.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;