import { Zap } from "lucide-react";

export default function Logo({ size = "md", showText = true, className = "" }) {
  const sizes = {
    sm: { icon: "size-7", box: "size-8 rounded-lg", text: "text-base" },
    md: { icon: "size-5", box: "size-10 rounded-xl", text: "text-xl" },
    lg: { icon: "size-8", box: "size-16 rounded-2xl", text: "text-3xl" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${s.box} bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20`}>
        <Zap className={`${s.icon} text-white fill-white/20`} />
      </div>
      {showText && (
        <span className={`${s.text} font-bold tracking-tight text-white`}>
          Elyvo
        </span>
      )}
    </div>
  );
}
