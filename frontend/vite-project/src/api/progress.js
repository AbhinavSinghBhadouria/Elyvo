// api/progress.js
import axiosInstance from "../lib/axios";

export const progressApi = {
  /**
   * Returns all progress records for the authenticated user.
   * Response: { progress: [{ problemId, solved, attempts, code }] }
   */
  getUserProgress: async () => {
    const response = await axiosInstance.get("/progress");
    return response.data;
  },

  /**
   * Returns progress for one specific problem.
   * Response: { progress: { problemId, solved, attempts, code } }
   */
  getProblemProgress: async (problemId) => {
    const response = await axiosInstance.get(`/progress/${problemId}`);
    return response.data;
  },

  /**
   * Upserts progress for a problem.
   * Body: { solved?, code?, language? }
   * Response: { msg, progress }
   */
  saveProblemProgress: async (problemId, data) => {
    const response = await axiosInstance.post(`/progress/${problemId}`, data);
    return response.data;
  },
};
