"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Trash2, 
  User, 
  Loader2,
  MessageSquare,
  Send,
  Bot,
  Calendar,
  Clock,
  RefreshCw,
  ChevronLeft,
  Inbox
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

type Session = {
  id: string;
  name: string;
  contact: string;
  date: string;
  created_at: string;
};

type Message = {
  id: string;
  session: string;
  reply_from: 'AI' | 'HUMAN';
  message: string;
  created_at: string;
};

export default function ChatManager({ token }: { token: string }) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [draft, setDraft] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/admin/chat-sessions/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    } finally {
      setLoadingSessions(false);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    setLoadingMessages(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/admin/messages/?session_id=${sessionId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [token]);

  useEffect(() => {
    if (selectedSession) {
      fetchMessages(selectedSession.id);
    }
  }, [selectedSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession || !draft.trim() || isSending) return;

    setIsSending(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/admin/messages/create/`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session: selectedSession.id,
          reply_from: 'HUMAN',
          message: draft
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, data]);
        setDraft('');
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteSession = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this entire chat session and all messages?')) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/admin/chat-sessions/${id}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSessions(prev => prev.filter(s => s.id !== id));
        if (selectedSession?.id === id) setSelectedSession(null);
      }
    } catch (err) {
      console.error("Failed to delete session:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[calc(100vh-20rem)] bg-white overflow-hidden">
      {/* Session List Sidebar */}
      <div className={`${selectedSession ? 'hidden md:flex' : 'flex'} w-full md:w-80 border-r border-slate-100 flex-col shrink-0 h-full`}>
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 px-6">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wider">
            <RefreshCw 
              className={`w-4 h-4 cursor-pointer hover:rotate-180 transition-transform duration-500 text-purple-600 ${loadingSessions ? 'animate-spin' : ''}`}
              onClick={fetchSessions}
            />
            Recent Chats
          </h3>
          <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-bold border border-purple-200">
            {sessions.length}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loadingSessions ? (
            <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-purple-200" /></div>
          ) : sessions.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm italic">No active sessions</div>
          ) : (
            <div className="divide-y divide-slate-50">
              {sessions.map(session => (
                <div 
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`p-5 cursor-pointer transition-all hover:bg-slate-50 relative group ${
                    selectedSession?.id === session.id ? 'bg-purple-50/50 border-r-4 border-purple-600' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">{session.name}</h4>
                      <p className="text-xs text-slate-500 truncate font-medium">{session.contact}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3" />
                      {new Date(session.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button 
                      onClick={(e) => handleDeleteSession(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`${!selectedSession ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-slate-50/30 h-full`}>
        {selectedSession ? (
          <>
            {/* Header */}
            <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedSession(null)}
                  className="md:hidden p-2 -ml-2 hover:bg-slate-50 rounded-full text-slate-500"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 truncate max-w-[120px] sm:max-w-none">{selectedSession.name}</h3>
                  <p className="text-[10px] md:text-xs text-slate-500 truncate">{selectedSession.contact}</p>
                </div>
              </div>
              <div className="hidden sm:block text-[10px] text-slate-400 font-medium">
                ID: {selectedSession.id.split('-')[0]}...
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 custom-scrollbar">
              {loadingMessages ? (
                <div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-200" /></div>
              ) : messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                    <Inbox className="w-8 h-8 text-slate-200" />
                  </div>
                  <p className="text-sm italic">No messages in this session</p>
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.reply_from === 'HUMAN' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] md:max-w-[70%] rounded-[1.5rem] md:rounded-[2rem] px-5 py-4 text-sm shadow-sm relative group transition-all ${
                      msg.reply_from === 'HUMAN' 
                        ? 'bg-slate-900 text-white rounded-br-none' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                    }`}>
                      <div className="flex items-center gap-2 mb-2 opacity-50 text-[9px] uppercase font-black tracking-widest">
                        {msg.reply_from === 'AI' ? <Bot className="w-3 h-3 text-purple-500" /> : <User className="w-3 h-3 text-cyan-400" />}
                        {msg.reply_from}
                      </div>
                      <div className={`text-sm md:text-base leading-relaxed break-words ${msg.reply_from === 'HUMAN' ? 'text-white' : 'text-slate-800'}`}>
                        <ReactMarkdown>
                          {msg.message}
                        </ReactMarkdown>
                      </div>
                      <div className="mt-2 text-[9px] opacity-40 text-right font-bold">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input 
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type your reply as support agent..."
                  className="flex-1 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm"
                />
                <button 
                  disabled={!draft.trim() || isSending}
                  className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center hover:bg-purple-700 transition-all disabled:opacity-50 shadow-lg shadow-purple-600/20"
                >
                  {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-slate-300" />
            </div>
            <p className="font-bold text-slate-900">Select a conversation</p>
            <p className="text-sm max-w-xs text-center">Click on a session from the list to view history and reply.</p>
          </div>
        )}
      </div>
    </div>
  );
}
