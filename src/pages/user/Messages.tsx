// src/pages/user/Messages.tsx
import React from 'react';
import { ChatList } from '../../components/chat/ChatList';
import { ChatWindow } from '../../components/chat/ChatWindow';

export const Messages: React.FC = () => {
  return (
    <div className="h-[calc(100vh-12rem)]">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>
      
      <div className="flex gap-6 h-full">
        <div className="w-80 flex-shrink-0">
          <ChatList />
        </div>
        <ChatWindow />
      </div>
    </div>
  );
};