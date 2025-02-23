import React from "react";
import "./MessageBubble.css";
import ReactMarkdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";

const MessageBubble = ({ message, onFollowUpClick }) => {
  // 基础验证
  if (!message || typeof message !== "object") {
    console.error("无效的消息格式:", message);
    return null;
  }

  // 跳过verbose类型消息
  if (message.type === "verbose") {
    return null;
  }

  // 获取消息内容
  const content = message.content || "";
  if (!content) {
    console.error("消息没有有效内容:", message);
    return null;
  }
  console.log(message);
  return (
    <div
      className={`message-bubble ${message.isBot ? "bot" : "user"} ${
        message.messageType || ""
      }`}
    >
      {message.messageType === "follow_up" ? (
        <button
          className="follow-up-button"
          onClick={() => onFollowUpClick && onFollowUpClick(content)}
        >
          👉 {content}
        </button>
      ) : message.type === "code" ? (
        <div className="code-block">
          <pre>{content}</pre>
          <CopyToClipboard text={content}>
            <button>Copy</button>
          </CopyToClipboard>
        </div>
      ) : message.type === "image" ? (
        <img src={content} alt="Uploaded content" />
      ) : (
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => <div {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default MessageBubble;
