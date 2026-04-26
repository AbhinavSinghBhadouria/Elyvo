import axiosInstance from "../lib/axios";

export const chatApi = {
  getToken: async () => {
    try {
      const response = await axiosInstance.get("/chat/token");
      return response.data;
    } catch (error) {
      console.error("Error fetching stream token:", error);
      throw error;
    }
  }
};
