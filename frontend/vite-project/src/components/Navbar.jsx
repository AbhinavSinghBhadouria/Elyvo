import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpenIcon, ChevronLeftIcon, LayoutDashboardIcon, SparklesIcon, TrophyIcon, ArrowLeft } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    const updateSolvedCount = () => {
      const saved = localStorage.getItem('solvedProblems');
      if (saved) {
        try {
          const problems = JSON.parse(saved);
          setSolvedCount(problems.length);
        } catch (e) {
          console.error('Error loading solved count:', e);
        }
      }
    };
    updateSolvedCount();
    window.addEventListener('storage', updateSolvedCount);
    window.addEventListener('solvedProblemsUpdated', updateSolvedCount);
    return () => {
      window.removeEventListener('storage', updateSolvedCount);
      window.removeEventListener('solvedProblemsUpdated', updateSolvedCount);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
        {/* LEFT - NAVIGATION */}
        <div className="flex items-center gap-2">
          {location.pathname !== "/" && (
            <button 
              onClick={() => navigate(-1)}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all text-slate-500 hover:text-white"
            >
              <ArrowLeft className="size-4" />
              <span className="text-xs font-semibold">Back</span>
            </button>
          )}
          
          <Link
            to="/problems"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200
              ${isActive("/problems") ? "text-blue-400 bg-blue-500/10" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
          >
            <BookOpenIcon className="size-4" />
            <span className="text-xs font-semibold">Problems</span>
          </Link>
        </div>

        {/* CENTER - LOGO */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 group"
        >
          <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
            <SparklesIcon className="size-5 text-white" />
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl text-white tracking-tight leading-none">
              ELYVO
            </span>
            <span className="text-[8px] tracking-[0.3em] text-slate-500 uppercase font-bold mt-1">
              PRO
            </span>
          </div>
        </Link>

        {/* RIGHT - ACTIONS */}
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200
              ${isActive("/dashboard") ? "text-white bg-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
          >
            <LayoutDashboardIcon className="size-4" />
            <span className="text-xs font-semibold hidden sm:inline">Dashboard</span>
          </Link>

          {solvedCount > 0 && (
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <TrophyIcon className="size-3 text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400">{solvedCount}</span>
            </div>
          )}

          <div className="ml-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;