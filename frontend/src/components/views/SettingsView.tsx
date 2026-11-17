import React, { useState } from 'react';
import { 
  Settings, 
  Volume2, 
  VolumeX, 
  Database, 
  Server, 
  ShieldCheck, 
  UserCheck, 
  Bell, 
  Sparkles, 
  Radio, 
  Check, 
  RefreshCw 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { apiClient, BackendMode } from '@/lib/apiClient';
import { 
  isSoundMuted, 
  toggleSound, 
  playNotificationSound, 
  playSuccessChime, 
  playClickTick 
} from '@/lib/soundEffects';
import { toast } from 'sonner';

export function SettingsView() {
  const { user, switchRole } = useAuthStore();
  const [soundMuted, setSoundMuted] = useState(isSoundMuted());
  const [apiMode, setApiMode] = useState<BackendMode>(apiClient.getMode());
  const [liveUrl, setLiveUrl] = useState(apiClient.getLiveApiUrl());
  const [isPinging, setIsPinging] = useState(false);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundMuted(newState);
    if (!newState) {
      playClickTick();
      toast.success('Sound effects enabled');
    } else {
      toast.info('Sound effects muted');
    }
  };

  const handleSwitchBackend = (mode: BackendMode) => {
    playClickTick();
    apiClient.setMode(mode);
    setApiMode(mode);
  };

  const handlePingHealth = async () => {
    setIsPinging(true);
    playClickTick();
    const result = await apiClient.checkBackendHealth();
    setIsPinging(false);

    if (result.online) {
      toast.success(`Live Backend Online! Response latency: ${result.latencyMs}ms`);
    } else {
      toast.warning(`Live Backend unreachable at ${liveUrl}. Running smoothly on Autonomous Offline Engine.`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            System Configuration &amp; User Preferences
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Settings &amp; Environment Controls
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Manage your authenticated persona, toggle Web Audio micro-interaction sound effects, and switch between the Autonomous Mock Engine and Live SSE Backend.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Identity & Persona Switching */}
        <Card className="border-slate-200/90 shadow-soft-xs">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <CardTitle className="text-sm font-bold text-slate-900">
                Active Identity &amp; Persona Switcher
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Switch role context instantly to test Student, Faculty, or Admin interfaces
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4 space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
              <div className="font-bold text-slate-900">{user?.name}</div>
              <div className="text-slate-500 font-mono">{user?.email}</div>
              <div className="text-[11px] text-blue-700 font-mono">Role: {user?.role.toUpperCase()} · ID: {user?.identifier}</div>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-slate-700 block">Switch Active Role Context:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => switchRole('student')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    user?.role === 'student'
                      ? 'bg-[#1E3A8A] text-white shadow-soft-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => switchRole('faculty')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    user?.role === 'faculty'
                      ? 'bg-[#1E3A8A] text-white shadow-soft-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Faculty
                </button>
                <button
                  type="button"
                  onClick={() => switchRole('admin')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    user?.role === 'admin'
                      ? 'bg-[#1E3A8A] text-white shadow-soft-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audio Micro-Interactions */}
        <Card className="border-slate-200/90 shadow-soft-xs">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <CardTitle className="text-sm font-bold text-slate-900">
                Web Audio Micro-Interactions
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Procedurally synthesized harmonic audio chimes via native Web Audio API
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4 space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/60">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900">Interface Sound Effects</span>
                <p className="text-[11px] text-slate-500">Enable harmonic feedback for transactions &amp; chats</p>
              </div>
              <button
                type="button"
                onClick={handleToggleSound}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  !soundMuted
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
              >
                {!soundMuted ? 'Enabled' : 'Muted'}
              </button>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-700 block text-[11px]">Test Synthesized Sound Effects:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => playSuccessChime()}
                  className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-emerald-50 text-slate-700 text-[11px] font-semibold transition cursor-pointer"
                >
                  Success Chime
                </button>
                <button
                  type="button"
                  onClick={() => playNotificationSound()}
                  className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-blue-50 text-slate-700 text-[11px] font-semibold transition cursor-pointer"
                >
                  Alert Ping
                </button>
                <button
                  type="button"
                  onClick={() => playClickTick()}
                  className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-semibold transition cursor-pointer"
                >
                  Click Tick
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Backend Adapter Switcher (Full Width on 2 cols) */}
        <Card className="md:col-span-2 border-slate-200/90 shadow-soft-xs">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-purple-600" />
                <CardTitle className="text-sm font-bold text-slate-900">
                  API Client Adapter &amp; Live Backend Switch
                </CardTitle>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                apiMode === 'mock' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-purple-50 text-purple-700 border-purple-200'
              }`}>
                {apiMode === 'mock' ? '● Autonomous Mock Engine' : '● Live SSE Stream Engine'}
              </span>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Choose between standalone client simulation or live Server-Sent Events from your Python/Express backend
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleSwitchBackend('mock')}
                className={`p-4 rounded-xl border text-left transition cursor-pointer space-y-1 ${
                  apiMode === 'mock'
                    ? 'border-emerald-500 bg-emerald-50/40 shadow-soft-xs ring-1 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-600" />
                    Autonomous Mock Engine
                  </span>
                  {apiMode === 'mock' && <Check className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Zero external server requirements. Uses realistic simulated multi-agent character streaming, database lookups, and generative UI widgets.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchBackend('live')}
                className={`p-4 rounded-xl border text-left transition cursor-pointer space-y-1 ${
                  apiMode === 'live'
                    ? 'border-purple-500 bg-purple-50/40 shadow-soft-xs ring-1 ring-purple-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-purple-600" />
                    Live SSE Streaming Backend
                  </span>
                  {apiMode === 'live' && <Check className="w-4 h-4 text-purple-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Connects to FastAPI / Express server at <code>{liveUrl}</code> for live LangGraph multi-agent orchestration and database transactions.
                </p>
              </button>
            </div>

            {/* Live Backend Healthcheck Ping Bar */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-slate-600">Endpoint:</span>
                <input
                  type="text"
                  value={liveUrl}
                  onChange={(e) => {
                    setLiveUrl(e.target.value);
                    apiClient.setLiveApiUrl(e.target.value);
                  }}
                  className="font-mono text-xs px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-800 w-64"
                />
              </div>

              <button
                type="button"
                disabled={isPinging}
                onClick={handlePingHealth}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                <span>{isPinging ? 'Pinging Endpoint...' : 'Check Server Health'}</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
