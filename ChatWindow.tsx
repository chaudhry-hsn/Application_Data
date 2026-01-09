
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, PMModule } from '../types';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  isProcessing: boolean;
  activeModule: PMModule;
  onGenerateCharter: () => void;
  onGenerateStakeholders: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  messages, 
  onSend, 
  isProcessing, 
  activeModule,
  onGenerateCharter,
  onGenerateStakeholders
}) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {activeModule === PMModule.INITIATION ? 'Strategic Initiation' : 'Stakeholder Discovery'}
          </h2>
          <p className="text-slate-500 text-sm">Expert Consultation Session</p>
        </div>
        <div className="flex gap-2">
           {activeModule === PMModule.INITIATION ? (
             <button 
                onClick={onGenerateCharter}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
             >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Finalize Charter
             </button>
           ) : (
             <button 
                onClick={onGenerateStakeholders}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
             >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                Map Stakeholders
             </button>
           )}
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 scroll-smooth"
      >
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-1 ${
                m.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-600'
              }`}>
                {m.role === 'user' ? 'U' : 'AI'}
              </div>
              <div className={`p-4 rounded-2xl ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
              }`}>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap leading-relaxed">
                  {m.content}
                </div>
                <div className={`text-[10px] mt-2 opacity-50 ${m.role === 'user' ? 'text-white' : 'text-slate-400'}`}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
             <div className="max-w-[85%] flex gap-3">
              <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-1 bg-slate-200 text-slate-600">
                AI
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm rounded-tl-none">
                <div className="flex gap-1.5 py-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your project details or questions here..."
          className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg text-slate-700"
          disabled={isProcessing}
        />
        <button
          type="submit"
          disabled={isProcessing || !input.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white p-2 rounded-xl transition-all shadow-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </button>
      </form>
      <p className="text-center text-[10px] text-slate-400 mt-3 font-medium uppercase tracking-widest">
        AI Project Manager | PMI & Agile Standards Compliant
      </p>
    </div>
  );
};

export default ChatWindow;
