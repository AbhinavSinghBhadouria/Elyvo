const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
    javascript: { language: "javascript", version: "18.15.0" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" },
    cpp: { language: "c++", version: "10.2.0" },
    c: { language: "c", version: "10.2.0" },
}

/**
 * Helper function to inject necessary imports/headers for each language
 */
function injectLanguageBoilerplate(language, code) {
    // Check if code already has imports/includes
    const hasImports = code.includes('#include') || 
                      code.includes('import ') || 
                      code.includes('from ') ||
                      code.includes('package ');
    
    if (hasImports) {
        return code; // Don't add if already present
    }

    switch(language) {
        case 'cpp':
            return `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <map>
#include <unordered_map>
#include <set>
#include <unordered_set>
#include <queue>
#include <stack>
#include <cmath>
#include <climits>
using namespace std;

${code}`;

        case 'c':
            return `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <limits.h>
#include <stdbool.h>

${code}`;

        case 'java':
            return `import java.util.*;
import java.io.*;
import java.math.*;

${code}`;

        case 'python':
            return `import math
import sys
from typing import List, Dict, Set, Tuple, Optional
from collections import defaultdict, Counter, deque
import heapq
import bisect

${code}`;

        case 'javascript':
            // JavaScript doesn't need imports for basic stuff, but we can add common patterns
            return code; // Return as-is for JavaScript

        default:
            return code;
    }
}

/**
 * 
 * @param {*} language - programming language
 * @param {*} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
    try {
        const languageConfig = LANGUAGE_VERSIONS[language];
        if (!languageConfig) {
            return {
                success: false,
                error: `Language ${language} is not supported.`
            }
        }

        // Auto-inject necessary imports/headers for all languages
        let finalCode = injectLanguageBoilerplate(language, code);

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
                        name: `main.${getFileExtension(language)}`,
                        content: finalCode  // Use finalCode with injected boilerplate
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Piston API Error:", errorText);
            return {
                success: false,
                error: `HTTP error! status: ${response.status} - ${errorText}`
            }
        }

        const data = await response.json();
        console.log("Piston response:", data);  // Debug log

        const output = data.run.output || "";
        const stderr = data.run.stderr || "";

        if (stderr) {
            return {
                success: false,
                output: output,
                error: stderr,
            }
        }

        return {
            success: true,
            output: output || "No Output"
        }
    }
    catch (error) {
        console.error("Execution error:", error);
        return {
            success: false,
            error: `Failed to execute code: ${error.message}`,
        };
    }
}

function getFileExtension(language) {
    const extension = {
        javascript: "js",
        python: "py",
        java: "java",
        cpp: "cpp",
        c: "c",
    }
    return extension[language] || "txt";
}