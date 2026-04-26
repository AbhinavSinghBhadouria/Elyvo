import React from 'react';
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, Trash2, Wand2, ChevronDown, Sparkles, Loader2 } from "lucide-react";

// Language configuration matching the main page
const LANGUAGE_CONFIG = {
  javascript: {
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    monacoLang: 'javascript',
    color: '#F7DF1E'
  },
  python: {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    monacoLang: 'python',
    color: '#3776AB'
  },
  java: {
    name: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    monacoLang: 'java',
    color: '#007396'
  },
  cpp: {
    name: 'C++',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    monacoLang: 'cpp',
    color: '#00599C'
  },
  c: {
    name: 'C',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    monacoLang: 'c',
    color: '#A8B9CC'
  }
};

const STARTER_CODE_TEMPLATES = {
  javascript: '// Write your JavaScript code here\n',
  python: '# Write your Python code here\n',
  java: '// Write your Java code here\n',
  cpp: '// Write your C++ code here\n',
  c: '// Write your C code here\n'
};

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onCodeChange,
  onRunCode,
  onGetHint,
  onGetReview
}) {
  const currentConfig = LANGUAGE_CONFIG[selectedLanguage];

  const handleReset = () => {
    if (window.confirm('Reset to language comment? This will clear all your code.')) {
      onCodeChange(STARTER_CODE_TEMPLATES[selectedLanguage]);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#020203] relative">
      {/* Header / Toolbar */}
      <div className="flex items-center justify-between px-8 py-5 bg-white/[0.01] border-b border-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          {/* Language Selector */}
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className="flex items-center gap-4 px-5 py-3 bg-white/[0.03] rounded-2xl border border-white/10 cursor-pointer hover:bg-white/[0.08] transition-all group shadow-inner">
              <img src={LANGUAGE_CONFIG[selectedLanguage].logo} alt="" className="size-5" />
              <span className="text-xs font-black uppercase tracking-widest text-white/90">{LANGUAGE_CONFIG[selectedLanguage].name}</span>
              <ChevronDown className="size-4 text-white/30 group-hover:text-white/60" />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[50] menu p-3 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] bg-[#0a0a0f] rounded-[2rem] w-64 mt-4 border border-white/10 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-2 mb-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Select Engine</span>
              </div>
              {Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => (
                <li key={lang} className="mb-1">
                  <button 
                    onClick={() => onLanguageChange(lang)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/5 transition-all ${selectedLanguage === lang ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400'}`}
                  >
                    <img src={config.logo} alt="" className="size-5" />
                    <span className="font-bold text-sm tracking-tight">{config.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-8 w-px bg-white/5" />

          {/* AI Assistant Button */}
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className="flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl cursor-pointer hover:bg-emerald-500/20 transition-all shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] group">
              <Sparkles className="size-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Elyvo AI</span>
              <ChevronDown className="size-3 text-emerald-400/50" />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[50] menu p-3 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] bg-[#0a0a0f] rounded-[2rem] w-72 mt-4 border border-white/10 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-2 mb-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Intelligent Analysis</span>
              </div>
              <li>
                <button onClick={onGetHint} className="flex items-center gap-4 px-4 py-5 rounded-2xl hover:bg-white/5 group transition-all">
                  <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-all">
                    <Sparkles className="size-5 text-amber-400" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-bold text-sm text-white">Request Hint</span>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Logic Guidance</span>
                  </div>
                </button>
              </li>
              <li>
                <button onClick={onGetReview} className="flex items-center gap-4 px-4 py-5 rounded-2xl hover:bg-white/5 group transition-all mt-1">
                  <div className="size-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all">
                    <Wand2 className="size-5 text-indigo-400" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-bold text-sm text-white">Full Review</span>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Efficiency Audit</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-2xl p-1.5">
            <button 
               onClick={() => onCodeChange('')}
               className="p-3 rounded-xl hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-all"
               title="Clear Code"
            >
              <Trash2 className="size-5" />
            </button>
            
            <button 
               onClick={handleReset}
               className="p-3 rounded-xl hover:bg-white/10 text-slate-500 hover:text-white transition-all"
               title="Reset Code"
            >
              <RotateCcw className="size-5" />
            </button>
          </div>

          <button
            onClick={onRunCode}
            disabled={isRunning}
            className={`
              flex items-center gap-4 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300
              ${isRunning 
                ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5' 
                : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95'
              }
            `}
          >
            {isRunning ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Play className="size-5 fill-current" />
            )}
            <span>Execute</span>
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative group bg-[#020203]">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020203] to-transparent z-10 pointer-events-none opacity-50" />
        <Editor
          height="100%"
          language={selectedLanguage}
          value={code}
          theme="vs-dark"
          onChange={onCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 15,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            lineHeight: 1.8,
            padding: { top: 32, bottom: 32 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: "all",
            fontLigatures: true,
            bracketPairColorization: { enabled: true },
            guides: { indentation: true },
            wordWrap: "on"
          }}
          loading={
            <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="size-16 rounded-3xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Loader2 className="size-8 animate-spin text-blue-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Initializing IDE...</span>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;