import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  IndianRupee,
  Lightbulb,
  Code2,
  CheckCircle2,
  BookOpen,
  Target
} from "lucide-react";
import Navbar from "../components/Navbar";
import { getCompanyById, COMPANIES } from "../data/companies";
import { PROBLEMS } from "../data/problems";

function CompanyDetailPage() {
  const { id } = useParams();
  const company = getCompanyById(id);

  if (!company) {
    return <Navigate to="/companies" replace />;
  }

  const practiceProblems = company.problemIds
    .map((pid) => PROBLEMS.find((p) => p.id === pid))
    .filter(Boolean);

  const getRoundColor = (type) => {
    switch (type?.toLowerCase()) {
      case "coding":
      case "online assessment":
        return "border-blue-500/30 bg-blue-500/5";
      case "technical":
        return "border-violet-500/30 bg-violet-500/5";
      case "hr":
        return "border-emerald-500/30 bg-emerald-500/5";
      case "aptitude + coding":
      case "aptitude + technical mcq":
      case "aptitude + technical":
        return "border-amber-500/30 bg-amber-500/5";
      default:
        return "border-white/10 bg-white/[0.02]";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-slate-100 page-enter">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Back + Header */}
        <div className="space-y-8">
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-4" />
            All Companies
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div
              className={`size-20 rounded-3xl bg-gradient-to-br ${company.accent} flex items-center justify-center shadow-2xl shrink-0`}
            >
              <span className="text-xl font-black text-white">{company.logo}</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                {company.fullName}
              </h1>
              <p className="text-slate-400">{company.type} · {company.difficulty} difficulty</p>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed">{company.overview}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="premium-glass rounded-2xl p-5 flex items-center gap-3">
              <IndianRupee className="size-5 text-emerald-400" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Package</p>
                <p className="text-sm font-bold text-white">{company.avgPackage}</p>
              </div>
            </div>
            <div className="premium-glass rounded-2xl p-5 flex items-center gap-3">
              <Clock className="size-5 text-blue-400" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Timeline</p>
                <p className="text-sm font-bold text-white">{company.duration}</p>
              </div>
            </div>
            <div className="premium-glass rounded-2xl p-5 flex items-center gap-3">
              <Target className="size-5 text-violet-400" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Rounds</p>
                <p className="text-sm font-bold text-white">{company.rounds.length} stages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interview Process Timeline */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="size-5 text-violet-400" />
            <h2 className="text-xl font-bold text-white">Interview Process</h2>
          </div>

          <div className="space-y-4">
            {company.rounds.map((round, idx) => (
              <div
                key={round.name}
                className={`rounded-2xl border p-6 ${getRoundColor(round.type)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 font-black text-sm text-white">
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold text-white">{round.name}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-white/5 text-slate-400 border border-white/10">
                        {round.type}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="size-3" /> {round.duration}
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                        Topics Covered
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {round.topics.map((topic) => (
                          <span
                            key={topic}
                            className="text-xs text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                      <Lightbulb className="size-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-400 leading-relaxed">{round.tips}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Questions */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <CheckCircle2 className="size-5 text-emerald-400" />
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {company.commonQuestions.map((q) => (
              <div
                key={q}
                className="premium-glass rounded-xl p-4 text-sm text-slate-300 border border-white/5"
              >
                {q}
              </div>
            ))}
          </div>
        </section>

        {/* Practice Problems */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <Code2 className="size-5 text-blue-400" />
            Curated Practice Problems
          </h2>
          <div className="space-y-3">
            {practiceProblems.length > 0 ? (
              practiceProblems.map((problem) => (
                <Link
                  key={problem.id}
                  to={`/problem/${problem.id}`}
                  className="group flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Code2 className="size-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white group-hover:text-blue-400 transition-colors">
                        {problem.title}
                      </p>
                      <p className="text-xs text-slate-500">{problem.category} · {problem.difficulty}</p>
                    </div>
                  </div>
                  <ArrowRight className="size-5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                </Link>
              ))
            ) : (
              <p className="text-slate-500 text-sm">Practice problems coming soon.</p>
            )}
          </div>
          <Link
            to="/problems"
            className="inline-flex items-center gap-2 text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors mt-2"
          >
            Browse all problems
            <ArrowRight className="size-4" />
          </Link>
        </section>

        {/* Other companies */}
        <section className="space-y-4 pt-8 border-t border-white/5">
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
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-violet-500/30 transition-all"
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
