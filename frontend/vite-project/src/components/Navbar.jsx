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
        try { setSolvedCount(JSON.parse(saved).length); } catch { /* ignore */ }
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

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { to: "/problems",  label: "Problems",  icon: BookOpenIcon },
    { to: "/companies", label: "Companies", icon: Building2 },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  ];

  const linkClass = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive(path)
        ? "text-[#D4AF37] bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.20)]"
        : "text-slate-400 hover:text-[#F5C518] hover:bg-[rgba(212,175,55,0.07)]"
    }`;

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(9,9,15,0.82)",
        backdropFilter: "blur(24px) saturate(160%)",
        borderColor: "rgba(212,175,55,0.10)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        {/* Left nav links */}
        <div className="flex items-center gap-1">
          {location.pathname !== "/" && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all text-slate-500 hover:text-[#D4AF37] mr-1"
              style={{ hover: "bg: rgba(212,175,55,0.06)" }}
            >
              <ArrowLeft className="size-4" />
              <span className="text-xs font-medium hidden sm:inline">Back</span>
            </button>
          )}
          {/* Mobile logo */}
          <Link to="/" className="md:hidden">
            <Logo size="sm" />
          </Link>
          {/* Desktop left links */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/problems"  className={linkClass("/problems")}>
              <BookOpenIcon className="size-4" /> Problems
            </Link>
            <Link to="/companies" className={linkClass("/companies")}>
              <Building2 className="size-4" /> Companies
            </Link>
          </div>
        </div>

        {/* Center logo — desktop */}
        <Link to="/" className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <Logo />
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className={`hidden md:flex ${linkClass("/dashboard")}`}>
            <LayoutDashboardIcon className="size-4" /> Dashboard
          </Link>

          {solvedCount > 0 && (
            <div
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border"
              style={{
                background: "rgba(212,175,55,0.08)",
                borderColor: "rgba(212,175,55,0.25)",
              }}
            >
              <TrophyIcon className="size-3.5" style={{ color: "#D4AF37" }} />
              <span className="text-xs font-bold" style={{ color: "#D4AF37" }}>{solvedCount}</span>
            </div>
          )}

          <div className="ml-1">
            <UserButton afterSignOutUrl="/" />
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-[#D4AF37]"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-3 space-y-1"
          style={{
            background: "var(--bg-surface)",
            borderColor: "rgba(212,175,55,0.10)",
          }}
        >
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className={linkClass(to)}>
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
