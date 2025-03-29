
import React from 'react';
import { useSocket } from '@/context/SocketContext';
import Login from '@/components/Login';
import ChatLayout from '@/components/ChatLayout';

const Index = () => {
  const { auth } = useSocket();

  return auth ? <ChatLayout /> : <Login />;
};

export default Index;
