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

