import React from 'react';
import { Trash2 } from 'lucide-react';

export const ChatHeader = ({ onClearChat }) => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          AI Assistant
        </h1>
        <p className="text-slate-400 text-sm">Powered by Gemini 2.5 Flash</p>
      </div>
      <button
        onClick={onClearChat}
        className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-full hover:bg-slate-800"
        title="Clear Chat"
      >
        <Trash2 size={20} />
      </button>
    </header>
  );
};
