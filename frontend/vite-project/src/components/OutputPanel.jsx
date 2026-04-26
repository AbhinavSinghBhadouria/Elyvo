import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Terminal, FileText } from 'lucide-react';

function OutputPanel({ output }) {
  if (!output) {
    return (
      <div className="h-full bg-[#020203] flex flex-col">
        <div className="px-8 py-4 bg-white/[0.01] border-b border-white/5 flex items-center gap-3">
          <Terminal className="size-4 text-slate-500" />
          <span className="text-[10px] font-black uppercase tracking-premium text-slate-400">Execution Output</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
          <div className="size-16 rounded-2xl bg-white/[0.02] flex items-center justify-center border border-white/5 mb-6">
            <Terminal className="size-8 text-slate-700" />
          </div>
          <div className="space-y-1">
             <p className="text-sm font-bold text-slate-500">Awaiting Execution</p>
             <p className="text-[10px] font-medium text-slate-600 uppercase tracking-widest">Submit code to see results</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#020203] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-8 py-4 bg-white/[0.02] border-b border-white/5 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Terminal className="size-4 text-blue-400" />
          <span className="text-[10px] font-black uppercase tracking-premium text-white">Execution Output</span>
        </div>
        
        {output.success ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle className="size-3" />
            <span className="text-[9px] font-black uppercase tracking-widest">Compiled</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <XCircle className="size-3" />
            <span className="text-[9px] font-black uppercase tracking-widest">Failed</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto custom-scrollbar p-8">
        {output.success ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Test Results Summary */}
            {output.testResults && output.testResults.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                   <FileText className="size-3" />
                   Validation Tests
                </h4>
                
                <div className="grid grid-cols-1 gap-3">
                  {output.testResults.map((result, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        result.passed 
                          ? 'bg-emerald-500/[0.03] border-emerald-500/20 shadow-sm' 
                          : 'bg-rose-500/[0.03] border-rose-500/20 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                         <div className={`size-2 rounded-full ${result.passed ? 'bg-emerald-500' : 'bg-rose-500'} shadow-[0_0_10px] ${result.passed ? 'shadow-emerald-500/50' : 'shadow-rose-500/50'}`} />
                         <span className="text-sm font-bold text-white/90 tracking-tight">Test Case {result.testCase}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {result.passed ? (
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Passed</span>
                        ) : (
                          <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Failed</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-between">
                   <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Performance</span>
                   <span className={`text-xl font-black ${output.testResults.every(r => r.passed) ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {output.testResults.filter(r => r.passed).length} / {output.testResults.length}
                   </span>
                </div>
              </div>
            )}

            {/* Program Output */}
            {output.output && (
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                   <Terminal className="size-3" />
                   Stdout
                </h4>
                <div className="bg-[#0a0a0f] rounded-2xl p-6 border border-white/5 shadow-inner">
                  <pre className="text-sm font-mono text-emerald-400/90 whitespace-pre-wrap break-words leading-relaxed selection:bg-emerald-500/20">
                    {output.output}
                  </pre>
                </div>
              </div>
            )}

            {/* Expected Output */}
            {output.expectedOutput && (
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                   <AlertCircle className="size-3" />
                   Expected Baseline
                </h4>
                <div className="bg-[#0a0a0f] rounded-2xl p-6 border border-white/5">
                  <pre className="text-sm font-mono text-blue-400/80 whitespace-pre-wrap break-words leading-relaxed selection:bg-blue-500/20">
                    {output.expectedOutput}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Error Message */}
            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500 flex items-center gap-2">
                   <XCircle className="size-3" />
                   System Error
                </h4>
              <div className="bg-rose-500/5 rounded-2xl p-6 border border-rose-500/20">
                <pre className="text-sm font-mono text-rose-400 whitespace-pre-wrap break-words leading-relaxed selection:bg-rose-500/20">
                  {output.error || 'An unknown error occurred'}
                </pre>
              </div>
            </div>

            {/* Tips */}
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
               <div className="flex items-start gap-4">
                  <AlertCircle className="size-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-3">
                     <h5 className="text-sm font-bold text-amber-400">Refactoring Required</h5>
                     <ul className="text-xs text-amber-400/70 space-y-2 list-none">
                        <li className="flex items-center gap-2">
                           <div className="size-1 rounded-full bg-amber-500/40" />
                           Verify syntax integrity and closures
                        </li>
                        <li className="flex items-center gap-2">
                           <div className="size-1 rounded-full bg-amber-500/40" />
                           Check variable scope and definitions
                        </li>
                        <li className="flex items-center gap-2">
                           <div className="size-1 rounded-full bg-amber-500/40" />
                           Audit runtime logic and edge cases
                        </li>
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