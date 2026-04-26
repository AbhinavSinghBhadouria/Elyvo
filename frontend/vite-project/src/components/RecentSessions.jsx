import { Code2, Clock, Users, Trophy, Loader2, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'medium': return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
      case 'hard': return 'text-rose-400 border-rose-400/20 bg-rose-400/5';
      default: return 'text-slate-400 border-slate-500/20 bg-white/5';
    }
  };

  return (
    <div className="relative p-8 md:p-10 rounded-[2.5rem] premium-glass overflow-hidden h-full flex flex-col group">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-slate-800 flex items-center justify-center shadow-xl">
                <Clock className="size-7 text-white" />
            </div>
            <div className="space-y-1">
                <h2 className="text-2xl font-extrabold tracking-tight text-white">History</h2>
                <p className="text-[10px] font-bold uppercase tracking-premium text-slate-500">Your historical performance</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="size-10 animate-spin text-blue-500" />
                <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">Loading History...</p>
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className={`group/session relative p-6 rounded-2xl border transition-all duration-500 ${
                  session.status === "active"
                    ? "border-emerald-500/20 bg-emerald-500/[0.08]"
                    : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10"
                }`}
              >
                {session.status === "active" && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="size-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-400">Live Now</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`size-14 rounded-xl flex items-center justify-center border transition-all duration-500 shrink-0 ${
                        session.status === "active"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : "bg-white/5 border-white/10 text-slate-500 group-hover/session:text-white"
                      }`}
                    >
                      <Code2 className="size-7" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <h3 className="font-bold text-lg tracking-tight text-white truncate">{session.problem}</h3>
                      <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${getDifficultyColor(session.difficulty)}`}>
                        {session.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="size-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {session.participant ? "Collaborative" : "Individual"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-white/5">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Completed Session</span>
                    <span className="text-[9px] font-bold text-slate-400">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-6 opacity-40">
                <div className="size-20 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center">
                  <Trophy className="size-8 text-slate-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-white tracking-tight">No Activity Found</p>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-premium">Your journey begins with your first challenge</p>
                </div>
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none" />
    </div>
  );
}

export default RecentSessions;