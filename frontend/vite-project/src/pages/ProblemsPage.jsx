import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, Code2, Shield, Target,
  CheckCircle2, Search, Sparkles, ArrowUpRight, Trophy, Zap
} from "lucide-react";
import Navbar from "../components/Navbar";
import { problemsApi } from "../api/problems";
import { progressApi } from "../api/progress";
import { PROBLEMS } from "../data/problems";

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];
const G  = "#D4AF37";
const GB = "#F5C518";

const DIFF_STYLE = {
  easy:   { color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.25)"  },
  medium: { color: "#D4AF37", bg: "rgba(212,175,55,0.08)",  border: "rgba(212,175,55,0.28)"  },
  hard:   { color: "#fb7185", bg: "rgba(251,113,133,0.08)", border: "rgba(251,113,133,0.25)" },
};

function DiffBadge({ diff }) {
  const s = DIFF_STYLE[diff?.toLowerCase()] || { color:"#94a3b8", bg:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.1)" };
  return (
    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest"
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>
      {diff}
    </span>
  );
}

function ProblemsPage() {
  const [problems, setProblems]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [difficulty, setDifficulty]       = useState("All");
  const [query, setQuery]                 = useState("");
  const [solvedProblems, setSolvedProblems] = useState(new Set());

  /* ── data fetch ────────────────────────────────────── */
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const res = await problemsApi.getAllProblems();
        let list = (res?.problems || []).filter(
          (p, i, self) => i === self.findIndex(x => x.id === p.id)
        );
        if (list.length === 0) list = PROBLEMS;
        setProblems(list);
      } catch {
        setProblems(PROBLEMS);
      } finally {
        setLoading(false);
      }
    };

    const fetchProgress = async () => {
      try {
        const { progress } = await progressApi.getUserProgress();
        const ids = (progress || []).filter(p => p.solved).map(p => p.problemId);
        setSolvedProblems(new Set(ids));
        localStorage.setItem("solvedProblems", JSON.stringify(ids));
        window.dispatchEvent(new Event("solvedProblemsUpdated"));
      } catch {
        const saved = localStorage.getItem("solvedProblems");
        if (saved) { try { setSolvedProblems(new Set(JSON.parse(saved))); } catch {} }
      }
    };

    fetchProblems();
    fetchProgress();
  }, []);

  /* ── toggle solved ─────────────────────────────────── */
  const toggleSolved = async (problemId) => {
    const updated = new Set(solvedProblems);
    const isNowSolved = !updated.has(problemId);
    isNowSolved ? updated.add(problemId) : updated.delete(problemId);
    setSolvedProblems(updated);
    const ids = [...updated];
    localStorage.setItem("solvedProblems", JSON.stringify(ids));
    window.dispatchEvent(new Event("solvedProblemsUpdated"));
    try { await progressApi.saveProblemProgress(problemId, { solved: isNowSolved }); } catch {}
  };

  /* ── computed ──────────────────────────────────────── */
  const diffStats = useMemo(() =>
    problems.reduce((acc, p) => { acc[p.difficulty] = (acc[p.difficulty] || 0) + 1; return acc; },
      { Easy: 0, Medium: 0, Hard: 0 }), [problems]);

  const solvedStats = useMemo(() => {
    const s = { total: 0, Easy: 0, Medium: 0, Hard: 0 };
    problems.forEach(p => { if (solvedProblems.has(p.id)) { s.total++; s[p.difficulty]++; } });
    return s;
  }, [problems, solvedProblems]);

  const filtered = useMemo(() =>
    problems.filter(p => {
      const okDiff  = difficulty === "All" || p.difficulty === difficulty;
      const q       = query.trim().toLowerCase();
      const okQuery = !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q));
      return okDiff && okQuery;
    }), [difficulty, problems, query]);

  /* ── render ────────────────────────────────────────── */
  return (
    <div className="min-h-screen text-slate-100" style={{ background: "var(--bg-main)" }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-5 py-12 space-y-10">

        {/* ═══════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════ */}
        <header
          className="relative rounded-3xl overflow-hidden"
          style={{ border: "1px solid rgba(212,175,55,0.16)", background: "rgba(13,13,22,0.85)" }}
        >
          {/* Gold shimmer */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(120deg, rgba(212,175,55,0.07) 0%, transparent 55%, rgba(212,175,55,0.03) 100%)" }} />
          {/* Glow orb */}
          <div style={{ position:"absolute", top:"-30%", right:"-10%", width:400, height:400, background:"rgba(212,175,55,0.08)", filter:"blur(100px)", borderRadius:"50%" }} />

          <div className="relative z-10 p-10 md:p-14">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              {/* Left copy */}
              <div className="space-y-6 max-w-xl">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                  style={{ background:"rgba(212,175,55,0.09)", border:"1px solid rgba(212,175,55,0.28)", color:G }}
                >
                  <Sparkles className="size-3.5" /> Curated Problem Set
                </div>

                <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-white">
                  Master the{" "}
                  <span className="text-gradient-gold">Interview.</span>
                </h1>

                <p className="text-slate-400 text-lg leading-relaxed">
                  A premium collection of coding challenges for professional technical preparation and career growth.
                </p>
              </div>

              {/* Right stats pills */}
              <div className="flex flex-wrap gap-4">
                {[
                  { label:"Total", value: problems.length, color:"#D4AF37" },
                  { label:"Solved", value: solvedStats.total, color:"#34d399" },
                  { label:"Easy",   value: diffStats.Easy,   color:"#34d399" },
                  { label:"Medium", value: diffStats.Medium, color:"#D4AF37" },
                  { label:"Hard",   value: diffStats.Hard,   color:"#fb7185" },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center px-5 py-4 rounded-2xl"
                    style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${stat.color}22` }}
                  >
                    <span className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            {problems.length > 0 && (
              <div className="mt-8 space-y-2">
                <div className="flex justify-between text-xs text-slate-500 font-semibold">
                  <span>Progress</span>
                  <span style={{ color:G }}>{solvedStats.total} / {problems.length} solved</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${problems.length > 0 ? (solvedStats.total / problems.length) * 100 : 0}%`,
                      background: `linear-gradient(90deg, ${G}, ${GB})`,
                      boxShadow: `0 0 12px rgba(212,175,55,0.35)`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ═══════════════════════════════════════════════
            CONTROLS
        ═══════════════════════════════════════════════ */}
        <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
          {/* Difficulty pills */}
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((d) => {
              const active = difficulty === d;
              const ds = DIFF_STYLE[d.toLowerCase()];
              return (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className="px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200"
                  style={
                    active
                      ? { background: ds ? ds.bg : "rgba(212,175,55,0.14)", color: ds ? ds.color : G, border: `1px solid ${ds ? ds.border : "rgba(212,175,55,0.40)"}`, boxShadow: ds ? `0 0 14px ${ds.border}` : `0 0 14px rgba(212,175,55,0.20)` }
                      : { background: "rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", color:"#64748b" }
                  }
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-[420px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 transition-colors" style={{ color: query ? G : "#475569" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problems or company (#EPAM, #TCS)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none"
              style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(212,175,55,0.18)", color:"#f1f5f9" }}
            />
            {query && (
              <button onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-rose-400 hover:text-rose-300">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Company quick filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mr-1">Company:</span>
          {["EPAM", "TCS", "Cognizant", "LTIMindtree", "Infosys", "Wipro", "Accenture"].map((c) => {
            const active = query.toLowerCase() === c.toLowerCase();
            return (
              <button
                key={c}
                onClick={() => setQuery(active ? "" : c)}
                className="px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200"
                style={
                  active
                    ? { background:"rgba(212,175,55,0.14)", color:G, border:"1px solid rgba(212,175,55,0.40)" }
                    : { background:"rgba(255,255,255,0.03)", border:"1px solid rgba(212,175,55,0.10)", color:"#64748b" }
                }
              >
                #{c}
              </button>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════
            MAIN GRID
        ═══════════════════════════════════════════════ */}
        <main className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

          {/* Problem List */}
          <div className="space-y-3">
            {loading ? (
              <div
                className="h-80 flex flex-col items-center justify-center gap-5 rounded-3xl"
                style={{ border:"1px solid rgba(212,175,55,0.10)", background:"rgba(255,255,255,0.01)" }}
              >
                <div className="spinner" />
                <p className="text-slate-500 text-sm animate-pulse font-medium">Loading challenges...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="h-64 flex flex-col items-center justify-center gap-3 rounded-3xl"
                style={{ border:"1px solid rgba(212,175,55,0.10)", background:"rgba(255,255,255,0.01)" }}
              >
                <Sparkles className="size-8 text-slate-600" />
                <p className="text-slate-500 text-sm font-medium">No challenges match your criteria</p>
                <button onClick={() => { setQuery(""); setDifficulty("All"); }}
                  className="text-xs font-bold underline underline-offset-2" style={{ color:G }}>
                  Reset filters
                </button>
              </div>
            ) : (
              filtered.map((problem, idx) => {
                const solved = solvedProblems.has(problem.id);
                return (
                  <div key={problem.id} className="group relative">
                    <Link
                      to={`/problem/${problem.id}`}
                      className="block rounded-2xl p-6 transition-all duration-250"
                      style={{
                        background: solved ? "rgba(52,211,153,0.04)" : "rgba(255,255,255,0.025)",
                        border: solved ? "1px solid rgba(52,211,153,0.22)" : "1px solid rgba(212,175,55,0.09)",
                      }}
                      onMouseEnter={(e) => {
                        if (!solved) {
                          e.currentTarget.style.background = "rgba(212,175,55,0.05)";
                          e.currentTarget.style.borderColor = "rgba(212,175,55,0.28)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = solved ? "rgba(52,211,153,0.04)" : "rgba(255,255,255,0.025)";
                        e.currentTarget.style.borderColor = solved ? "rgba(52,211,153,0.22)" : "rgba(212,175,55,0.09)";
                      }}
                    >
                      <div className="flex items-center gap-5">
                        {/* Row number / solved icon */}
                        <div
                          className="size-12 rounded-xl flex items-center justify-center shrink-0 font-black text-sm transition-transform duration-200 group-hover:scale-110"
                          style={{
                            background: solved ? "rgba(52,211,153,0.12)" : "rgba(212,175,55,0.07)",
                            border: solved ? "1px solid rgba(52,211,153,0.25)" : "1px solid rgba(212,175,55,0.20)",
                            color: solved ? "#34d399" : G,
                          }}
                        >
                          {solved ? <CheckCircle2 className="size-6" /> : <span>{idx + 1}</span>}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex flex-wrap items-center gap-3">
                            <h2
                              className="text-lg font-bold text-white transition-colors duration-200 group-hover:text-[#F5C518] truncate"
                            >
                              {problem.title}
                            </h2>
                            <DiffBadge diff={problem.difficulty} />
                            {solved && (
                              <span
                                className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg"
                                style={{ color:"#34d399", background:"rgba(52,211,153,0.10)", border:"1px solid rgba(52,211,153,0.22)" }}
                              >✓ Solved</span>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm line-clamp-1">
                            {problem.description?.split("\n")[0] || "Advanced coding challenge for professional growth."}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {problem.tags?.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wide"
                                style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.07)", color:"#94a3b8" }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSolved(problem.id); }}
                            className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200"
                            style={
                              solved
                                ? { color:"#34d399", border:"1px solid rgba(52,211,153,0.25)", background:"rgba(52,211,153,0.06)" }
                                : { color:"#64748b", border:"1px solid rgba(212,175,55,0.15)", background:"rgba(212,175,55,0.04)" }
                            }
                          >
                            {solved ? "Solved ✓" : "Mark"}
                          </button>
                          <ChevronRight
                            className="size-5 transition-all duration-200 group-hover:translate-x-1"
                            style={{ color: G, opacity: 0.7 }}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            )}

            {/* Count footer */}
            {!loading && filtered.length > 0 && (
              <p className="text-center text-xs text-slate-600 pt-2 font-medium">
                Showing {filtered.length} of {problems.length} problems
              </p>
            )}
          </div>

          {/* ── SIDEBAR ──────────────────────────────── */}
          <aside className="space-y-6">

            {/* Focus Sequence */}
            <div
              className="p-7 rounded-3xl space-y-5"
              style={{ background:"rgba(13,13,22,0.85)", border:"1px solid rgba(212,175,55,0.14)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="size-9 rounded-xl flex items-center justify-center"
                  style={{ background:"rgba(212,175,55,0.10)", border:"1px solid rgba(212,175,55,0.22)" }}
                >
                  <Target className="size-4" style={{ color:G }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:G }}>Recommended Path</p>
                  <h3 className="text-base font-bold text-white">Focus Sequence</h3>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Follow this curated order to build foundational skills systematically.
              </p>

              <div className="space-y-2">
                {problems.slice(0, 5).map((p, i) => (
                  <Link
                    key={p.id}
                    to={`/problem/${p.id}`}
                    className="group/link flex items-center justify-between p-3 rounded-xl transition-all duration-200"
                    style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(212,175,55,0.07)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.28)"; e.currentTarget.style.background = "rgba(212,175,55,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="size-5 rounded-md flex items-center justify-center text-[9px] font-black shrink-0"
                        style={{ background:"rgba(212,175,55,0.12)", color:G }}
                      >{i + 1}</span>
                      <span className="text-xs font-semibold text-slate-400 group-hover/link:text-white transition-colors truncate">{p.title}</span>
                    </div>
                    <ArrowUpRight className="size-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0" style={{ color:G }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Progress by Difficulty */}
            <div
              className="p-7 rounded-3xl space-y-5"
              style={{ background:"rgba(13,13,22,0.85)", border:"1px solid rgba(212,175,55,0.14)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="size-9 rounded-xl flex items-center justify-center"
                  style={{ background:"rgba(212,175,55,0.10)", border:"1px solid rgba(212,175,55,0.22)" }}
                >
                  <Trophy className="size-4" style={{ color:G }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:G }}>Your Progress</p>
                  <h3 className="text-base font-bold text-white">By Difficulty</h3>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label:"Easy",   solved: solvedStats.Easy,   total: diffStats.Easy,   color:"#34d399", track:"rgba(52,211,153,0.12)" },
                  { label:"Medium", solved: solvedStats.Medium, total: diffStats.Medium, color:G,          track:"rgba(212,175,55,0.12)" },
                  { label:"Hard",   solved: solvedStats.Hard,   total: diffStats.Hard,   color:"#fb7185",  track:"rgba(251,113,133,0.12)" },
                ].map(({ label, solved, total, color, track }) => (
                  <div key={label} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span style={{ color }}>{label}</span>
                      <span className="text-slate-500">{solved}/{total}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: track }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: total > 0 ? `${(solved/total)*100}%` : "0%", background: color, boxShadow:`0 0 8px ${color}60` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote card */}
            <div
              className="p-7 rounded-3xl space-y-4"
              style={{ background:"rgba(212,175,55,0.04)", border:"1px solid rgba(212,175,55,0.14)" }}
            >
              <div className="flex items-center gap-2.5">
                <Zap className="size-4" style={{ color:G }} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color:G }}>Engineer's Tip</span>
              </div>
              <p
                className="text-sm text-slate-300 leading-relaxed italic pl-4"
                style={{ borderLeft: `2px solid rgba(212,175,55,0.35)` }}
              >
                "Clarity in code is clarity in thought. Optimize for readability first."
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default ProblemsPage;