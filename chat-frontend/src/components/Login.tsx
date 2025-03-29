
import React, { useState } from 'react';
import { useSocket } from '@/context/SocketContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const Login = () => {
  const [inputUsername, setInputUsername] = useState('');
  const [isDisable, setIsDisable] = useState<boolean>(inputUsername.length > 0 ? false : true);
  const { login } = useSocket();

  const handleInputUsername = (username: string) => {
    setInputUsername(username);
    if (username.length > 0) {
      setIsDisable(false)
    } else {
      setIsDisable(true);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      login(inputUsername);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-indigo-700">EspressoChat</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={inputUsername}
                onChange={(e) => handleInputUsername(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <Button type="submit" disabled={isDisable} className="w-full bg-indigo-600 hover:bg-indigo-700">
              Join Chat
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Enter any username to start chatting
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
