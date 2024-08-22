import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

function ChatBox({ receiverId, chats, setChats }) {
  const [message, setMessage] = useState("");

  const userId = window.localStorage.getItem("userId");

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      console.log("receiverId", receiverId);

      const response = await axios.post(
        `http://localhost:8000/chat/message/send/${receiverId}`,
        { content: message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem(
              "chat-token"
            )}`,
          },
        }
      );

      setChats([...chats, { content: message, sender: userId }]);

      setMessage("");

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300">
      <form onSubmit={sendMessage} className="flex items-center max-w-full">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-14 m-1"
        />
        <button
          type="submit"
          className="p-3 rounded-r-lg size-14 text-2xl  bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition"
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
