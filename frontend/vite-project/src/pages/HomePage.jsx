import { Link } from "react-router-dom";
import { SignInButton } from "@clerk/clerk-react";
import {
  ArrowRight, Video, Code, Users, Zap, Sparkles, Globe,
  Monitor, ShieldCheck, Activity, Building2, Clock, IndianRupee,
  BookOpen, Target, ChevronRight, CheckCircle2
} from "lucide-react";
import Logo from "../components/Logo";
import { COMPANIES } from "../data/companies";

const GOLD        = "#D4AF37";
const GOLD_BRIGHT = "#F5C518";
const GOLD_DIM    = "#A8893B";

const FEATURED_COMPANIES = COMPANIES.filter((c) =>
  ["epam", "tcs", "cognizant", "ltim"].includes(c.id)
);

const FEATURES = [
  { icon: Code,       title: "84+ Coding Problems",    desc: "Curated DSA challenges with test cases and step-by-step solutions." },
  { icon: Video,      title: "Live Interview Rooms",   desc: "HD video, chat & shared code editor for realistic mock interviews." },
  { icon: Building2,  title: "Company Prep Guides",    desc: "Round-by-round breakdown for 8 top IT and product companies." },
  { icon: Sparkles,   title: "AI Co-Pilot",            desc: "Smart hints and code review powered by Groq AI." },
  { icon: Globe,      title: "5 Languages",            desc: "JavaScript, Python, Java, C++, and C — your choice." },
  { icon: ShieldCheck,title: "Progress Tracking",      desc: "Track solved problems, session history & consistency." },
];

/* Small inline SVG logos for company cards on landing */
function MiniLogo({ id }) {
  const map = {
    tcs:       <span style={{ fontFamily:"Arial", fontWeight:900, fontSize:13, color:"#0066CC" }}>TCS</span>,
    cognizant: <span style={{ fontFamily:"Arial", fontWeight:700, fontSize:10, color:"#1562A7" }}>cognizant</span>,
    epam:      <span style={{ fontFamily:"Arial", fontWeight:900, fontSize:12, color:"#39FF14" }}>EPAM</span>,
    ltim:      <span style={{ fontFamily:"Arial", fontWeight:900, fontSize: 9, color:"#004B87" }}>LTIMindtree</span>,
  };
  return <div className="flex items-center justify-center w-full h-full">{map[id] || <span style={{ color: GOLD, fontWeight:900 }}>{id.slice(0,3).toUpperCase()}</span>}</div>;
}

