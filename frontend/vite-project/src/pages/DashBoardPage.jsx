import { useNavigate, Link } from "react-router-dom";
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
import { COMPANIES } from "../data/companies";
import { TrendingUp, Building2, ChevronRight, Sparkles } from "lucide-react";

const G  = "#D4AF37";
const GB = "#F5C518";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal,   setShowJoinModal]   = useState(false);
  const [roomConfig,       setRoomConfig]      = useState({ problem:"", difficulty:"", password:"" });
  const [createdSession,   setCreatedSession]  = useState(null);

  const createSessionMutation = useCreateSession();
  const endSessionMutation    = useEndSession();

  const { data: activeSessionsData,  isLoading: loadingActiveSessions  } = useActiveSessions();
  const { data: recentSessionsData,  isLoading: loadingRecentSessions  } = useMyRecentSessions();

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const handleWelcomeAction = (type) => {
    if (type === "create") setShowCreateModal(true);
    else setShowJoinModal(true);
  };

  const handleCreateSession = async (arg = null) => {
    if (arg && typeof arg === "string") { navigate(`/session/${arg}`); return; }
    try {
      const { session } = await createSessionMutation.mutateAsync(roomConfig);
      setCreatedSession(session);
      toast.success("Workspace deployed successfully!");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to launch workspace.");
    }
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setCreatedSession(null);
    setRoomConfig({ problem:"", difficulty:"", password:"" });
  };

  const handleEndSession = async (id) => {
    try { await endSessionMutation.mutateAsync(id); } catch (error) { console.error(error); }
  };

  const isUserInSession = (session) => {
    const uid = user?.id || user?._id || user?.clerkId;
    return session.host?._id === uid || session.participant?._id === uid ||
           session.host?.clerkId === uid || session.participant?.clerkId === uid;
  };

  return (
    <div className="min-h-screen text-slate-100" style={{ background:"var(--bg-main)" }}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 py-12 space-y-10">

        {/* ── Welcome Hero ───────────────────────────── */}
        <WelcomeSection onCreateSession={handleWelcomeAction} />

        {/* ── Heatmap ────────────────────────────────── */}
        <ActivityHeatMap sessions={recentSessions} />

        {/* ── Stats + Active Sessions ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          <div className="lg:col-span-1">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
          </div>
          <div className="lg:col-span-2">
            <ActiveSessions
              sessions={activeSessions}
              isLoading={loadingActiveSessions}
              isUserInSession={isUserInSession}
              onEndSession={handleEndSession}
            />
          </div>
        </div>

        {/* ── Recent History + Sidebar ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />

          <aside className="space-y-6">

            {/* ── Weekly Roadmap card ─────────────────── */}
            <div
              className="p-8 rounded-[2.5rem] relative overflow-hidden"
              style={{ background:"rgba(13,13,22,0.88)", border:"1px solid rgba(212,175,55,0.18)" }}
            >
              {/* Gold orb */}
              <div style={{ position:"absolute", top:0, right:0, width:250, height:250, background:"rgba(212,175,55,0.07)", filter:"blur(80px)", borderRadius:"50%", transform:"translate(30%,-30%)", pointerEvents:"none" }} />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div
                    className="size-9 rounded-xl flex items-center justify-center"
                    style={{ background:"rgba(212,175,55,0.10)", border:"1px solid rgba(212,175,55,0.22)" }}
                  >
                    <TrendingUp className="size-4" style={{ color:G }} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color:G }}>Performance Goals</span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-white mb-2">
                    Weekly{" "}
                    <span style={{ background:`linear-gradient(135deg, ${GB}, ${G})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                      Roadmap
                    </span>
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {recentSessions.length > 0
                      ? `You've completed ${recentSessions.length} sessions this week. Keep it up!`
                      : "Complete your first session this week to build your roadmap."}
                  </p>
                </div>

                {recentSessions.length === 0 ? (
                  <div
                    className="p-5 rounded-2xl text-center"
                    style={{ background:"rgba(212,175,55,0.04)", border:"1px dashed rgba(212,175,55,0.20)" }}
                  >
                    <Sparkles className="size-6 mx-auto mb-2" style={{ color:G, opacity:0.5 }} />
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">No Active Goals Yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[...Array(Math.min(3, recentSessions.length))].map((_, i) => (
                      <div
                        key={i}
                        className="h-2 rounded-full overflow-hidden"
                        style={{ background:"rgba(255,255,255,0.05)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width:`${Math.min(100, (i+1)*33)}%`,
                            background:`linear-gradient(90deg, ${G}, ${GB})`,
                            boxShadow:`0 0 8px rgba(212,175,55,0.30)`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Company Guides widget ───────────────── */}
            <div
              className="p-8 rounded-[2.5rem] relative overflow-hidden"
              style={{ background:"rgba(13,13,22,0.88)", border:"1px solid rgba(212,175,55,0.18)" }}
            >
              <div style={{ position:"absolute", bottom:0, left:0, width:200, height:200, background:"rgba(212,175,55,0.06)", filter:"blur(60px)", borderRadius:"50%", transform:"translate(-30%,30%)", pointerEvents:"none" }} />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-9 rounded-xl flex items-center justify-center"
                      style={{ background:"rgba(212,175,55,0.10)", border:"1px solid rgba(212,175,55,0.22)" }}
                    >
                      <Building2 className="size-4" style={{ color:G }} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color:G }}>Target Hiring</span>
                  </div>
                  <Link
                    to="/companies"
                    className="text-xs font-bold flex items-center gap-1 transition-colors"
                    style={{ color:G }}
                    onMouseEnter={(e) => e.currentTarget.style.color = GB}
                    onMouseLeave={(e) => e.currentTarget.style.color = G}
                  >
                    All <ChevronRight className="size-3" />
                  </Link>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-white mb-1">Company Guides</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Preparation roadmaps & hiring rounds for EPAM, TCS, Cognizant, LTIMindtree & more.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {COMPANIES.slice(0, 4).map((c) => (
                    <Link
                      key={c.id}
                      to={`/companies/${c.id}`}
                      className="p-3.5 rounded-xl block group transition-all duration-200"
                      style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(212,175,55,0.10)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.32)"; e.currentTarget.style.background = "rgba(212,175,55,0.06)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.10)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                    >
                      <p className="text-xs font-bold text-white group-hover:text-[#F5C518] transition-colors">{c.name}</p>
                      <p className="text-[10px] text-slate-600 mt-0.5">{c.type.split(" ")[0]}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Daily Roast ─────────────────────────── */}
            <DailyRoast />
          </aside>
        </div>
      </main>

      {/* Modals */}
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
    </div>
  );
}

export default DashboardPage;