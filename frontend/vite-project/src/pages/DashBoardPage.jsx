import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions";

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user.id) return false;

    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
  };

  return (
    <>
      <div className="relative min-h-screen bg-[#03030b] text-white grid-overlay">
        <div className="absolute inset-0 opacity-50 blur-3xl pointer-events-none mix-blend-screen" />
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

        <div className="max-w-7xl mx-auto px-6 pb-20 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
            <ActiveSessions
              sessions={activeSessions}
              isLoading={loadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
            </div>
            <div className="glass-panel rounded-3xl p-6 border border-white/5">
              <h3 className="text-xl font-semibold mb-4">Weekly Focus</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Tackle at least two collaborative sessions and one solo dry-run problem each day.
                Pair with a mentor on Fridays to review your transcripts.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/80">
                {["Live coding warm-up", "Mock system design", "Behavioural check-in"].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/5"
                    >
                      <span className="size-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;