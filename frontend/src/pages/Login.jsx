import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Ensure you're using react-router for navigation
import axios from "axios";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/chat/user/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json", // Ensure the correct content type
          },
        }
      );

      console.log(response.data);

      if (response.data.message === "success") {
        window.localStorage.setItem("chat-token", response.data.token);
        window.localStorage.setItem("userId", response.data.user.id);

        navigate("/chat");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-slate-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Don't have an account?</p>
          <Link to="/register" className="text-blue-500 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
