
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  auth: boolean;
  username: string;
  availableRooms: string[];
  currentRoom: string;
  messages: Message[];
  roomUsers: string[];
  logout: () => void;
  login: (username: string) => void;
  joinRoom: (room: string) => void;
  createRoom: (room: string) => void;
  sendMessage: (message: string) => void;
}

export interface Message {
  id: number;
  username: string;
  message: string;
  timestamp: string;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [availableRooms, setAvailableRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomUsers, setRoomUsers] = useState<string[]>([]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Set up socket event listeners
    newSocket.on('auth_success', (data) => {
      setAuth(true);
      setAvailableRooms(data.rooms);
    });

    newSocket.on('rooms_updated', (rooms) => {
      setAvailableRooms(rooms);
    });

    newSocket.on('room_history', (data) => {
      setMessages(data.messages);
      setCurrentRoom(data.room);
    });

    newSocket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('user_joined', (data) => {
      setRoomUsers(data.users);
    });

    newSocket.on('user_left', (data) => {
      setRoomUsers(data.users);
    });

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const logout = () => {
    if (auth && username) {
      socket.emit('userDisconnect', { username });
      setAuth(false);
      setUsername('');
      setCurrentRoom(null);
      setMessages([]);
      setRoomUsers([]);
    }
  };

  const login = (name: string) => {
    if (socket && name.trim()) {
      setUsername(name);
      socket.emit('auth_user', name);
    }
  };

  const joinRoom = (room: string) => {
    if (socket && auth) {
      socket.emit('join_room', room);
    }
  };

  const createRoom = (room: string) => {
    if (socket && auth && room.trim()) {
      socket.emit('create_room', room);
    }
  };

  const sendMessage = (message: string) => {
    if (socket && auth && currentRoom && message.trim()) {
      socket.emit('send_message', { room: currentRoom, message });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        auth,
        username,
        availableRooms,
        currentRoom,
        messages,
        roomUsers,
        logout,
        login,
        joinRoom,
        createRoom,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
