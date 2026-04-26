import React, { useMemo } from 'react';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

function ActivityHeatMap({ sessions = [] }) {
  // Generate last 6 months of dates
  const dates = useMemo(() => {
    const today = new Date();
    const start = subDays(today, 180); // Last 180 days (~6 months)
    return eachDayOfInterval({ start, end: today });
  }, []);

  const getIntensity = (date) => {
    const count = sessions.filter(s => isSameDay(new Date(s.createdAt), date)).length;
    if (count === 0) return 'bg-white/5';
    if (count === 1) return 'bg-blue-500/20';
    if (count === 2) return 'bg-blue-500/40';
    if (count === 3) return 'bg-blue-500/60';
    return 'bg-blue-500';
  };

  return (
    <div className="relative p-8 md:p-10 rounded-[2.5rem] premium-glass overflow-hidden group">
      <div className="absolute top-0 right-0 size-64 bg-blue-600/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-white">Consistency Map</h2>
            <p className="text-[10px] font-bold uppercase tracking-premium text-slate-500">Your activity over the last 6 months</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
               <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mr-2">Less</span>
               <div className="size-3 rounded-sm bg-white/5" />
               <div className="size-3 rounded-sm bg-blue-500/20" />
               <div className="size-3 rounded-sm bg-blue-500/50" />
               <div className="size-3 rounded-sm bg-blue-500" />
               <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-2">More</span>
            </div>
          </div>
        </div>

        <div className="relative group/map">
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-6 mask-fade-right">
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-max">
              {dates.map((date, i) => (
                <div
                  key={date.toISOString()}
                  className={`size-3.5 rounded-sm transition-all duration-300 hover:scale-150 hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] hover:z-20 cursor-pointer ${getIntensity(date)}`}
                  title={`${format(date, 'MMM d, yyyy')}`}
                />
              ))}
            </div>
          </div>
          
          {/* Legend Overlay for small screens */}
          <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50">
             <div className="size-1 bg-slate-700 rounded-full animate-bounce" />
             <div className="size-1 bg-slate-700 rounded-full animate-bounce [animation-delay:0.2s]" />
             <div className="size-1 bg-slate-700 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
           <div className="flex items-center gap-6">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Active Days</p>
                <p className="text-xl font-extrabold text-white">{new Set(sessions.map(s => format(new Date(s.createdAt), 'yyyy-MM-dd'))).size}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Max Daily Streak</p>
                <p className="text-xl font-extrabold text-white">--</p>
              </div>
           </div>
           
           <p className="text-[10px] font-bold text-blue-400 uppercase tracking-premium bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
              Session Master
           </p>
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none" />
    </div>
  );
}

export default ActivityHeatMap;
