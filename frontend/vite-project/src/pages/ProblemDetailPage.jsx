import React from 'react';

const ProblemDescription = ({ 
  problem, 
  currentProblemId, 
  onProblemChange, 
  allProblems 
}) => {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      hard: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
    };
    return colors[difficulty?.toLowerCase()] || colors.medium;
  };

  const getDifficultyDot = (difficulty) => {
    const colors = {
      easy: 'bg-emerald-400',
      medium: 'bg-amber-400',
      hard: 'bg-rose-400'
    };
    return colors[difficulty?.toLowerCase()] || colors.medium;
  };

  return (
    <div className="h-full flex flex-col bg-base-100">
      {/* Header with Problem Selector */}
      <div className="px-6 py-4 border-b border-base-300 bg-base-200/50">
        <div className="flex items-center gap-3 mb-2">
          <select
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
            className="select select-bordered select-sm flex-1 bg-base-100 focus:outline-none focus:border-primary"
          >
            {allProblems.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
          
          <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(problem.difficulty)}`}>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${getDifficultyDot(problem.difficulty)}`} />
              {problem.difficulty || 'Medium'}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-6 leading-tight">
          {problem.title}
        </h1>

        {/* Description */}
        <div className="prose prose-invert max-w-none mb-8">
          <div className="text-base text-white/80 leading-relaxed whitespace-pre-wrap">
            {problem.description}
          </div>
        </div>

        {/* Examples Section */}
        {problem.testCases && problem.testCases.length > 0 && (
          <div className="space-y-6 mb-8">
            <h2 className="text-lg font-semibold text-white/90 flex items-center gap-2">
              <div className="w-1 h-5 bg-primary rounded-full" />
              Examples
            </h2>
            
            {problem.testCases.slice(0, 2).map((testCase, index) => (
              <div 
                key={index}
                className="bg-base-200/50 rounded-lg border border-base-300 overflow-hidden"
              >
                <div className="px-4 py-2 bg-base-300/30 border-b border-base-300">
                  <span className="text-sm font-medium text-white/70">
                    Example {index + 1}
                  </span>
                </div>
                
                <div className="p-4 space-y-3">
                  {/* Input */}
                  <div>
                    <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5">
                      Input
                    </div>
                    <div className="bg-base-300/50 rounded px-3 py-2 font-mono text-sm text-primary border border-base-300">
                      {Array.isArray(testCase.input) 
                        ? testCase.input.map(item => 
                            Array.isArray(item) ? item.join(' ') : item
                          ).join('\n')
                        : testCase.input
                      }
                    </div>
                  </div>

                  {/* Output */}
                  <div>
                    <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5">
                      Output
                    </div>
                    <div className="bg-base-300/50 rounded px-3 py-2 font-mono text-sm text-emerald-400 border border-base-300">
                      {testCase.expectedOutput || 'N/A'}
                    </div>
                  </div>

                  {/* Explanation if available */}
                  {testCase.explanation && (
                    <div>
                      <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5">
                        Explanation
                      </div>
                      <div className="text-sm text-white/70 leading-relaxed">
                        {testCase.explanation}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Constraints */}
        {problem.constraints && problem.constraints.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-primary rounded-full" />
              Constraints
            </h2>
            <div className="bg-base-200/30 rounded-lg border border-base-300 p-4">
              <ul className="space-y-2 text-sm text-white/70">
                {problem.constraints.map((constraint, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="font-mono">{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tags */}
        {problem.tags && problem.tags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
              <div className="w-1 h-5 bg-primary rounded-full" />
              Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-base-300/50 text-white/80 rounded-full text-xs font-medium border border-base-300 hover:border-primary transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Input/Output Format (CodeChef style) */}
        {(problem.inputFormat || problem.outputFormat) && (
          <div className="space-y-6 mb-8">
            {problem.inputFormat && (
              <div>
                <h2 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  Input Format
                </h2>
                <div className="bg-base-200/30 rounded-lg border border-base-300 p-4">
                  <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                    {problem.inputFormat}
                  </p>
                </div>
              </div>
            )}

            {problem.outputFormat && (
              <div>
                <h2 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  Output Format
                </h2>
                <div className="bg-base-200/30 rounded-lg border border-base-300 p-4">
                  <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                    {problem.outputFormat}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Note or Hint */}
        {problem.hint && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="text-primary mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-primary mb-1">Hint</div>
                <div className="text-sm text-white/70 leading-relaxed">
                  {problem.hint}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDescription;