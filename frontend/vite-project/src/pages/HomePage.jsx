import { Link } from "react-router-dom";
import { SignInButton } from "@clerk/clerk-react";
import {
  ArrowRight, Video, Code, Users, Zap, Sparkles, Globe,
  Monitor, ShieldCheck, Activity, Building2, Clock, IndianRupee,
  BookOpen, Target, ChevronRight, CheckCircle2
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Logo from "../components/Logo";
import { COMPANIES } from "../data/companies";

const FEATURED_COMPANIES = COMPANIES.filter((c) =>
  ["epam", "tcs", "cognizant", "ltim"].includes(c.id)
);

const FEATURES = [
  { icon: Code, title: "84+ Coding Problems", desc: "Curated DSA challenges with test cases" },
  { icon: Video, title: "Live Interview Rooms", desc: "HD video, chat & shared code editor" },
  { icon: Building2, title: "Company Prep Guides", desc: "Interview processes for top IT firms" },
  { icon: Sparkles, title: "AI Co-Pilot", desc: "Smart hints and code review powered by AI" },
  { icon: Globe, title: "5 Languages", desc: "JavaScript, Python, Java, C++, C" },
  { icon: ShieldCheck, title: "Progress Tracking", desc: "Track solved problems and session history" },
];

function HomePage() {
  useScrollReveal();

  return (
    <div className="min-h-screen mesh-bg bg-[var(--bg-main)] text-slate-100 custom-scrollbar overflow-x-hidden">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[20%] w-[800px] h-[800px] bg-cyan-500/[0.06] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-violet-600/[0.05] blur-[140px] rounded-full" />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 bg-[var(--bg-main)]/70 backdrop-blur-2xl border-b border-white/[0.05]">
        <Link to="/"><Logo /></Link>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Features", href: "#features" },
            { label: "Companies", href: "#companies" },
            { label: "Problems", href: "/problems" },
            { label: "About", href: "#about" },
          ].map((item) =>
            item.href.startsWith("#") ? (
              <a key={item.label} href={item.href} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.href} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium">
                {item.label}
              </Link>
            )
          )}
        </div>
        <SignInButton mode="modal">
          <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold">
            Get Started
          </button>
        </SignInButton>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles className="size-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Interview Prep Platform</span>
          </div>

          <h1 className="reveal text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
            Ace Your{" "}
            <span className="text-gradient-cyan">Technical Interviews</span>
          </h1>

          <p className="reveal max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed">
            Practice coding problems, join live interview sessions, and prepare for
            top companies like EPAM, TCS, Cognizant & LTIMindtree — all in one place.
          </p>

          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <SignInButton mode="modal">
              <button className="btn-primary px-8 py-4 rounded-2xl font-bold text-base flex items-center gap-3 shadow-lg shadow-cyan-500/20">
                Start Practicing <ArrowRight className="size-5" />
              </button>
            </SignInButton>
            <Link to="/companies" className="btn-ghost px-8 py-4 rounded-2xl font-bold text-base flex items-center gap-3">
              <Building2 className="size-5" /> Company Guides
            </Link>
          </div>

          {/* Stats */}
          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 pt-16 max-w-3xl mx-auto">
            {[
              { value: "84+", label: "Problems" },
              { value: "8", label: "Companies" },
              { value: "5", label: "Languages" },
              { value: "Live", label: "Sessions" },
            ].map((stat) => (
              <div key={stat.label} className="premium-glass rounded-2xl p-5 text-center">
                <p className="text-3xl font-black text-gradient-cyan">{stat.value}</p>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP PREVIEW — CSS mock instead of missing image */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto reveal">
          <div className="premium-glass premium-border-glow rounded-3xl p-2 overflow-hidden">
            <div className="rounded-2xl bg-[var(--bg-surface)] p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="size-3 rounded-full bg-rose-500/80" />
                <div className="size-3 rounded-full bg-amber-500/80" />
                <div className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-4 text-xs text-slate-500 font-mono">elyvo — session/live</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 h-64">
                <div className="rounded-xl bg-[var(--bg-card)] border border-white/5 p-4 space-y-3">
                  <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Problem</p>
                  <p className="text-sm font-bold text-white">Two Sum</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Given an array of integers, return indices of the two numbers...</p>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded badge-medium border">Medium</span>
                </div>
                <div className="rounded-xl bg-[#0d1117] border border-white/5 p-4 font-mono text-xs text-emerald-400 overflow-hidden">
                  <p className="text-slate-500 mb-2">// solution.js</p>
                  <p><span className="text-violet-400">function</span> twoSum(nums, target) {"{"}</p>
                  <p className="pl-4">const map = <span className="text-violet-400">new</span> Map();</p>
                  <p className="pl-4"><span className="text-violet-400">for</span> (let i = 0; i {"<"} nums.length; i++) {"{"}</p>
                  <p className="pl-8">const diff = target - nums[i];</p>
                  <p className="pl-8"><span className="text-violet-400">if</span> (map.has(diff)) <span className="text-violet-400">return</span> [map.get(diff), i];</p>
                  <p className="pl-4">{"}"}</p>
                  <p>{"}"}</p>
                </div>
                <div className="rounded-xl bg-[var(--bg-card)] border border-white/5 p-4 flex flex-col items-center justify-center gap-3">
                  <div className="size-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 flex items-center justify-center">
                    <Users className="size-7 text-cyan-400" />
                  </div>
                  <p className="text-xs text-slate-400">Live Interview Session</p>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="size-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY SECTION — main new feature highlight */}
      <section id="companies" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="reveal text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
              <Building2 className="size-4 text-violet-400" />
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Company-Wise Preparation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Interview Processes of{" "}
              <span className="text-gradient-cyan">Top Companies</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Detailed round-by-round breakdowns, tips, salary info, and curated practice problems
              for India's leading IT companies.
            </p>
            <Link to="/companies" className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors mt-2">
              View all {COMPANIES.length} companies <ChevronRight className="size-4" />
            </Link>
          </div>

          {/* Featured company cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURED_COMPANIES.map((company) => (
              <Link
                key={company.id}
                to={`/companies/${company.id}`}
                className="reveal group premium-glass premium-border-glow rounded-3xl p-8 hover-premium block"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`size-14 rounded-2xl bg-gradient-to-br ${company.accent} flex items-center justify-center shadow-lg`}>
                      <span className="text-sm font-black text-white">{company.logo}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{company.name}</h3>
                      <p className="text-xs text-slate-500">{company.fullName}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                    company.difficulty === "Hard" ? "badge-hard" :
                    company.difficulty === "Medium" ? "badge-medium" : "badge-easy"
                  }`}>{company.difficulty}</span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">{company.overview}</p>

                {/* Process steps preview */}
                <div className="space-y-3 mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Interview Process</p>
                  <div className="flex flex-wrap gap-2">
                    {company.rounds.map((round, idx) => (
                      <div key={round.name} className="flex items-center gap-1.5">
                        <span className="size-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-cyan-400">
                          {idx + 1}
                        </span>
                        <span className="text-xs text-slate-400 hidden sm:inline">{round.name.split(" ")[0]}</span>
                        {idx < company.rounds.length - 1 && (
                          <ChevronRight className="size-3 text-slate-600 hidden sm:inline" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <IndianRupee className="size-3.5 text-emerald-400" />
                    <span>{company.avgPackage.split("(")[0].trim()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="size-3.5 text-cyan-400" />
                    <span>{company.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex flex-wrap gap-1.5">
                    {company.prepTopics.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-medium text-slate-500 bg-white/5 px-2 py-0.5 rounded-md">{t}</span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Process <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* All companies strip */}
          <div className="reveal premium-glass rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Also covered</p>
            <div className="flex flex-wrap gap-3">
              {COMPANIES.filter((c) => !FEATURED_COMPANIES.find((f) => f.id === c.id)).map((c) => (
                <Link
                  key={c.id}
                  to={`/companies/${c.id}`}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="reveal text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Everything You Need to <span className="text-gradient-cyan">Succeed</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From solo practice to live mock interviews — built for serious interview preparation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="reveal premium-glass rounded-2xl p-7 hover-premium group">
                <div className="size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5 group-hover:bg-cyan-500/15 transition-colors">
                  <Icon className="size-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto reveal">
          <h2 className="text-3xl font-black text-center mb-12">How It Works</h2>
          <div className="space-y-0 relative">
            {[
              { step: "01", title: "Pick a Company Guide", desc: "Study the interview process for EPAM, TCS, Cognizant, or any of our 8 company guides.", icon: BookOpen },
              { step: "02", title: "Practice Curated Problems", desc: "Solve company-specific coding problems with test cases, AI hints, and progress tracking.", icon: Target },
              { step: "03", title: "Join Live Sessions", desc: "Create or join interview rooms with video, chat, and a shared code editor.", icon: Monitor },
              { step: "04", title: "Track Your Progress", desc: "Monitor solved problems, session history, and consistency with your dashboard.", icon: Activity },
            ].map((item, idx) => (
              <div key={item.step} className="flex gap-6 pb-10 relative">
                {idx < 3 && <div className="process-line" />}
                <div className="size-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shrink-0 z-10 font-bold text-sm text-white shadow-lg shadow-cyan-500/20">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto reveal premium-glass premium-border-glow rounded-3xl p-12 md:p-16 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 size-64 bg-cyan-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-4xl md:text-5xl font-black tracking-tight relative z-10">
            Ready to land your <span className="text-gradient-cyan">dream job</span>?
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto relative z-10">
            Join thousands of engineers preparing smarter with Elyvo's company guides and live interview tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <SignInButton mode="modal">
              <button className="btn-primary px-10 py-4 rounded-2xl font-bold text-base">
                Get Started Free
              </button>
            </SignInButton>
            <Link to="/problems" className="btn-ghost px-10 py-4 rounded-2xl font-bold text-base">
              Browse Problems
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT + FOOTER */}
      <footer id="about" className="py-16 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2 space-y-4">
              <Logo />
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                Elyvo is a technical interview preparation platform with company-specific guides,
                coding practice, and live collaborative interview sessions.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link to="/problems" className="hover:text-cyan-400 transition-colors">Problems</Link></li>
                <li><Link to="/companies" className="hover:text-cyan-400 transition-colors">Company Guides</Link></li>
                <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Companies</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                {["epam", "tcs", "cognizant", "ltim"].map((id) => {
                  const c = COMPANIES.find((co) => co.id === id);
                  return c ? (
                    <li key={id}>
                      <Link to={`/companies/${id}`} className="hover:text-cyan-400 transition-colors">{c.name}</Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.05] gap-4">
            <p className="text-xs text-slate-600">&copy; 2026 Elyvo. All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              Built for interview success
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
