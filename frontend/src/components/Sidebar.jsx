import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";

function Sidebar() {
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

  return (
    <div>
      <input type="text" placeholder="Search"></input>
      {users.length > 0 ? (
        users.map((u) => (
          <div key={u._id}>
            <IoPersonCircleSharp />
            <p>{u.username}</p>
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}

export default Sidebar;
