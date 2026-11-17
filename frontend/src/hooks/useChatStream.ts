import { useState, useRef, useEffect, useCallback } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { ChatMessage, AgentChainStep } from '@/types/chat';
import { AgentId } from '@/types/agent';
import { playNotificationSound } from '@/lib/soundEffects';
import { apiClient } from '@/lib/apiClient';

export function useChatStream() {
  const {
    messages,
    addMessage,
    updateMessageText,
    updateMessageDetails,
    setMessageComplete,
    isStreaming,
    setIsStreaming,
  } = useChatStore();

  const [isAtBottom, setIsAtBottom] = useState(true);
  const abortControllerRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Monitor user scroll position to avoid intrusive scroll snapping
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setIsAtBottom(distanceFromBottom < 60);
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  // Auto-scroll only when user is already near bottom
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom(false);
    }
  }, [messages, isAtBottom, scrollToBottom]);

  const stopStreaming = useCallback(() => {
    abortControllerRef.current = true;
    setIsStreaming(false);
  }, [setIsStreaming]);

  const streamResponse = useCallback(async (userQuery: string) => {
    abortControllerRef.current = false;
    setIsStreaming(true);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userQuery,
      timestamp: now,
      status: 'complete',
    };
    addMessage(userMsg);

    // 2. Create Placeholder Bot Message
    const botMsgId = `bot-${Date.now()}`;
    const botMsg: ChatMessage = {
      id: botMsgId,
      sender: 'bot',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'streaming',
      primaryAgentId: 'coordinator',
    };
    addMessage(botMsg);

    // 3. Delegate to Swappable API Client (Live SSE vs Autonomous Mock Engine)
    await apiClient.streamAgentChat(
      userQuery,
      {
        onToken: (accumulatedText) => {
          updateMessageText(botMsgId, accumulatedText);
        },
        onPrimaryAgent: (primaryAgentId) => {
          updateMessageDetails(botMsgId, { primaryAgentId });
        },
        onAgentChain: (agentChain) => {
          updateMessageDetails(botMsgId, { agentChain });
        },
        onWidget: (widget) => {
          updateMessageDetails(botMsgId, { widget });
        },
        onComplete: () => {
          setMessageComplete(botMsgId);
          playNotificationSound();
        },
      },
      abortControllerRef.current ? { aborted: true } : undefined
    );
  }, [addMessage, updateMessageText, updateMessageDetails, setMessageComplete, setIsStreaming]);

  return {
    messages,
    isStreaming,
    containerRef,
    isAtBottom,
    streamResponse,
    stopStreaming,
    scrollToBottom,
    handleScroll,
  };
}
