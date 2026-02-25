// src/stores/chatStore.ts
import { create } from 'zustand';
import type { Chat, Message } from '../types';
import { mockChats, mockUsers } from '../data/mockData';

interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  
  setActiveChat: (chat: Chat | null) => void;
  sendMessage: (chatId: string, senderId: string, content: string) => void;
  createChat: (participants: string[]) => string;
  getOrCreateChat: (userId1: string, userId2: string) => string;
  markAsRead: (chatId: string) => void;
  getUserChats: (userId: string) => Chat[];
  simulateReply: (chatId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: mockChats,
  activeChat: null,

  setActiveChat: (chat) => set({ activeChat: chat }),

  sendMessage: (chatId, senderId, content) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      chatId,
      senderId,
      content,
      timestamp: new Date(),
      read: false,
    };

    set((state) => ({
      chats: state.chats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: newMessage,
          };
        }
        return chat;
      }),
    }));

    // Simulate auto-reply after 2 seconds
    setTimeout(() => {
      get().simulateReply(chatId);
    }, 2000);
  },

  createChat: (participants) => {
    const newChat: Chat = {
      id: Math.random().toString(36).substr(2, 9),
      participants,
      messages: [],
      unreadCount: 0,
    };
    
    set((state) => ({
      chats: [...state.chats, newChat],
    }));
    
    return newChat.id;
  },

  getOrCreateChat: (userId1, userId2) => {
    const existing = get().chats.find(c => 
      c.participants.includes(userId1) && c.participants.includes(userId2)
    );
    
    if (existing) return existing.id;
    
    return get().createChat([userId1, userId2]);
  },

  markAsRead: (chatId) => {
    set((state) => ({
      chats: state.chats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            unreadCount: 0,
            messages: chat.messages.map(m => ({ ...m, read: true })),
          };
        }
        return chat;
      }),
    }));
  },

  getUserChats: (userId) => {
    return get().chats.filter(c => c.participants.includes(userId));
  },

  simulateReply: (chatId) => {
    const replies = [
      "That's interesting! Tell me more.",
      "I'm definitely interested. When can we meet?",
      "Can you share more photos?",
      "What's the lowest price you can offer?",
      "Is the car still available?",
      "Thanks for the information!",
    ];
    
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    const chat = get().chats.find(c => c.id === chatId);
    
    if (chat) {
      const otherParticipant = chat.participants.find(id => id !== '2') || '3';
      const sender = mockUsers.find(u => u.id === otherParticipant);
      
      const replyMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        chatId,
        senderId: otherParticipant,
        content: `${sender?.name?.split(' ')[0] || 'User'}: ${randomReply}`,
        timestamp: new Date(),
        read: false,
      };

      set((state) => ({
        chats: state.chats.map(c => {
          if (c.id === chatId) {
            return {
              ...c,
              messages: [...c.messages, replyMessage],
              lastMessage: replyMessage,
              unreadCount: c.unreadCount + 1,
            };
          }
          return c;
        }),
      }));
    }
  },
}));