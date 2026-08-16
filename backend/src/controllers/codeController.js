// controllers/codeController.js
import { ENV } from "../lib/env.js";

// ─── Language config ───────────────────────────────────────────────────────────

// Judge0 language IDs (used when JUDGE0_API_URL is configured)
const JUDGE0_LANGUAGE_ID_MAP = {
  javascript: 63, // JavaScript (Node.js 12.14.0)
  python: 71,     // Python (3.8.1)
  java: 62,       // Java (OpenJDK 13.0.1)
  cpp: 54,        // C++ (GCC 9.2.0)
  c: 50,          // C (GCC 9.2.0)
};

// Piston runtime identifiers (fallback — free, no key required)
const PISTON_LANGUAGE_MAP = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
  cpp: { language: "c++", version: "10.2.0" },
  c: { language: "c", version: "10.2.0" },
};

const PISTON_API = "https://emkc.org/api/v2/piston";

// ─── Piston execution helper ───────────────────────────────────────────────────

async function runWithPiston(language, sourceCode, stdin) {
  const config = PISTON_LANGUAGE_MAP[language];
  if (!config) {
    return { success: false, error: `Unsupported language: ${language}` };
  }

  const response = await fetch(`${PISTON_API}/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: config.language,
      version: config.version,
      files: [{ content: sourceCode }],
      stdin: stdin ?? "",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return { success: false, error: `Piston error ${response.status}: ${text}` };
  }

  const data = await response.json();
  const stdout = data.run?.stdout || "";
  const stderr = data.run?.stderr || "";
  const exitCode = data.run?.code;

  // Compilation failure
  if (data.compile && data.compile.code !== 0) {
    return {
      success: false,
      output: "",
      error: data.compile.stderr || data.compile.output || "Compilation failed",
    };
  }

  // Runtime error
  if (exitCode !== 0 && stderr) {
    return { success: false, output: stdout, error: stderr };
  }

  return { success: true, output: stdout.trim(), error: "" };
}

// ─── Judge0 execution helper ───────────────────────────────────────────────────

async function runWithJudge0(language, sourceCode, stdin) {
  const languageId = JUDGE0_LANGUAGE_ID_MAP[language];
  if (!languageId) {
    return { success: false, error: `Unsupported language: ${language}` };
  }

  const url = `${ENV.JUDGE0_API_URL.replace(/\/+$/, "")}/submissions?base64_encoded=false&wait=true`;
  const headers = { "Content-Type": "application/json" };

  if (ENV.JUDGE0_API_KEY && ENV.JUDGE0_API_HOST) {
    headers["X-RapidAPI-Key"] = ENV.JUDGE0_API_KEY;
    headers["X-RapidAPI-Host"] = ENV.JUDGE0_API_HOST;
  }

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
    return { success: false, error: `Judge0 error ${response.status}: ${text}` };
  }

  const result = await response.json();
  const status = result.status || {};
  const isAccepted = status.id === 3; // 3 = Accepted
  const stdout = result.stdout || "";
  const stderr = result.stderr || "";
  const compileOutput = result.compile_output || "";

  if (!isAccepted) {
    return {
      success: false,
      output: stdout,
      error: compileOutput || stderr || status.description || "Execution failed",
      time: result.time,
      memory: result.memory,
      status,
    };
  }

  return {
    success: true,
    output: stdout,
    error: "",
    time: result.time,
    memory: result.memory,
    status,
  };
}

// ─── Main handler ──────────────────────────────────────────────────────────────

export const runCode = async (req, res) => {
  try {
    const { language, sourceCode, stdin } = req.body || {};

    if (!language || !sourceCode) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: language and sourceCode",
      });
    }

    let result;

    if (ENV.JUDGE0_API_URL) {
      // Use Judge0 when configured (supports RapidAPI or self-hosted)
      result = await runWithJudge0(language, sourceCode, stdin);
    } else {
      // Fallback: use the free public Piston API (no API key needed)
      console.log("ℹ️  JUDGE0_API_URL not set — falling back to Piston API");
      result = await runWithPiston(language, sourceCode, stdin);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error running code:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error while running code.",
    });
  }
};
