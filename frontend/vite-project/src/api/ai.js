import axiosInstance from "../lib/axios";

export const aiApi = {
  getHint: async (problemDesc) => {
    try {
      const response = await axiosInstance.post("/ai/hint", { problemDesc });
      return response.data;
    } catch (error) {
      console.error("Error fetching hint:", error);
      throw error;
    }
  },
  
  getCodeReview: async (problemDesc, userCode, language) => {
    try {
      const response = await axiosInstance.post("/ai/review", {
        problemDesc,
        userCode,
        language
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching code review:", error);
      throw error;
    }
  },
  
  getDailyRoast: async () => {
    try {
      const response = await axiosInstance.get("/ai/daily-roast");
      return response.data;
    } catch (error) {
      console.error("Error fetching daily roast:", error);
      throw error;
    }
  }
};
