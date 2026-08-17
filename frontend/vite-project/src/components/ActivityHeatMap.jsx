import React, { useMemo } from 'react';
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';
import { Activity } from 'lucide-react';

const G  = "#D4AF37";
const GB = "#F5C518";

function ActivityHeatMap({ sessions = [] }) {
  const dates = useMemo(() => {
    const today = new Date();
    return eachDayOfInterval({ start: subDays(today, 180), end: today });
  }, []);

  const getStyle = (date) => {
    const count = sessions.filter(s => isSameDay(new Date(s.createdAt), date)).length;
    if (count === 0) return { background: "rgba(255,255,255,0.04)" };
    if (count === 1) return { background: "rgba(212,175,55,0.20)", boxShadow: "0 0 4px rgba(212,175,55,0.15)" };
    if (count === 2) return { background: "rgba(212,175,55,0.45)", boxShadow: "0 0 6px rgba(212,175,55,0.30)" };
    if (count === 3) return { background: "rgba(212,175,55,0.70)", boxShadow: "0 0 8px rgba(212,175,55,0.45)" };
    return { background: G, boxShadow: `0 0 10px rgba(212,175,55,0.60)` };
  };

  const totalActiveDays = new Set(sessions.map(s => format(new Date(s.createdAt), 'yyyy-MM-dd'))).size;

  return (
    <div
      className="relative p-8 md:p-10 rounded-[2.5rem] overflow-hidden"
      style={{
        background: "rgba(13,13,22,0.85)",
        border: "1px solid rgba(212,175,55,0.14)",
      }}
    >
      {/* Ambient gold */}
      <div style={{ position:"absolute", top:0, right:0, width:300, height:300, background:"rgba(212,175,55,0.05)", filter:"blur(80px)", borderRadius:"50%", transform:"translate(30%,-30%)", pointerEvents:"none" }} />

      <div className="relative z-10 space-y-7">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="size-11 rounded-2xl flex items-center justify-center"
              style={{ background:"rgba(212,175,55,0.10)", border:"1px solid rgba(212,175,55,0.22)" }}
            >
              <Activity className="size-5" style={{ color:G }} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white">Consistency Map</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Activity over last 6 months</p>
            </div>
          </div>

          {/* Legend */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Less</span>
            {[
              "rgba(255,255,255,0.04)",
              "rgba(212,175,55,0.20)",
              "rgba(212,175,55,0.45)",
              "rgba(212,175,55,0.70)",
              G,
            ].map((bg, i) => (
              <div key={i} className="size-3 rounded-sm" style={{ background:bg }} />
            ))}
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">More</span>
          </div>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto custom-scrollbar pb-3">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-max">
            {dates.map((date) => (
              <div
                key={date.toISOString()}
                className="size-3.5 rounded-sm cursor-pointer transition-transform duration-150 hover:scale-150 hover:z-20"
                style={getStyle(date)}
                title={format(date, 'MMM d, yyyy')}
              />
            ))}
          </div>
        </div>

        {/* Footer stats */}
        <div
          className="flex items-center justify-between pt-5 border-t"
          style={{ borderColor:"rgba(212,175,55,0.10)" }}
        >
          <div className="flex items-center gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Active Days</p>
              <p className="text-2xl font-extrabold text-white">{totalActiveDays}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Sessions</p>
              <p className="text-2xl font-extrabold text-white">{sessions.length}</p>
            </div>
          </div>

          <div
            className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
            style={{ background:"rgba(212,175,55,0.10)", border:"1px solid rgba(212,175,55,0.25)", color:G }}
          >
            {totalActiveDays >= 10 ? "🏆 Consistent" : totalActiveDays >= 3 ? "⚡ Building Streak" : "🌱 Just Starting"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityHeatMap;
