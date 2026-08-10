// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/welcome";
import DashboardPage from "./pages/Dashboard";
import Journey from './pages/Journey';
import Workspace from "./pages/Workspace";

// ...


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
         <Route path="/journey" element={<Journey/>} />
         <Route path="/workspace" element= {<Workspace />} />
      </Routes>
    </BrowserRouter>
  );
}