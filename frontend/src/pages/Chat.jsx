import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

function Chat() {
  const navigate = useNavigate();

  const [chatInitiated, setChatInitiated] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/chat/user/verify"
        );
        if (response.data.message !== "success") {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    verifyUser();
  }, []);

  return (
    <div className="flex h-screen ">
      <Sidebar setChatInitiated={setChatInitiated} />
      <div className="flex-1 bg-gray-100 p-4 mt-2 mr-2 mb-2 rounded-2xl relative">
        {!chatInitiated && (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl text-gray-500">
              Click on a user to start chatting
            </p>
          </div>
        )}
        {chatInitiated && (
          <div className="h-full relative">
            <p>chat initiated</p>
            <div className="absolute inset-x-0 bottom-0">
              <ChatBox />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
