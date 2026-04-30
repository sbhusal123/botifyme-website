"use client";

import React, { useState, useEffect } from 'react';
import { 
  LogIn, 
  LayoutDashboard, 
  MessageSquare, 
  Inbox, 
  LogOut,
  Loader2,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import InquiryManager from '@/components/admin/InquiryManager';
import ChatManager from '@/components/admin/ChatManager';
import DashboardOverview from '@/components/admin/DashboardOverview';
import ConfigManager from '@/components/admin/ConfigManager';

export default function WebDashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'chats' | 'configuration'>('overview');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get('botifyme_admin_token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        Cookies.set('botifyme_admin_token', data.access, { expires: 7 }); // Expires in 7 days
        setToken(data.access);
        setIsLoggedIn(true);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Connection failed. Please check if backend is running.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('botifyme_admin_token');
    setToken(null);
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-purple-500/30 text-slate-900">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex min-h-screen items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-center mb-2">Admin Portal</h1>
                <p className="text-slate-500 text-center mb-8">Secure login to your dashboard</p>

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl mb-6 border border-red-100 text-center font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
                    <input 
                      name="username"
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                    <input 
                      name="password"
                      type="password"
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <button 
                    disabled={authLoading}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
                    {authLoading ? 'Authenticating...' : 'Sign In'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col md:flex-row min-h-screen bg-slate-50"
          >
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col h-screen sticky top-0 z-40 transition-all duration-300">
              <div className="flex p-6 items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">Botifyme</span>
              </div>

              <nav className="flex-1 px-4 space-y-2 mt-8">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                    activeTab === 'overview' 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="font-semibold">Overview</span>
                </button>
                <button 
                  onClick={() => setActiveTab('inquiries')}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                    activeTab === 'inquiries' 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Inbox className="w-5 h-5" />
                  <span className="font-semibold">Inquiries</span>
                </button>
                <button 
                  onClick={() => setActiveTab('chats')}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                    activeTab === 'chats' 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-semibold">Chats</span>
                </button>
                <button 
                  onClick={() => setActiveTab('configuration')}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                    activeTab === 'configuration' 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-semibold">Config</span>
                </button>
              </nav>

              <div className="p-4 mt-auto">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-start gap-4 px-4 py-4 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">Log Out</span>
                </button>
              </div>
            </aside>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 px-6 py-3 z-[60] flex items-center justify-between pb-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'overview' ? 'text-purple-600' : 'text-slate-400'}`}
              >
                <LayoutDashboard className="w-6 h-6" />
                <span className="text-[10px] font-bold">Overview</span>
              </button>
              <button 
                onClick={() => setActiveTab('inquiries')}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'inquiries' ? 'text-purple-600' : 'text-slate-400'}`}
              >
                <Inbox className="w-6 h-6" />
                <span className="text-[10px] font-bold">Inquiries</span>
              </button>
              <button 
                onClick={() => setActiveTab('chats')}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'chats' ? 'text-purple-600' : 'text-slate-400'}`}
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-[10px] font-bold">Chats</span>
              </button>
              <button 
                onClick={() => setActiveTab('configuration')}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'configuration' ? 'text-purple-600' : 'text-slate-400'}`}
              >
                <Settings className="w-6 h-6" />
                <span className="text-[10px] font-bold">Config</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex flex-col items-center gap-1 text-slate-400"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-[10px] font-bold">Exit</span>
              </button>
            </nav>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full pb-32 md:pb-8">
              <div className="max-w-7xl mx-auto">
                <header className="mb-6 md:mb-8 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      {activeTab === 'overview' ? 'Performance Overview' : activeTab === 'inquiries' ? 'Inquiries' : activeTab === 'chats' ? 'Support' : 'AI Settings'}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-1">
                      {activeTab === 'overview' 
                        ? 'Real-time performance metrics.' 
                        : activeTab === 'inquiries' 
                        ? 'Website lead submissions.' 
                        : activeTab === 'chats'
                        ? 'Customer support sessions.'
                        : 'Manage global AI behavior and prompts.'}
                    </p>
                  </div>
                </header>

                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden min-h-[calc(100vh-16rem)] md:min-h-[calc(100vh-14rem)]">
                  {activeTab === 'overview' ? (
                    <DashboardOverview token={token!} />
                  ) : activeTab === 'inquiries' ? (
                    <InquiryManager token={token!} />
                  ) : activeTab === 'chats' ? (
                    <ChatManager token={token!} />
                  ) : (
                    <ConfigManager token={token!} />
                  )}
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
