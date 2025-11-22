import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Terminal } from 'lucide-react';
import { generateConciergeResponse } from '../services/geminiService';
import { Message } from '../types';

const Concierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Qué onda. Soy tu host digital. ¿Buscas mesa o quieres saber qué se está cocinando este mes?', timestamp: Date.now() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateConciergeResponse(input);
    
    const modelMsg: Message = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group bg-black border border-[#ff4d00] text-white p-4 shadow-[0_0_20px_rgba(255,77,0,0.3)] hover:shadow-[0_0_30px_rgba(255,77,0,0.6)] transition-all duration-300 flex items-center gap-3"
        >
          <div className="relative">
             <MessageCircle size={24} />
             <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff4d00] rounded-full animate-ping"></span>
          </div>
          <span className="text-xs font-bold tracking-widest uppercase hidden md:block">Concierge 2.0</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-black border border-stone-800 w-[90vw] md:w-[400px] h-[60vh] md:h-[500px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 rounded-lg">
          {/* header */}
          <div className="bg-stone-900 p-3 flex justify-between items-center border-b border-stone-800">
            <div className="flex items-center gap-2 text-[#ff4d00]">
              <Terminal size={16} />
              <h3 className="font-bold tracking-widest text-xs uppercase">Sistema Carta 12</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/95">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 text-xs leading-relaxed border ${
                  msg.role === 'user' 
                    ? 'bg-stone-900 border-stone-700 text-white' 
                    : 'bg-[#ff4d00]/10 border-[#ff4d00]/30 text-[#ff4d00]'
                }`}>
                  <span className="block text-[8px] opacity-50 mb-1 uppercase">{msg.role === 'user' ? 'Tú' : 'Host'}</span>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="text-[#ff4d00] text-[10px] uppercase tracking-widest p-2 animate-pulse">
                  Procesando...
                </div>
              </div>
            )}
          </div>

          {/* input */}
          <div className="p-3 bg-black border-t border-stone-800 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe aquí..."
              className="flex-1 bg-stone-900 text-white text-xs px-3 py-2 focus:outline-none focus:border-[#ff4d00] border border-stone-800 placeholder-stone-600"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-white text-black p-2 hover:bg-[#ff4d00] hover:text-white disabled:opacity-50 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Concierge;
