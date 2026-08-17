import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Building2, Clock, IndianRupee, Search, ArrowRight,
  Briefcase, Target, Sparkles, Filter, ChevronRight
} from "lucide-react";
import Navbar from "../components/Navbar";
import { COMPANIES } from "../data/companies";

/* ─── Inline SVG company logos ─────────────────────────── */
function CompanyLogo({ id, size = 56 }) {
  const logos = {
    tcs: (
      <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.6} height={size * 0.64}>
        <text x="50" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="26" fill="#0066CC">TCS</text>
      </svg>
    ),
    cognizant: (
      <svg viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg" width={size * 1.8} height={size * 0.75}>
        <circle cx="20" cy="25" r="10" fill="#1562A7"/>
        <circle cx="36" cy="25" r="10" fill="#1562A7" opacity="0.7"/>
        <text x="55" y="31" fontFamily="Arial" fontWeight="700" fontSize="16" fill="#1562A7">cognizant</text>
      </svg>
    ),
    epam: (
      <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.6} height={size * 0.64}>
        <text x="50" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="24" fill="#39FF14">EPAM</text>
      </svg>
    ),
    ltim: (
      <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.8} height={size * 0.64}>
        <text x="10" y="28" fontFamily="Arial" fontWeight="900" fontSize="18" fill="#004B87">LTIMindtree</text>
      </svg>
    ),
    infosys: (
      <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.6} height={size * 0.64}>
        <text x="50" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="18" fill="#007CC3">Infosys</text>
      </svg>
    ),
    wipro: (
      <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.6} height={size * 0.64}>
        <circle cx="12" cy="22" r="8" fill="#341C53"/>
        <text x="28" y="28" fontFamily="Arial" fontWeight="900" fontSize="18" fill="#341C53">WIPRO</text>
      </svg>
    ),
    accenture: (
      <svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.9} height={size * 0.64}>
        <polygon points="6,34 14,10 22,34" fill="#A100FF"/>
        <text x="30" y="30" fontFamily="Arial" fontWeight="700" fontSize="16" fill="#A100FF">Accenture</text>
      </svg>
    ),
    hcl: (
      <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.6} height={size * 0.64}>
        <rect x="4" y="8" width="6" height="24" rx="2" fill="#0072CE"/>
        <rect x="4" y="18" width="18" height="5" rx="2" fill="#0072CE"/>
        <rect x="16" y="8" width="6" height="24" rx="2" fill="#0072CE"/>
        <text x="34" y="28" fontFamily="Arial" fontWeight="900" fontSize="18" fill="#0072CE">Tech</text>
      </svg>
    ),
  };
  return logos[id] || (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <text x="50%" y="60%" textAnchor="middle" fontWeight="900" fontSize="20" fill="#D4AF37">
        {id?.slice(0, 3).toUpperCase()}
      </text>
    </svg>
  );
}

const TYPE_FILTERS = ["All", "IT Services", "Product Engineering", "Consulting & IT"];

