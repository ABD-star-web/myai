'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, setMessages } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <header className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-800">
        <h1 className="text-2xl font-bold">My AI Chat</h1>
        <button
          onClick={() => setMessages([])}
          className="text-sm px-3 py-1 bg-neutral-800 rounded hover:bg-neutral-700"
        >
          Clear Chat
        </button>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="text-center text-neutral-500 mt-20">
            <p className="text-xl">Start chatting with your AI</p>
            <p className="text-sm mt-2">Type a message below to begin</p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-800 text-neutral-100'
                }`}
              >
                {m.parts.map((part, i) =>
                  part.type === 'text' ? <span key={i}>{part.text}</span> : null
                )}
              </div>
            </div>
          ))
        )}
        {status === 'submitted' && (
          <div className="flex justify-start">
            <div className="bg-neutral-800 px-4 py-2 rounded-2xl text-neutral-400">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={status !== 'ready'}
          className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}
