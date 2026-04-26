import { Code2Icon, LoaderIcon, PlusIcon, X, CheckCircle2, Copy, ArrowRight } from "lucide-react";
import { PROBLEMS } from "../data/problems";
import { useState } from "react";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
  createdSession = null
}) {
  const problems = PROBLEMS;
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (createdSession?.joinCode) {
      navigator.clipboard.writeText(createdSession.joinCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      <div className="relative w-full max-w-xl bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 right-0 p-8">
          {!createdSession && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/5 transition-colors text-slate-500 hover:text-white"
            >
              <X className="size-5" />
            </button>
          )}
        </div>

        <div className="p-10 md:p-14 space-y-12">
          {!createdSession ? (
            <>
              <div className="space-y-3">
                <h3 className="text-4xl font-extrabold tracking-tight text-white">New Session</h3>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">Set up your collaborative environment.</p>
              </div>

              <div className="space-y-8">
                {/* PROBLEM SELECTION */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Target Challenge
                  </label>

                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer font-bold text-lg"
                    value={roomConfig.problem}
                    onChange={(e) => {
                      const selectedProblem = problems.find((p) => p.title === e.target.value);
                      if (selectedProblem) {
                        setRoomConfig({
                          ...roomConfig,
                          difficulty: selectedProblem.difficulty,
                          problem: e.target.value,
                        });
                      }
                    }}
                  >
                    <option value="" disabled className="bg-[#0a0a0f]">
                      Select a problem...
                    </option>

                    {problems.map((problem) => (
                      <option key={problem.id} value={problem.title} className="bg-[#0a0a0f]">
                        {problem.title} — {problem.difficulty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* PASSWORD (OPTIONAL) */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center justify-between">
                    Security Key
                    <span className="text-[10px] lowercase font-medium opacity-50 italic">Optional</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter a simple key (e.g. 1234)"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold text-lg"
                    value={roomConfig.password || ""}
                    onChange={(e) => setRoomConfig({ ...roomConfig, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  className="flex-1 px-10 py-5 rounded-2xl font-extrabold text-base bg-white text-black hover:bg-blue-50 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 shadow-xl"
                  onClick={onCreateRoom}
                  disabled={isCreating || !roomConfig.problem}
                >
                  {isCreating ? (
                    <LoaderIcon className="size-6 animate-spin" />
                  ) : (
                    <PlusIcon className="size-6" />
                  )}
                  <span>{isCreating ? "Deploying..." : "Launch Workspace"}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-12 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col items-center gap-6">
                <div className="size-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                  <CheckCircle2 className="size-12 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-extrabold text-white tracking-tight">Session Ready</h3>
                  <p className="text-slate-500 font-medium text-lg italic">"Sharing is the first step to collaboration."</p>
                </div>
              </div>

              <div className="p-10 rounded-[2rem] bg-blue-600/5 border border-blue-500/10 space-y-8">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-premium text-slate-500">Your Invitation Code</p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-5xl font-black text-blue-400 tracking-tighter">{createdSession.joinCode}</span>
                    <button
                      onClick={handleCopy}
                      className={`p-3 rounded-xl transition-all ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
                    >
                      {copied ? <CheckCircle2 className="size-5" /> : <Copy className="size-5" />}
                    </button>
                  </div>
                </div>

                {createdSession.password && (
                  <div className="pt-6 border-t border-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-premium text-slate-500 mb-2">Password Protected</p>
                    <p className="text-lg font-bold text-amber-400 font-mono tracking-widest">{createdSession.password}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => onCreateRoom(createdSession._id)}
                className="w-full px-10 py-6 rounded-2xl font-extrabold text-lg bg-blue-600 text-white hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-4 shadow-2xl shadow-blue-600/20"
              >
                <span>Join Workspace Now</span>
                <ArrowRight className="size-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateSessionModal;