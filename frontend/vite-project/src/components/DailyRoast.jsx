import { useState, useEffect } from "react";
import { aiApi } from "../api/ai";
import { Sparkles, Loader2, Quote, RefreshCcw } from "lucide-react";

function DailyRoast() {
  const [roast, setRoast] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchRoast = async () => {
    try {
      setIsLoading(true);
      const data = await aiApi.getDailyRoast();
      setRoast(data.response);
    } catch (error) {
      setRoast("I'd roast your code, but the compiler already did that for me.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoast();
  }, []);

  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] bg-[#0a0a0f] border border-white/5 p-8 shadow-2xl transition-all duration-500 hover:border-blue-500/20">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 size-48 bg-blue-600/5 blur-[80px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-blue-400">
            <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Sparkles className="size-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Groq AI Roast</span>
          </div>
          
          <button 
            onClick={fetchRoast} 
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-all active:rotate-180 duration-500 disabled:opacity-50"
          >
            <RefreshCcw className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Quote className="size-10 text-white/5 absolute -top-4 -left-4" />
            {isLoading ? (
              <div className="py-6 space-y-3">
                <div className="h-4 w-3/4 bg-white/5 rounded-full animate-pulse" />
                <div className="h-4 w-1/2 bg-white/5 rounded-full animate-pulse" />
              </div>
            ) : (
              <p className="text-xl font-bold text-slate-200 leading-relaxed italic pl-4 border-l-2 border-blue-500/30">
                "{roast}"
              </p>
            )}
          </div>
          
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest text-right">
            — Elyvo Sarcastic AI
          </p>
        </div>
      </div>
    </div>
  );
}

export default DailyRoast;
