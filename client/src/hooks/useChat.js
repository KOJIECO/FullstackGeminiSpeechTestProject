import { useState } from 'react';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const clearChat = () => setMessages([]);

  const sendMessage = async (input) => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: 'ai', content: data.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, {
        role: 'ai',
        content: 'Ошибка: Не удалось получить ответ от сервера. Проверьте подключение и API ключ.',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage, clearChat };
};
