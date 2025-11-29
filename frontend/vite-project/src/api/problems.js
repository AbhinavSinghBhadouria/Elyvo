import axiosInstance from "../lib/axios";

export const problemsApi = {
  getAllProblems: async (params = {}) => {
    const response = await axiosInstance.get("/problems", {
      params: {
        limit: 1000, // Set high limit to get all problems
        ...params
      }
    });
    return response.data;
  },

  getProblemById: async (id) => {
    const response = await axiosInstance.get(`/problems/${id}`);
    return response.data;
  },

  getProblemCategories: async () => {
    const response = await axiosInstance.get("/problems/meta/categories");
    return response.data;
  },
};
