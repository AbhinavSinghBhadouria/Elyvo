import { FlameIcon, RocketIcon, TrendingUpIcon } from "lucide-react";

const cards = [
  {
    id: "active",
    label: "Live Interviews",
    description: "Sessions currently running across the network",
    icon: RocketIcon,
    accent: "from-primary to-secondary",
  },
  {
    id: "recent",
    label: "Recent Sessions",
    description: "High quality conversations wrapped up this week",
    icon: TrendingUpIcon,
    accent: "from-secondary to-accent",
  },
  {
    id: "streak",
    label: "Momentum",
    description: "Your consistency streak for the last 7 days",
    icon: FlameIcon,
    accent: "from-rose-500 to-orange-500",
  },
];

function StatsCards({ activeSessionsCount = 0, recentSessionsCount = 0 }) {
  const cardValues = {
    active: activeSessionsCount,
    recent: recentSessionsCount,
    streak: Math.max(1, recentSessionsCount - 1),
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:col-span-1">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="glass-panel rounded-2xl p-5 border border-white/5 hover:border-primary/30 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                {card.id}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-white/60 font-medium">{card.label}</p>
              <p className="text-4xl font-black text-white">
                {cardValues[card.id] ?? 0}
              </p>
              <p className="text-[13px] text-white/55 leading-relaxed">
                {card.description}
              </p>
            </div>

            <div className="mt-6 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${card.accent}`}
                style={{
                  width: `${Math.min(100, (cardValues[card.id] || 1) * 12)}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;

