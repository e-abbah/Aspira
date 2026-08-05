// components/Navbar.jsx
import { useState } from "react";
import { Compass, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative bg-[#121D33] px-6 md:px-10 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[#1C2B4A] flex items-center justify-center">
            <Compass size={16} className="text-[#F7F5F0]" />
          </div>
          <span className="text-xl font-serif font-bold text-[#F7F5F0]">Aspiria</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-[#F7F5F0]">
          <a href="#">Features</a>
          <a href="#">How It Works</a>
          <a href="#">Mentors</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg border border-[#F7F5F0]/30 text-sm text-[#F7F5F0]">
            Log In
          </button>

          <button className="px-4 py-2 rounded-lg bg-[#1C2B4A] text-[#F7F5F0] text-sm">
            Get Started
          </button>
        </div>

        <button className="md:hidden text-[#F7F5F0]" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pb-4 text-sm text-[#F7F5F0]">
          <a href="#">Features</a>
          <a href="#">How It Works</a>
          <a href="#">Mentors</a>
          <button className="px-4 py-2 rounded-lg border border-[#F7F5F0]/30">Log In</button>
          <button className="px-4 py-2 rounded-lg bg-[#1C2B4A]">Get Started</button>
        </div>
      )}
    </nav>
  );
}