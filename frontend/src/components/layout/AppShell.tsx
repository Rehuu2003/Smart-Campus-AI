import { useState, ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { SlideOverDrawer } from '@/components/chat/SlideOverDrawer';
import { FullScreenAssistant } from '@/components/chat/FullScreenAssistant';
import { CommandMenu } from '@/components/search/CommandMenu';
import { useChatStream } from '@/hooks/useChatStream';

interface AppShellProps {
  children?: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { streamResponse } = useChatStream();

  const handleCommandSelect = (query: string) => {
    setIsCopilotOpen(true);
    streamResponse(query);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar */}
      <Navbar
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenCopilot={() => setIsCopilotOpen(true)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'assistant' ? (
              <FullScreenAssistant onBackToDashboard={() => setActiveTab('dashboard')} />
            ) : (
              children
            )}
          </div>
        </main>
      </div>

      {/* Slide-over AI Copilot Drawer */}
      <SlideOverDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onExpandFullScreen={() => {
          setIsCopilotOpen(false);
          setActiveTab('assistant');
        }}
      />

      {/* Global Command Menu (Ctrl+K) */}
      <CommandMenu
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAction={handleCommandSelect}
      />
    </div>
  );
}
