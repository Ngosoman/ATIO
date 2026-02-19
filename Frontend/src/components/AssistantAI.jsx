
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../../services/geminiService';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: "Hello! I am your ATIO Assistant. I can help you find agrifood technologies, explain regional innovations, or help you navigate the Knowledge Base. How can I assist today?",
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

  const formatText = (text) => {
    return text
      .split('\n\n').map((para, i) => (
        <p key={i} className="mb-2">
          {para.split('\n').map((line, j) => (
            <React.Fragment key={j}>
              {line.split(/(\*\*.*?\*\*)/g).map((part, k) => (
                part.startsWith('**') && part.endsWith('**')
                  ? <strong key={k}>{part.slice(2, -2)}</strong>
                  : part
              ))}
              {j < para.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      ));
  };

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

    // Add an empty bot message placeholder
    const botMsgId = Date.now();
    setMessages(prev => [...prev, {
      role: 'model',
      content: '',
      timestamp: new Date(),
      id: botMsgId
    }]);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed to connect to assistant');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        // Update the specific message in state
        setMessages(prev => prev.map(msg =>
          msg.id === botMsgId ? { ...msg, content: fullContent } : msg
        ));
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => prev.map(msg =>
        msg.id === botMsgId ? { ...msg, content: 'Sorry, I encountered an error connecting to the service.' } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 bg-fao-teal text-black flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">ATIO Assistant</h3>
          <p className="text-[10px] text-black/70 uppercase tracking-widest">Knowledge AI</p>
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
              ? 'bg-fao-teal text-black shadow-md'
              : 'bg-white border border-gray-200 text-black shadow-sm'
              }`}>
              {msg.role === 'model' ? formatText(msg.content) : msg.content}
            </div>
          </div>
        ))}
        {isLoading && !messages[messages.length - 1].content && (
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
            className="bg-fao-teal text-black p-3 rounded-xl disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
