import React, { useState } from 'react';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useChat } from './hooks/useChat';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';

function App() {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  
  const handleTranscript = (transcript) => {
    setInput((prev) => prev + (prev ? ' ' : '') + transcript);
  };

  const { isRecording, toggleRecording } = useSpeechRecognition(handleTranscript);

  const handleSubmit = (e) => {
    e?.preventDefault();
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 md:p-6 animate-fade-in">
      <ChatHeader onClearChat={clearChat} />
      
      <MessageList messages={messages} isLoading={isLoading} />
      
      <ChatInput 
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        isRecording={isRecording}
        onToggleRecording={toggleRecording}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
