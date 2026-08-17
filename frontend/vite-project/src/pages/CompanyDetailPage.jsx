import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Clock, IndianRupee,
  Lightbulb, Code2, CheckCircle2, BookOpen, Target
} from "lucide-react";
import Navbar from "../components/Navbar";
import { getCompanyById, COMPANIES } from "../data/companies";
import { PROBLEMS } from "../data/problems";

/* ─── Inline SVG company logos (same helper as CompaniesPage) ─ */
function CompanyLogo({ id, size = 56 }) {
  const logos = {
    tcs: (
      <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.5} height={size * 0.6}>
        <text x="50" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="28" fill="#0066CC">TCS</text>
      </svg>
    ),
    cognizant: (
      <svg viewBox="0 0 130 50" xmlns="http://www.w3.org/2000/svg" width={size * 1.8} height={size * 0.7}>
        <circle cx="20" cy="25" r="10" fill="#1562A7"/>
        <circle cx="36" cy="25" r="10" fill="#1562A7" opacity="0.65"/>
        <text x="54" y="31" fontFamily="Arial" fontWeight="700" fontSize="16" fill="#1562A7">cognizant</text>
      </svg>
    ),
    epam: (
      <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.5} height={size * 0.6}>
        <text x="50" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="24" fill="#39FF14">EPAM</text>
      </svg>
    ),
    ltim: (
      <svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.8} height={size * 0.6}>
        <text x="5" y="28" fontFamily="Arial" fontWeight="900" fontSize="19" fill="#004B87">LTIMindtree</text>
      </svg>
    ),
    infosys: (
      <svg viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.6} height={size * 0.6}>
        <text x="55" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="19" fill="#007CC3">Infosys</text>
      </svg>
    ),
    wipro: (
      <svg viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.6} height={size * 0.6}>
        <circle cx="12" cy="22" r="8" fill="#341C53"/>
        <text x="28" y="28" fontFamily="Arial" fontWeight="900" fontSize="19" fill="#341C53">WIPRO</text>
      </svg>
    ),
    accenture: (
      <svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" width={size * 2} height={size * 0.6}>
        <polygon points="6,34 14,10 22,34" fill="#A100FF"/>
        <text x="30" y="30" fontFamily="Arial" fontWeight="700" fontSize="17" fill="#A100FF">Accenture</text>
      </svg>
    ),
    hcl: (
      <svg viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg" width={size * 1.6} height={size * 0.6}>
        <rect x="4" y="8" width="6" height="24" rx="2" fill="#0072CE"/>
        <rect x="4" y="18" width="18" height="5" rx="2" fill="#0072CE"/>
        <rect x="16" y="8" width="6" height="24" rx="2" fill="#0072CE"/>
        <text x="34" y="28" fontFamily="Arial" fontWeight="900" fontSize="19" fill="#0072CE">Tech</text>
      </svg>
    ),
  };
  return logos[id] || (
    <span style={{ fontWeight: 900, fontSize: size * 0.4, color: "#D4AF37" }}>{id?.slice(0,4).toUpperCase()}</span>
  );
}

const GOLD = "#D4AF37";
const GOLD_BRIGHT = "#F5C518";

function getRoundAccent(type = "") {
  const t = type.toLowerCase();
  if (t.includes("coding") || t.includes("assessment")) return { border: "rgba(59,130,246,0.25)", bg: "rgba(59,130,246,0.04)", badge: "#3b82f6" };
  if (t.includes("technical"))                           return { border: "rgba(139,92,246,0.25)", bg: "rgba(139,92,246,0.04)", badge: "#8b5cf6" };
  if (t.includes("hr"))                                  return { border: "rgba(16,185,129,0.25)", bg: "rgba(16,185,129,0.04)", badge: "#10b981" };
  if (t.includes("aptitude"))                            return { border: "rgba(245,158,11,0.25)", bg: "rgba(245,158,11,0.04)", badge: "#f59e0b" };
  return { border: "rgba(255,255,255,0.08)", bg: "rgba(255,255,255,0.02)", badge: "#94a3b8" };
}

