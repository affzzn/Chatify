import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/about" element={<div>About</div>} />
        <Route path="/contact" element={<div>Contact</div>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
