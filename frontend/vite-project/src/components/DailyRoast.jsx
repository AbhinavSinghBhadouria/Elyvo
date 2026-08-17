import { useState, useEffect } from "react";
import { aiApi } from "../api/ai";
import { Sparkles, Quote, RefreshCcw } from "lucide-react";

const G  = "#D4AF37";
const GB = "#F5C518";

function DailyRoast() {
  const [roast, setRoast]       = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchRoast = async () => {
    try {
      setIsLoading(true);
      const data = await aiApi.getDailyRoast();
      setRoast(data.response);
    } catch {
      setRoast("I'd roast your code, but the compiler already did that for me.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchRoast(); }, []);

  return (
    <div
      className="relative overflow-hidden rounded-[2.5rem] p-8 transition-all duration-300"
      style={{
        background: "rgba(13,13,22,0.88)",
        border: "1px solid rgba(212,175,55,0.18)",
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)"}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(212,175,55,0.18)"}
    >
      {/* Ambient gold top-right glow */}
      <div style={{
        position:"absolute", top:0, right:0,
        width:200, height:200,
        background:"rgba(212,175,55,0.07)",
        filter:"blur(60px)",
        borderRadius:"50%",
        transform:"translate(30%,-30%)",
        pointerEvents:"none",
      }} />

      <div className="relative z-10 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="size-9 rounded-xl flex items-center justify-center"
              style={{ background:"rgba(212,175,55,0.10)", border:"1px solid rgba(212,175,55,0.25)" }}
            >
              <Sparkles className="size-4" style={{ color:G }} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color:G }}>
              Groq AI Roast
            </span>
          </div>

          <button
            onClick={fetchRoast}
            disabled={isLoading}
            className="p-2 rounded-lg transition-all duration-300 active:scale-90 disabled:opacity-40"
            style={{ color:"#64748b" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = G; e.currentTarget.style.background = "rgba(212,175,55,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}
            title="Get a new roast"
          >
            <RefreshCcw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Quote body */}
        <div className="relative">
          <Quote
            className="size-10 absolute -top-3 -left-2"
            style={{ color:"rgba(212,175,55,0.12)" }}
          />

          {isLoading ? (
            <div className="py-5 space-y-3 pl-5">
              <div className="h-3.5 rounded-full animate-pulse" style={{ width:"75%", background:"rgba(212,175,55,0.07)" }} />
              <div className="h-3.5 rounded-full animate-pulse" style={{ width:"50%", background:"rgba(212,175,55,0.05)" }} />
            </div>
          ) : (
            <p
              className="text-lg font-bold text-slate-200 leading-relaxed italic pl-5"
              style={{ borderLeft:`2px solid rgba(212,175,55,0.35)` }}
            >
              "{roast}"
            </p>
          )}
        </div>

        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest text-right">
          — Elyvo Sarcastic AI
        </p>
      </div>

      {/* Inner border */}
      <div style={{ position:"absolute", inset:0, borderRadius:"inherit", border:"1px solid rgba(212,175,55,0.07)", pointerEvents:"none" }} />
    </div>
  );
}

export default DailyRoast;
