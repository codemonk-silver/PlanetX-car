// src/components/chat/ChatWindow.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import { useChatStore } from '../../stores/chatStore';
import { useAuthStore } from '../../stores/authStore';
import { mockUsers } from '../../data/mockData';
import { Button } from '../ui/Button';

export const ChatWindow: React.FC = () => {
  const { activeChat, sendMessage, markAsRead } = useChatStore();
  const { user } = useAuthStore();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeChat) {
      markAsRead(activeChat.id);
      scrollToBottom();
    }
  }, [activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <div className="text-center">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Select a conversation</h3>
          <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
        </div>
      </div>
    );
  }

  const otherParticipant = mockUsers.find(u => 
    activeChat.participants.includes(u.id) && u.id !== user?.id
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;
    
    sendMessage(activeChat.id, user.id, message);
    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img 
            src={otherParticipant?.avatar} 
            alt={otherParticipant?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{otherParticipant?.name}</h3>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeChat.messages.map((msg) => {
          const isOwn = msg.senderId === user?.id;
          const sender = mockUsers.find(u => u.id === msg.senderId);
          
          return (
            <div 
              key={msg.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                <img 
                  src={sender?.avatar} 
                  alt={sender?.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <div 
                    className={`
                      px-4 py-2 rounded-2xl
                      ${isOwn 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                      }
                    `}
                  >
                    <p>{msg.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button type="submit" disabled={!message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};