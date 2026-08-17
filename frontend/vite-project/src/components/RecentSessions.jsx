import { Code2, Clock, Users, Trophy, Loader2, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const G  = "#D4AF37";
const GB = "#F5C518";

const DIFF_COLOR = {
  easy:   { color:"#34d399", bg:"rgba(52,211,153,0.08)",  border:"rgba(52,211,153,0.22)" },
  medium: { color:G,          bg:"rgba(212,175,55,0.08)",  border:"rgba(212,175,55,0.28)" },
  hard:   { color:"#fb7185",  bg:"rgba(251,113,133,0.08)", border:"rgba(251,113,133,0.22)" },
};

function RecentSessions({ sessions, isLoading }) {
  const ds = (diff) => DIFF_COLOR[diff?.toLowerCase()] || { color:"#94a3b8", bg:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.10)" };

  return (
    <div
      className="relative p-8 md:p-10 rounded-[2.5rem] overflow-hidden h-full flex flex-col"
      style={{ background:"rgba(13,13,22,0.85)", border:"1px solid rgba(212,175,55,0.14)" }}
    >
      {/* Ambient glow */}
      <div style={{ position:"absolute", bottom:0, left:0, width:300, height:300, background:"rgba(212,175,55,0.04)", filter:"blur(80px)", borderRadius:"50%", transform:"translate(-30%,30%)", pointerEvents:"none" }} />

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div
          className="size-14 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background:`linear-gradient(135deg, ${GB}, ${G})`, boxShadow:`0 12px 28px -8px rgba(212,175,55,0.30)` }}
        >
          <Clock className="size-7" style={{ color:"#09090f" }} />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">History</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Your historical performance</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 flex-1">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="size-10 animate-spin" style={{ color:G }} />
            <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">Loading History...</p>
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => {
            const isActive = session.status === "active";
            const d = ds(session.difficulty);
            return (
              <div
                key={session._id}
                className="relative p-5 rounded-2xl transition-all duration-300"
                style={{
                  background: isActive ? "rgba(52,211,153,0.05)" : "rgba(255,255,255,0.025)",
                  border: isActive ? "1px solid rgba(52,211,153,0.22)" : "1px solid rgba(212,175,55,0.09)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) { e.currentTarget.style.borderColor = "rgba(212,175,55,0.25)"; e.currentTarget.style.background = "rgba(212,175,55,0.04)"; }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) { e.currentTarget.style.borderColor = "rgba(212,175,55,0.09)"; e.currentTarget.style.background = "rgba(255,255,255,0.025)"; }
                }}
              >
                {/* Live badge */}
                {isActive && (
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background:"rgba(16,185,129,0.10)", border:"1px solid rgba(16,185,129,0.25)" }}
                  >
                    <div className="size-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">Live</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Problem */}
                  <div className="flex items-start gap-3">
                    <div
                      className="size-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: isActive ? "rgba(52,211,153,0.10)" : "rgba(212,175,55,0.07)",
                        border: isActive ? "1px solid rgba(52,211,153,0.22)" : "1px solid rgba(212,175,55,0.18)",
                        color: isActive ? "#34d399" : G,
                      }}
                    >
                      <Code2 className="size-6" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <h3 className="font-bold text-base tracking-tight text-white truncate">{session.problem}</h3>
                      <span
                        className="inline-block px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest"
                        style={{ color:d.color, background:d.bg, border:`1px solid ${d.border}` }}
                      >
                        {session.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-3" />
                      <span className="text-[10px] font-bold uppercase tracking-wide">
                        {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="size-3" />
                      <span className="text-[10px] font-bold uppercase tracking-wide">
                        {session.participant ? "Collab" : "Solo"}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between pt-3 border-t"
                    style={{ borderColor:"rgba(212,175,55,0.08)" }}
                  >
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                      {isActive ? "In Progress" : "Completed"}
                    </span>
                    <span className="text-[9px] font-bold text-slate-500">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-5">
            <div
              className="size-20 rounded-3xl flex items-center justify-center"
              style={{ background:"rgba(212,175,55,0.07)", border:"1px solid rgba(212,175,55,0.18)" }}
            >
              <Trophy className="size-8" style={{ color:G, opacity:0.7 }} />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold text-white tracking-tight">No Activity Yet</p>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Your journey begins with your first challenge</p>
            </div>
          </div>
        )}
      </div>

      {/* Inner border */}
      <div style={{ position:"absolute", inset:0, borderRadius:"inherit", border:"1px solid rgba(212,175,55,0.07)", pointerEvents:"none" }} />
    </div>
  );
}

export default RecentSessions;