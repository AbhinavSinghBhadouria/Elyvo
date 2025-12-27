import React from 'react';
import { BookOpen, Tag, AlertCircle, CheckSquare, FileCode } from 'lucide-react';

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  const getDifficultyConfig = (difficulty) => {
    const configs = {
      easy: {
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/15',
        borderColor: 'border-emerald-500/40',
        dotColor: 'bg-emerald-500',
        label: 'Easy'
      },
      medium: {
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/15',
        borderColor: 'border-amber-500/40',
        dotColor: 'bg-amber-500',
        label: 'Medium'
      },
      hard: {
        color: 'text-rose-500',
        bgColor: 'bg-rose-500/15',
        borderColor: 'border-rose-500/40',
        dotColor: 'bg-rose-500',
        label: 'Hard'
      }
    };
    return configs[difficulty?.toLowerCase()] || configs.medium;
  };

  const difficultyConfig = getDifficultyConfig(problem.difficulty);

  return (
    <div className="h-full flex flex-col bg-base-100">
      {/* Enhanced Header */}
      <div className="px-6 py-4 border-b-2 border-base-300 bg-gradient-to-br from-base-200 to-base-200/50 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <select
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
            className="select select-bordered flex-1 bg-base-100 focus:outline-none focus:border-primary font-semibold"
          >
            {(allProblems || []).map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
          
          <div className={`px-4 py-2 rounded-lg text-xs font-bold border-2 ${difficultyConfig.bgColor} ${difficultyConfig.color} ${difficultyConfig.borderColor} shadow-sm`}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${difficultyConfig.dotColor} animate-pulse`} />
              {difficultyConfig.label}
            </div>
          </div>
        </div>
        
        {problem.category && (
          <div className="flex items-center gap-2 text-xs text-base-content/60 bg-base-100/50 px-3 py-1.5 rounded-md w-fit">
            <Tag className="w-3.5 h-3.5" />
            <span className="font-medium">{problem.category}</span>
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2 leading-tight">
            {problem.title}
          </h1>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-base-content">
              Problem Statement
            </h2>
          </div>
          <div className="bg-base-200/40 rounded-xl border-2 border-base-300 p-5 shadow-sm">
            <div className="text-base text-base-content/90 leading-relaxed space-y-3">
              {problem.description?.split('\n').map((line, idx) => {
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={idx} className="text-justify">
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="text-base-content font-bold">{part.slice(2, -2)}</strong>;
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Examples Section */}
        {problem.examples && problem.examples.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileCode className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-base-content">
                Examples
              </h2>
            </div>
            
            <div className="space-y-4">
              {(problem.examples || []).map((example, idx) => (
                <div 
                  key={idx}
                  className="bg-base-200/30 rounded-xl border-2 border-base-300 overflow-hidden hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="px-4 py-3 bg-gradient-to-r from-primary/20 to-primary/5 border-b-2 border-base-300 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center border-2 border-primary/50">
                      <span className="text-sm font-bold text-primary">{idx + 1}</span>
                    </div>
                    <span className="text-sm font-bold text-base-content">
                      Example {idx + 1}
                    </span>
                  </div>
                  
                  <div className="p-5 space-y-4">
                    {/* Input */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-xs font-bold text-info uppercase tracking-wider">
                          Input
                        </div>
                      </div>
                      <div className="bg-neutral/50 rounded-lg px-4 py-3 font-mono text-sm text-info border-2 border-info/20 shadow-inner whitespace-pre-wrap">
                        {example.input || 'No input provided'}
                      </div>
                    </div>

                    {/* Output */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-xs font-bold text-success uppercase tracking-wider">
                          Output
                        </div>
                      </div>
                      <div className="bg-neutral/50 rounded-lg px-4 py-3 font-mono text-sm text-success border-2 border-success/20 shadow-inner whitespace-pre-wrap">
                        {example.output || 'No output provided'}
                      </div>
                    </div>

                    {/* Explanation */}
                    {example.explanation && (
                      <div className="pt-3 mt-3 border-t-2 border-base-300">
                        <div className="text-xs font-bold text-base-content/60 uppercase tracking-wider mb-2">
                          Explanation
                        </div>
                        <div className="text-sm text-base-content/80 leading-relaxed bg-base-100/50 p-3 rounded-lg">
                          {example.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Constraints */}
        {problem.constraints && problem.constraints.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-base-content">
                Constraints
              </h2>
            </div>
            <div className="bg-base-200/40 rounded-xl border-2 border-base-300 p-5 shadow-sm">
              <ul className="space-y-3">
                {problem.constraints.map((constraint, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <code className="font-mono text-base-content/90 bg-base-300/50 px-2 py-1 rounded flex-1">
                      {constraint}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Test Cases Info */}
        {problem.testCases && problem.testCases.length > 0 && (
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <CheckSquare className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-bold text-primary mb-2">Testing Information</div>
                <div className="text-sm text-base-content/80 leading-relaxed">
                  Your solution will be evaluated against <strong className="text-primary">{problem.testCases.length}</strong> test case{problem.testCases.length !== 1 ? 's' : ''}. 
                  Make sure your code handles all edge cases and meets the constraints.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        {problem.tags && problem.tags.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-base-content">
                Topics
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-base-200/60 text-base-content/90 rounded-lg text-sm font-semibold border-2 border-base-300 hover:border-primary hover:bg-base-200 transition-all cursor-pointer shadow-sm hover:shadow-md hover:scale-105"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemDescription;