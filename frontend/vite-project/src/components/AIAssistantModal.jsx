import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Loader2, X, Sparkles } from 'lucide-react';

function AIAssistantModal({ isOpen, onClose, title, content, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-base-100 rounded-2xl w-full max-w-2xl border border-base-300 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-300 bg-base-200">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <Sparkles className="w-5 h-5" />
            {title}
          </div>
          <button 
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-base-content/60">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p>Claude is thinking...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-base-300 bg-base-200 flex justify-end">
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAssistantModal;
