import React, { useState } from "react";
import { Home, Info, Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">FiberWorld Communication</h1>
        <p className="text-xs md:text-sm text-gray-400">Location: Thali Branch</p>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6">
        <a href="/" className="text-gray-700 hover:text-black font-medium flex items-center gap-1">
          <Home className="w-5 h-5" />
        </a>
        <a href="/about" className="text-gray-700 hover:text-black font-medium flex items-center gap-1">
          <Info className="w-5 h-5" />
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 md:hidden">
          <a href="/" className="text-gray-700 hover:text-black font-medium flex items-center gap-2">
            <Home className="w-5 h-5" /> Home
          </a>
          <a href="/about" className="text-gray-700 hover:text-black font-medium flex items-center gap-2">
            <Info className="w-5 h-5" /> About
          </a>
        </div>
      )}
    </header>
  );
}