// controllers/codeController.js
import { ENV } from "../lib/env.js";

// ─── Language configuration ───────────────────────────────────────────────────

// Judge0 language IDs (used when JUDGE0_API_URL is configured)
const JUDGE0_LANGUAGE_ID_MAP = {
  javascript: 63, // Node.js 12.14.0
  python: 71,     // Python 3.8.1
  java: 62,       // Java 13.0.1
  cpp: 54,        // C++ GCC 9.2.0
  c: 50,          // C GCC 9.2.0
};

// Wandbox compiler names per language (free, no auth required, works reliably)
const WANDBOX_COMPILER_MAP = {
  javascript: "nodejs-head",
  python:     "cpython-3.12.3",
  java:       "openjdk-head",
  cpp:        "gcc-head",
  c:          "gcc-head-c",
};

// ─── Wandbox execution helper ─────────────────────────────────────────────────

async function runWithWandbox(language, sourceCode, stdin) {
  const compiler = WANDBOX_COMPILER_MAP[language];
  if (!compiler) {
    return { success: false, error: `Unsupported language: ${language}` };
  }

  let response;
  try {
    response = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler,
        code: sourceCode,
        stdin: stdin ?? "",
        "save": false,
      }),
    });
  } catch (networkErr) {
    return { success: false, error: `Wandbox network error: ${networkErr.message}` };
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return { success: false, error: `Wandbox error ${response.status}: ${text}` };
  }

  const data = await response.json();

  // Wandbox status: 0 = OK, non-zero = runtime error
  const compilerError = data.compiler_error || "";
  const programOutput = data.program_output || "";
  const programError  = data.program_error  || "";
  const exitCode      = data.status;

  if (compilerError) {
    return { success: false, output: "", error: compilerError };
  }

  if (exitCode !== 0 && programError) {
    return { success: false, output: programOutput, error: programError };
  }

  return { success: true, output: programOutput.trim(), error: "" };
}

// ─── Judge0 execution helper ──────────────────────────────────────────────────

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

  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ language_id: languageId, source_code: sourceCode, stdin: stdin ?? "" }),
    });
  } catch (networkErr) {
    return { success: false, error: `Judge0 network error: ${networkErr.message}` };
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return { success: false, error: `Judge0 error ${response.status}: ${text}` };
  }

  const result = await response.json();
  const status = result.status || {};
  const isAccepted = status.id === 3;
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

  return { success: true, output: stdout, error: "", time: result.time, memory: result.memory, status };
}

// ─── Main handler ─────────────────────────────────────────────────────────────

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
      // Priority 1: Judge0 (self-hosted or RapidAPI)
      console.log("🔧 Using Judge0 for code execution");
      result = await runWithJudge0(language, sourceCode, stdin);

      // If Judge0 itself failed (network / config error), fall through to Wandbox
      if (!result.success && result.error?.includes("error")) {
        console.warn("⚠️  Judge0 failed, falling back to Wandbox:", result.error);
        result = await runWithWandbox(language, sourceCode, stdin);
      }
    } else {
      // Priority 2: Wandbox (free, reliable, no API key needed)
      console.log("ℹ️  JUDGE0_API_URL not set — using Wandbox for code execution");
      result = await runWithWandbox(language, sourceCode, stdin);
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
