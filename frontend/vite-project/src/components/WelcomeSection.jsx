import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, ZapIcon, CheckCircle } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative p-12 md:p-16 rounded-[2.5rem] premium-glass overflow-hidden group">
      {/* Decorative Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full group-hover:bg-blue-600/15 transition-colors duration-700" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-900/10 blur-[100px] rounded-full" />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="space-y-10 flex-1">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="relative size-24 rounded-3xl bg-blue-600 flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <ZapIcon className="size-10 text-white fill-white/20 relative z-10" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                  <div className="size-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <span className="text-[10px] font-bold uppercase tracking-premium text-emerald-400">All Systems Online</span>
              </div>
              
              <div className="space-y-1">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
                  Welcome back, <span className="text-gradient-blue">{user?.firstName || "Engineer"}</span>
                </h1>
                <p className="text-slate-400 font-medium text-lg md:text-xl max-w-2xl leading-relaxed opacity-80">
                  Your collaborative workspace is ready. Pick up where you left off or launch a new technical challenge.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <button
            onClick={() => onCreateSession('join')}
            className="group relative px-10 py-6 bg-white/5 border border-white/10 text-white rounded-2xl font-bold transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-4 overflow-hidden"
          >
             <span className="text-base">Join Session</span>
          </button>

          <button
            onClick={() => onCreateSession('create')}
            className="group relative px-10 py-6 bg-white text-black rounded-2xl font-bold transition-all duration-300 hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] flex items-center gap-4 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="text-base relative z-10">Start New Session</span>
            <ArrowRightIcon className="size-5 group-hover:translate-x-1.5 transition-transform relative z-10" />
          </button>
        </div>
      </div>
      
      {/* Premium Border Inner Glow */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none" />
    </div>
  );
}

export default WelcomeSection;