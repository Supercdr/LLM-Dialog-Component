import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onSend(reader.result, file.type.startsWith("image") ? "image" : "file");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (input.trim()) {
      onSend(input, "text");
      setInput("");
      navigate("/chatDialog");
    }
  };

  return (
    <div className="chat-input">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button onClick={() => fileInputRef.current.click()}>📎</button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="请输入你的问题"
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button onClick={handleSubmit}>发送</button>
    </div>
  );
};

export default ChatInput;
