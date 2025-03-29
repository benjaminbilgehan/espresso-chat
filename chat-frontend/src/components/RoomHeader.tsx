
import React from 'react';
import { useSocket } from '@/context/SocketContext';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

const RoomHeader = () => {
  const { currentRoom, roomUsers } = useSocket();

  return (
    <div className="flex items-center justify-between bg-white border-b p-4">
      <div>
        <h2 className="font-bold text-xl text-gray-800">#{currentRoom}</h2>
      </div>
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-gray-500" />
        <Badge variant="outline" className="flex gap-1 items-center">
          {roomUsers.length} online
        </Badge>
      </div>
    </div>
  );
};

export default RoomHeader;
