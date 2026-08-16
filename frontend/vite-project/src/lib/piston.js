// lib/piston.js
// All code execution is now routed through the backend /api/code endpoint.
// This prevents direct browser calls to external APIs (Piston, Judge0, etc.)
// and keeps all execution logic centralized and configurable server-side.

import axiosInstance from "./axios";

/**
 * Auto-import templates - prepended only when completely missing from user code.
 */
const AUTO_IMPORTS = {
  java: `import java.util.*;
import java.io.*;

`,
  cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <map>
#include <set>
#include <string>
using namespace std;

`,
};

function addImportsIfMissing(language, code) {
  const trimmedCode = code.trim();

  if (language === "java") {
    if (!/^\s*import\s+/m.test(trimmedCode)) {
      return AUTO_IMPORTS.java + trimmedCode;
    }
  }

  if (language === "cpp") {
    if (!/^\s*#include\s+/m.test(trimmedCode)) {
      return AUTO_IMPORTS.cpp + trimmedCode;
    }
  }

  return code;
}

/**
 * Execute code via the Elyvo backend (/api/code).
 * The backend will use Judge0 if configured, otherwise fall back to Wandbox.
 *
 * @param {string} language - 'javascript' | 'python' | 'java' | 'cpp' | 'c'
 * @param {string} code - source code
 * @param {string} stdin - standard input
 * @returns {Promise<{success: boolean, output?: string, error?: string}>}
 */
export async function executeCode(language, code, stdin = "") {
  try {
    const languageConfig = {
      javascript: true,
      python: true,
      java: true,
      cpp: true,
      c: true,
    };

    if (!languageConfig[language]) {
      return { success: false, error: `Language ${language} is not supported.` };
    }

    const finalCode = addImportsIfMissing(language, code);

    const response = await axiosInstance.post("/code/run", {
      language,
      sourceCode: finalCode,
      stdin,
    });

    return response.data;
  } catch (error) {
    const apiError = error?.response?.data;
    return {
      success: false,
      error:
        apiError?.error ||
        apiError?.msg ||
        `Failed to execute code: ${error.message}`,
    };
  }
}