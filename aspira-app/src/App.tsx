// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/welcome";
import DashboardPage from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/signup/welcome" element={<Welcome />} />
         <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}