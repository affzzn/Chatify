import React from "react";
import { Link } from "react-router-dom"; // Ensure you're using react-router for navigation
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [profileImage, setProfileImage] = React.useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost:8000/chat/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure the correct content type
          },
        }
      );

      console.log(response.data);

      if (response.data.message === "success") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleFileChange = (e) => {
  //   setProfileImage(e.target.files[0]);
  // };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
          Register
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
          {/* <div>
            <label htmlFor="profileImage" className="block text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleFileChange}
            />
          </div> */}
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Already have an account?</p>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
