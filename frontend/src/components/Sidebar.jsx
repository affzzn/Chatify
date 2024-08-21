import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";

function Sidebar({ setChatInitiated }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

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

  const startChat = (userId) => {
    setChatInitiated(true);
  };

  const handleLogout = () => {};

  return (
    <div className="w-1/4 bg-white p-4 border-r border-gray-300 rounded-2xl mt-2 ml-2 mb-2 mr-1">
      <input
        type="text"
        placeholder="Search"
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((u) => (
            <div
              onClick={() => startChat(u._id)}
              key={u._id}
              className="flex items-center space-x-2 p-2 hover:bg-slate-200 cursor-pointer"
            >
              <IoPersonCircleSharp size={30} className="text-blue-500" />
              <p className="text-gray-800">{u.username}</p>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="w-full mt-4 p-2 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
