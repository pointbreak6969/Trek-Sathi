import ChatBox from "./ChatBox";
import { useState, useEffect, useCallback } from "react";
import { gemini } from "@/lib/constant";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import chatService from "@/services/chat";
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState(null);

  const genAI = new GoogleGenerativeAI(gemini);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    const initialChat = model.startChat();
    setChat(initialChat);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !chat) return;

    try {
      setIsLoading(true);
      const newMessage = { role: "user", parts: [{ text: message }] };
      setMessages(prev => [...prev, newMessage]);

      const result = await chat.sendMessage(message);
      const response = await result.response;
      
      setMessages(prev => [...prev, { 
        role: "model", 
        parts: [{ text: response.text() }] 
      }]);

      setMessage("");
      if (history.length ===0) {
        const response = chatService.createChat(messages);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <ChatBox history={messages} />
      <Card>
        <CardContent className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;