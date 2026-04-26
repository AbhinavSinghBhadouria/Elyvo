import { ENV } from "../lib/env.js";

// Map frontend language keys to Judge0 language IDs
// Note: IDs depend on the Judge0 instance; these are common defaults for Judge0 CE.
const LANGUAGE_ID_MAP = {
  javascript: 63, // JavaScript (Node.js)
  python: 71,     // Python (3.x)
  java: 62,       // Java (OpenJDK)
  cpp: 54,        // C++ (GCC)
  c: 50,          // C (GCC)
};

export const runCode = async (req, res) => {
  try {
    const { language, sourceCode, stdin } = req.body || {};

    if (!language || !sourceCode) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: language and sourceCode",
      });
    }

    const languageId = LANGUAGE_ID_MAP[language];

    if (!languageId) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language: ${language}`,
      });
    }

    if (!ENV.JUDGE0_API_URL) {
      return res.status(503).json({
        success: false,
        error:
          "Judge0 is not configured. Please set JUDGE0_API_URL (and optionally JUDGE0_API_KEY/JUDGE0_API_HOST for RapidAPI).",
      });
    }

    const url = `${ENV.JUDGE0_API_URL.replace(/\/+$/, "")}/submissions?base64_encoded=false&wait=true`;

    const headers = {
      "Content-Type": "application/json",
    };

    // If RapidAPI configuration is present, add those headers
    if (ENV.JUDGE0_API_KEY && ENV.JUDGE0_API_HOST) {
      headers["X-RapidAPI-Key"] = ENV.JUDGE0_API_KEY;
      headers["X-RapidAPI-Host"] = ENV.JUDGE0_API_HOST;
    }

    // Use global fetch (Node 18+) to call Judge0
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        language_id: languageId,
        source_code: sourceCode,
        stdin: stdin ?? "",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        success: false,
        error: `Judge0 request failed with status ${response.status}: ${text}`,
      });
    }

    const result = await response.json();

    const status = result.status || {};
    const isAccepted = status.id === 3; // 3 = Accepted in Judge0

    const stdout = result.stdout || "";
    const stderr = result.stderr || "";
    const compileOutput = result.compile_output || "";

    const outputPayload = {
      success: isAccepted,
      output: stdout || "",
      error: "",
      // Extra metadata if you want to use later
      time: result.time,
      memory: result.memory,
      status: status,
    };

    if (!isAccepted) {
      outputPayload.error =
        compileOutput ||
        stderr ||
        status.description ||
        "Code execution failed for an unknown reason.";
    }

    return res.status(200).json(outputPayload);
  } catch (error) {
    console.error("Error running code via Judge0:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error while running code.",
    });
  }
};
