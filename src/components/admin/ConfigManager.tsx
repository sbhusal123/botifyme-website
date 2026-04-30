"use client";

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Loader2, 
  Bot, 
  Power, 
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Config {
  id: number;
  system_prompt: string;
  ai_reply_enabled: boolean;
  updated_at: string;
}

export default function ConfigManager({ token }: { token: string }) {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/admin/configuration/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      } else {
        setError('Failed to load configuration');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/website/admin/configuration/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          system_prompt: config.system_prompt,
          ai_reply_enabled: config.ai_reply_enabled
        })
      });

      if (res.ok) {
        const data = await res.json();
        setConfig(data);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('Failed to update configuration');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <p className="text-slate-500 animate-pulse">Loading AI settings...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">AI Configuration</h2>
            <p className="text-slate-500 text-sm">Control how your AI assistant behaves and responds.</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-100 text-green-600 p-4 rounded-2xl mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <p className="font-medium">Settings saved successfully!</p>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-8">
          {/* AI Reply Toggle */}
          <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Power className={`w-5 h-5 ${config?.ai_reply_enabled ? 'text-green-500' : 'text-slate-400'}`} />
                  <h3 className="text-lg font-bold text-slate-900">AI Auto-Reply</h3>
                </div>
                <p className="text-slate-500 text-sm">When enabled, the AI will automatically handle customer support chats.</p>
              </div>
              
              <button
                type="button"
                onClick={() => setConfig(prev => prev ? { ...prev, ai_reply_enabled: !prev.ai_reply_enabled } : null)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
                  config?.ai_reply_enabled ? 'bg-purple-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    config?.ai_reply_enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* System Prompt */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-slate-900">System Prompt</h3>
            </div>
            
            <p className="text-slate-500 text-sm mb-4">
              This instruction defines the AI's personality, knowledge, and limitations. Be specific about your brand's tone.
            </p>

            <textarea
              value={config?.system_prompt || ''}
              onChange={(e) => setConfig(prev => prev ? { ...prev, system_prompt: e.target.value } : null)}
              className="w-full h-80 p-6 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-mono text-sm leading-relaxed"
              placeholder="Enter AI system instructions..."
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              disabled={saving}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 disabled:opacity-70 min-w-[200px]"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Saving Changes...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
