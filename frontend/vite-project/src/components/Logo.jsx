export default function Logo({ size = "md", showText = true, className = "" }) {
  const sizes = {
    sm: { box: "size-8",  text: "text-base",  img: "size-8"  },
    md: { box: "size-10", text: "text-xl",    img: "size-10" },
    lg: { box: "size-16", text: "text-3xl",   img: "size-16" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Logo icon — inline SVG for instant load, no img flash */}
      <div
        className={`${s.box} rounded-xl overflow-hidden shrink-0 shadow-lg`}
        style={{ boxShadow: "0 0 18px rgba(212,175,55,0.30)" }}
      >
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#0e0e18" />
              <stop offset="100%" stopColor="#131320" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#F5C518" />
              <stop offset="60%"  stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#A8893B" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Background */}
          <rect width="64" height="64" fill="url(#bgGrad)" rx="12" />
          {/* Gold border */}
          <rect x="1.5" y="1.5" width="61" height="61" fill="none"
            stroke="url(#goldGrad)" strokeWidth="1.5" rx="11" opacity="0.6" />
          {/* Curly braces {E} logo mark */}
          {/* Left brace */}
          <path
            d="M18 8 C13 8 11 10 11 14 L11 18 C11 22 9 24 6 26
               C9 28 11 30 11 34 L11 38 C11 42 13 44 18 44"
            fill="none" stroke="url(#goldGrad)" strokeWidth="2.8"
            strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          {/* Right brace */}
          <path
            d="M46 8 C51 8 53 10 53 14 L53 18 C53 22 55 24 58 26
               C55 28 53 30 53 34 L53 38 C53 42 51 44 46 44"
            fill="none" stroke="url(#goldGrad)" strokeWidth="2.8"
            strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          {/* Lightning bolt E mark centered */}
          <path
            d="M37 13 L27 28 L34 28 L27 43 L41 25 L33 25 Z"
            fill="url(#goldGrad)" filter="url(#glow)" />
          {/* Bottom wordmark line */}
          <text x="32" y="57" textAnchor="middle"
            fontFamily="'DM Sans', sans-serif" fontWeight="800"
            fontSize="8" letterSpacing="3"
            fill="url(#goldGrad)" opacity="0.9">
            ELYVO
          </text>
        </svg>
      </div>

      {showText && (
        <span
          className={`${s.text} font-extrabold tracking-tight`}
          style={{
            background: "linear-gradient(135deg, #F5C518 0%, #D4AF37 60%, #A8893B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            letterSpacing: "-0.03em",
          }}
        >
          Elyvo
        </span>
      )}
    </div>
  );
}
