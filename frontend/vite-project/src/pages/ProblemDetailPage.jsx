import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, Code2Icon } from "lucide-react";

import Navbar from "../components/Navbar";
import { PROBLEMS } from "../data/problems";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDetailPage() {
  const { id } = useParams();
  const problem = PROBLEMS?.[id];

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#03030b] text-white grid-overlay flex items-center justify-center">
        <div className="glass-panel rounded-3xl p-10 text-center space-y-4 border border-white/10">
          <p className="text-lg text-white/70">We couldn't find that prompt just yet.</p>
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

      <div className="max-w-6xl mx-auto px-5 py-10 space-y-8">
        <Link
          to="/problems"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm"
        >
          <ArrowLeftIcon className="size-4" /> Back to library
        </Link>

        <section className="glass-panel rounded-3xl p-8 border border-white/10">
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Code2Icon className="size-6" />
                </div>
                <div>
                  <h1 className="text-4xl font-black">{problem.title}</h1>
                  <p className="text-white/60">{problem.category}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.4em] text-white/60">
                <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
                <span className="badge badge-outline border-white/10 text-white/80">
                  #{problem.handlerFunction}
                </span>
              </div>
            </div>

            <div className="flex items-end">
              <Link to="/dashboard" className="btn btn-primary btn-lg">Use in session</Link>
            </div>
          </div>

          <p className="mt-8 text-white/80 leading-relaxed whitespace-pre-wrap">
            {problem.description?.text}
          </p>
        </section>

        <section className="glass-panel rounded-3xl p-6 border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Examples</h2>
          <div className="space-y-4">
            {problem.examples?.map((example, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 p-4 bg-white/5">
                <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-1">
                  Example {idx + 1}
                </p>
                <p className="font-mono text-white">
                  <span className="text-primary">Input:</span> {example.inputText}
                </p>
                <p className="font-mono text-white mt-1">
                  <span className="text-secondary">Output:</span> {example.outputText}
                </p>
                {example.explanation && (
                  <p className="text-sm text-white/70 mt-2">{example.explanation}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProblemDetailPage;

