
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from '../services/geminiService.js';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to ATIO Assistant. I have indexed your latest documentation. How can I assist your research today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await gemini.chat(input, messages);
      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        sources: response.sources
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "System Error: Failed to retrieve intelligence. Please verify your connection to the knowledge engine.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] relative">
      <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 leading-none">Intelligence Engine</h3>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gemini 3 Pro Active</span>
            </div>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/20 custom-scrollbar"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] md:max-w-[70%] rounded-3xl p-6 ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 rounded-tr-none' 
                : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none'
            }`}>
              <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </div>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-50 flex flex-col gap-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Verified Sources</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.sources.map((src, i) => (
                      <a 
                        key={i} 
                        href={src} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[10px] font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-all truncate max-w-[200px]"
                      >
                        {new URL(src).hostname.replace('www.', '')}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              <div className={`text-[10px] font-bold mt-4 flex items-center gap-1.5 opacity-50 ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-white border border-slate-100 rounded-3xl px-6 py-4 shadow-sm flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.6s]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]"></div>
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thinking</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 bg-white border-t border-slate-50">
        <div className="relative max-w-5xl mx-auto flex gap-4 items-end">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Query the knowledge base or search for technical insights..."
              className="w-full bg-slate-50 border border-slate-200 rounded-[28px] py-4 pl-6 pr-16 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-300 min-h-[60px] max-h-40 resize-none transition-all duration-300"
              rows={1}
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`h-[60px] w-[60px] rounded-[24px] flex items-center justify-center transition-all transform active:scale-90 ${
              input.trim() && !isLoading 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700 rotate-0' 
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </button>
        </div>
        <p className="text-[10px] font-bold text-center text-slate-400 mt-4 uppercase tracking-[0.2em] opacity-60">
          Powered by Gemini Intelligence • Secure Workspace Environment
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
