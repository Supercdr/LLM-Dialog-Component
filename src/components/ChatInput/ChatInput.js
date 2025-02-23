import React, { useState, useRef } from "react";
import "./ChatInput.css";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");
  const fileInputRef = useRef();
  const textareaRef = useRef();

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
      console.log(input);
      onSend(input, "text");
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // 自动调整文本框高度
  const adjustTextareaHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = "inherit";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; // 最大高度120px
  };

  return (
    <div className="chat-input">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      ></input>

      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          adjustTextareaHeight(e);
        }}
        onKeyPress={handleKeyPress}
        placeholder="请输入你的问题（按Enter发送，Shift+Enter换行）"
        rows="1"
      />
      <svg
        t="1739514762503"
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="24333"
        width="35"
        height="35"
      >
        <title>上传文件</title>
        <path
          d="M657.237333 176.725333a70.997333 70.997333 0 0 0-50.432 21.034667l-0.085333 0.085333-369.92 371.072a101.973333 101.973333 0 0 0 0.085333 142.933334l103.936 105.685333a99.285333 99.285333 0 0 0 141.354667 0l0.170667-0.128 347.264-350.250667a45.738667 45.738667 0 1 1 64.896 64.426667l-347.050667 349.994667-0.128 0.085333a190.421333 190.421333 0 0 1-271.701333 0l-103.893334-105.642667a193.408 193.408 0 0 1 0-271.36l0.213334-0.170666L541.866667 133.333333a162.432 162.432 0 0 1 230.570666 0l41.258667 41.216v0.042667a162.389333 162.389333 0 0 1 0.085333 230.528l-0.085333 0.085333-327.722667 328.874667-0.042666 0.085333a104.106667 104.106667 0 0 1-147.754667 0l-0.298667-0.384-20.181333-20.736a104.106667 104.106667 0 0 1 0.298667-147.498666l220.032-218.197334a45.696 45.696 0 0 1 64.384 64.853334l-220.074667 218.282666a12.757333 12.757333 0 0 0 0 17.962667l0.64 0.597333 20.224 20.736a12.629333 12.629333 0 0 0 17.877333-0.042666v-0.085334l328.021334-329.130666 0.170666-0.256a70.997333 70.997333 0 0 0 0-100.821334l-41.685333-41.685333a71.04 71.04 0 0 0-50.389333-21.034667z"
          p-id="24334"
        ></path>
      </svg>
      <svg
        onClick={handleSubmit}
        t="1739513987315"
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="9352"
        data-spm-anchor-id="a313x.search_index.0.i14.f9d53a81oRVXBD"
        width="50"
        height="50"
      >
        <path
          d="M512 85.333333c234.666667 0 426.666667 192 426.666667 426.666667s-192 426.666667-426.666667 426.666667S85.333333 746.666667 85.333333 512 277.333333 85.333333 512 85.333333z m-6.4 234.666667c-4.266667 2.133333-6.4 2.133333-12.8 8.533333l-153.6 153.6c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l96-96V682.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V430.933333l96 96c12.8 12.8 32 12.8 44.8 0s12.8-32 0-44.8l-153.6-153.6c-6.4-6.4-8.533333-8.533333-12.8-8.533333s-8.533333-2.133333-12.8 0z"
          p-id="9353"
          data-spm-anchor-id="a313x.search_index.0.i13.f9d53a81oRVXBD"
          className="selected"
          fill="#0567c6"
        ></path>
      </svg>
    </div>
  );
};

export default ChatInput;
