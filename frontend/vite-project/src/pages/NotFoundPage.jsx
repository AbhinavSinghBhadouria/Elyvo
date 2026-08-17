import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Logo from "../components/Logo";

function NotFoundPage() {
  return (
    <div className="min-h-screen mesh-bg bg-[var(--bg-main)] flex flex-col items-center justify-center px-6 text-center">
      <Logo size="lg" className="mb-12" />
      <p className="text-8xl font-black text-gradient-cyan mb-4">404</p>
      <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
      <p className="text-slate-400 max-w-md mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/" className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2">
          <Home className="size-4" /> Go Home
        </Link>
        <button onClick={() => window.history.back()} className="btn-ghost px-6 py-3 rounded-xl flex items-center gap-2">
          <ArrowLeft className="size-4" /> Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
