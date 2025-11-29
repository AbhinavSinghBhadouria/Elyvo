import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  ArrowLeftIcon, 
  Code2Icon, 
  CheckCircle2Icon,
  AlertCircleIcon,
  PlayIcon
} from "lucide-react";

import Navbar from "../components/Navbar";
import { problemsApi } from "../api/problems";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDetailPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const response = await problemsApi.getProblemById(id);
        setProblem(response);
        setError(null);
      } catch (err) {
        setError("Failed to load problem. Please try again.");
        console.error("Error fetching problem:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProblem();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#03030b] text-white grid-overlay flex items-center justify-center">
        <div className="glass-panel rounded-3xl p-10 text-center space-y-4 border border-white/10">
          <p className="text-lg text-white/70">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-screen bg-[#03030b] text-white grid-overlay flex items-center justify-center">
        <div className="glass-panel rounded-3xl p-10 text-center space-y-4 border border-white/10">
          <p className="text-lg text-red-400">{error || "We couldn't find that problem just yet."}</p>
          <Link to="/problems" className="btn btn-primary">
            Back to library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03030b] text-white grid-overlay">
      <Navbar />

      <div className="max-w-5xl mx-auto px-5 py-10 space-y-6">
        {/* Back Button */}
        <Link
          to="/problems"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
        >
          <ArrowLeftIcon className="size-4" /> Back to Problems
        </Link>

        {/* Header Card */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute -top-32 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 opacity-50 blur-[120px]" />
          
          <div className="relative flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
                <Code2Icon className="size-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black mb-2">{problem.title}</h1>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-white/60">{problem.category}</span>
                  <span className="text-white/40">•</span>
                  <span className={`badge text-xs ${getDifficultyBadgeClass(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
              </div>
            </div>
            
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-primary/30 transition-all whitespace-nowrap"
            >
              <PlayIcon className="size-4 fill-current" />
              Start Solving
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10">
          <h2 className="text-xl font-bold mb-4 text-white/90">Description</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/75 leading-relaxed whitespace-pre-wrap">
              {problem.description || "No description available."}
            </p>
          </div>
        </div>

        {/* Examples */}
        {problem.examples && problem.examples.length > 0 && (
          <div className="glass-panel rounded-3xl p-8 border border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2Icon className="size-5 text-green-400" />
              <h2 className="text-xl font-bold text-white/90">Examples</h2>
            </div>
            <div className="space-y-4">
              {problem.examples.map((example, idx) => (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-white/10 p-5 bg-white/5 space-y-3"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
                    Example {idx + 1}
                  </p>
                  
                  <div className="space-y-2 font-mono text-sm">
                    <div className="bg-black/40 rounded-lg p-3 border border-white/10">
                      <span className="text-emerald-400 font-semibold">Input:</span>{" "}
                      <span className="text-white/90">{example.inputText}</span>
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 border border-white/10">
                      <span className="text-blue-400 font-semibold">Output:</span>{" "}
                      <span className="text-white/90">{example.outputText}</span>
                    </div>
                  </div>
                  
                  {example.explanation && (
                    <p className="text-sm text-white/60 leading-relaxed pt-2 border-t border-white/10">
                      {example.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Constraints */}
        {problem.constraints && problem.constraints.length > 0 && (
          <div className="glass-panel rounded-3xl p-8 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircleIcon className="size-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white/90">Constraints</h2>
            </div>
            <ul className="space-y-2">
              {problem.constraints.map((constraint, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/70">
                  <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                  <span className="font-mono text-sm">{constraint}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Function Signature */}
        {problem.handlerFunction && (
          <div className="glass-panel rounded-3xl p-6 border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-3">
              Function to implement
            </h3>
            <div className="bg-black/60 rounded-xl p-4 border border-white/10">
              <code className="text-sm text-emerald-400 font-mono">
                {problem.handlerFunction}()
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemDetailPage;