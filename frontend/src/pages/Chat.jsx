import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        navigate("/login");
      }
    };
    verifyUser();
  }, []);

  return <div className="text-3xl text-blue-500 text-center mt-5">Chat</div>;
}

export default Chat;