function CompaniesPage() {
  const [query, setQuery]       = useState("");
  const [typeFilter, setType]   = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COMPANIES.filter((c) => {
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.fullName.toLowerCase().includes(q);
      const matchT = typeFilter === "All" || c.type === typeFilter;
      return matchQ && matchT;
    });
  }, [query, typeFilter]);

  const diffStyle = (d = "") => {
    const dl = d.toLowerCase();
    if (dl.includes("hard")) return "badge-hard border";
    if (dl.includes("easy")) return "badge-easy border";
    return "badge-medium border";
  };

  const GOLD = "#D4AF37";

  return (
    <div className="min-h-screen mesh-bg text-slate-100" style={{ background: "var(--bg-main)" }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-5 py-12 space-y-12">

        {/* ── Hero ─────────────────────────────────────────── */}
        <header className="text-center space-y-5 max-w-3xl mx-auto pt-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(212,175,55,0.08)", borderColor: "rgba(212,175,55,0.25)", color: GOLD }}
          >
            <Building2 className="size-4" />
            Company Interview Guides
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Crack Your{" "}
            <span className="text-gradient-gold">Dream Company</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed">
            Detailed interview breakdowns for EPAM, TCS, Cognizant, LTIMindtree,
            Infosys, Wipro, Accenture & HCL — with curated practice problems.
          </p>
        </header>

        {/* ── Stats strip ─────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Companies",        value: COMPANIES.length,                                      icon: Building2 },
            { label: "Interview Rounds", value: COMPANIES.reduce((a, c) => a + c.rounds.length, 0),  icon: Target },
            { label: "Practice Problems",value: new Set(COMPANIES.flatMap((c) => c.problemIds)).size, icon: Briefcase },
            { label: "Avg. Process",     value: "4 weeks",                                             icon: Clock },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="premium-glass rounded-2xl p-5 flex items-center gap-4 border"
              style={{ borderColor: "rgba(212,175,55,0.15)" }}
            >
              <div
                className="size-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(212,175,55,0.10)" }}
              >
                <Icon className="size-5" style={{ color: GOLD }} />
              </div>
              <div>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters ─────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {TYPE_FILTERS.map((type) => (
              <button
                key={type}
                onClick={() => setType(type)}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-200"
                style={
                  typeFilter === type
                    ? { background: "var(--gold)", color: "#09090f", borderColor: "var(--gold)", boxShadow: "0 4px 18px rgba(212,175,55,0.30)" }
                    : { background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)", color: "#94a3b8" }
                }
              >
                {type}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies..."
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.18)",
                color: "#f1f5f9",
              }}
            />
          </div>
        </div>

        {/* ── Company Grid ────────────────────────────────── */}
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
                className="group premium-glass rounded-3xl p-7 block transition-all duration-300 hover-premium"
                style={{ border: "1px solid rgba(212,175,55,0.12)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)";
                  e.currentTarget.style.boxShadow   = "0 24px 48px -12px rgba(0,0,0,0.6), 0 0 28px -4px rgba(212,175,55,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)";
                  e.currentTarget.style.boxShadow   = "";
                }}
              >
                {/* Header row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    {/* Logo badge */}
                    <div
                      className="size-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(212,175,55,0.20)",
                        boxShadow: "0 0 20px rgba(212,175,55,0.08)",
                      }}
                    >
                      <CompanyLogo id={company.id} size={48} />
                    </div>
                    <div>
                      <h2
                        className="text-xl font-bold text-white transition-colors duration-200"
                        style={{ color: "white" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#F5C518"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "white"}
                      >
                        {company.name}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">{company.fullName}</p>
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-wider mt-1 px-2 py-0.5 rounded-md"
                        style={{ background: "rgba(212,175,55,0.08)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.2)" }}
                      >
                        {company.type}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${diffStyle(company.difficulty)}`}>
                    {company.difficulty}
                  </span>
                </div>

                {/* Overview */}
                <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-2">{company.overview}</p>

                {/* Process flow */}
                <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-1">
                  {company.rounds.map((round, idx) => (
                    <div key={round.name} className="flex items-center gap-1 shrink-0">
                      <div
                        className="px-2.5 py-1 rounded-lg text-[10px] font-semibold"
                        style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.15)", color: "#D4AF37" }}
                      >
                        {round.type.split(" ")[0]}
                      </div>
                      {idx < company.rounds.length - 1 && (
                        <ChevronRight className="size-3 shrink-0" style={{ color: "#D4AF37", opacity: 0.4 }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Meta info */}
                <div className="grid grid-cols-2 gap-3 mb-5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="size-3.5 text-emerald-400" />
                    {company.avgPackage.split("(")[0].trim()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-3.5" style={{ color: GOLD }} />
                    {company.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="size-3.5" style={{ color: GOLD }} />
                    {company.rounds.length} rounds
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-3.5 text-amber-400" />
                    {company.problemIds.length} problems
                  </div>
                </div>

                {/* Prep tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {company.prepTopics.slice(0, 4).map((topic) => (
                    <span
                      key={topic}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#94a3b8" }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className="flex items-center justify-end pt-4 border-t"
                  style={{ borderColor: "rgba(212,175,55,0.10)" }}
                >
                  <span
                    className="flex items-center gap-2 text-sm font-bold transition-all duration-200"
                    style={{ color: GOLD }}
                  >
                    View Full Process <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
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
