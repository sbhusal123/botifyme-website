"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Cookies from 'js-cookie';

type Message = {
  id: string;
  reply_from: 'AI' | 'HUMAN';
  message: string;
  created_at: string;
};

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [draft, setDraft] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if there's an existing session in cookies
    const storedSession = Cookies.get('botifyme_chat_session');
    if (storedSession) {
      setSessionId(storedSession);
    }
    
    // Show tooltip after 3 seconds if chat is closed
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch messages initially when opened or session changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!sessionId || !isOpen) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/messages/?session_id=${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, [isOpen, sessionId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsInitializing(true);
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      contact: formData.get('contact'),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/chat-sessions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setSessionId(data.id);
        Cookies.set('botifyme_chat_session', data.id, { expires: 30 }); // Session persists for 30 days
      }
    } catch (err) {
      console.error("Failed to start session:", err);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.trim() || !sessionId) return;

    setIsSending(true);
    const messageToSend = draft;
    setDraft(''); // Optimistic clear

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/messages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session: sessionId,
          reply_from: 'HUMAN',
          message: messageToSend
        }),
      });

      if (res.ok) {
        const newMessage = await res.json();
        setMessages(prev => [...prev, newMessage]);
      } else {
        setDraft(messageToSend); // Restore on failure
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      setDraft(messageToSend); // Restore on failure
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-purple-100 text-sm font-bold text-slate-800 flex items-center gap-2 whitespace-nowrap"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              How can I help?
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-purple-100 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group border-2 border-purple-100 overflow-hidden relative"
        >
          {isOpen ? (
            <X className="w-8 h-8 text-slate-500" />
          ) : (
            <>
              <img src="/bot-icon.png" alt="Bot" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-purple-600/5 group-hover:bg-transparent transition-colors"></div>
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-cyan-500 p-4 text-white flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white/20 shadow-inner">
                <img src="/bot-icon.png" alt="Bot" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold">Botifyme Support</h3>
                <p className="text-xs text-white/80">We typically reply in minutes</p>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-4 flex flex-col gap-4">
              {!sessionId ? (
                // Initialization Form
                <div className="flex-1 flex flex-col justify-center">
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-sm text-slate-600 mb-4 text-center">Please introduce yourself to start chatting with our team.</p>
                    <form onSubmit={handleStartSession} className="space-y-4">
                      <div>
                        <input 
                          name="name"
                          required
                          placeholder="Your Name"
                          className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <input 
                          name="contact"
                          required
                          placeholder="Email or Phone"
                          className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={isInitializing}
                        className="w-full bg-slate-900 text-white text-sm font-medium py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-70"
                      >
                        {isInitializing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Start Chat'}
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                // Chat Messages
                <>
                  {messages.length === 0 && (
                    <div className="text-center text-slate-400 text-sm mt-10">
                      Send a message to start the conversation.
                    </div>
                  )}
                  {messages.map((msg) => {
                    const isUser = msg.reply_from === 'HUMAN';
                    return (
                      <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                          isUser 
                            ? 'bg-slate-900 text-white rounded-br-none' 
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm prose prose-sm prose-slate max-w-none'
                        }`}>
                          {isUser ? msg.message : <ReactMarkdown>{msg.message}</ReactMarkdown>}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input area */}
            {sessionId && (
              <div className="p-3 bg-white border-t border-slate-100">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 relative">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors pr-10"
                  />
                  <button 
                    type="submit"
                    disabled={!draft.trim() || isSending}
                    className="absolute right-1 w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:hover:bg-purple-600"
                  >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-[-2px]" />}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
