import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  UsersIcon,
  Loader2,
  Globe,
  Plus,
  ShieldCheck
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function ActiveSessions({ sessions, isLoading, isUserInSession, onEndSession }) {
  const { user } = useUser();
  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'medium': return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
      case 'hard': return 'text-rose-400 border-rose-500/20 bg-rose-500/5';
      default: return 'text-slate-400 border-slate-500/20 bg-white/5';
    }
  };

  return (
    <div className="relative p-8 md:p-10 rounded-[2.5rem] premium-glass overflow-hidden h-full flex flex-col group">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(37,99,235,0.3)]">
                <Globe className="size-7 text-white" />
            </div>
            <div className="space-y-1">
                <h2 className="text-2xl font-extrabold tracking-tight text-white">Live Workspace</h2>
                <p className="text-[10px] font-bold uppercase tracking-premium text-slate-500">Global active collaborations</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-inner">
            <div className="size-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">{sessions.length} Online Now</span>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 space-y-4 custom-scrollbar overflow-y-auto pr-2 relative z-10 min-h-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="size-10 animate-spin text-blue-500" />
                <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">Synchronizing...</p>
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => {
              const isFull = session.participant && !isUserInSession(session);
              return (
                <div
                  key={session._id}
                  className={`group/session relative p-6 rounded-2xl border transition-all duration-500 ${
                    isUserInSession(session) 
                    ? 'border-blue-500/30 bg-blue-500/[0.08]' 
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                      <div className={`size-16 rounded-2xl flex items-center justify-center border shrink-0 transition-all duration-500 shadow-lg ${
                         isUserInSession(session)
                         ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                         : 'bg-white/5 border-white/10 text-slate-500 group-hover/session:text-white group-hover/session:scale-105'
                      }`}>
                        <Code2Icon className="size-8" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-xl tracking-tight text-white truncate">{session.problem}</h3>
                          <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${getDifficultyColor(session.difficulty)}`}>
                            {session.difficulty}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-slate-400">
                          <div className="flex items-center gap-2 group/host transition-colors hover:text-white">
                            <CrownIcon className="size-3.5 text-amber-500/80" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{session.host?.name || "Expert"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <UsersIcon className="size-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{session.participant ? "2/2 Full" : "1/2 Seats"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <div className={`size-1.5 rounded-full ${isFull ? 'bg-rose-500' : 'bg-emerald-400'}`} />
                             <span className={`text-[9px] font-bold uppercase tracking-widest ${isFull ? 'text-rose-500' : 'text-emerald-400'}`}>
                                {isFull ? "Private" : "Available"}
                             </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex flex-col gap-3">
                        {session.host?.clerkId === user?.id && (
                           <button
                             onClick={() => onEndSession(session._id)}
                             className="px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-rose-500 border border-rose-500/20 hover:bg-rose-500/10 transition-all"
                           >
                             End Session
                           </button>
                        )}
                        
                        {isFull ? (
                          <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-600 text-center">
                            Session Full
                          </div>
                        ) : (
                          <Link 
                            to={`/session/${session._id}`} 
                            className={`flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                                isUserInSession(session)
                                ? 'bg-blue-600 text-white shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-500'
                                : 'bg-white text-black hover:bg-slate-200 active:scale-95 shadow-xl'
                            }`}
                          >
                             <span>{isUserInSession(session) ? "Rejoin" : "Join"}</span>
                             <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        )}
                    </div>
                  </div>

                  {/* Join Code Footer - Only visible to Host */}
                  {session.host?.clerkId === user?.id && session.joinCode && (
                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-500">
                       <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-inner group/code cursor-pointer active:scale-95 transition-all" onClick={() => {
                            navigator.clipboard.writeText(session.joinCode);
                            alert("Join Code copied to clipboard!");
                          }}>
                             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Join Code:</span>
                             <span className="text-sm font-black text-blue-400 tracking-tighter">{session.joinCode}</span>
                          </div>
                          {session.password && (
                             <div className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2">
                                <ShieldCheck className="size-3 text-amber-400" />
                                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Protected</span>
                             </div>
                          )}
                       </div>
                       <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Host View</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-8 opacity-60">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
                <div className="size-24 rounded-[2rem] bg-slate-900/50 border border-white/5 flex items-center justify-center relative z-10">
                  <Plus className="size-10 text-slate-500" />
                </div>
              </div>
              <div className="space-y-3 max-w-xs">
                <p className="text-2xl font-bold text-white tracking-tight">Ready to Collaborate?</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-premium leading-relaxed">
                  Start a new session to invite your team and begin your technical journey.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Inner Border Glow */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none" />
    </div>
  );
}

export default ActiveSessions;