import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Loader2, X, Sparkles } from 'lucide-react';

function AIAssistantModal({ isOpen, onClose, title, content, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0f0f16] rounded-2xl w-full max-w-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-violet-400 font-bold text-lg">
            <Sparkles className="w-5 h-5" />
            {title}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-slate-500">
              <Loader2 className="w-10 h-10 animate-spin text-violet-400" />
              <p>AI is thinking...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none text-slate-300">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-violet-600 text-white text-sm font-bold hover:bg-violet-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAssistantModal;
