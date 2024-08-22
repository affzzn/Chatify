import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

function Chat({ socket }) {
  const navigate = useNavigate();

  const [chatInitiated, setChatInitiated] = useState(false);
  const [chats, setChats] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const userId = window.localStorage.getItem("userId");

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

  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setChats((prevChats) => [
        ...prevChats,
        { sender: msg.sender, content: msg.content },
      ]);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("join", userId);
  });

  return (
    <div className="flex h-screen ">
      <Sidebar
        setChatInitiated={setChatInitiated}
        // socket={socket}
        setReceiverId={setReceiverId}
        setChats={setChats}
      />
      <div className="flex-1 bg-gray-100 p-4 mt-2 mr-2 mb-2 rounded-2xl relative">
        {!chatInitiated && (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl text-gray-500">
              Click on a user to start texting
            </p>
          </div>
        )}

        {chatInitiated && (
          <div className="h-full relative flex flex-col justify-end">
            <div className="flex-grow overflow-y-auto mb-4">
              {chats.map((c) => (
                <div
                  key={c._id}
                  className={`flex ${
                    c.sender === window.localStorage.getItem("userId")
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 m-1 max-w-xs text-sm rounded-lg ${
                      c.sender === window.localStorage.getItem("userId")
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {c.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-0">
              <ChatBox
                receiverId={receiverId}
                chats={chats}
                setChats={setChats}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
