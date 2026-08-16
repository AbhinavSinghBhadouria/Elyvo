import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sessionApi } from "../api/sessions";

const queryKeys = {
  active: ["sessions", "active"],
  recent: ["sessions", "recent"],
  detail: (id) => ["sessions", id],
};

export const useActiveSessions = () =>
  useQuery({
    queryKey: queryKeys.active,
    queryFn: sessionApi.getActiveSessions,
    // Poll every 10 seconds so the Live Workspace stays fresh
    refetchInterval: 10_000,
  });

export const useMyRecentSessions = () =>
  useQuery({
    queryKey: queryKeys.recent,
    queryFn: sessionApi.getMyRecentSessions,
  });

export const useSessionById = (id) =>
  useQuery({
    enabled: Boolean(id),
    queryKey: queryKeys.detail(id),
    queryFn: () => sessionApi.getSessionById(id),
    // Poll every 5 seconds so problem changes propagate to participant automatically
    refetchInterval: 5_000,
  });

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sessionApi.createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.active });
      queryClient.invalidateQueries({ queryKey: queryKeys.recent });
    },
  });
};

export const useJoinSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sessionApi.joinSession,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.active });
    },
  });
};

export const useEndSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sessionApi.endSession,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.active });
      queryClient.invalidateQueries({ queryKey: queryKeys.recent });
    },
  });
};

/**
 * useUpdateSessionProblem — host-only mutation to change the active problem.
 * On success, invalidates the session detail so the participant auto-refreshes
 * within the 5-second poll window.
 */
export const useUpdateSessionProblem = (sessionId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ problem, difficulty }) =>
      sessionApi.updateProblem(sessionId, { problem, difficulty }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(sessionId) });
    },
  });
};
