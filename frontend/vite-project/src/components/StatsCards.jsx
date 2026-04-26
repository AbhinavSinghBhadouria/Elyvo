import { FlameIcon, RocketIcon, TrendingUpIcon, Activity } from "lucide-react";

const cards = [
  {
    id: "active",
    label: "Active Sessions",
    description: "Real-time collaborations",
    icon: RocketIcon,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    accent: "from-blue-600 to-indigo-600",
  },
  {
    id: "recent",
    label: "Past Challenges",
    description: "Historical performance",
    icon: TrendingUpIcon,
    color: "text-slate-400",
    bgColor: "bg-white/5",
    accent: "from-slate-600 to-slate-800",
  },
  {
    id: "momentum",
    label: "Weekly Activity",
    description: "Session consistency",
    icon: FlameIcon,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    accent: "from-amber-600 to-orange-600",
  },
];

function StatsCards({ activeSessionsCount = 0, recentSessionsCount = 0 }) {
  const cardValues = {
    active: activeSessionsCount,
    recent: recentSessionsCount,
    momentum: recentSessionsCount, // Use real recent count for consistency
  };

  return (
    <div className="flex flex-col gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const value = cardValues[card.id] ?? 0;
        const percentage = Math.min(100, (value || 1) * 20);

        return (
          <div
            key={card.id}
            className="group relative p-6 rounded-3xl premium-glass hover-premium overflow-hidden transition-all duration-500"
          >
            {/* Corner Accent */}
            <div className={`absolute -top-12 -right-12 size-32 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700`} />
            
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${card.bgColor} ${card.color} border border-white/5 shadow-inner`}>
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-premium">{card.label}</p>
                    <p className="text-xs text-white font-semibold opacity-80">{card.description}</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-extrabold text-white tracking-tight">
                    {value}
                  </p>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total</span>
                </div>
              </div>

              {/* Progress Bar Vertical */}
              <div className="h-20 w-1.5 rounded-full bg-white/5 relative overflow-hidden shrink-0">
                <div 
                  className={`absolute bottom-0 left-0 w-full bg-gradient-to-t ${card.accent} transition-all duration-1000 ease-out rounded-full shadow-[0_0_12px_rgba(59,130,246,0.3)]`}
                  style={{ height: `${percentage}%` }}
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

