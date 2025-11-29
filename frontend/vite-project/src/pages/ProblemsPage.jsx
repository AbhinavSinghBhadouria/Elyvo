import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRightIcon,
  Code2Icon,
  ShieldIcon,
  TargetIcon,
  Wand2Icon,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { problemsApi } from "../api/problems";
import { getDifficultyBadgeClass } from "../lib/utils";

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const response = await problemsApi.getAllProblems();
        
        // Remove duplicates based on id - THIS FIXES THE KEY ERROR
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
  }, []);

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
    <div className="min-h-screen bg-[#03030b] text-white grid-overlay">
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-12 space-y-10">
        {/* HERO */}
        <section className="glass-panel rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute -top-32 right-0 w-96 h-96 bg-gradient-to-br from-primary to-accent opacity-30 blur-[140px]" />
          <div className="relative z-10 flex flex-col lg:flex-row gap-10 justify-between">
            <div className="space-y-5 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.6em] text-white/50 flex items-center gap-2">
                <span className="size-2 bg-primary rounded-full" />
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
                { label: "Total", value: problems.length, accent: "from-primary to-secondary" },
                { label: "Easy", value: difficultyStats.Easy, accent: "from-green-400 to-emerald-400" },
                {
                  label: "Medium+",
                  value: difficultyStats.Medium + difficultyStats.Hard,
                  accent: "from-amber-400 to-pink-500",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 p-4 bg-gradient-to-br from-white/5 to-white/0"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2 text-white">{stat.value}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10">
                    <div className={`h-full rounded-full bg-gradient-to-r ${stat.accent}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTROLS */}
        <section className="glass-panel rounded-3xl p-5 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or category..."
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-primary/50 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all border ${
                  difficulty === diff
                    ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-lg"
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
              <div className="glass-panel rounded-2xl p-10 text-center border border-white/10">
                <p className="text-lg text-white/70">Loading problems...</p>
              </div>
            ) : error ? (
              <div className="glass-panel rounded-2xl p-10 text-center border border-white/10">
                <p className="text-lg text-red-400">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80"
                >
                  Retry
                </button>
              </div>
            ) : filteredProblems.length === 0 ? (
              <div className="glass-panel rounded-2xl p-10 text-center border border-white/10">
                <p className="text-lg text-white/70">
                  No problems found with the current filter. Try changing difficulty or search terms.
                </p>
              </div>
            ) : (
              filteredProblems.map((problem) => (
                <Link
                  key={problem.id}
                  to={`/problem/${problem.id}`}
                  className="group glass-panel rounded-3xl p-6 flex flex-col md:flex-row gap-6 border border-white/5 hover:border-primary/30 transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-12 rounded-2xl bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center shadow-lg shadow-primary/30">
                        <Code2Icon className="size-6 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-2xl font-semibold">{problem.title}</h2>
                        <p className="text-sm text-white/60 font-medium">{problem.category}</p>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      {typeof problem.description === 'string' 
                        ? problem.description.slice(0, 180) + (problem.description.length > 180 ? '...' : '')
                        : problem.description?.text?.slice(0, 180) || "Interview prompt"}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.4em] text-white/50">
                      <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      <span className="badge badge-outline border-white/10 text-white/70">
                        {problem.handlerFunction}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-primary font-bold">
                    <span>Start</span>
                    <ChevronRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))
            )}
          </div>

          <aside className="space-y-4">
            <div className="glass-panel rounded-3xl p-5 border border-white/10">
              <p className="text-sm tracking-[0.4em] uppercase text-white/60 mb-3 flex items-center gap-2">
                <ShieldIcon className="size-4" /> curated focus
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

            <div className="glass-panel rounded-3xl p-5 border border-white/10">
              <p className="text-sm tracking-[0.4em] uppercase text-white/60 mb-3 flex items-center gap-2">
                <TargetIcon className="size-4" /> daily ritual
              </p>
              <p className="text-white/70 text-sm">
                Spend 45 mins focused deep work, review annotated solutions, then record a quick
                explanation video to sharpen storytelling.
              </p>
            </div>

            <div className="glass-panel rounded-3xl p-5 border border-white/10">
              <p className="text-sm tracking-[0.4em] uppercase text-white/60 mb-3 flex items-center gap-2">
                <Wand2Icon className="size-4" /> tip
              </p>
              <p className="text-white/70 text-sm">
                Tag solved problems as <span className="text-primary font-semibold">"teachable"</span>{" "}
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