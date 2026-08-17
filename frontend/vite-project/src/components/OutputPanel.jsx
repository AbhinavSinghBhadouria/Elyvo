import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Terminal, FileText } from 'lucide-react';

function OutputPanel({ output }) {
  const header = (
    <div className="px-5 py-3 bg-[#14141d] border-b border-white/5 flex items-center gap-2">
      <Terminal className="w-4 h-4 text-slate-400" />
      <span className="font-bold text-sm text-white">Output</span>
    </div>
  );

  if (!output) {
    return (
      <div className="h-full bg-[#0a0a0f] flex flex-col">
        {header}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
          <div className="text-center">
            <Terminal className="w-16 h-16 mx-auto mb-4 text-white/10" />
            <p className="text-slate-400 text-sm font-medium mb-2">No output yet</p>
            <p className="text-slate-600 text-xs">Click "Run Code" to see the results</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#0a0a0f] flex flex-col">
      <div className="px-5 py-3 bg-[#14141d] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <span className="font-bold text-sm text-white">Output</span>
        </div>

        {output.success ? (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wide">Success</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/20">
            <XCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wide">Error</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-5 custom-scrollbar">
        {output.success ? (
          <div className="space-y-5">
            {output.testResults && output.testResults.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Test Results
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {output.testResults.map((result, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        result.passed
                          ? 'bg-emerald-500/5 border-emerald-500/20'
                          : 'bg-rose-500/5 border-rose-500/20'
                      }`}
                    >
                      <span className="font-semibold text-sm text-white">Test Case {result.testCase}</span>
                      <div className="flex items-center gap-2">
                        {result.passed ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold text-sm">Passed</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-rose-400" />
                            <span className="text-rose-400 font-bold text-sm">Failed</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-400">Total Score:</span>
                    <span className="text-lg font-bold text-emerald-400">
                      {output.testResults.filter(r => r.passed).length} / {output.testResults.length}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {output.output && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Program Output
                  </span>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-emerald-500/20">
                  <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap break-words leading-relaxed">
                    {output.output}
                  </pre>
                </div>
              </div>
            )}

            {output.expectedOutput && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Expected Output
                  </span>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-blue-500/20">
                  <pre className="text-sm font-mono text-blue-400 whitespace-pre-wrap break-words leading-relaxed">
                    {output.expectedOutput}
                  </pre>
                </div>
              </div>
            )}

            {!output.testResults && !output.expectedOutput && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-emerald-400 mb-1">Execution Successful!</div>
                    <div className="text-sm text-slate-400">Your code ran without any errors.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                  Error Details
                </span>
              </div>
              <div className="bg-rose-500/5 rounded-lg p-4 border border-rose-500/20">
                <pre className="text-sm font-mono text-rose-400 whitespace-pre-wrap break-words leading-relaxed">
                  {output.error || 'An unknown error occurred'}
                </pre>
              </div>
            </div>

            {output.output && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                    Partial Output (Before Error)
                  </span>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-amber-500/20">
                  <pre className="text-sm font-mono text-amber-400 whitespace-pre-wrap break-words leading-relaxed">
                    {output.output}
                  </pre>
                </div>
              </div>
            )}

            <div className="bg-white/[0.03] border border-white/5 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white mb-1">Debugging Tips:</div>
                  <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
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
