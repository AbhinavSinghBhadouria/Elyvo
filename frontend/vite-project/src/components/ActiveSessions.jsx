import {
  ArrowRightIcon, Code2Icon, CrownIcon, UsersIcon,
  Loader2, Globe, Plus, ShieldCheck
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const G  = "#D4AF37";
const GB = "#F5C518";

const DIFF_COLOR = {
  easy:   { color:"#34d399", bg:"rgba(52,211,153,0.08)",  border:"rgba(52,211,153,0.25)" },
  medium: { color:G,          bg:"rgba(212,175,55,0.08)",  border:"rgba(212,175,55,0.28)" },
  hard:   { color:"#fb7185",  bg:"rgba(251,113,133,0.08)", border:"rgba(251,113,133,0.25)" },
};

function ActiveSessions({ sessions, isLoading, isUserInSession, onEndSession }) {
  const { user } = useUser();

  const getDiffStyle = (diff) => DIFF_COLOR[diff?.toLowerCase()] || { color:"#94a3b8", bg:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.12)" };

  return (
    <div
      className="relative p-8 md:p-10 rounded-[2.5rem] overflow-hidden h-full flex flex-col"
      style={{ background:"rgba(13,13,22,0.85)", border:"1px solid rgba(212,175,55,0.14)" }}
    >
      {/* Ambient glow */}
      <div style={{ position:"absolute", top:0, right:0, width:300, height:300, background:"rgba(212,175,55,0.05)", filter:"blur(80px)", borderRadius:"50%", transform:"translate(30%,-30%)", pointerEvents:"none" }} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div
            className="size-14 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background:`linear-gradient(135deg, ${GB}, ${G})`, boxShadow:`0 12px 28px -8px rgba(212,175,55,0.35)` }}
          >
            <Globe className="size-7" style={{ color:"#09090f" }} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">Live Workspace</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Global active collaborations</p>
          </div>
        </div>

        <div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
          style={{ background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.22)" }}
        >
          <div className="size-2 bg-emerald-400 rounded-full animate-pulse" style={{ boxShadow:"0 0 8px rgba(52,211,153,0.7)" }} />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{sessions.length} Online</span>
        </div>
      </div>

      {/* Session list */}
      <div className="flex-1 space-y-3 custom-scrollbar overflow-y-auto pr-1 relative z-10 min-h-0">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="size-10 animate-spin" style={{ color:G }} />
            <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">Synchronizing...</p>
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => {
            const isFull = session.participant && !isUserInSession(session);
            const isMine = isUserInSession(session);
            const ds     = getDiffStyle(session.difficulty);

            return (
              <div
                key={session._id}
                className="relative p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: isMine ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.025)",
                  border: isMine ? "1px solid rgba(212,175,55,0.30)" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  {/* Info */}
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                    <div
                      className="size-14 rounded-2xl flex items-center justify-center border shrink-0"
                      style={{
                        background: isMine ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
                        border: isMine ? "1px solid rgba(212,175,55,0.30)" : "1px solid rgba(255,255,255,0.08)",
                        color: isMine ? G : "#64748b",
                      }}
                    >
                      <Code2Icon className="size-7" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-bold text-lg tracking-tight text-white truncate">{session.problem}</h3>
                        <span
                          className="px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest"
                          style={{ color:ds.color, background:ds.bg, border:`1px solid ${ds.border}` }}
                        >
                          {session.difficulty}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-5 text-slate-500">
                        <div className="flex items-center gap-2">
                          <CrownIcon className="size-3.5 text-amber-400" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{session.host?.name || "Expert"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UsersIcon className="size-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{session.participant ? "2/2 Full" : "1/2 Seats"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`size-1.5 rounded-full ${isFull ? "bg-rose-500" : "bg-emerald-400"}`} />
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${isFull ? "text-rose-400" : "text-emerald-400"}`}>
                            {isFull ? "Private" : "Available"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    {session.host?.clerkId === user?.id && (
                      <button
                        onClick={() => onEndSession(session._id)}
                        className="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                        style={{ color:"#fb7185", border:"1px solid rgba(251,113,133,0.22)", background:"rgba(251,113,133,0.05)" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(251,113,133,0.10)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "rgba(251,113,133,0.05)"}
                      >
                        End Session
                      </button>
                    )}
                    {isFull ? (
                      <div
                        className="px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center"
                        style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"#475569" }}
                      >
                        Session Full
                      </div>
                    ) : (
                      <Link
                        to={`/session/${session._id}`}
                        className="flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200"
                        style={
                          isMine
                            ? { background:`linear-gradient(135deg,${GB},${G})`, color:"#09090f", boxShadow:`0 8px 20px -5px rgba(212,175,55,0.30)` }
                            : { background:"rgba(212,175,55,0.10)", color:G, border:`1px solid rgba(212,175,55,0.28)` }
                        }
                        onMouseEnter={(e) => {
                          if (!isMine) { e.currentTarget.style.background = "rgba(212,175,55,0.18)"; }
                        }}
                        onMouseLeave={(e) => {
                          if (!isMine) { e.currentTarget.style.background = "rgba(212,175,55,0.10)"; }
                        }}
                      >
                        {isMine ? "Rejoin" : "Join"}
                        <ArrowRightIcon className="size-4" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Join code footer (host only) */}
                {session.host?.clerkId === user?.id && session.joinCode && (
                  <div
                    className="mt-5 pt-5 border-t flex items-center justify-between"
                    style={{ borderColor:"rgba(212,175,55,0.10)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer active:scale-95 transition-all"
                        style={{ background:"rgba(212,175,55,0.08)", border:"1px solid rgba(212,175,55,0.22)" }}
                        onClick={() => { navigator.clipboard.writeText(session.joinCode); }}
                      >
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Join Code:</span>
                        <span className="text-sm font-black tracking-tighter" style={{ color:G }}>{session.joinCode}</span>
                      </div>
                      {session.password && (
                        <div
                          className="px-3 py-2 rounded-xl flex items-center gap-2"
                          style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.22)" }}
                        >
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
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="relative">
              <div style={{ position:"absolute", inset:0, background:"rgba(212,175,55,0.12)", filter:"blur(24px)", borderRadius:"50%", animation:"pulse 2s ease-in-out infinite" }} />
              <div
                className="size-24 rounded-[2rem] flex items-center justify-center relative z-10"
                style={{ background:"rgba(212,175,55,0.07)", border:"1px solid rgba(212,175,55,0.20)" }}
              >
                <Plus className="size-10" style={{ color:G, opacity:0.7 }} />
              </div>
            </div>
            <div className="space-y-2 max-w-xs">
              <p className="text-2xl font-bold text-white tracking-tight">Ready to Collaborate?</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                Start a new session to invite your team and begin your technical journey.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Inner border */}
      <div style={{ position:"absolute", inset:0, borderRadius:"inherit", border:"1px solid rgba(212,175,55,0.07)", pointerEvents:"none" }} />
    </div>
  );
}

export default ActiveSessions;