import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Plus, LogIn } from 'lucide-react';

const LOCAL_STORAGE_KEYS = {
  USERNAME: 'messaging-app-username',
  GROUPS: 'messaging-app-groups',
  MESSAGES: 'messaging-app-messages',
  CURRENT_GROUP: 'messaging-app-current-group'
};

const GroupChat = () => {
  const [username, setUsername] = useState(() => 
    localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME) || ''
  );
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.MESSAGES)) || [];
    } catch {
      return [];
    }
  });
  const [groups, setGroups] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.GROUPS)) || [];
    } catch {
      return [];
    }
  });
  const [currentGroup, setCurrentGroup] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_GROUP)) || null;
    } catch {
      return null;
    }
  });
  const [newGroupName, setNewGroupName] = useState('');
  const [joinGroupId, setJoinGroupId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => 
    Boolean(localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME))
  );

  useEffect(() => {
    if (username) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME, username);
    }
  }, [username]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.GROUPS, JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_GROUP, JSON.stringify(currentGroup));
  }, [currentGroup]);

  // Initialize Pusher
  useEffect(() => {
    const pusher = new Pusher('', {
      cluster: 'ap2',
    });

    if (currentGroup) {
      const channel = pusher.subscribe(`group-${currentGroup.id}`);
      channel.bind('new-message', (data) => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, data];
          localStorage.setItem(LOCAL_STORAGE_KEYS.MESSAGES, JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      });
    }

    return () => {
      if (currentGroup) {
        pusher.unsubscribe(`group-${currentGroup.id}`);
      }
    };
  }, [currentGroup]);

  const handleLogin = () => {
    if (username.trim()) {
      setIsLoggedIn(true);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME, username);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setCurrentGroup(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USERNAME);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_GROUP);
  };

  const createGroup = async () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: Date.now().toString(),
        name: newGroupName,
        createdBy: username,
        createdAt: new Date().toISOString()
      };
      setGroups(prevGroups => {
        const updatedGroups = [...prevGroups, newGroup];
        localStorage.setItem(LOCAL_STORAGE_KEYS.GROUPS, JSON.stringify(updatedGroups));
        return updatedGroups;
      });
      setNewGroupName('');
    }
  };

  const joinGroup = async () => {
    const group = groups.find((g) => g.id === joinGroupId);
    if (group) {
      setCurrentGroup(group);
      setJoinGroupId('');
    }
  };

  const sendMessage = async () => {
    if (message.trim() && currentGroup) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        username,
        timestamp: new Date().toISOString(),
        groupId: currentGroup.id,
      };

 

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem(LOCAL_STORAGE_KEYS.MESSAGES, JSON.stringify(updatedMessages));
        return updatedMessages;
      });
      setMessage('');
    }
  };

  if (!isLoggedIn) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Login to Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin}>
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Groups Sidebar */}
        <Card className="col-span-4 border-[#6366f1]/20">
          <CardHeader className="bg-gradient-to-r from-[#6366f1]/5 to-[#6366f1]/10">
            <CardTitle className="text-[#6366f1]">Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-5">
              
  
              <div className="flex gap-2">
                <Input
                  placeholder="Enter group ID"
                  value={joinGroupId}
                  onChange={(e) => setJoinGroupId(e.target.value)}
                  className="focus-visible:ring-[#6366f1]"
                />
                <Button 
                  onClick={joinGroup}
                  className="bg-[#6366f1] hover:bg-[#6366f1]/90"
                >
                  Join
                </Button>
              </div>
  
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {groups.map((group) => (
                    <Button
                      key={group.id}
                      variant={currentGroup?.id === group.id ? "default" : "outline"}
                      className={`w-full justify-start ${
                        currentGroup?.id === group.id 
                          ? "bg-[#6366f1] hover:bg-[#6366f1]/90 text-white"
                          : "hover:bg-[#6366f1]/5 border-[#6366f1]/20"
                      }`}
                      onClick={() => setCurrentGroup(group)}
                    >
                      <div className="text-left">
                        <div>{group.name}</div>
                        <div className="text-xs opacity-70">ID: {group.id}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
  
        {/* Chat Area */}
        <Card className="col-span-8 border-[#6366f1]/20">
          <CardHeader className="bg-gradient-to-r from-[#6366f1]/5 to-[#6366f1]/10">
            <CardTitle className="text-[#6366f1]">
              {currentGroup ? `${currentGroup.name} - Chat` : 'Select a group'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentGroup ? (
              <>
                <ScrollArea className="h-[400px] mb-4">
                  <div className="space-y-4 mt-2">
                    {messages
                      .filter((msg) => msg.groupId === currentGroup.id)
                      .map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-2 rounded-lg ${
                            msg.username === username
                              ? 'bg-[#6366f1] text-white ml-auto'
                              : 'bg-[#6366f1]/5'
                          } max-w-[70%]`}
                        >
                          <div className={`font-semibold text-sm ${
                            msg.username === username ? 'text-white/90' : 'text-[#6366f1]'
                          }`}>
                            {msg.username}
                          </div>
                          <div>{msg.text}</div>
                          <div className={`text-xs ${
                            msg.username === username ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="focus-visible:ring-[#6366f1]"
                  />
                  <Button 
                    onClick={sendMessage}
                    className="bg-[#6366f1] hover:bg-[#6366f1]/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">
                Please select or join a group to start chatting
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GroupChat;