const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
    javascript: { language: "javascript", version: "18.15.0" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" },
    cpp: { language: "c++", version: "10.2.0" },
    c: { language: "c", version: "10.2.0" },
};

/**
 * Auto-import templates - only adds if completely missing
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

`
};

/**
 * Simple helper to add imports only if completely missing
 */
function addImportsIfMissing(language, code) {
    const trimmedCode = code.trim();
    
    if (language === 'java') {
        // Only add imports if there are NO import statements at all
        const hasAnyImport = /^\s*import\s+/m.test(trimmedCode);
        if (!hasAnyImport) {
            return AUTO_IMPORTS.java + trimmedCode;
        }
    }
    
    if (language === 'cpp') {
        // Only add includes if there are NO include statements at all
        const hasAnyInclude = /^\s*#include\s+/m.test(trimmedCode);
        if (!hasAnyInclude) {
            return AUTO_IMPORTS.cpp + trimmedCode;
        }
    }
    
    return code;
}

/**
 * Execute code on Piston API
 * @param {string} language - programming language
 * @param {string} code - complete source code with main/entry point
 * @param {string} stdin - standard input for the program
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

        // Add imports if missing
        const finalCode = addImportsIfMissing(language, code);

        console.log(`Executing ${language} code with stdin:`, stdin);

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
                        content: finalCode
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

        // Check for compilation errors
        if (data.compile && data.compile.code !== 0) {
            return {
                success: false,
                output: "",
                error: data.compile.stderr || data.compile.output || "Compilation failed"
            };
        }

        // Check for runtime errors
        if (data.run.code !== 0 && stderr) {
            return {
                success: false,
                output: output,
                error: stderr
            };
        }

        return {
            success: true,
            output: output.trim()
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