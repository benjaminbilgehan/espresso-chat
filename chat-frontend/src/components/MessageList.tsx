import React, { useRef, useEffect } from 'react';
import { useSocket } from '@/context/SocketContext';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const MessageList = () => {
  const { messages, username } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { [key: string]: typeof messages } = {};
    
    messages.forEach(msg => {
      const date = new Date(msg.timestamp);
      const dateKey = format(date, 'yyyy-MM-dd');
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      
      groups[dateKey].push(msg);
    });
    
    return groups;
  };

  // Format message text with paragraph styling
  const formatMessageText = (text: string) => {
    // Split text into paragraphs by line breaks
    return text.split('\n').map((paragraph, index) => (
      paragraph.trim() !== '' && (
        <p
          key={index}
          className="py-1.5 first:pt-0 last:pb-0"
        >
          {paragraph}
        </p>
      )
    ));
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="space-y-6 py-4 px-1">
      {Object.entries(messageGroups).map(([dateKey, msgs]) => (
        <div key={dateKey} className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-muted px-3 py-1 text-xs rounded-full text-muted-foreground">
              {format(new Date(dateKey), 'EEEE, MMMM d')}
            </div>
          </div>
          
          {msgs.map((msg, index) => {
            const isOwnMessage = msg.username === username;
            const showAvatar = index === 0 || msgs[index - 1]?.username !== msg.username;
            const consecutive = index > 0 && msgs[index - 1]?.username === msg.username;
            
            return (
              <div
                key={msg.id}
                className={cn(
                  "flex items-end gap-2 group",
                  isOwnMessage ? "justify-end" : "justify-start",
                  consecutive && !isOwnMessage ? "pl-12" : "",
                  consecutive && isOwnMessage ? "pr-12" : ""
                )}
              >
                {!isOwnMessage && showAvatar && (
                  <Avatar className="h-10 w-10 shrink-0 border-2 border-indigo-100 shadow-sm">
                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                      {getInitials(msg.username)}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                {!isOwnMessage && !showAvatar && <div className="w-10 shrink-0" />}
                
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-4 py-2 break-words group-hover:opacity-100 shadow-sm border",
                    isOwnMessage 
                      ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-none border-indigo-500" 
                      : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 rounded-bl-none border-gray-200",
                    consecutive && !isOwnMessage ? "rounded-tl-md" : "",
                    consecutive && isOwnMessage ? "rounded-tr-md" : ""
                  )}
                >
                  {!isOwnMessage && !consecutive && (
                    <div className="font-medium text-sm text-indigo-800 dark:text-indigo-300 mb-1">
                      {msg.username}
                    </div>
                  )}
                  <div className="text-sm space-y-1">
                    {formatMessageText(msg.message)}
                  </div>
                  <div 
                    className={cn(
                      "text-xs mt-1 text-right opacity-70 transition-opacity",
                      isOwnMessage ? "text-indigo-200" : "text-gray-500"
                    )}
                  >
                    {format(new Date(msg.timestamp), 'h:mm a')}
                  </div>
                </div>
                
                {isOwnMessage && showAvatar && (
                  <Avatar className="h-10 w-10 shrink-0 border-2 border-indigo-400 shadow-sm">
                    <AvatarFallback className="bg-indigo-600 text-indigo-100">
                      {getInitials(username)}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                {isOwnMessage && !showAvatar && <div className="w-10 shrink-0" />}
              </div>
            );
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
