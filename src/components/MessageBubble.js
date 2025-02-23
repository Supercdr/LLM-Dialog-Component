import React from "react";
import ReactMarkdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";

const MessageBubble = ({ message }) => {
  return (
    <div className={`message-bubble ${message.isBot ? "bot" : "user"}`}>
      {message.type === "code" ? (
        <div className="code-block">
          <pre>{message.content}</pre>
          <CopyToClipboard text={message.content}>
            <button>Copy</button>
          </CopyToClipboard>
        </div>
      ) : message.type === "image" ? (
        <img src={message.content} alt="Uploaded content" />
      ) : (
        <ReactMarkdown>{message.content}</ReactMarkdown>
      )}
    </div>
  );
};

export default MessageBubble;
