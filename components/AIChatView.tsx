
import React, { useState, useRef, useEffect } from 'react';
import { AppRoute } from '../types';
import { ChevronLeft, Search, Mic, Send, Bot } from 'lucide-react';
import { chatWithAssistant } from '../geminiService';

const AIChatView: React.FC<{navigateTo: (route: AppRoute) => void}> = ({ navigateTo }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Hello! I am FOCUS AI. How can I help you organize your tasks today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await chatWithAssistant(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <header className="p-6 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={() => navigateTo(AppRoute.HOME)} className="bg-gray-100 p-3 rounded-2xl">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
            <Bot className="text-indigo-500" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">FOCUS AI</h1>
        </div>
        <div className="w-10"></div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 pb-40">
        <div className="text-center py-12">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-400 mb-4">FOCUS AI</h2>
            <p className="text-gray-400 max-w-xs mx-auto">Organize your academic task. Enter your task and daily schedule.</p>
        </div>

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-3xl shadow-sm text-sm font-medium ${m.role === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-gray-100 text-gray-700 rounded-tl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
             <div className="bg-gray-100 p-4 rounded-3xl rounded-tl-none animate-pulse text-gray-400 text-xs">AI is thinking...</div>
           </div>
        )}
      </div>

      <div className="absolute bottom-24 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
        <div className="flex gap-4 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {['幫我分析我的日常行程', '將大任務拆成小任務', '我遇到困擾了'].map((s, idx) => (
                <button 
                  key={idx}
                  onClick={() => setInput(s)}
                  className="whitespace-nowrap bg-gray-50 border border-gray-200 px-4 py-2 rounded-2xl text-xs font-bold text-gray-500 hover:bg-white hover:border-blue-400 transition-all"
                >
                    {s}
                </button>
            ))}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Search Term" 
            className="w-full bg-gray-100 rounded-full py-4 pl-12 pr-24 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner"
          />
          <div className="absolute inset-y-0 right-4 flex items-center gap-3">
             <Mic className="text-gray-400 hover:text-indigo-500 cursor-pointer" size={20} />
             <button onClick={handleSend} className="bg-indigo-500 p-2 rounded-full text-white shadow-lg">
                <Send size={18} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatView;
