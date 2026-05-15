import React from 'react';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';

export const ChatInput = ({ 
  input, 
  setInput, 
  isLoading, 
  isRecording, 
  onToggleRecording, 
  onSubmit 
}) => {
  return (
    <div className="glass-card p-4 md:p-6 mb-2">
      <form onSubmit={onSubmit} className="relative flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleRecording}
          className={`p-3 rounded-xl transition-all duration-300 ${
            isRecording
              ? 'bg-red-500/20 text-red-500 recording-pulse'
              : 'bg-slate-800 text-slate-400 hover:text-indigo-400'
          }`}
          title={isRecording ? "Остановить запись" : "Голосовой ввод"}
        >
          {isRecording ? <MicOff size={22} /> : <Mic size={22} />}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isRecording ? 'Слушаю...' : 'Введите сообщение...'}
          className="flex-1 chat-input p-3 pl-4 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/20"
        >
          {isLoading ? <Loader2 size={22} className="animate-spin" /> : <Send size={22} />}
        </button>
      </form>
      <p className="text-[10px] text-center text-slate-600 mt-4 uppercase tracking-widest">
        Web Speech API & Gemini API Integration
      </p>
    </div>
  );
};
