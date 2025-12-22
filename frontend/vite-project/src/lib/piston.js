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
 * Intelligently wraps Java code to ensure it's executable
 * @param {string} code - user's Java code
 * @returns {string} - properly structured Java code
 */
function wrapJavaCode(code) {
    const trimmedCode = code.trim();
    
    // Check if imports already exist
    const hasImports = /^\s*import\s+/m.test(trimmedCode);
    
    // Check if it has a public Main class
    const hasPublicMainClass = /public\s+class\s+Main/m.test(trimmedCode);
    
    // Check if it has main method
    const hasMainMethod = /public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*\w+\s*\)/m.test(trimmedCode);
    
    let wrappedCode = '';
    
    // Add imports if missing
    if (!hasImports) {
        wrappedCode = AUTO_IMPORTS.java;
    }
    
    // If it already has public Main class with main method, return as is
    if (hasPublicMainClass && hasMainMethod) {
        return wrappedCode + trimmedCode;
    }
    
    // If it has main method but not in public Main class
    if (hasMainMethod && !hasPublicMainClass) {
        // Try to fix by replacing class name with Main
        const fixedCode = trimmedCode.replace(
            /(class\s+)(Main|Solution)(\s*\{)/,
            'public class Main$3'
        );
        return wrappedCode + fixedCode;
    }
    
    // No main method - this is just a class/method definition
    // We need to wrap it
    wrappedCode += trimmedCode + '\n\n';
    wrappedCode += `public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Your code runs here
        sc.close();
    }
}
`;
    
    return wrappedCode;
}

/**
 * Intelligently wraps code with necessary imports if missing
 * @param {string} language - programming language
 * @param {string} code - user's source code
 * @returns {string} - wrapped code with imports and proper structure
 */
function wrapCodeWithImports(language, code) {
    const trimmedCode = code.trim();
    
    if (language === 'java') {
        return wrapJavaCode(trimmedCode);
    }
    
    if (language === 'cpp') {
        // Check if includes already exist
        const hasIncludes = /^\s*#include\s+/m.test(trimmedCode);
        
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
        // Uncomment to debug: console.log('Wrapped code:', wrappedCode);

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
                        content: wrappedCode
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