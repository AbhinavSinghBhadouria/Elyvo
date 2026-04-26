import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Code2,
  Shield,
  Target,
  CheckCircle2,
  Search,
  Sparkles,
  Trophy,
  ArrowUpRight
} from "lucide-react";

import Navbar from "../components/Navbar";
import { problemsApi } from "../api/problems";

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("All");
  const [query, setQuery] = useState("");
  const [solvedProblems, setSolvedProblems] = useState(new Set());

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const response = await problemsApi.getAllProblems();
        const uniqueProblems = (response.problems || []).filter(
          (problem, index, self) =>
            index === self.findIndex(p => p.id === problem.id)
        );
        setProblems(uniqueProblems);
        setError(null);
      } catch (err) {
        setError("Failed to load problems. Please try again.");
        console.error("Error fetching problems:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();

    const saved = localStorage.getItem('solvedProblems');
    if (saved) {
      try {
        setSolvedProblems(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Error loading solved problems:', e);
      }
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-active");
                }
            });
        },
        { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  const toggleSolved = (problemId) => {
    const updated = new Set(solvedProblems);
    if (updated.has(problemId)) {
      updated.delete(problemId);
    } else {
      updated.add(problemId);
    }
    setSolvedProblems(updated);
    localStorage.setItem('solvedProblems', JSON.stringify([...updated]));
    window.dispatchEvent(new Event('solvedProblemsUpdated'));
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

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5';
      case 'medium': return 'text-blue-400 border-blue-400/20 bg-blue-400/5';
      case 'hard': return 'text-rose-400 border-rose-400/20 bg-rose-400/5';
      default: return 'text-slate-400 border-slate-400/20 bg-slate-400/5';
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 selection:bg-blue-500/30 font-inter">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* HERO SECTION */}
        <header className="reveal relative rounded-3xl border border-white/[0.05] bg-slate-900/20 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-slate-600/10 opacity-40" />
          
          <div className="relative z-10 grid lg:grid-cols-[1fr_350px] gap-12 p-10 md:p-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit">
                <Sparkles className="size-3.5 text-blue-400" />
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Curated Problem Set</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                Master the <br />
                <span className="text-slate-500 italic">Interview Process.</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-xl leading-relaxed font-medium">
                A high-quality collection of challenges designed for professional technical preparation and career growth.
              </p>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl hidden lg:block">
                <img src="/problems-hero.png" alt="Preparation" className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>
          </div>
        </header>

        {/* CONTROLS */}
        <section className="reveal flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                  difficulty === diff
                    ? "bg-white text-black border-white shadow-xl scale-105"
                    : "border-white/5 text-slate-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-[400px] group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search challenges..."
              className="w-full pl-12 pr-6 py-3 rounded-xl bg-white/5 border border-white/5 focus:outline-none focus:border-blue-500/40 text-sm transition-all font-medium"
            />
          </div>
        </section>

        {/* MAIN LIST */}
        <main className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <div className="space-y-6">
            {loading ? (
              <div className="h-[400px] flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/5 bg-white/[0.01]">
                  <div className="size-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
                  <p className="text-slate-600 font-medium text-sm animate-pulse">Loading challenges...</p>
              </div>
            ) : filteredProblems.length === 0 ? (
              <div className="h-[400px] flex items-center justify-center rounded-3xl border border-white/5 bg-white/[0.01]">
                 <p className="text-slate-600 font-medium text-sm">No challenges found matching your criteria</p>
              </div>
            ) : (
              filteredProblems.map((problem, i) => {
                const isSolved = solvedProblems.has(problem.id);
                return (
                  <div key={problem.id} className="reveal">
                    <Link
                        to={`/problem/${problem.id}`}
                        className={`group relative rounded-2xl p-8 border transition-all duration-300 block overflow-hidden ${
                        isSolved 
                            ? 'border-emerald-500/20 bg-emerald-500/[0.02]' 
                            : 'border-white/5 bg-slate-900/20 hover:bg-slate-900/40 hover:border-white/10'
                        }`}
                    >
                        <div className="flex items-center gap-8">
                        <div className={`size-16 rounded-2xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105 ${
                            isSolved 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                            : 'bg-white/5 border-white/10 text-slate-500 group-hover:text-white'
                        }`}>
                            {isSolved ? <CheckCircle2 className="size-8" /> : <Code2 className="size-8" />}
                        </div>

                        <div className="flex-1 space-y-3">
                            <div className="flex flex-wrap items-center gap-4">
                            <h2 className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">{problem.title}</h2>
                            <div className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${getDifficultyColor(problem.difficulty)}`}>
                                {problem.difficulty}
                            </div>
                            {isSolved && (
                                <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">Solved</span>
                            )}
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-1 max-w-xl font-medium">
                            {problem.description?.split('\n')[0] || "Advanced coding challenge for professional growth."}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                            {problem.tags?.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[10px] font-semibold text-slate-600 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 uppercase tracking-wider">#{tag}</span>
                            ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-4 shrink-0 ml-auto md:flex-row md:items-center">
                            <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleSolved(problem.id);
                            }}
                            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                                isSolved
                                ? 'border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10'
                                : 'border-white/10 text-slate-600 hover:text-white hover:bg-white/5'
                            }`}
                            >
                            {isSolved ? 'Reset' : 'Check'}
                            </button>
                            <ChevronRight className="size-6 text-slate-800 group-hover:text-blue-500 transition-colors" />
                        </div>
                        </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-8">
            <div className="reveal p-8 rounded-3xl border border-white/5 bg-slate-900/20 space-y-6 shadow-xl">
               <div className="flex items-center gap-3 text-blue-400">
                  <Target className="size-5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Recommended Path</span>
               </div>
               <h3 className="text-xl font-bold tracking-tight text-white">Focus Sequence</h3>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Follow this curated order to build foundational skills systematically.
               </p>
               <div className="space-y-3">
                  {problems.slice(0, 3).map(p => (
                    <Link key={p.id} to={`/problem/${p.id}`} className="p-4 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:border-blue-500/20 hover:text-white transition-all cursor-pointer flex items-center justify-between group">
                      {p.title}
                      <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                  {problems.length === 0 && (
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest text-center py-4">No recommendations yet</p>
                  )}
               </div>
            </div>

            <div className="reveal p-8 rounded-3xl border border-white/5 bg-[#050505] space-y-6 shadow-xl">
               <div className="flex items-center gap-3 text-slate-500">
                  <Shield className="size-5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Architect Tip</span>
               </div>
               <p className="text-base text-slate-400 font-medium leading-relaxed italic border-l-2 border-slate-800 pl-6">
                  "Clarity in code is clarity in thought. Optimize for readability first."
               </p>
            </div>
          </aside>
        </main>
      </div>

      <style>{`
        .reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
            opacity: 1;
            transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default ProblemsPage;