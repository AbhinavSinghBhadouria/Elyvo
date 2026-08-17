import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Building2, Clock, IndianRupee, Search, ArrowRight,
  Briefcase, Target, Sparkles, Filter, ChevronRight
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { COMPANIES } from "../data/companies";

const TYPE_FILTERS = ["All", "IT Services", "Product Engineering", "Consulting & IT"];

function CompaniesPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  useScrollReveal([query, typeFilter]);

  const filtered = useMemo(() => {
    return COMPANIES.filter((company) => {
      const matchesQuery =
        query.trim() === "" ||
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.fullName.toLowerCase().includes(query.toLowerCase());
      const matchesType = typeFilter === "All" || company.type === typeFilter;
      return matchesQuery && matchesType;
    });
  }, [query, typeFilter]);

  const getDifficultyStyle = (diff) => {
    switch (diff?.toLowerCase()) {
      case "easy–medium":
      case "easy-medium":
        return "badge-easy border";
      case "medium":
        return "badge-medium border";
      case "hard":
        return "badge-hard border";
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/20 border";
    }
  };

  return (
    <div className="min-h-screen mesh-bg bg-[var(--bg-main)] text-slate-100 page-enter">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Hero */}
        <header className="reveal text-center space-y-6 max-w-3xl mx-auto pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Building2 className="size-4 text-cyan-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Company Interview Guides
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Prepare for{" "}
            <span className="text-gradient-cyan">Top Companies</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Step-by-step interview processes for EPAM, TCS, Cognizant, LTIMindtree,
            Infosys, Wipro, Accenture & HCL — with curated practice problems.
          </p>
        </header>

        {/* Filters */}
        <section className="reveal flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {TYPE_FILTERS.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                  typeFilter === type
                    ? "bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "border-white/10 text-slate-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-cyan-500/40 text-sm"
            />
          </div>
        </section>

        {/* Stats */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Companies", value: COMPANIES.length, icon: Building2 },
            { label: "Interview Rounds", value: COMPANIES.reduce((a, c) => a + c.rounds.length, 0), icon: Target },
            { label: "Practice Problems", value: new Set(COMPANIES.flatMap((c) => c.problemIds)).size, icon: Briefcase },
            { label: "Avg. Process", value: "4 weeks", icon: Clock },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="premium-glass rounded-2xl p-5 flex items-center gap-4">
              <div className="size-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Icon className="size-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-2 py-20 text-center text-slate-500">
              No companies match your search.
            </div>
          ) : (
            filtered.map((company) => (
              <Link
                key={company.id}
                to={`/companies/${company.id}`}
                className="reveal group premium-glass premium-border-glow rounded-3xl p-7 hover-premium block"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className={`size-14 rounded-2xl bg-gradient-to-br ${company.accent} flex items-center justify-center shadow-lg`}>
                      <span className="text-sm font-black text-white">{company.logo}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {company.name}
                      </h2>
                      <p className="text-xs text-slate-500">{company.fullName}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getDifficultyStyle(company.difficulty)}`}>
                    {company.difficulty}
                  </span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-2">{company.overview}</p>

                {/* Mini process flow */}
                <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-1">
                  {company.rounds.map((round, idx) => (
                    <div key={round.name} className="flex items-center gap-1 shrink-0">
                      <div className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-medium text-slate-400">
                        {round.type.split(" ")[0]}
                      </div>
                      {idx < company.rounds.length - 1 && <ChevronRight className="size-3 text-slate-600 shrink-0" />}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="size-3.5 text-emerald-400" />
                    {company.avgPackage.split("(")[0].trim()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-3.5 text-cyan-400" />
                    {company.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="size-3.5 text-violet-400" />
                    {company.rounds.length} rounds
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-3.5 text-amber-400" />
                    {company.problemIds.length} problems
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {company.prepTopics.slice(0, 4).map((topic) => (
                    <span key={topic} className="text-[10px] font-medium text-slate-500 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs font-semibold text-slate-500">{company.type}</span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-cyan-400 group-hover:gap-3 transition-all">
                    View Process <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))
          )}
        </main>
      </div>
    </div>
  );
}

export default CompaniesPage;
