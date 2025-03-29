
import React, { useState } from 'react';
import { useSocket } from '@/context/SocketContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter 
} from '@/components/ui/dialog';
import { Plus, MessageCircle, LogOut } from 'lucide-react';

const Sidebar = () => {
  const [newRoom, setNewRoom] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { availableRooms, currentRoom, joinRoom, createRoom, username, logout } = useSocket();

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoom.trim()) {
      createRoom(newRoom);
      setNewRoom('');
      setIsOpen(false);
    }
  };

  return (
    <div className="w-64 bg-indigo-800 text-white flex flex-col h-full">
      <div className="p-4 border-b border-indigo-700">
        <h1 className="text-xl font-bold">EspressoChat</h1>
        <div className="text-indigo-300 text-sm mt-1">Welcome, {username}</div>
      </div>
      
      <div className="p-4 flex items-center justify-between">
        <h2 className="font-medium">Rooms</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Room</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateRoom}>
              <div className="py-4">
                <Input
                  placeholder="Room name"
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Create Room</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex-1 overflow-auto p-2">
        <ul className="space-y-1">
          {availableRooms.map((room) => (
            <li key={room}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  currentRoom === room
                    ? 'bg-indigo-700'
                    : 'hover:bg-indigo-700/50'
                }`}
                onClick={() => joinRoom(room)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                #{room}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-indigo-700">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-indigo-200 hover:bg-indigo-700/50 hover:text-white"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
