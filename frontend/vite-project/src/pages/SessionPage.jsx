import { useUser } from "@clerk/clerk-react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEndSession, useJoinSession, useSessionById, useUpdateSessionProblem } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import {
  Loader2Icon, LogOutIcon, PhoneOffIcon,
  RefreshCwIcon, SearchIcon, XIcon,
  ChevronRightIcon, UsersIcon
} from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import { codeApi } from "../api/code";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";
import { aiApi } from "../api/ai";
import AIAssistantModal from "../components/AIAssistantModal";
import toast from "react-hot-toast";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  // Change Problem modal state (host only)
  const [showChangeProblem, setShowChangeProblem] = useState(false);
  const [problemSearch, setProblemSearch] = useState("");
  const [selectedNewProblem, setSelectedNewProblem] = useState(null);

  // AI Assistant State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiModalTitle, setAiModalTitle] = useState("");
  const [aiModalContent, setAiModalContent] = useState("");
  const [aiIsLoading, setAiIsLoading] = useState(false);

  const handleGetHint = async () => {
    if (!problemData) return;
    setAiModalTitle("Intelligent Hint");
    setAiModalContent("");
    setAiIsLoading(true);
    setAiModalOpen(true);
    try {
      const data = await aiApi.getHint(problemData.description);
      setAiModalContent(data.response);
    } catch {
      setAiModalContent("Sorry, I couldn't generate a hint at this time. Please try again.");
      toast.error("Failed to connect to AI Assistant");
    } finally {
      setAiIsLoading(false);
    }
  };

  const handleGetReview = async () => {
    if (!problemData || !code) return;
    setAiModalTitle("Code Review");
    setAiModalContent("");
    setAiIsLoading(true);
    setAiModalOpen(true);
    try {
      const data = await aiApi.getCodeReview(problemData.description, code, selectedLanguage);
      setAiModalContent(data.response);
    } catch {
      setAiModalContent("Sorry, I couldn't perform a code review at this time. Please try again.");
      toast.error("Failed to connect to AI Assistant");
    } finally {
      setAiIsLoading(false);
    }
  };

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);
  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();
  const updateProblemMutation = useUpdateSessionProblem(id);

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  // Look up problem data from local static list by title
  const problemData = useMemo(
    () => session?.problem ? PROBLEMS.find((p) => p.title === session.problem) : null,
    [session?.problem]
  );

  // Initialize code with starter code when problem first loads
  useEffect(() => {
    if (!problemData) return;
    const starter = problemData.starterCode?.[selectedLanguage] || `// ${session?.problem || "Problem"}\n// Write your ${selectedLanguage} solution here\n`;
    setCode(starter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemData?.id]); // Only re-run when the problem changes (not on language change)

  // Filtered problem list for the Change Problem modal
  const filteredProblems = useMemo(() => {
    const q = problemSearch.toLowerCase();
    return PROBLEMS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.difficulty.toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
    ).slice(0, 50);
  }, [problemSearch]);

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  // Auto-join session if user is not already a participant and not the host
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;
    joinSessionMutation.mutate(id, { onSuccess: refetch });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?._id, user?.id, loadingSession]);

  // Redirect participant when session ends
  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session?.status, loadingSession, navigate]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  // FIX: CodeEditorPanel calls onLanguageChange(lang) — a plain string, not an event
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    // Load starter code for the new language
    const starter = problemData?.starterCode?.[lang] || `// Write your ${lang} solution here\n`;
    setCode(starter);
    setOutput(null);
  };

  const handleCodeChange = (value) => setCode(value);

  const handleRunCode = async () => {
    try {
      setIsRunning(true);
      setOutput(null);
      const result = await codeApi.runCode({
        language: selectedLanguage,
        sourceCode: code,
        stdin: "",
      });
      setOutput(result);
    } catch (error) {
      const apiError = error?.response?.data;
      setOutput({
        success: false,
        output: apiError?.output || "",
        error: apiError?.error || apiError?.msg || "Failed to run code. Please try again.",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this session? All participants will be notified.")) {
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  const handleChangeProblem = async () => {
    if (!selectedNewProblem) return;
    try {
      await updateProblemMutation.mutateAsync({
        problem: selectedNewProblem.title,
        difficulty: selectedNewProblem.difficulty,
      });
      // Reset editor to new problem's starter code
      const starter = selectedNewProblem.starterCode?.[selectedLanguage] || `// ${selectedNewProblem.title}\n// Write your ${selectedLanguage} solution here\n`;
      setCode(starter);
      setOutput(null);
      setShowChangeProblem(false);
      setSelectedNewProblem(null);
      setProblemSearch("");
      toast.success(`✅ Problem changed to "${selectedNewProblem.title}"`);
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Failed to change problem");
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────

  if (loadingSession) {
    return (
      <div className="h-screen bg-[#03030b] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary" />
          <p className="text-base-content/60 text-sm font-medium">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-screen bg-[#03030b] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl font-bold text-white">Session not found</p>
          <button onClick={() => navigate("/dashboard")} className="btn btn-primary btn-sm">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="h-screen bg-[#03030b] text-white flex flex-col overflow-hidden">
      <Navbar />

      {/* ── Top Bar ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 bg-[#0d0d14] border-b border-white/5">
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 text-xs font-bold text-white/40 hover:text-white/80 transition-colors uppercase tracking-widest flex-shrink-0"
          >
            ← Back
          </button>
          <div className="h-5 w-px bg-white/10 flex-shrink-0" />
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-base font-bold text-white truncate">{session.problem}</h1>
            <span className={`badge badge-sm flex-shrink-0 ${getDifficultyBadgeClass(session.difficulty)}`}>
              {session.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40 flex-shrink-0">
            <UsersIcon className="w-3.5 h-3.5" />
            <span>{session.participant ? "2/2" : "1/2"}</span>
          </div>
        </div>

        {/* Host admin controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {isHost && session.status === "active" && (
            <>
              <button
                onClick={() => setShowChangeProblem(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400 hover:bg-blue-500/20 transition-all text-xs font-bold uppercase tracking-widest"
              >
                <RefreshCwIcon className="w-3.5 h-3.5" />
                Change Problem
              </button>
              <button
                onClick={handleEndSession}
                disabled={endSessionMutation.isPending}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 hover:bg-rose-500/20 transition-all text-xs font-bold uppercase tracking-widest disabled:opacity-50"
              >
                {endSessionMutation.isPending
                  ? <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
                  : <LogOutIcon className="w-3.5 h-3.5" />}
                End Session
              </button>
            </>
          )}
          {!isHost && (
            <span className="text-xs text-white/30 font-medium">
              Host: {session.host?.name}
            </span>
          )}
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="flex-1 min-h-0">
        <PanelGroup direction="horizontal">

          {/* LEFT — Problem description */}
          <Panel defaultSize={28} minSize={20} maxSize={40}>
            <div className="h-full flex flex-col bg-[#07070f] border-r border-white/5 overflow-y-auto">
              {problemData ? (
                <div className="p-6 space-y-6">
                  {/* Title */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`badge badge-sm ${getDifficultyBadgeClass(session.difficulty)}`}>
                        {session.difficulty}
                      </span>
                      {problemData.category && (
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{problemData.category}</span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-white leading-tight">{problemData.title}</h2>
                  </div>

                  {/* Description — strip markdown symbols for clean display */}
                  <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                    <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Description</h3>
                    <p className="text-sm text-white/75 leading-relaxed whitespace-pre-line">
                      {problemData.description
                        .replace(/\*\*(.*?)\*\*/g, "$1")
                        .replace(/`(.*?)`/g, "$1")
                        .replace(/#{1,3}\s/g, "")
                        .trim()}
                    </p>
                  </div>

                  {/* Examples */}
                  {problemData.examples?.length > 0 && (
                    <div>
                      <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Examples</h3>
                      <div className="space-y-3">
                        {problemData.examples.slice(0, 2).map((ex, i) => (
                          <div key={i} className="bg-white/[0.02] rounded-xl p-4 border border-white/5 font-mono text-xs space-y-2">
                            <div className="flex gap-2">
                              <span className="text-primary font-bold w-14 flex-shrink-0">Input:</span>
                              <span className="text-white/70 break-all">{ex.input}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-emerald-400 font-bold w-14 flex-shrink-0">Output:</span>
                              <span className="text-white/70">{ex.output}</span>
                            </div>
                            {ex.explanation && (
                              <p className="text-white/40 text-[11px] border-t border-white/5 pt-2 font-sans">{ex.explanation}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Constraints */}
                  {problemData.constraints?.length > 0 && (
                    <div>
                      <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Constraints</h3>
                      <ul className="space-y-1.5">
                        {problemData.constraints.map((c, i) => (
                          <li key={i} className="flex gap-2 text-xs text-white/60">
                            <ChevronRightIcon className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                            <code className="font-mono">{c}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-6 text-center">
                  <div className="space-y-2">
                    <p className="text-white/40 text-sm font-medium">{session.problem}</p>
                    <p className="text-white/20 text-xs">Problem details unavailable</p>
                  </div>
                </div>
              )}
            </div>
          </Panel>

          <PanelResizeHandle className="w-[3px] bg-white/5 hover:bg-primary/40 transition-colors cursor-col-resize" />

          {/* CENTER — Code editor + output */}
          <Panel defaultSize={40} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={72} minSize={40}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={handleCodeChange}
                  onRunCode={handleRunCode}
                  onGetHint={handleGetHint}
                  onGetReview={handleGetReview}
                />
              </Panel>

              <PanelResizeHandle className="h-[3px] bg-white/5 hover:bg-primary/40 transition-colors cursor-row-resize" />

              <Panel defaultSize={28} minSize={15}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-[3px] bg-white/5 hover:bg-primary/40 transition-colors cursor-col-resize" />

          {/* RIGHT — Video + Chat */}
          <Panel defaultSize={32} minSize={25}>
            <div className="h-full bg-[#07070f] overflow-hidden">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto animate-pulse">
                      <Loader2Icon className="w-8 h-8 text-primary animate-spin" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Connecting...</p>
                      <p className="text-xs text-white/40 mt-1">Setting up video call</p>
                    </div>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center p-6">
                  <div className="text-center space-y-4 max-w-xs">
                    <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
                      <PhoneOffIcon className="w-8 h-8 text-rose-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Video Unavailable</p>
                      <p className="text-xs text-white/40 mt-2 leading-relaxed">
                        Stream API key not configured.<br />
                        Add <code className="text-primary">VITE_STREAM_API_KEY</code> to your<br />
                        environment variables on Render.
                      </p>
                    </div>
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Code editor is fully functional ✓</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>

        </PanelGroup>
      </div>

      {/* ── AI Modal ── */}
      <AIAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        title={aiModalTitle}
        content={aiModalContent}
        isLoading={aiIsLoading}
      />

      {/* ── Change Problem Modal (host only) ── */}
      {showChangeProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0d0d14] border border-white/10 rounded-2xl shadow-2xl w-full max-w-xl flex flex-col max-h-[80vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div>
                <h2 className="text-lg font-bold text-white">Change Problem</h2>
                <p className="text-xs text-white/40 mt-0.5">Participant will auto-update within 5 seconds.</p>
              </div>
              <button
                onClick={() => { setShowChangeProblem(false); setSelectedNewProblem(null); setProblemSearch(""); }}
                className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-white/5">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search by title, difficulty, category..."
                  value={problemSearch}
                  onChange={(e) => setProblemSearch(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all"
                  autoFocus
                />
              </div>
            </div>

            {/* Problem list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
              {filteredProblems.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => setSelectedNewProblem(problem)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                    selectedNewProblem?.id === problem.id
                      ? "border-primary/50 bg-primary/10"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-sm text-white truncate">{problem.title}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg flex-shrink-0 ${
                      problem.difficulty === "Easy" ? "text-emerald-400 bg-emerald-500/10" :
                      problem.difficulty === "Medium" ? "text-amber-400 bg-amber-500/10" : "text-rose-400 bg-rose-500/10"
                    }`}>{problem.difficulty}</span>
                  </div>
                  {problem.category && (
                    <p className="text-[11px] text-white/30 mt-0.5">{problem.category}</p>
                  )}
                </button>
              ))}
              {filteredProblems.length === 0 && (
                <p className="text-center text-sm text-white/30 py-10">No problems found</p>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between gap-3">
              <span className="text-xs text-white/40">
                {selectedNewProblem
                  ? <>Selected: <strong className="text-white">{selectedNewProblem.title}</strong></>
                  : "Select a problem above"}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setShowChangeProblem(false); setSelectedNewProblem(null); setProblemSearch(""); }}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangeProblem}
                  disabled={!selectedNewProblem || updateProblemMutation.isPending}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {updateProblemMutation.isPending && <Loader2Icon className="w-3.5 h-3.5 animate-spin" />}
                  Confirm Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionPage;