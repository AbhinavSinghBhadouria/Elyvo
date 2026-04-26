import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useActiveSessions, useCreateSession, useMyRecentSessions, useEndSession } from "../hooks/useSessions";

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import ActivityHeatMap from "../components/ActivityHeatMap";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";
import JoinByCodeModal from "../components/JoinByCodeModal";
import DailyRoast from "../components/DailyRoast";
import { ShieldCheck, Target, Sparkles, Zap, BrainCircuit, TrendingUp } from "lucide-react";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "", password: "" });
  const [createdSession, setCreatedSession] = useState(null);

  const createSessionMutation = useCreateSession();
  const endSessionMutation = useEndSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const handleWelcomeAction = (type) => {
    if (type === 'create') setShowCreateModal(true);
    else setShowJoinModal(true);
  };

  const handleCreateSession = async (arg = null) => {
    // If arg is a string, it's a join action from the success screen
    if (arg && typeof arg === 'string') {
       navigate(`/session/${arg}`);
       return;
    }

    // Otherwise it's a create action
    try {
      const { session } = await createSessionMutation.mutateAsync(roomConfig);
      setCreatedSession(session);
      toast.success("Workspace deployed successfully!");
    } catch (error) {
      console.error("Failed to create session:", error);
      toast.error(error.response?.data?.msg || "Failed to launch workspace. Check your connection.");
    }
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setCreatedSession(null);
    setRoomConfig({ problem: "", difficulty: "", password: "" });
  };

  const handleEndSession = async (id) => {
    try {
      await endSessionMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to end session:", error);
    }
  };

  const isUserInSession = (session) => {
    const userId = user?.id || user?._id || user?.clerkId;
    return session.host?._id === userId || session.participant?._id === userId || 
           session.host?.clerkId === userId || session.participant?.clerkId === userId;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-active");
                }
            });
        },
        { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loadingActiveSessions, loadingRecentSessions]);

  return (
    <div className="min-h-screen bg-[#020203] text-slate-100 selection:bg-blue-500/30 font-inter">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Hero / Welcome */}
        <div className="reveal">
          <WelcomeSection onCreateSession={handleWelcomeAction} />
        </div>

        {/* Heat Map Consistency */}
        <div className="reveal">
          <ActivityHeatMap sessions={recentSessions} />
        </div>

        {/* Stats & Active Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 reveal">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
          </div>
          <div className="lg:col-span-2 reveal">
             <ActiveSessions
                sessions={activeSessions}
                isLoading={loadingActiveSessions}
                isUserInSession={isUserInSession}
                onEndSession={handleEndSession}
              />
          </div>
        </div>

        {/* History & Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          <div className="reveal">
            <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
          </div>
          
            <aside className="space-y-8 reveal">
            {/* Roadmap Card */}
            <div className="p-10 rounded-[2.5rem] premium-glass premium-border-glow relative overflow-hidden group transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute top-0 right-0 size-64 bg-blue-600/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/10 transition-colors duration-700" />
              
              <div className="flex items-center gap-3 text-blue-400 mb-10">
                 <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <TrendingUp className="size-4" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-premium">Performance Goals</span>
              </div>
              
              <h3 className="text-3xl font-extrabold mb-4 tracking-tight text-white leading-tight">Weekly <span className="text-gradient-blue">Roadmap</span></h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium opacity-80">
                {recentSessions.length > 0 
                  ? `You've completed ${recentSessions.length} sessions this week. Keep it up!`
                  : "Complete your first session this week to see your roadmap progress."}
              </p>
              
              {recentSessions.length === 0 && (
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">No Active Goals</p>
                </div>
              )}
            </div>

            {/* AI Roast Section */}
            <div className="reveal">
               <DailyRoast />
            </div>
          </aside>
        </div>
      </main>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={handleCloseCreateModal}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateSession}
        isCreating={createSessionMutation.isPending}
        createdSession={createdSession}
      />

      <JoinByCodeModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      />

      <style>{`
        .reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
            opacity: 1;
            transform: translateY(0);
        }
        .text-gradient-blue {
            background: linear-gradient(to right, #60a5fa, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .tracking-premium {
            letter-spacing: 0.2em;
        }
      `}</style>
    </div>
  );
}

export default DashboardPage;