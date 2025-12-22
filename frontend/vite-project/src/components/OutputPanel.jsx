import React from 'react';

function OutputPanel({ output }) {
  if (!output) {
    return (
      <div className="h-full bg-base-100 flex flex-col">
        <div className="px-4 py-2 bg-base-200 border-b border-base-300 font-semibold text-sm">
          Output
        </div>
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
          <p className="text-base-content/50 text-sm text-center">
            Click "Run Code" to see the output here...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-base-100 flex flex-col">
      {/* Header */}
      <div className="px-4 py-2 bg-base-200 border-b border-base-300 flex items-center justify-between">
        <span className="font-semibold text-sm">Output</span>
        {output.success ? (
          <span className="px-2 py-0.5 bg-success/20 text-success text-xs rounded-full font-medium">
            ✓ Success
          </span>
        ) : (
          <span className="px-2 py-0.5 bg-error/20 text-error text-xs rounded-full font-medium">
            ✗ Error
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {output.success ? (
          <div className="space-y-4">
            {/* Test Results Summary */}
            {output.testResults && output.testResults.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-base-content/70 uppercase tracking-wide mb-2">
                  Test Results
                </div>
                <div className="space-y-2 mb-4">
                  {output.testResults.map((result, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-2 rounded border text-sm ${
                        result.passed 
                          ? 'bg-success/10 border-success/30 text-success' 
                          : 'bg-error/10 border-error/30 text-error'
                      }`}
                    >
                      <span className="font-medium">Test Case {result.testCase}</span>
                      <span className="flex items-center gap-1">
                        {result.passed ? (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Passed
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            Failed
                          </>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-base-content/70 font-medium">
                  Passed: {output.testResults.filter(r => r.passed).length} / {output.testResults.length}
                </div>
              </div>
            )}

            {/* Program Output */}
            {output.output && (
              <div>
                <div className="text-xs font-semibold text-base-content/70 uppercase tracking-wide mb-2">
                  Program Output
                </div>
                <div className="bg-base-200 rounded p-3 border border-base-300">
                  <pre className="text-sm font-mono text-success whitespace-pre-wrap break-words">
                    {output.output}
                  </pre>
                </div>
              </div>
            )}

            {/* Expected Output */}
            {output.expectedOutput && (
              <div>
                <div className="text-xs font-semibold text-base-content/70 uppercase tracking-wide mb-2">
                  Expected Output
                </div>
                <div className="bg-base-200 rounded p-3 border border-base-300">
                  <pre className="text-sm font-mono text-info whitespace-pre-wrap break-words">
                    {output.expectedOutput}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Error Message */}
            <div>
              <div className="text-xs font-semibold text-error/70 uppercase tracking-wide mb-2">
                Error
              </div>
              <div className="bg-error/10 rounded p-3 border border-error/30">
                <pre className="text-sm font-mono text-error whitespace-pre-wrap break-words">
                  {output.error || 'An unknown error occurred'}
                </pre>
              </div>
            </div>

            {/* Partial Output */}
            {output.output && (
              <div>
                <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wide mb-2">
                  Partial Output
                </div>
                <div className="bg-base-200 rounded p-3 border border-base-300">
                  <pre className="text-sm font-mono text-base-content/70 whitespace-pre-wrap break-words">
                    {output.output}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;