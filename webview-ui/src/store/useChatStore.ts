import { create } from 'zustand';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

interface ChatState {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  addMessage: (message: Message) => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  input: '',
  setInput: (input) => set({ input }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));

export default useChatStore;
