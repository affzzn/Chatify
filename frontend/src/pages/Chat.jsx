import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Chat() {
  const navigate = useNavigate();

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
    <div>
      <Sidebar />
    </div>
  );
}

export default Chat;
