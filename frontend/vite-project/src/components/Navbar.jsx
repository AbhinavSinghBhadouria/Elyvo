import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpenIcon, LayoutDashboardIcon, TrophyIcon, ArrowLeft, Building2, Menu, X } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import Logo from "./Logo";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname.startsWith(path);
  const [solvedCount, setSolvedCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateSolvedCount = () => {
      const saved = localStorage.getItem("solvedProblems");
      if (saved) {
        try {
          setSolvedCount(JSON.parse(saved).length);
        } catch { /* ignore */ }
      }
    };
    updateSolvedCount();
    window.addEventListener("storage", updateSolvedCount);
    window.addEventListener("solvedProblemsUpdated", updateSolvedCount);
    return () => {
      window.removeEventListener("storage", updateSolvedCount);
      window.removeEventListener("solvedProblemsUpdated", updateSolvedCount);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/problems", label: "Problems", icon: BookOpenIcon },
    { to: "/companies", label: "Companies", icon: Building2 },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg-main)]/80 backdrop-blur-2xl border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-2">
          {location.pathname !== "/" && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-all text-slate-500 hover:text-white mr-1"
            >
              <ArrowLeft className="size-4" />
              <span className="text-xs font-medium hidden sm:inline">Back</span>
            </button>
          )}
          <Link to="/" className="md:hidden">
            <Logo size="sm" />
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.slice(0, 2).map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(to)
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Center logo — desktop */}
        <Link to="/" className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <Logo />
        </Link>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              isActive("/dashboard")
                ? "text-cyan-400 bg-cyan-500/10"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutDashboardIcon className="size-4" />
            Dashboard
          </Link>

          {solvedCount > 0 && (
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <TrophyIcon className="size-3.5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">{solvedCount}</span>
            </div>
          )}

          <div className="ml-1">
            <UserButton afterSignOutUrl="/" />
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-slate-400"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-[var(--bg-surface)] px-4 py-3 space-y-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(to) ? "text-cyan-400 bg-cyan-500/10" : "text-slate-400"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
