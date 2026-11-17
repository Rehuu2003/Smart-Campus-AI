import React, { useState } from 'react';
import { Database, Radio, Check, Server } from 'lucide-react';
import { apiClient, BackendMode } from '@/lib/apiClient';

export function BackendModeBadge() {
  const [mode, setMode] = useState<BackendMode>(apiClient.getMode());

  const handleToggle = () => {
    const nextMode: BackendMode = mode === 'mock' ? 'live' : 'mock';
    apiClient.setMode(nextMode);
    setMode(nextMode);
  };

  const isMock = mode === 'mock';

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border transition cursor-pointer ${
        isMock
          ? 'bg-emerald-50 text-emerald-800 border-emerald-200/90 hover:bg-emerald-100'
          : 'bg-purple-50 text-purple-800 border-purple-200/90 hover:bg-purple-100'
      }`}
      title={`Current API Adapter: ${isMock ? 'Autonomous Mock Engine' : 'Live SSE Backend'}. Click to switch.`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full animate-pulse ${
          isMock ? 'bg-emerald-500' : 'bg-purple-600'
        }`}
      />
      <span>API: {isMock ? 'Mock Engine' : 'Live Backend'}</span>
    </button>
  );
}
