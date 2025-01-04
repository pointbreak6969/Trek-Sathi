import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatBox = ({ history = [] }) => {
  const renderMessageContent = (message) => {
    return (
      <div className="space-y-2"> 
        {message.parts.map((part, index) => {
          if (part.inlineData) {
            const { data, mimeType } = part.inlineData;
            return (
              <img
                key={index}
                src={`data:${mimeType};base64,${data}`}
                alt="User uploaded image"
                className="max-w-full h-auto rounded-lg"
              />
            );
          }
          if (part.text) {
            return <div key={index}>{part.text}</div>;
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <ScrollArea className="flex-1 p-4">
        {history.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            How can Trek Sathi help you today?
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  } ${message.parts.some(part => part.inlineData) ? "p-1" : ""}`}
                >
                  {renderMessageContent(message)}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default ChatBox;