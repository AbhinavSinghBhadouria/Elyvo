const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
    javascript: { language: "javascript", version: "18.15.0" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" },
    cpp: { language: "c++", version: "10.2.0" },
    c: { language: "c", version: "10.2.0" },
};

/**
 * Auto-import templates for languages that commonly need them
 */
const AUTO_IMPORTS = {
    java: `import java.util.*;
import java.io.*;
import java.math.*;

`,
    cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
#include <set>
#include <queue>
#include <stack>
#include <cmath>
#include <climits>
using namespace std;

`
};

/**
 * Intelligently wraps code with necessary imports if missing
 * @param {string} language - programming language
 * @param {string} code - user's source code
 * @returns {string} - wrapped code with imports
 */
function wrapCodeWithImports(language, code) {
    const trimmedCode = code.trim();
    
    if (language === 'java') {
        // Check if imports already exist
        const hasImports = trimmedCode.match(/^\s*import\s+/m);
        
        if (!hasImports) {
            // Add imports at the beginning
            return AUTO_IMPORTS.java + trimmedCode;
        }
        return code;
    }
    
    if (language === 'cpp') {
        // Check if includes already exist
        const hasIncludes = trimmedCode.match(/^\s*#include\s+/m);
        
        if (!hasIncludes) {
            return AUTO_IMPORTS.cpp + trimmedCode;
        }
        return code;
    }
    
    return code;
}

/**
 * Execute code on Piston API
 * @param {string} language - programming language
 * @param {string} code - source code to be executed (must include main function/global scope)
 * @param {string} stdin - input string to be fed to the program (standard input)
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code, stdin = "") {
    try {
        const languageConfig = LANGUAGE_VERSIONS[language];
        if (!languageConfig) {
            return {
                success: false,
                error: `Language ${language} is not supported.`
            };
        }

        // Wrap code with imports if needed
        const wrappedCode = wrapCodeWithImports(language, code);

        console.log(`Executing ${language} code with input:`, stdin);

        const response = await fetch(`${PISTON_API}/execute`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language: languageConfig.language,
                version: languageConfig.version,
                files: [
                    {
                        content: wrappedCode // Use wrapped code here
                    },
                ],
                stdin: stdin,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Piston API Error:", errorText);
            return {
                success: false,
                error: `HTTP error! status: ${response.status}`
            };
        }

        const data = await response.json();
        console.log("Piston response:", data);

        const output = data.run.output || "";
        const stderr = data.run.stderr || "";

        // If we have a massive error and no output, treat it as a crash
        if (stderr && !output.trim()) {
            return {
                success: false,
                output: output,
                error: stderr,
            };
        }

        return {
            success: true,
            output: output.trim() + (stderr ? "\n\nWarnings:\n" + stderr : "")
        };
    }
    catch (error) {
        console.error("Execution error:", error);
        return {
            success: false,
            error: `Failed to execute code: ${error.message}`,
        };
    }
}