// src/components/chat/ChatList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../../stores/chatStore';
import { useAuthStore } from '../../stores/authStore';
import { mockUsers } from '../../data/mockData';
import { formatDistanceToNow } from '../../utils/helpers';

export const ChatList: React.FC = () => {
  const { chats, setActiveChat, activeChat } = useChatStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const userChats = user ? chats.filter(c => c.participants.includes(user.id)) : [];

  const getOtherParticipant = (chat: typeof chats[0]) => {
    const otherId = chat.participants.find(id => id !== user?.id);
    return mockUsers.find(u => u.id === otherId);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">Messages</h2>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {userChats.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No messages yet
          </div>
        ) : (
          userChats.map((chat) => {
            const otherUser = getOtherParticipant(chat);
            const isActive = activeChat?.id === chat.id;
            
            return (
              <button
                key={chat.id}
                onClick={() => {
                  setActiveChat(chat);
                  navigate('/messages');
                }}
                className={`
                  w-full flex items-start gap-3 p-4 text-left transition-colors
                  ${isActive ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'}
                `}
              >
                <img 
                  src={otherUser?.avatar} 
                  alt={otherUser?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {otherUser?.name}
                    </h3>
                    {chat.lastMessage && (
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(chat.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage?.content || 'No messages yet'}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full mt-1">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};