import { FlameIcon, RocketIcon, TrendingUpIcon } from "lucide-react";

const G  = "#D4AF37";
const GB = "#F5C518";

const CARDS = [
  {
    id: "active",
    label: "Active Sessions",
    description: "Real-time collaborations",
    icon: RocketIcon,
    color: G,
    track: "rgba(212,175,55,0.12)",
    grad: `${GB}, ${G}`,
    glow: "rgba(212,175,55,0.25)",
  },
  {
    id: "recent",
    label: "Past Challenges",
    description: "Historical performance",
    icon: TrendingUpIcon,
    color: "#94a3b8",
    track: "rgba(148,163,184,0.10)",
    grad: "#94a3b8, #64748b",
    glow: "rgba(148,163,184,0.12)",
  },
  {
    id: "momentum",
    label: "Weekly Activity",
    description: "Session consistency",
    icon: FlameIcon,
    color: "#fb923c",
    track: "rgba(251,146,60,0.12)",
    grad: "#fb923c, #f97316",
    glow: "rgba(251,146,60,0.22)",
  },
];

function StatsCards({ activeSessionsCount = 0, recentSessionsCount = 0 }) {
  const vals = { active: activeSessionsCount, recent: recentSessionsCount, momentum: recentSessionsCount };

  return (
    <div className="flex flex-col gap-5">
      {CARDS.map((card) => {
        const Icon = card.icon;
        const value = vals[card.id] ?? 0;
        const pct = Math.min(100, Math.max(6, value * 20));

        return (
          <div
            key={card.id}
            className="group relative p-6 rounded-3xl overflow-hidden transition-all duration-400"
            style={{
              background: "rgba(13,13,22,0.85)",
              border: "1px solid rgba(212,175,55,0.12)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.30)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)"; }}
          >
            {/* Corner glow */}
            <div style={{
              position:"absolute", top:-48, right:-48, width:128, height:128,
              background: `radial-gradient(circle, ${card.glow}, transparent)`,
              opacity:0.8, transition:"opacity 0.4s",
              pointerEvents:"none",
            }} />

            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-4">
                  <div
                    className="p-3 rounded-2xl"
                    style={{ background: `${card.color}15`, border: `1px solid ${card.color}25` }}
                  >
                    <Icon className="size-5" style={{ color: card.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{card.label}</p>
                    <p className="text-xs text-white font-semibold opacity-80">{card.description}</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-extrabold text-white tracking-tight">{value}</p>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total</span>
                </div>
              </div>

              {/* Vertical progress bar */}
              <div className="h-20 w-2 rounded-full relative overflow-hidden shrink-0 ml-4" style={{ background: card.track }}>
                <div
                  className="absolute bottom-0 left-0 w-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    height: `${pct}%`,
                    background: `linear-gradient(to top, ${card.grad})`,
                    boxShadow: `0 0 12px ${card.glow}`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;
