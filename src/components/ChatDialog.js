import React, { useState } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { CozeAPI, COZE_CN_BASE_URL, ChatStatus, RoleType } from "@coze/api";

const ChatDialog = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (content, type) => {
    const apiKey = process.env.REACT_APP_COZE_API_KEY;
    const botId = process.env.REACT_APP_BOT_ID;

    if (!apiKey || !botId) {
      console.error("API key or bot ID is missing in environment variables.");
      return;
    }

    setIsLoading(true);
    const client = new CozeAPI({
      token: apiKey,
      allowPersonalAccessTokenInBrowser: true,
      baseURL: COZE_CN_BASE_URL,
    });
    try {
      const v = await client.chat.createAndPoll({
        bot_id: botId,
        additional_messages: [
          {
            role: RoleType.User,
            content: content,
            content_type: type,
          },
        ],
      });

      if (v.chat.status === ChatStatus.COMPLETED) {
        const userMessage = {
          id: Date.now(),
          content: content,
          type: type,
          isBot: false,
        };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        for (const item of v.messages) {
          const botMessage = {
            id: Date.now() + Math.random(),
            content: item.content,
            type: item.type,
            isBot: true,
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
          console.log(botMessage);
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = {
        id: Date.now(),
        content: "请求失败，请重试",
        type: "text",
        isBot: true,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-dialog">
      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <div className="loading-indicator">Loading...</div>}
      </div>
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
};

export default ChatDialog;
