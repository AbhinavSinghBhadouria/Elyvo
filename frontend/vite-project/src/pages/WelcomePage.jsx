import Logo from "../components/Logo";

const WelcomePage = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-main)] text-white overflow-hidden">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-cyan-500/20 via-violet-500/10 to-transparent blur-[80px] rounded-full opacity-0 animate-sunrise" />

      <div className="absolute z-10 w-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-horizon-expand" />

      <div className="relative z-20 flex flex-col items-center">
        <div className="relative mb-8 opacity-0 animate-float-up">
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full scale-150" />
          <div className="relative">
            <Logo size="lg" />
          </div>
        </div>

        <div className="text-center space-y-4 overflow-hidden">
          <h1 className="text-5xl font-black tracking-tight text-gradient-cyan opacity-0 animate-text-reveal">
            ELYVO
          </h1>
          <div className="flex items-center justify-center gap-4 opacity-0 animate-text-reveal delay-200">
            <span className="text-xs tracking-[0.5em] text-slate-500 uppercase">Practice</span>
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            <span className="text-xs tracking-[0.5em] text-slate-500 uppercase">Interview</span>
            <span className="w-1 h-1 rounded-full bg-violet-400" />
            <span className="text-xs tracking-[0.5em] text-slate-500 uppercase">Succeed</span>
          </div>
        </div>

        <div className="mt-12 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden opacity-0 animate-fade-in delay-500">
          <div className="h-full bg-gradient-to-r from-cyan-500 via-white to-violet-500 w-full animate-indeterminate-bar" />
        </div>
      </div>

      <style>{`
        @keyframes horizonExpand {
          0% { width: 0%; opacity: 0; }
          30% { width: 40%; opacity: 1; }
          100% { width: 0%; opacity: 0; }
        }
        .animate-horizon-expand { animation: horizonExpand 2.5s ease-in-out forwards; }
        @keyframes sunrise {
          0% { bottom: -200px; opacity: 0; }
          50% { opacity: 0.6; }
          100% { bottom: -50px; opacity: 0.2; }
        }
        .animate-sunrise { animation: sunrise 3s ease-out forwards; }
        @keyframes floatUp {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-float-up { animation: floatUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.3s; }
        @keyframes textReveal {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-text-reveal { animation: textReveal 1s ease-out forwards; animation-delay: 0.6s; }
        .delay-200 { animation-delay: 0.8s; }
        .delay-500 { animation-delay: 1.2s; }
        @keyframes indeterminate {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(100%); }
        }
        .animate-indeterminate-bar { animation: indeterminate 1.5s linear infinite; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; animation-delay: 1.2s; }
      `}</style>
    </div>
  );
};

export default WelcomePage;