function CompanyDetailPage() {
  const { id } = useParams();
  const company = getCompanyById(id);
  if (!company) return <Navigate to="/companies" replace />;

  const practiceProblems = company.problemIds
    .map((pid) => PROBLEMS.find((p) => p.id === pid))
    .filter(Boolean);

  return (
    <div className="min-h-screen text-slate-100" style={{ background: "var(--bg-main)" }}>
      <Navbar />

      <div className="max-w-4xl mx-auto px-5 py-12 space-y-12">

        {/* ── Back link ──────────────────────────────────── */}
        <Link
          to="/companies"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          style={{ color: "#94a3b8" }}
          onMouseEnter={(e) => e.currentTarget.style.color = GOLD_BRIGHT}
          onMouseLeave={(e) => e.currentTarget.style.color = "#94a3b8"}
        >
          <ArrowLeft className="size-4" /> All Companies
        </Link>

        {/* ── Company header ─────────────────────────────── */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Logo badge */}
            <div
              className="size-24 rounded-3xl flex items-center justify-center shrink-0 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(212,175,55,0.25)`,
                boxShadow: `0 0 30px rgba(212,175,55,0.12)`,
              }}
            >
              <CompanyLogo id={company.id} size={64} />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                {company.fullName}
              </h1>
              <div className="flex flex-wrap gap-2 items-center">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider"
                  style={{ background: "rgba(212,175,55,0.10)", color: GOLD, border: "1px solid rgba(212,175,55,0.25)" }}
                >
                  {company.type}
                </span>
                <span className="text-slate-500 text-sm">·</span>
                <span className="text-slate-400 text-sm">{company.difficulty} difficulty</span>
              </div>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed">{company.overview}</p>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: IndianRupee, label: "Package",  value: company.avgPackage, color: "#10b981" },
              { icon: Clock,       label: "Timeline", value: company.duration,   color: GOLD },
              { icon: Target,      label: "Rounds",   value: `${company.rounds.length} stages`, color: "#8b5cf6" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="premium-glass rounded-2xl p-5 flex items-center gap-3"
                style={{ border: "1px solid rgba(212,175,55,0.12)" }}
              >
                <div
                  className="size-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}15` }}
                >
                  <Icon className="size-5" style={{ color }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
                  <p className="text-sm font-bold text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Interview Process ─────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold flex items-center gap-3" style={{ color: "white" }}>
            <BookOpen className="size-5" style={{ color: GOLD }} />
            Interview Process
          </h2>

          <div className="space-y-4">
            {company.rounds.map((round, idx) => {
              const accent = getRoundAccent(round.type);
              return (
                <div
                  key={round.name}
                  className="rounded-2xl p-6"
                  style={{ border: `1px solid ${accent.border}`, background: accent.bg }}
                >
                  <div className="flex items-start gap-4">
                    {/* Step number */}
                    <div
                      className="size-10 rounded-xl flex items-center justify-center shrink-0 font-black text-sm"
                      style={{ background: `${accent.badge}20`, color: accent.badge, border: `1px solid ${accent.badge}40` }}
                    >
                      {idx + 1}
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold text-white">{round.name}</h3>
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg"
                          style={{ background: `${accent.badge}15`, color: accent.badge, border: `1px solid ${accent.badge}30` }}
                        >
                          {round.type}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="size-3" /> {round.duration}
                        </span>
                      </div>

                      {/* Topics */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Topics Covered</p>
                        <div className="flex flex-wrap gap-2">
                          {round.topics.map((topic) => (
                            <span
                              key={topic}
                              className="text-xs px-3 py-1.5 rounded-lg"
                              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#cbd5e1" }}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tip */}
                      <div
                        className="flex items-start gap-3 p-4 rounded-xl"
                        style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)" }}
                      >
                        <Lightbulb className="size-4 shrink-0 mt-0.5" style={{ color: GOLD_BRIGHT }} />
                        <p className="text-sm text-slate-400 leading-relaxed">{round.tips}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Common Questions ───────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-3 text-white">
            <CheckCircle2 className="size-5 text-emerald-400" />
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {company.commonQuestions.map((q) => (
              <div
                key={q}
                className="p-4 rounded-xl text-sm"
                style={{
                  background: "rgba(212,175,55,0.04)",
                  border: "1px solid rgba(212,175,55,0.12)",
                  color: "#cbd5e1",
                }}
              >
                <span style={{ color: GOLD, marginRight: "8px" }}>Q.</span>
                {q}
              </div>
            ))}
          </div>
        </section>

        {/* ── Practice Problems ──────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-3 text-white">
            <Code2 className="size-5" style={{ color: GOLD }} />
            Curated Practice Problems
          </h2>
          <div className="space-y-3">
            {practiceProblems.length > 0 ? (
              practiceProblems.map((problem) => (
                <Link
                  key={problem.id}
                  to={`/problem/${problem.id}`}
                  className="group flex items-center justify-between p-5 rounded-2xl transition-all duration-200"
                  style={{
                    background: "rgba(212,175,55,0.03)",
                    border: "1px solid rgba(212,175,55,0.10)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(212,175,55,0.07)";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.28)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(212,175,55,0.03)";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.10)";
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="size-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(212,175,55,0.10)" }}
                    >
                      <Code2 className="size-5" style={{ color: GOLD }} />
                    </div>
                    <div>
                      <p className="font-bold text-white">{problem.title}</p>
                      <p className="text-xs text-slate-500">{problem.category} · {problem.difficulty}</p>
                    </div>
                  </div>
                  <ArrowRight className="size-5 text-slate-600 group-hover:translate-x-1 transition-transform duration-200" style={{ color: GOLD }} />
                </Link>
              ))
            ) : (
              <p className="text-slate-500 text-sm">Practice problems coming soon.</p>
            )}
          </div>
          <Link
            to="/problems"
            className="inline-flex items-center gap-2 text-sm font-bold mt-2 transition-colors"
            style={{ color: GOLD }}
            onMouseEnter={(e) => e.currentTarget.style.color = GOLD_BRIGHT}
            onMouseLeave={(e) => e.currentTarget.style.color = GOLD}
          >
            Browse all problems <ArrowRight className="size-4" />
          </Link>
        </section>

        {/* ── Also Prepare For ───────────────────────────── */}
        <section
          className="space-y-4 pt-8 border-t"
          style={{ borderColor: "rgba(212,175,55,0.10)" }}
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Also prepare for
          </h2>
          <div className="flex flex-wrap gap-3">
            {COMPANIES.filter((c) => c.id !== company.id)
              .slice(0, 5)
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/companies/${c.id}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
                  style={{
                    background: "rgba(212,175,55,0.06)",
                    border: "1px solid rgba(212,175,55,0.18)",
                    color: "#94a3b8",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = GOLD;
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.40)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#94a3b8";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.18)";
                  }}
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CompanyDetailPage;
