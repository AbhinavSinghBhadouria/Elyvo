import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Terminal, FileText } from 'lucide-react';

function OutputPanel({ output }) {
  if (!output) {
    return (
      <div className="h-full bg-base-100 flex flex-col">
        <div className="px-5 py-3 bg-base-200 border-b-2 border-base-300 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-base-content/70" />
          <span className="font-bold text-sm">Output</span>
        </div>
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
          <div className="text-center">
            <Terminal className="w-16 h-16 mx-auto mb-4 text-base-content/20" />
            <p className="text-base-content/50 text-sm font-medium mb-2">
              No output yet
            </p>
            <p className="text-base-content/40 text-xs">
              Click "Run Code" to see the results
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-base-100 flex flex-col">
      {/* Enhanced Header */}
      <div className="px-5 py-3 bg-base-200 border-b-2 border-base-300 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-base-content/70" />
          <span className="font-bold text-sm">Output</span>
        </div>
        
        {output.success ? (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/20 text-success rounded-lg border border-success/30">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wide">Success</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-error/20 text-error rounded-lg border border-error/30">
            <XCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wide">Error</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-5">
        {output.success ? (
          <div className="space-y-5">
            {/* Test Results Summary */}
            {output.testResults && output.testResults.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-base-content/70" />
                  <span className="text-xs font-bold text-base-content/70 uppercase tracking-wide">
                    Test Results
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  {output.testResults.map((result, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                        result.passed 
                          ? 'bg-success/10 border-success/40 shadow-sm' 
                          : 'bg-error/10 border-error/40 shadow-sm'
                      }`}
                    >
                      <span className="font-semibold text-sm">Test Case {result.testCase}</span>
                      <div className="flex items-center gap-2">
                        {result.passed ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-success" />
                            <span className="text-success font-bold text-sm">Passed</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-error" />
                            <span className="text-error font-bold text-sm">Failed</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-base-200/50 rounded-lg p-3 border border-base-300">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-base-content/70">Total Score:</span>
                    <span className="text-lg font-bold text-success">
                      {output.testResults.filter(r => r.passed).length} / {output.testResults.length}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Program Output */}
            {output.output && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-base-content/70" />
                  <span className="text-xs font-bold text-base-content/70 uppercase tracking-wide">
                    Program Output
                  </span>
                </div>
                <div className="bg-neutral rounded-lg p-4 border-2 border-success/30 shadow-inner">
                  <pre className="text-sm font-mono text-success whitespace-pre-wrap break-words leading-relaxed">
                    {output.output}
                  </pre>
                </div>
              </div>
            )}

            {/* Expected Output */}
            {output.expectedOutput && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-base-content/70" />
                  <span className="text-xs font-bold text-base-content/70 uppercase tracking-wide">
                    Expected Output
                  </span>
                </div>
                <div className="bg-neutral rounded-lg p-4 border-2 border-info/30 shadow-inner">
                  <pre className="text-sm font-mono text-info whitespace-pre-wrap break-words leading-relaxed">
                    {output.expectedOutput}
                  </pre>
                </div>
              </div>
            )}

            {/* Success Message */}
            {!output.testResults && !output.expectedOutput && (
              <div className="bg-success/10 border-2 border-success/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-success mb-1">
                      Execution Successful!
                    </div>
                    <div className="text-sm text-base-content/70">
                      Your code ran without any errors.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {/* Error Message */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-error" />
                <span className="text-xs font-bold text-error uppercase tracking-wide">
                  Error Details
                </span>
              </div>
              <div className="bg-error/10 rounded-lg p-4 border-2 border-error/40 shadow-inner">
                <pre className="text-sm font-mono text-error whitespace-pre-wrap break-words leading-relaxed">
                  {output.error || 'An unknown error occurred'}
                </pre>
              </div>
            </div>

            {/* Partial Output */}
            {output.output && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  <span className="text-xs font-bold text-warning uppercase tracking-wide">
                    Partial Output (Before Error)
                  </span>
                </div>
                <div className="bg-neutral rounded-lg p-4 border-2 border-warning/30 shadow-inner">
                  <pre className="text-sm font-mono text-warning whitespace-pre-wrap break-words leading-relaxed">
                    {output.output}
                  </pre>
                </div>
              </div>
            )}

            {/* Help Message */}
            <div className="bg-base-200/50 border border-base-300 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-base-content mb-1">
                    Debugging Tips:
                  </div>
                  <ul className="text-sm text-base-content/70 space-y-1 list-disc list-inside">
                    <li>Check for syntax errors in your code</li>
                    <li>Verify variable names and types</li>
                    <li>Ensure proper input/output format</li>
                    <li>Look for runtime exceptions in the error message</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;