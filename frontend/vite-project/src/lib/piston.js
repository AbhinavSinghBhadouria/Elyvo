const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
    javascript: { language: "javascript", version: "18.15.0" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" },
    cpp: { language: "c++", version: "10.2.0" },
    c: { language: "c", version: "10.2.0" },
}

/**
 * Extract function/method information from code
 */
function extractFunctionInfo(language, code) {
    let functionName = null;
    let className = null;
    let returnType = null;

    switch(language) {
        case 'cpp':
            // Extract class name
            const cppClassMatch = code.match(/class\s+(\w+)/);
            className = cppClassMatch ? cppClassMatch[1] : 'Solution';
            
            // Extract method name and return type
            const cppMethodMatch = code.match(/(\w+)\s+(\w+)\s*\([^)]*\)/);
            if (cppMethodMatch) {
                returnType = cppMethodMatch[1];
                functionName = cppMethodMatch[2];
            }
            break;

        case 'java':
            const javaClassMatch = code.match(/class\s+(\w+)/);
            className = javaClassMatch ? javaClassMatch[1] : 'Solution';
            
            const javaMethodMatch = code.match(/public\s+(\w+)\s+(\w+)\s*\([^)]*\)/);
            if (javaMethodMatch) {
                returnType = javaMethodMatch[1];
                functionName = javaMethodMatch[2];
            }
            break;

        case 'python':
            const pyFuncMatch = code.match(/def\s+(\w+)\s*\(/);
            functionName = pyFuncMatch ? pyFuncMatch[1] : null;
            
            const pyClassMatch = code.match(/class\s+(\w+)/);
            className = pyClassMatch ? pyClassMatch[1] : null;
            break;

        case 'javascript':
            const jsFuncMatch = code.match(/function\s+(\w+)\s*\(/) || 
                               code.match(/const\s+(\w+)\s*=/) ||
                               code.match(/(\w+)\s*\(/);
            functionName = jsFuncMatch ? jsFuncMatch[1] : null;
            break;

        case 'c':
            const cFuncMatch = code.match(/(\w+)\s+(\w+)\s*\([^)]*\)/);
            if (cFuncMatch) {
                returnType = cFuncMatch[1];
                functionName = cFuncMatch[2];
            }
            break;
    }

    return { functionName, className, returnType };
}

/**
 * Generate main function based on problem test cases
 */
function generateMainFunction(language, code, testCases) {
    const { functionName, className, returnType } = extractFunctionInfo(language, code);
    
    // If code already has main, return as is
    if (code.includes('int main') || code.includes('void main') || 
        code.includes('public static void main') || code.includes('if __name__')) {
        return code;
    }

    switch(language) {
        case 'cpp':
            return code + `

int main() {
    ${className} obj;
    
    ${generateCppTestCalls(functionName, returnType, testCases)}
    
    return 0;
}`;

        case 'c':
            return code + `

int main() {
    ${generateCTestCalls(functionName, returnType, testCases)}
    return 0;
}`;

        case 'java':
            if (!code.includes('public static void main')) {
                return code + `

public class Main {
    public static void main(String[] args) {
        ${className} obj = new ${className}();
        
        ${generateJavaTestCalls(functionName, returnType, testCases)}
    }
}`;
            }
            return code;

        case 'python':
            if (!code.includes('if __name__')) {
                const indent = className ? '    ' : '';
                return code + `

if __name__ == "__main__":
${className ? `    obj = ${className}()` : ''}
${generatePythonTestCalls(functionName, className, testCases, indent)}
`;
            }
            return code;

        case 'javascript':
            return code + `

${generateJavaScriptTestCalls(functionName, testCases)}
`;

        default:
            return code;
    }
}

/**
 * Generate test calls for C++
 */
function generateCppTestCalls(functionName, returnType, testCases) {
    if (!testCases || testCases.length === 0) {
        return `cout << "No test cases defined" << endl;`;
    }

    let calls = '';
    testCases.forEach((test, idx) => {
        const input = formatCppInput(test.input);
        if (returnType === 'void') {
            calls += `    // Test ${idx + 1}
    ${input}
    obj.${functionName}(${test.input.map((_, i) => `arg${i}`).join(', ')});
    
`;
        } else {
            calls += `    // Test ${idx + 1}
    ${input}
    auto result${idx} = obj.${functionName}(${test.input.map((_, i) => `arg${i}`).join(', ')});
    cout << result${idx} << endl;
    
`;
        }
    });
    return calls;
}

