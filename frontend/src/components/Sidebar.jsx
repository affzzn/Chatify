import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoLogOut, IoPersonCircleSharp } from "react-icons/io5";

function Sidebar({ setChatInitiated, setChats, setReceiverId }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null); // Track the active user

  const fetchUsers = async () => {
    try {
      const token = window.localStorage.getItem("chat-token");
      console.log("Token:", token); // Check if the token exists

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get("http://localhost:8000/chat/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("chat-token")}`,
        },
      });

      console.log(response.data);
      console.log(response.data.users);

      if (response.data.message === "success") {
        setUsers(response.data.users);
        console.log(response.data.users);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error:", error);
      navigate("/"); // Redirect to home if fetching users fails
    }
  };

  useEffect(() => {
    console.log("Component mounted, calling fetchUsers...");
    fetchUsers();
    console.log("fetchUsers should have been called.");
  }, []);

  console.log(users);

  const startChat = async (userId) => {
    try {
      console.log(userId);

      const response = await axios.get(
        `http://localhost:8000/chat/message/read/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem(
              "chat-token"
            )}`,
          },
        }
      );

      console.log(response.data);

      if (response.status === 404) {
        setChats([]); // If no messages are found, set chats to an empty array
      } else {
        setChats(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      setChats([]); // Handle case where no messages are found
    }

    setReceiverId(userId); // Make sure this is called
    setChatInitiated(true);
    setActiveUserId(userId); // Set the active user for UI
  };

  const handleLogout = () => {
    window.localStorage.removeItem("chat-token");
    window.localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-300 rounded-2xl mt-2 ml-2 mb-2 mr-1 flex flex-col h-full">
      <h1 className="text-3xl font-bold p-2 text-blue-500">Chatify</h1>
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Search"
          className="w-full mb-4 p-2 border border-gray-300 rounded-2xl"
        />
        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((u) => (
              <div
                onClick={() => startChat(u._id)}
                key={u._id}
                className={`flex items-center space-x-2 p-2 cursor-pointer rounded-lg ${
                  activeUserId === u._id
                    ? "bg-blue-100 hover:bg-blue-200"
                    : "hover:bg-blue-200"
                }`}
              >
                <IoPersonCircleSharp size={30} className="text-blue-500" />
                <p className="text-gray-800">{u.username}</p>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 size-12 transition max-w-10"
      >
        <IoLogOut />
      </button>
    </div>
  );
}

export default Sidebar;
