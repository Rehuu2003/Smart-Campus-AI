import React, { useState } from 'react';
import { 
  Megaphone, 
  Send, 
  X, 
  Users, 
  Bell, 
  Mail, 
  Smartphone, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { toast } from 'sonner';

interface BroadcastComposerModalProps {
  onClose: () => void;
  onBroadcastCreated: (broadcast: {
    id: string;
    title: string;
    audience: string;
    urgency: string;
    timestamp: string;
    channels: string[];
    status: string;
  }) => void;
}

export function BroadcastComposerModal({
  onClose,
  onBroadcastCreated,
}: BroadcastComposerModalProps) {
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('All Students & Faculty');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent' | 'Critical'>('Normal');
  const [channels, setChannels] = useState<{ [key: string]: boolean }>({
    push: true,
    email: true,
    sms: false,
  });
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const toggleChannel = (channel: string) => {
    setChannels((prev) => ({ ...prev, [channel]: !prev[channel] }));
  };

  const handleSendBroadcast = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error('Please enter both broadcast title and message content');
      return;
    }

    setIsSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSending(false);

    const activeChannels: string[] = [];
    if (channels.push) activeChannels.push('Push Notification');
    if (channels.email) activeChannels.push('Email Digest');
    if (channels.sms) activeChannels.push('SMS Alert');

    const newBroadcast = {
      id: `bc-${Date.now().toString().slice(-4)}`,
      title,
      audience,
      urgency,
      timestamp: 'Just now',
      channels: activeChannels,
      status: 'Delivered (4,495 / 4,495)',
    };

    onBroadcastCreated(newBroadcast);
    toast.success(`Institutional Broadcast Dispatched to ${audience}!`, { duration: 4000 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-soft-xl border border-slate-200 overflow-hidden flex flex-col space-y-4 p-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Institutional Emergency &amp; Push Broadcast
              </h3>
              <p className="text-[11px] text-slate-500">
                Dispatched college-wide across mobile app, email &amp; SMS gateways
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-3 text-xs">
          {/* Title */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              Broadcast Title
            </label>
            <input
              type="text"
              placeholder="e.g. Weather Advisory: Morning Classes Rescheduled to Online..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800"
            />
          </div>

          {/* Audience & Urgency Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Target Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-800"
              >
                <option value="All Students & Faculty">All Students &amp; Faculty (4,495)</option>
                <option value="All Students">All Students (4,280)</option>
                <option value="Faculty & Staff">Faculty &amp; Staff (215)</option>
                <option value="Hostel Residents">Hostel Residents (1,450)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Urgency Priority
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-800"
              >
                <option value="Normal">Normal (Standard Push)</option>
                <option value="Urgent">Urgent (High Priority)</option>
                <option value="Critical">Critical (Emergency Siren)</option>
              </select>
            </div>
          </div>

          {/* Delivery Channels */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              Dispatch Channels
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => toggleChannel('push')}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  channels.push
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>In-App Push</span>
              </button>

              <button
                type="button"
                onClick={() => toggleChannel('email')}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  channels.email
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Blast</span>
              </button>

              <button
                type="button"
                onClick={() => toggleChannel('sms')}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  channels.sms
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>SMS Alert</span>
              </button>
            </div>
          </div>

          {/* Message Content */}
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              Official Announcement Content
            </label>
            <textarea
              rows={4}
              placeholder="Enter full announcement details for students and staff..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-800 leading-relaxed"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-[10px] text-slate-400 font-mono">
            Audited by Campus Support Agent
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSending}
              onClick={handleSendBroadcast}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-soft-sm transition disabled:opacity-60 cursor-pointer"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Dispatching Notice...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Broadcast</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
