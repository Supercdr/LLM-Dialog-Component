import React, { useState } from "react";
import "./ChatDialog.css";
import ChatInput from "../ChatInput/ChatInput";
import MessageBubble from "../MessageBubble/MessageBubble";
import { CozeAPI, COZE_CN_BASE_URL, ChatStatus, RoleType } from "@coze/api";

const ChatDialog = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 处理跟进问题点击
  const handleFollowUpClick = async (content) => {
    // 直接调用handleSend处理跟进问题
    await handleSend(content, "text");
  };

  const handleSend = async (content, type) => {
    const apiKey = process.env.REACT_APP_COZE_API_KEY;
    const botId = process.env.REACT_APP_BOT_ID;

    if (!apiKey || !botId) {
      console.error("API key or bot ID is missing in environment variables.");
      return;
    }

    // 先添加用户消息
    const userMessage = {
      id: Date.now(),
      content: content,
      type: type,
      isBot: false,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

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

      console.log("完整的API响应:", JSON.stringify(v, null, 2));

      if (v.chat.status === ChatStatus.COMPLETED) {
        if (v.messages && Array.isArray(v.messages)) {
          for (const item of v.messages) {
            if (item.type === "verbose") {
              continue;
            }

            if (
              item.role === "assistant" &&
              (item.type === "answer" || item.type === "follow_up")
            ) {
              const botMessage = {
                id: Date.now() + Math.random(),
                content: item.content,
                type: item.content_type,
                isBot: true,
                messageType: item.type,
              };
              setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
          }
        }
      }
    } catch (error) {
      console.error("API错误:", error);
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
          <MessageBubble
            key={msg.id}
            message={msg}
            onFollowUpClick={handleFollowUpClick}
          />
        ))}
        {isLoading && (
          <div className="loading-indicator">
            小助手正在努力思考，请稍等哦......
          </div>
        )}
      </div>
      <footer className="chatInput">
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </footer>
    </div>
  );
};

export default ChatDialog;
