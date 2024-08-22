import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/chat/user/verify",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "chat-token"
              )}`,
            },
          }
        );
        if (response.data.message === "success") {
          window.location.href = "/chat";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    verifyUser();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen  bg-slate-300">
      <div className="text-center">
        <h2 className="text-blue-500 text-7xl mb-4">Chatify</h2>
        <Link to={"/login"}>
          <button className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition mt-5">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
