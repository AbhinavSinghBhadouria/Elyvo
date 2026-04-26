import axiosInstance from "../lib/axios";

export const codeApi = {
  runCode: async ({ language, sourceCode, stdin = "" }) => {
    const response = await axiosInstance.post("/code/run", {
      language,
      sourceCode,
      stdin,
    });
    return response.data;
  },
};


