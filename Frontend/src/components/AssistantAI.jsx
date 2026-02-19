
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../../services/geminiService';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: "Hello! I am your ATIO Research Assistant. I can help you find specific agrifood technologies, explain regional innovations, or help you navigate the Knowledge Base. How can I assist today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const context = "User is browsing the ATIO Knowledge Base, a platform for agrifood innovation in Sub-Saharan Africa.";
      const response = await getGeminiResponse(input, context);
      const aiMsg = {
        role: 'model',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 bg-fao-teal text-white flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">ATIO Intelligence</h3>
          <p className="text-[10px] text-white/70 uppercase tracking-widest">Knowledge Assistant</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user'
              ? 'bg-fao-teal text-white shadow-md'
              : 'bg-white border border-gray-200 text-black shadow-sm'
              }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-2xl animate-pulse flex gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <div className="w-2 h-2 rounded-full bg-gray-300" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about innovations..."
            className="flex-1 bg-gray-100 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-fao-teal"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-fao-teal text-white p-3 rounded-xl disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