function HomePage() {
  return (
    <div className="min-h-screen mesh-bg text-slate-100 custom-scrollbar overflow-x-hidden" style={{ background: "var(--bg-main)" }}>

      {/* ── Ambient gold glows ─────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{ position:"absolute", top:"-15%", left:"20%",  width:800, height:800, background:"rgba(212,175,55,0.06)", filter:"blur(160px)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:"-10%", right:"10%", width:600, height:600, background:"rgba(201,149,42,0.04)", filter:"blur(140px)", borderRadius:"50%" }} />
      </div>

      {/* ── Landing Navbar ─────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 border-b"
        style={{ background:"rgba(9,9,15,0.75)", backdropFilter:"blur(24px)", borderColor:"rgba(212,175,55,0.10)" }}
      >
        <Link to="/"><Logo /></Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label:"Features",  href:"#features" },
            { label:"Companies", href:"#companies" },
            { label:"Problems",  href:"/problems" },
            { label:"About",     href:"#about" },
          ].map((item) =>
            item.href.startsWith("#") ? (
              <a key={item.label} href={item.href}
                className="text-sm text-slate-400 font-medium transition-colors hover:text-[#F5C518]">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.href}
                className="text-sm text-slate-400 font-medium transition-colors hover:text-[#F5C518]">
                {item.label}
              </Link>
            )
          )}
        </div>

        <SignInButton mode="modal">
          <button
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold gold-glow-pulse"
          >
            Get Started
          </button>
        </SignInButton>
      </nav>

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO                                           */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-24 px-6" style={{ position:"relative", zIndex:1 }}>
        <div className="max-w-5xl mx-auto text-center space-y-8">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
            style={{ background:"rgba(212,175,55,0.08)", borderColor:"rgba(212,175,55,0.25)", color:GOLD }}
          >
            <Sparkles className="size-3.5" /> Interview Prep Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
            Ace Your{" "}
            <span className="text-gradient-gold">Technical Interviews</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed">
            Practice coding problems, join live interview sessions, and prepare for
            top companies like EPAM, TCS, Cognizant & LTIMindtree — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <SignInButton mode="modal">
              <button
                className="btn-primary px-8 py-4 rounded-2xl font-bold text-base flex items-center gap-3"
              >
                Start Practicing <ArrowRight className="size-5" />
              </button>
            </SignInButton>
            <Link
              to="/companies"
              className="btn-ghost px-8 py-4 rounded-2xl font-bold text-base flex items-center gap-3"
            >
              <Building2 className="size-5" /> Company Guides
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16 max-w-3xl mx-auto">
            {[
              { value:"84+",  label:"Problems" },
              { value:"8",    label:"Companies" },
              { value:"5",    label:"Languages" },
              { value:"Live", label:"Sessions" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="premium-glass rounded-2xl p-5 text-center border"
                style={{ borderColor:"rgba(212,175,55,0.15)" }}
              >
                <p className="text-3xl font-black text-gradient-gold">{stat.value}</p>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── App Preview mockup ─────────────────────────── */}
      <section className="px-6 pb-24" style={{ position:"relative", zIndex:1 }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="premium-glass rounded-3xl p-2 overflow-hidden"
            style={{ border:"1px solid rgba(212,175,55,0.20)", boxShadow:"0 0 60px rgba(212,175,55,0.08)" }}
          >
            <div className="rounded-2xl p-6 space-y-4" style={{ background:"var(--bg-surface)" }}>
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-4">
                <div className="size-3 rounded-full bg-rose-500/80" />
                <div className="size-3 rounded-full bg-amber-500/80" />
                <div className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-4 text-xs text-slate-500 font-mono">elyvo — session/live</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 h-64">
                {/* Problem panel */}
                <div className="rounded-xl p-4 space-y-3" style={{ background:"var(--bg-card)", border:"1px solid rgba(212,175,55,0.10)" }}>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color:GOLD }}>Problem</p>
                  <p className="text-sm font-bold text-white">Two Sum</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Given an array of integers, return indices of the two numbers...</p>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded badge-medium border">Medium</span>
                </div>
                {/* Code editor panel */}
                <div className="rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-hidden" style={{ background:"#0d1117", border:"1px solid rgba(212,175,55,0.08)" }}>
                  <p className="text-slate-500 mb-2">// solution.js</p>
                  <p><span className="text-violet-400">function</span> twoSum(nums, target) {"{"}</p>
                  <p className="pl-4">const map = <span className="text-violet-400">new</span> Map();</p>
                  <p className="pl-4"><span className="text-violet-400">for</span> (let i = 0; i {"<"} nums.length; i++) {"{"}</p>
                  <p className="pl-8">const diff = target - nums[i];</p>
                  <p className="pl-8"><span className="text-violet-400">if</span> (map.has(diff)) <span className="text-violet-400">return</span> [map.get(diff), i];</p>
                  <p className="pl-4">{"}"}</p>
                  <p>{"}"}</p>
                </div>
                {/* Live session panel */}
                <div className="rounded-xl p-4 flex flex-col items-center justify-center gap-3" style={{ background:"var(--bg-card)", border:"1px solid rgba(212,175,55,0.10)" }}>
                  <div
                    className="size-16 rounded-full flex items-center justify-center"
                    style={{ background:"rgba(212,175,55,0.12)", border:"1px solid rgba(212,175,55,0.25)" }}
                  >
                    <Users className="size-7" style={{ color:GOLD }} />
                  </div>
                  <p className="text-xs text-slate-400">Live Interview Session</p>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="size-1.5 rounded-full animate-pulse" style={{ background:GOLD, animationDelay:`${i*200}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* COMPANY SECTION                                */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="companies" className="py-24 px-6 relative" style={{ zIndex:1 }}>
        <div className="max-w-6xl mx-auto space-y-14">

          {/* Section header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
              style={{ background:"rgba(212,175,55,0.08)", borderColor:"rgba(212,175,55,0.25)", color:GOLD }}
            >
              <Building2 className="size-4" /> Company-Wise Preparation
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Interview Processes of{" "}
              <span className="text-gradient-gold">Top Companies</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Detailed round-by-round breakdowns, insider tips, salary info, and curated practice
              problems for India's leading IT companies.
            </p>
            <Link
              to="/companies"
              className="inline-flex items-center gap-2 text-sm font-bold mt-2 transition-colors"
              style={{ color:GOLD }}
              onMouseEnter={(e) => e.currentTarget.style.color = GOLD_BRIGHT}
              onMouseLeave={(e) => e.currentTarget.style.color = GOLD}
            >
              View all {COMPANIES.length} companies <ChevronRight className="size-4" />
            </Link>
          </div>

          {/* Featured cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURED_COMPANIES.map((company) => (
              <Link
                key={company.id}
                to={`/companies/${company.id}`}
                className="group rounded-3xl p-8 block transition-all duration-300"
                style={{
                  background:"rgba(19,19,32,0.75)",
                  backdropFilter:"blur(20px)",
                  border:"1px solid rgba(212,175,55,0.14)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.38)";
                  e.currentTarget.style.boxShadow = "0 24px 48px -12px rgba(0,0,0,0.6), 0 0 28px -4px rgba(212,175,55,0.15)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.14)";
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.transform = "";
                }}
              >
                {/* Card header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {/* Logo box */}
                    <div
                      className="size-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                      style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(212,175,55,0.22)" }}
                    >
                      <MiniLogo id={company.id} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-[#F5C518]">
                        {company.name}
                      </h3>
                      <p className="text-xs text-slate-500">{company.fullName}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                    company.difficulty === "Hard" ? "badge-hard" :
                    company.difficulty === "Medium" ? "badge-medium" : "badge-easy"
                  }`}>{company.difficulty}</span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">{company.overview}</p>

                {/* Process steps */}
                <div className="space-y-3 mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Interview Process</p>
                  <div className="flex flex-wrap gap-2">
                    {company.rounds.map((round, idx) => (
                      <div key={round.name} className="flex items-center gap-1.5">
                        <span
                          className="size-6 rounded-lg flex items-center justify-center text-[10px] font-black"
                          style={{ background:"rgba(212,175,55,0.10)", border:"1px solid rgba(212,175,55,0.20)", color:GOLD }}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-xs text-slate-400 hidden sm:inline">{round.name.split(" ")[0]}</span>
                        {idx < company.rounds.length - 1 && (
                          <ChevronRight className="size-3 hidden sm:inline" style={{ color:GOLD, opacity:0.4 }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t" style={{ borderColor:"rgba(212,175,55,0.10)" }}>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <IndianRupee className="size-3.5 text-emerald-400" />
                    {company.avgPackage.split("(")[0].trim()}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="size-3.5" style={{ color:GOLD }} />
                    {company.duration}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {company.prepTopics.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-medium text-slate-500 px-2 py-0.5 rounded-md" style={{ background:"rgba(255,255,255,0.04)" }}>{t}</span>
                    ))}
                  </div>
                  <span className="text-sm font-bold flex items-center gap-1 transition-all duration-200" style={{ color:GOLD }}>
                    View Process <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Other companies strip */}
          <div
            className="premium-glass rounded-2xl p-6 border"
            style={{ borderColor:"rgba(212,175,55,0.12)" }}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Also covered</p>
            <div className="flex flex-wrap gap-3">
              {COMPANIES.filter((c) => !FEATURED_COMPANIES.find((f) => f.id === c.id)).map((c) => (
                <Link
                  key={c.id}
                  to={`/companies/${c.id}`}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{ background:"rgba(212,175,55,0.06)", border:"1px solid rgba(212,175,55,0.16)", color:"#94a3b8" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = "rgba(212,175,55,0.38)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.16)"; }}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* FEATURES                                       */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="features" className="py-24 px-6" style={{ zIndex:1, position:"relative" }}>
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Everything You Need to <span className="text-gradient-gold">Succeed</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From solo practice to live mock interviews — built for serious interview prep.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="premium-glass rounded-2xl p-7 hover-premium group border"
                style={{ borderColor:"rgba(212,175,55,0.10)" }}
              >
                <div
                  className="size-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200"
                  style={{ background:"rgba(212,175,55,0.08)", border:"1px solid rgba(212,175,55,0.18)" }}
                >
                  <Icon className="size-6" style={{ color:GOLD }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────── */}
      <section className="py-24 px-6" style={{ zIndex:1, position:"relative" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-14">
            How It <span className="text-gradient-gold">Works</span>
          </h2>
          <div className="space-y-0 relative">
            {[
              { step:"01", title:"Pick a Company Guide",       desc:"Study the interview process for EPAM, TCS, Cognizant, or any of our 8 company guides.", icon:BookOpen },
              { step:"02", title:"Practice Curated Problems",  desc:"Solve company-specific coding problems with test cases, AI hints, and progress tracking.", icon:Target },
              { step:"03", title:"Join Live Sessions",         desc:"Create or join interview rooms with video, chat, and a shared code editor.", icon:Monitor },
              { step:"04", title:"Track Your Progress",        desc:"Monitor solved problems, session history, and consistency from your dashboard.", icon:Activity },
            ].map((item, idx) => (
              <div key={item.step} className="flex gap-6 pb-10 relative">
                {idx < 3 && <div className="process-line" />}
                <div
                  className="size-10 rounded-xl flex items-center justify-center shrink-0 z-10 font-black text-sm text-[#09090f] shadow-lg"
                  style={{ background:`linear-gradient(135deg, ${GOLD_BRIGHT}, ${GOLD})`, boxShadow:`0 4px 18px rgba(212,175,55,0.30)` }}
                >
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

      {/* ── CTA Banner ─────────────────────────────────── */}
      <section className="py-24 px-6" style={{ zIndex:1, position:"relative" }}>
        <div
          className="max-w-4xl mx-auto premium-glass rounded-3xl p-12 md:p-16 text-center space-y-8 relative overflow-hidden border"
          style={{ borderColor:"rgba(212,175,55,0.22)", boxShadow:"0 0 80px rgba(212,175,55,0.08)" }}
        >
          <div style={{ position:"absolute", top:0, right:0, width:256, height:256, background:"rgba(212,175,55,0.07)", filter:"blur(100px)", transform:"translate(50%,-50%)" }} />
          <h2 className="text-4xl md:text-5xl font-black tracking-tight relative" style={{ zIndex:1 }}>
            Ready to land your <span className="text-gradient-gold">dream job</span>?
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto relative" style={{ zIndex:1 }}>
            Join thousands of engineers preparing smarter with Elyvo's company guides and live interview tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative" style={{ zIndex:1 }}>
            <SignInButton mode="modal">
              <button className="btn-primary px-10 py-4 rounded-2xl font-bold text-base gold-glow-pulse">
                Get Started Free
              </button>
            </SignInButton>
            <Link to="/problems" className="btn-ghost px-10 py-4 rounded-2xl font-bold text-base">
              Browse Problems
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer id="about" className="py-16 px-6 border-t" style={{ borderColor:"rgba(212,175,55,0.10)", zIndex:1, position:"relative" }}>
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
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color:GOLD }}>Platform</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link to="/problems"  className="hover:text-[#D4AF37] transition-colors">Problems</Link></li>
                <li><Link to="/companies" className="hover:text-[#D4AF37] transition-colors">Company Guides</Link></li>
                <li><Link to="/dashboard" className="hover:text-[#D4AF37] transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color:GOLD }}>Companies</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                {["epam","tcs","cognizant","ltim"].map((id) => {
                  const c = COMPANIES.find((co) => co.id === id);
                  return c ? (
                    <li key={id}>
                      <Link to={`/companies/${id}`} className="hover:text-[#D4AF37] transition-colors">{c.name}</Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4" style={{ borderColor:"rgba(212,175,55,0.08)" }}>
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
