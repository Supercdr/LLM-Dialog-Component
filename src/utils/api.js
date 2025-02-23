import axios from "axios";

export const cozeChat = async (query) => {
  try {
    const response = await axios.post(
      "https://api.coze.cn/open_api/v2/chat",
      {
        conversation_id: Date.now().toString(), // 简单示例用时间戳作为会话ID
        bot_id: process.env.REACT_APP_COZE_BOT_ID,
        user: "web_user",
        query: query,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_COZE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Coze API Error:", error);
    throw error;
  }
};

// export const fetchStreamingResponse = async (input, onChunk) => {
//   const response = await axios.post(
//     "https://api.example.com/chat",
//     { input },
//     {
//       responseType: "stream",
//     }
//   );

//   const reader = response.data.getReader();
//   let result = "";
//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
//     const chunk = new TextDecoder().decode(value);
//     result += chunk;
//     onChunk(chunk);
//   }
//   return result;
// };
