import { create } from 'zustand';

import { ConversationType } from '../services/assistantService';

interface AssistantStore {
  conversation: ConversationType | null;
  isProcessing: boolean;

  setConversation: (conversation: ConversationType | null) => void;
  setIsProcessing: (isProcessing: boolean) => void;
}

export const useAssistantStore = create<AssistantStore>()(set => ({
  conversation: null,
  isProcessing: false,

  setConversation: (conversation: ConversationType | null) =>
    set({ conversation }),
  setIsProcessing: (isProcessing: boolean) => set({ isProcessing }),
}));
