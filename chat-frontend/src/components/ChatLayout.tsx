
import React from 'react';
import { useSocket } from '@/context/SocketContext';
import Sidebar from '@/components/Sidebar';
import ChatRoom from '@/components/ChatRoom';

const ChatLayout = () => {
  const { currentRoom } = useSocket();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentRoom ? (
          <ChatRoom />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 max-w-md">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome to EspressoChat!</h2>
              <p className="text-gray-600">
                Select a room from the sidebar to start chatting, or create a new one.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
