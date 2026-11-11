import { AgentId } from './agent';

export interface AgentChainStep {
  agentId: AgentId;
  action: string;
  durationMs: number;
  status: 'pending' | 'success' | 'error';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  status?: 'streaming' | 'complete' | 'error';
  primaryAgentId?: AgentId;
  agentChain?: AgentChainStep[];
  reaction?: 'up' | 'down';
  widget?: {
    type: 'attendance' | 'fee' | 'schedule' | 'assignment';
    data: any;
  };
}

export type ChatMode = 'drawer' | 'fullscreen';
