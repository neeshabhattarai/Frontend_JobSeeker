import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "./logo.jpg";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center py-3">
        {/* Logo */}

        <div className="text-2xl inline-flex text-black font-bold items-center">
          <img src={logo} className="h-5 w-5 mr-1" alt="" />
          Job<span className="text-2xl text-blue-700">seeker</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex text-sm space-x-5 font-bold opacity-80">
          <a href="#jobs" className="cursor-pointer">
            Jobs
          </a>
          <a href="#company">Companies</a>
          <a href="#abour">About Us</a>
        </div>

        {/* User + Avatar (desktop only) */}
        <div className="hidden md:flex text-sm font-bold space-x-2">
          <div className="bg-blue-700 rounded-full w-7 h-7 text-white flex justify-center pt-0.5">
            A
          </div>
          <div>Aahan</div>
        </div>

        {/* Hamburger (mobile only) */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md rounded-md p-4 space-y-4 font-semibold text-sm">
          <a href="#jobs" className="cursor-pointer">
            Jobs
          </a>
          <div>Companies</div>
          <div>About Us</div>

          <div className="border-t pt-3 flex items-center space-x-2">
            <div className="bg-blue-700 rounded-full w-7 h-7 text-white flex justify-center pt-0.5">
              A
            </div>
            <div>Aahan</div>
          </div>
        </div>
      )}
    </nav>
  );
}
