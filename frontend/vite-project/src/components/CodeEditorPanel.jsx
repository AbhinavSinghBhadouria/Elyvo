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
    <div className="h-full flex flex-col bg-[#0d0d14]">
      {/* Header / Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#14141d] border-b border-white/5">
        <div className="flex items-center gap-6">
          {/* Language Selector */}
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className="flex items-center gap-3 px-4 py-2 bg-white/[0.03] rounded-xl border border-white/10 cursor-pointer hover:bg-white/[0.08] transition-all group">
              <img src={LANGUAGE_CONFIG[selectedLanguage].logo} alt="" className="size-5" />
              <span className="text-sm font-bold text-white/90">{LANGUAGE_CONFIG[selectedLanguage].name}</span>
              <ChevronDown className="size-4 text-white/30 group-hover:text-white/60" />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-[#1a1a24] rounded-2xl w-52 mt-2 border border-white/10 backdrop-blur-xl">
              {Object.entries(LANGUAGE_CONFIG).map(([lang, config]) => (
                <li key={lang}>
                  <button 
                    onClick={() => onLanguageChange(lang)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 ${selectedLanguage === lang ? 'bg-primary/10 text-primary' : 'text-white/60'}`}
                  >
                    <img src={config.logo} alt="" className="size-4" />
                    <span className="font-medium">{config.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-6 w-px bg-white/5" />

          {/* AI Assistant Button - Reference Style */}
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className="flex items-center gap-2.5 px-5 py-2.5 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-xl cursor-pointer hover:bg-emerald-500/20 transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] group">
              <Wand2 className="size-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">AI Assistant</span>
              <ChevronDown className="size-3 text-emerald-400/50" />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-[#1a1a24] rounded-2xl w-64 mt-2 border border-white/10 backdrop-blur-xl">
              <li>
                <button onClick={onGetHint} className="flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-white/5 group">
                  <div className="size-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-all">
                    <Sparkles className="size-4 text-amber-400" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-white/90">Get a Hint</span>
                    <span className="text-[10px] text-white/40">Smart guidance without spoiling</span>
                  </div>
                </button>
              </li>
              <li>
                <button onClick={onGetReview} className="flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-white/5 group">
                  <div className="size-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all">
                    <Wand2 className="size-4 text-indigo-400" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-white/90">Review Code</span>
                    <span className="text-[10px] text-white/40">Analyze logic and efficiency</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
             onClick={() => onCodeChange('')}
             className="p-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white/80 transition-all"
             title="Clear Code"
          >
            <Trash2 className="size-5" />
          </button>
          
          <button 
             className="p-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white/80 transition-all"
             title="Reset Code"
          >
            <RotateCcw className="size-5" />
          </button>

          <button
            onClick={onRunCode}
            disabled={isRunning}
            className={`
              flex items-center gap-3 px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs transition-all
              ${isRunning 
                ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95'
              }
            `}
          >
            {isRunning ? (
              <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="size-4 fill-current" />
            )}
            Run Code
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative group">
        <Editor
          height="100%"
          language={selectedLanguage}
          value={code}
          theme="vs-dark"
          onChange={onCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            lineHeight: 1.6,
            padding: { top: 20 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            padding: { top: 16, bottom: 16 },
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            formatOnPaste: true,
            formatOnType: true,
            bracketPairColorization: {
              enabled: true
            }
          }}
          loading={
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="text-sm text-base-content/60">Loading editor...</span>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;