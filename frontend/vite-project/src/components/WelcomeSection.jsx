import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, ZapIcon, Video } from "lucide-react";

const G  = "#D4AF37";
const GB = "#F5C518";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div
      className="relative p-10 md:p-14 rounded-[2.5rem] overflow-hidden"
      style={{
        background: "rgba(13,13,22,0.88)",
        border: "1px solid rgba(212,175,55,0.20)",
        boxShadow: "0 0 60px rgba(212,175,55,0.06)",
      }}
    >
      {/* Gold ambient orbs */}
      <div style={{ position:"absolute", top:"-30%", right:"-10%", width:500, height:500, background:"rgba(212,175,55,0.07)", filter:"blur(120px)", borderRadius:"50%", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-30%", left:"-10%", width:400, height:400, background:"rgba(201,149,42,0.04)", filter:"blur(100px)", borderRadius:"50%", pointerEvents:"none" }} />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">

        {/* Left: Avatar + greeting */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 flex-1">
          {/* Gold icon badge */}
          <div
            className="relative size-24 rounded-3xl flex items-center justify-center shrink-0 transition-transform duration-500 hover:scale-105 hover:rotate-2"
            style={{
              background: `linear-gradient(135deg, ${GB}, ${G})`,
              boxShadow: `0 20px 40px -10px rgba(212,175,55,0.40)`,
            }}
          >
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to br, rgba(255,255,255,0.18), transparent)", borderRadius:"inherit" }} />
            <ZapIcon className="size-11 fill-black/20 relative z-10" style={{ color:"#09090f" }} />
          </div>

          <div className="space-y-3">
            {/* Status pill */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full"
              style={{ background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.22)" }}
            >
              <div className="size-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ boxShadow:"0 0 8px rgba(52,211,153,0.7)" }} />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">All Systems Online</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none text-white">
              Welcome back,{" "}
              <span className="text-gradient-gold">{user?.firstName || "Engineer"}</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl opacity-80">
              Your collaborative workspace is ready. Pick up where you left off or launch a new technical challenge.
            </p>
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
          <button
            onClick={() => onCreateSession("join")}
            className="group relative px-8 py-5 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
            style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(212,175,55,0.18)", color:"#f1f5f9" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.40)"; e.currentTarget.style.background = "rgba(212,175,55,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.18)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          >
            <Video className="size-5" style={{ color:G }} />
            <span className="text-base">Join Session</span>
          </button>

          <button
            onClick={() => onCreateSession("create")}
            className="group relative px-8 py-5 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${GB}, ${G})`,
              color: "#09090f",
              boxShadow: "0 20px 40px -10px rgba(212,175,55,0.30)",
            }}
          >
            {/* Shimmer sweep */}
            <div
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-900"
              style={{ background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
            />
            <span className="text-base relative z-10">Start New Session</span>
            <ArrowRightIcon className="size-5 group-hover:translate-x-1.5 transition-transform relative z-10" />
          </button>
        </div>
      </div>

      {/* Inner border glow */}
      <div style={{ position:"absolute", inset:0, borderRadius:"inherit", border:"1px solid rgba(212,175,55,0.10)", pointerEvents:"none" }} />
    </div>
  );
}

export default WelcomeSection;