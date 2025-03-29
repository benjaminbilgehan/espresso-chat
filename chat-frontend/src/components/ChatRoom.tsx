
import React, { useEffect, useRef } from 'react';
import { useSocket } from '@/context/SocketContext';
import MessageInput from '@/components/MessageInput';
import MessageList from '@/components/MessageList';
import RoomHeader from '@/components/RoomHeader';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatRoom = () => {
  const { currentRoom, messages } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <RoomHeader />
      <ScrollArea className="flex-1 p-4">
        <MessageList />
        <div ref={messagesEndRef} />
      </ScrollArea>
      <MessageInput />
    </div>
  );
};

export default ChatRoom;
