import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

function ChatBox() {
  const [message, setMessage] = useState("");

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300">
      <div className="flex items-center max-w-full">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="p-3 bg-blue-950 text-white rounded-r-lg size-10 text-1.5xl hover:bg-blue-800 transition">
          <IoSend />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
