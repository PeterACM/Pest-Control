import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';
import { BUSINESS_INFO } from '../data/pestData';
import { MessageSquare, X, Send, ShieldCheck, Sparkles, User, Bot, Phone, RefreshCw } from 'lucide-react';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'grant',
      text: "Hello! Welcome to Pest Free Services in Durban. How can we assist you with wood-borer assessments, termite control, roach gel treatment, or rodent control today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const quickPrompts = [
    "Compulsory borer assessment requirements",
    "How does the Roach Gel cleanliness partnership work?",
    "Rodent control services in Durban",
    "Sub-contracted wood replacement details",
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      const grantMsg: ChatMessage = {
        id: `grant-${Date.now()}`,
        sender: 'grant',
        text: data.reply || `Thank you for reaching out! Please call us directly at ${BUSINESS_INFO.phone} for urgent requests.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, grantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackMsg: ChatMessage = {
        id: `grant-err-${Date.now()}`,
        sender: 'grant',
        text: `I'm currently assisting another Durban client. Please call us directly at ${BUSINESS_INFO.phone} or use our Online Booking system!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="live-chat-container" className="fixed bottom-5 right-5 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          id="chat-toggle-btn"
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white p-3.5 sm:px-5 rounded-full shadow-2xl border-2 border-white focus:outline-hidden group"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-emerald-700 animate-pulse"></span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-extrabold leading-tight">Live Support</p>
            <p className="text-[10px] text-emerald-200">Pest Free Services Durban</p>
          </div>
        </motion.button>
      )}

      {/* Chat Popover Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-window-popover"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[92vw] sm:w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white p-4 flex items-center justify-between border-b border-emerald-700">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white text-emerald-900 flex items-center justify-center font-bold text-sm shadow-inner">
                    PFS
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-emerald-900"></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-snug">Pest Free Services</h4>
                  <p className="text-[11px] text-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> Dept. Ag Licensed Team
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat History Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      m.sender === 'user'
                        ? 'bg-emerald-700 text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-xs'
                    }`}
                  >
                    <p className="leading-relaxed font-medium">{m.text}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-slate-500 italic text-[11px] p-2 bg-white rounded-xl border border-slate-200 w-fit">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>Pest Free Assistant typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length < 3 && (
              <div className="p-2.5 bg-emerald-50 border-t border-emerald-100 flex flex-wrap gap-1.5 text-[11px]">
                {quickPrompts.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(qp)}
                    className="px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full font-bold transition-colors text-[10px]"
                  >
                    {qp}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pest control or timber assessment..."
                className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-slate-50 font-medium"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 bg-red-700 hover:bg-red-800 disabled:opacity-40 text-white rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
