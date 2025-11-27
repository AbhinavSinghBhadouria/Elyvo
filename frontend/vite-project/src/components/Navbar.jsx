import { Link, useLocation } from "react-router-dom";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#05070f]/95 via-[#060016]/85 to-[#05070f]/95 backdrop-blur-2xl border-b border-white/5 shadow-[0_15px_35px_rgba(5,2,23,0.65)]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 hover:scale-[1.02] transition-transform duration-200"
        >
          <div className="size-11 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <SparklesIcon className="size-6 text-white drop-shadow-lg" />
          </div>

          <div className="flex flex-col">
            <span className="font-black text-2xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-[0.4em]">
              ELYVO
            </span>
            <span className="text-[11px] tracking-[0.6em] text-white/60 -mt-1 uppercase">
              Interview Lab
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {/* PROBLEMS PAGE LINK */}
          <Link
            to={"/problems"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 
              ${
                isActive("/problems")
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/40"
                  : "hover:bg-white/5 text-white/70 hover:text-white border border-transparent hover:border-white/10"
              }
              
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <BookOpenIcon className="size-4" />
              <span className="font-medium hidden sm:inline tracking-wide">Problems</span>
            </div>
          </Link>

          {/* DASHBORD PAGE LINK */}
          <Link
            to={"/dashboard"}
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 
              ${
                isActive("/dashboard")
                  ? "bg-gradient-to-r from-secondary to-accent text-white shadow-lg shadow-secondary/40"
                  : "hover:bg-white/5 text-white/70 hover:text-white border border-transparent hover:border-white/10"
              }
              
              `}
          >
            <div className="flex items-center gap-x-2.5">
              <LayoutDashboardIcon className="size-4" />
              <span className="font-medium hidden sm:inline tracking-wide">Dashboard</span>
            </div>
          </Link>

          <div className="ml-4 mt-1">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;