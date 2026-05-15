import React, { useEffect, useRef } from 'react';
import { Bot, User, Loader2 } from 'lucide-react';

export const MessageList = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-6 scroll-smooth">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center">
            <Bot size={32} className="text-indigo-400" />
          </div>
          <p className="text-lg">Как я могу помочь вам сегодня?</p>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-indigo-500' : msg.isError ? 'bg-red-500/20' : 'bg-slate-700'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className={msg.isError ? 'text-red-400' : 'text-indigo-400'} />}
              </div>
              <div className={`p-4 ${msg.role === 'user' ? 'message-user' : 'message-ai'
                } ${msg.isError ? 'border border-red-500/50 text-red-200' : ''}`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          </div>
        ))
      )}
      {isLoading && (
        <div className="flex justify-start animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <Bot size={16} className="text-indigo-400" />
            </div>
            <div className="message-ai p-4 flex items-center gap-2">
              <Loader2 size={18} className="animate-spin text-indigo-400" />
              <span className="text-slate-400">Печатает...</span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
