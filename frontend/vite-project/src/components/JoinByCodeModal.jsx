import { Hash, Key, LoaderIcon, LogIn, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";

function JoinByCodeModal({ isOpen, onClose }) {
  const [joinCode, setJoinCode] = useState("");
  const [password, setPassword] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleJoin = async () => {
    if (!joinCode) {
      setError("Please enter a session code");
      return;
    }

    try {
      setIsJoining(true);
      setError("");
      const response = await axiosInstance.post("/sessions/join-by-code", {
        joinCode: joinCode.toUpperCase(),
        password,
      });
      
      const sessionId = response.data.session._id;
      navigate(`/session/${sessionId}`);
      onClose();
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to join session");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 right-0 p-6">
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-slate-500 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-10 space-y-10">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold tracking-tight text-white">Join Session</h3>
            <p className="text-slate-500 font-medium text-sm">Enter the code and password to join your team.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Hash className="size-3" /> Session Code
              </label>
              <input
                type="text"
                placeholder="e.g. ABC123"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold tracking-widest uppercase"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Key className="size-3" /> Password
              </label>
              <input
                type="password"
                placeholder="Session Password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-xs font-bold text-rose-500 bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <button 
              className="w-full px-8 py-5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20"
              onClick={handleJoin}
              disabled={isJoining}
            >
              {isJoining ? (
                <LoaderIcon className="size-5 animate-spin" />
              ) : (
                <LogIn className="size-5" />
              )}
              <span>{isJoining ? "Connecting..." : "Join Now"}</span>
            </button>
            <button 
              className="w-full py-4 rounded-xl font-bold text-xs text-slate-500 hover:text-white transition-all"
              onClick={onClose}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinByCodeModal;
