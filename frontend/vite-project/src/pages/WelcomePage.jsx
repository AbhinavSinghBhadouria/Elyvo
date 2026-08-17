import Logo from "../components/Logo";

const WelcomePage = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white overflow-hidden" style={{ background: "var(--bg-main)" }}>

      {/* Gold ambient glow */}
      <div style={{
        position:"absolute", top:"-20%", left:"50%", transform:"translateX(-50%)",
        width:"80vw", height:"40vh",
        background:"rgba(212,175,55,0.14)",
        borderRadius:"50%",
        filter:"blur(120px)",
        animation:"pulse 2s ease-in-out infinite"
      }} />

      {/* Bottom sunrise arc */}
      <div style={{
        position:"absolute", bottom:"-100px", left:"50%", transform:"translateX(-50%)",
        width:600, height:300,
        background:"linear-gradient(to top, rgba(212,175,55,0.18), rgba(201,149,42,0.08), transparent)",
        filter:"blur(80px)",
        borderRadius:"50%",
        animation:"sunrise 3s ease-out forwards",
        opacity:0
      }} />

      {/* Horizon scan line */}
      <div style={{
        position:"absolute", zIndex:10,
        height:1,
        background:"linear-gradient(to right, transparent, #D4AF37, transparent)",
        animation:"horizonExpand 2.5s ease-in-out forwards"
      }} />

      {/* Center content */}
      <div style={{ position:"relative", zIndex:20, display:"flex", flexDirection:"column", alignItems:"center" }}>

        {/* Logo with gold halo */}
        <div style={{ position:"relative", marginBottom:32, opacity:0, animation:"floatUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s forwards" }}>
          <div style={{
            position:"absolute", inset:0,
            background:"rgba(212,175,55,0.18)",
            filter:"blur(32px)",
            borderRadius:"50%",
            transform:"scale(1.5)",
          }} />
          <div style={{ position:"relative" }}>
            <Logo size="lg" />
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign:"center", overflow:"hidden", display:"flex", flexDirection:"column", gap:16 }}>
          <h1 style={{
            fontSize:"3rem", fontWeight:900, letterSpacing:"-0.03em",
            background:"linear-gradient(135deg, #F5C518 0%, #D4AF37 55%, #A8893B 100%)",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            backgroundClip:"text",
            opacity:0,
            animation:"textReveal 1s ease-out 0.6s forwards",
          }}>
            ELYVO
          </h1>

          <div style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:16,
            opacity:0,
            animation:"textReveal 1s ease-out 0.8s forwards",
          }}>
            <span style={{ fontSize:"0.65rem", letterSpacing:"0.5em", color:"#64748b", textTransform:"uppercase" }}>Practice</span>
            <span style={{ width:4, height:4, borderRadius:"50%", background:"#D4AF37" }} />
            <span style={{ fontSize:"0.65rem", letterSpacing:"0.5em", color:"#64748b", textTransform:"uppercase" }}>Interview</span>
            <span style={{ width:4, height:4, borderRadius:"50%", background:"#A8893B" }} />
            <span style={{ fontSize:"0.65rem", letterSpacing:"0.5em", color:"#64748b", textTransform:"uppercase" }}>Succeed</span>
          </div>
        </div>

        {/* Gold progress bar */}
        <div style={{
          marginTop:48, width:128, height:2,
          background:"rgba(255,255,255,0.06)",
          borderRadius:99, overflow:"hidden",
          opacity:0, animation:"fadeIn 0.8s ease-out 1.2s forwards",
        }}>
          <div style={{
            height:"100%",
            background:"linear-gradient(to right, #A8893B, #F5C518, #D4AF37)",
            animation:"indeterminate 1.5s linear infinite",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes horizonExpand {
          0%   { width: 0%;  opacity: 0; }
          30%  { width: 40%; opacity: 1; }
          100% { width: 0%;  opacity: 0; }
        }
        @keyframes sunrise {
          0%   { bottom: -200px; opacity: 0; }
          50%  { opacity: 0.6; }
          100% { bottom: -50px;  opacity: 0.2; }
        }
        @keyframes floatUp {
          0%   { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0);    opacity: 1; }
        }
        @keyframes textReveal {
          0%   { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0);    opacity: 1; }
        }
        @keyframes indeterminate {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(50%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulse {
          0%,100% { opacity:1; }
          50%      { opacity:0.65; }
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
