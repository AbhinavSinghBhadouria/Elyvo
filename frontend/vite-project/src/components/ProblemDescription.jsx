import React from 'react';
import { BookOpen, Tag, AlertCircle, CheckSquare, FileCode, ChevronRight } from 'lucide-react';

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  const getDifficultyConfig = (difficulty) => {
    const configs = {
      easy: {
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/20',
        label: 'Easy'
      },
      medium: {
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/20',
        label: 'Medium'
      },
      hard: {
        color: 'text-rose-400',
        bgColor: 'bg-rose-500/10',
        borderColor: 'border-rose-500/20',
        label: 'Hard'
      }
    };
    return configs[difficulty?.toLowerCase()] || configs.medium;
  };

  const difficultyConfig = getDifficultyConfig(problem.difficulty);

  return (
    <div className="h-full flex flex-col bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="px-6 py-6 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                <FileCode className="size-4 text-primary" />
             </div>
             <select
                value={currentProblemId}
                onChange={(e) => onProblemChange(e.target.value)}
                className="bg-transparent text-xl font-bold focus:outline-none cursor-pointer hover:text-primary transition-colors appearance-none pr-8"
                style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '1rem'}}
              >
                {(allProblems || []).map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#1a1a24] text-white">
                    {p.title}
                  </option>
                ))}
              </select>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${difficultyConfig.bgColor} ${difficultyConfig.color} ${difficultyConfig.borderColor}`}>
            {difficultyConfig.label}
          </div>
        </div>

        {problem.category && (
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            <Tag className="w-3 h-3" />
            <span>{problem.category}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 custom-scrollbar">
        {/* Problem Statement Card */}
        <section>
          <div className="flex items-center gap-3 mb-5">
             <div className="size-1 bg-primary rounded-full shadow-[0_0_8px_primary]" />
             <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">Problem Statement</h2>
          </div>
          <div className="bg-white/[0.03] rounded-2xl border border-white/5 p-6 shadow-2xl backdrop-blur-sm">
            <div className="text-[15px] text-white/80 leading-relaxed space-y-4 font-medium">
              {problem.description?.split('\n').map((line, idx) => {
                if (line.startsWith('##')) return <h3 key={idx} className="text-white font-bold pt-4 pb-1 border-b border-white/5">{line.replace(/#/g, '').trim()}</h3>;
                if (line.startsWith('###')) return <h4 key={idx} className="text-white/60 font-bold pt-2">{line.replace(/#/g, '').trim()}</h4>;
                
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={idx}>
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="text-primary font-bold">{part.slice(2, -2)}</strong>;
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </p>
                );
              })}
            </div>
          </div>
        </section>

        {/* Examples */}
        {problem.examples && problem.examples.length > 0 && (
          <section>
             <div className="flex items-center gap-3 mb-5">
                <div className="size-1 bg-secondary rounded-full shadow-[0_0_8px_secondary]" />
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">Examples</h2>
             </div>
            
            <div className="space-y-6">
              {(problem.examples || []).map((example, idx) => (
                <div 
                  key={idx}
                  className="group bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all"
                >
                  <div className="px-5 py-3 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Example {idx + 1}</span>
                    <ChevronRight className="size-3 text-white/20 group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <div className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.2em] mb-2">Input</div>
                        <div className="bg-black/40 rounded-xl p-4 font-mono text-sm text-primary/90 border border-primary/10 whitespace-pre-wrap">
                          {example.input}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-secondary/60 uppercase tracking-[0.2em] mb-2">Output</div>
                        <div className="bg-black/40 rounded-xl p-4 font-mono text-sm text-secondary/90 border border-secondary/10 whitespace-pre-wrap">
                          {example.output}
                        </div>
                      </div>
                    </div>

                    {example.explanation && (
                      <div className="pt-4 border-t border-white/5">
                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">Explanation</div>
                        <p className="text-sm text-white/60 italic leading-relaxed">
                          {example.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Constraints */}
        {problem.constraints && problem.constraints.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-5">
               <div className="size-1 bg-accent rounded-full shadow-[0_0_8px_accent]" />
               <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">Constraints</h2>
            </div>
            <div className="bg-white/[0.03] rounded-2xl border border-white/5 p-6">
              <ul className="space-y-4">
                {problem.constraints.map((constraint, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-white/70">
                    <div className="size-1.5 rounded-full bg-accent/40" />
                    <code className="font-mono text-accent bg-accent/5 px-2 py-0.5 rounded">{constraint}</code>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProblemDescription;
