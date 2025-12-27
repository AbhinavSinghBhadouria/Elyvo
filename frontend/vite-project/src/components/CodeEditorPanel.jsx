import React from 'react';
import Editor from "@monaco-editor/react";
import { Play, Loader2, RotateCcw, Maximize2 } from "lucide-react";

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
}) {
  const currentConfig = LANGUAGE_CONFIG[selectedLanguage];

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the code? This will clear all your work.')) {
      onCodeChange(STARTER_CODE_TEMPLATES[selectedLanguage]);
    }
  };

  return (
    <div className="h-full bg-base-100 flex flex-col">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-base-200 border-b-2 border-base-300 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-base-300 rounded-lg">
            <img
              src={currentConfig.logo}
              alt={currentConfig.name}
              className="w-5 h-5 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="text-sm font-bold" style={{ color: currentConfig.color }}>
              {currentConfig.name}
            </span>
          </div>
          
          <div className="text-xs text-base-content/50 font-medium">
            {code.split('\n').length} lines • {code.length} chars
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-error"
            title="Reset code"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          <div className="w-px h-6 bg-base-300"></div>

          <button
            onClick={onRunCode}
            disabled={isRunning}
            className={`btn btn-sm gap-2 font-semibold ${
              isRunning 
                ? 'btn-disabled' 
                : 'btn-success hover:btn-success hover:scale-105'
            }`}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Run Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={currentConfig.monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 15,
            fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            wordWrap: "on",
            tabSize: 2,
            insertSpaces: true,
            renderLineHighlight: "all",
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
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