function formatCppInput(inputs) {
    if (!Array.isArray(inputs)) return '';
    
    return inputs.map((input, idx) => {
        if (Array.isArray(input)) {
            return `vector<int> arg${idx} = {${input.join(', ')}};`;
        } else if (typeof input === 'string') {
            return `string arg${idx} = "${input}";`;
        } else {
            return `auto arg${idx} = ${input};`;
        }
    }).join('\n    ');
}

/**
 * Generate test calls for C
 */
function generateCTestCalls(functionName, returnType, testCases) {
    if (!testCases || testCases.length === 0) {
        return `printf("No test cases defined\\n");`;
    }

    let calls = '';
    testCases.forEach((test, idx) => {
        calls += `    // Test ${idx + 1}
    ${functionName}(${test.input.join(', ')});
    
`;
    });
    return calls;
}

/**
 * Generate test calls for Java
 */
function generateJavaTestCalls(functionName, returnType, testCases) {
    if (!testCases || testCases.length === 0) {
        return `System.out.println("No test cases defined");`;
    }

    let calls = '';
    testCases.forEach((test, idx) => {
        const input = formatJavaInput(test.input);
        calls += `        // Test ${idx + 1}
        ${input}
        ${returnType !== 'void' ? `var result${idx} = ` : ''}obj.${functionName}(${test.input.map((_, i) => `arg${i}`).join(', ')});
        ${returnType !== 'void' ? `System.out.println(result${idx});` : ''}
        
`;
    });
    return calls;
}

function formatJavaInput(inputs) {
    if (!Array.isArray(inputs)) return '';
    
    return inputs.map((input, idx) => {
        if (Array.isArray(input)) {
            return `int[] arg${idx} = {${input.join(', ')}};`;
        } else if (typeof input === 'string') {
            return `String arg${idx} = "${input}";`;
        } else {
            return `var arg${idx} = ${input};`;
        }
    }).join('\n        ');
}

/**
 * Generate test calls for Python
 */
function generatePythonTestCalls(functionName, className, testCases, indent) {
    if (!testCases || testCases.length === 0) {
        return `${indent}    print("No test cases defined")`;
    }

    let calls = '';
    const prefix = className ? 'obj.' : '';
    
    testCases.forEach((test, idx) => {
        const args = formatPythonInput(test.input);
        calls += `${indent}    # Test ${idx + 1}
${indent}    result${idx} = ${prefix}${functionName}(${args})
${indent}    print(result${idx})
${indent}    
`;
    });
    return calls;
}

function formatPythonInput(inputs) {
    if (!Array.isArray(inputs)) return String(inputs);
    
    return inputs.map(input => {
        if (Array.isArray(input)) {
            return `[${input.join(', ')}]`;
        } else if (typeof input === 'string') {
            return `"${input}"`;
        } else {
            return String(input);
        }
    }).join(', ');
}

/**
 * Generate test calls for JavaScript
 */
function generateJavaScriptTestCalls(functionName, testCases) {
    if (!testCases || testCases.length === 0) {
        return `console.log("No test cases defined");`;
    }

    let calls = '';
    testCases.forEach((test, idx) => {
        const args = formatJavaScriptInput(test.input);
        calls += `// Test ${idx + 1}
const result${idx} = ${functionName}(${args});
console.log(result${idx});

`;
    });
    return calls;
}

function formatJavaScriptInput(inputs) {
    if (!Array.isArray(inputs)) return String(inputs);
    
    return inputs.map(input => {
        if (Array.isArray(input)) {
            return `[${input.join(', ')}]`;
        } else if (typeof input === 'string') {
            return `"${input}"`;
        } else {
            return String(input);
        }
    }).join(', ');
}

/**
 * Helper function to inject necessary imports/headers for each language
 */
function injectLanguageBoilerplate(language, code) {
    const hasImports = code.includes('#include') || 
                      code.includes('import ') || 
                      code.includes('from ') ||
                      code.includes('package ');

    if (hasImports) {
        return code;
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
            return code;

        default:
            return code;
    }
}

/**
 * 
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @param {Array} testCases - optional test cases array [{input: [...], output: ...}]
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code, testCases = []) {
    try {
        const languageConfig = LANGUAGE_VERSIONS[language];
        if (!languageConfig) {
            return {
                success: false,
                error: `Language ${language} is not supported.`
            }
        }

        // Step 1: Inject imports/headers
        let finalCode = injectLanguageBoilerplate(language, code);
        
        // Step 2: Generate and inject main function with test cases
        finalCode = generateMainFunction(language, finalCode, testCases);

        console.log("Final code being executed:", finalCode);

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
                        content: finalCode
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
        console.log("Piston response:", data);

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