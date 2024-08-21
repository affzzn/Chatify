import React from "react";
import { Link } from "react-router-dom";

function Home() {
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
