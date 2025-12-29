import React, { useState } from "react";
import { Home, Info, Menu, X, Package, Tv } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 font-medium relative pb-1 text-sm md:text-base
     ${isActive ? "text-black after:w-full" : "text-gray-700 hover:text-black after:w-0 hover:after:w-full"}
     after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black after:transition-all after:duration-300
    `;

  return (
    <header className="w-full fixed bg-white shadow-md py-3 px-4 sm:px-6 flex items-center justify-between top-0 left-0 z-50">

      {/* Logo */}
      <div className="flex flex-col leading-tight">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          FiberWorld Communication
        </h1>
        <p className="text-[10px] sm:text-xs text-gray-400">
          Location: Thali Branch
        </p>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8">
        <NavLink to="/" className={linkClass}>
          <Home className="w-5 h-5" /> Home
        </NavLink>

        <NavLink to="/ourpackages" className={linkClass}>
          <Package className="w-5 h-5" /> More Packages
        </NavLink>

        <NavLink to="/tvpackages" className={linkClass}>
          <Tv className="w-5 h-5" /> TV Packages
        </NavLink>

        <NavLink to="/about" className={linkClass}>
          <Info className="w-5 h-5" /> About Us
        </NavLink>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
             onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-5 flex flex-col gap-4 transform transition-transform duration-300 md:hidden z-50
         ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <X
            className="w-6 h-6 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>

        <NavLink to="/" className={linkClass} onClick={() => setMobileMenuOpen(false)}>
          <Home className="w-5 h-5" /> Home
        </NavLink>

        <NavLink
          to="/ourpackages"
          className={linkClass}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Package className="w-5 h-5" /> More Packages
        </NavLink>

        <NavLink
          to="/tvpackages"
          className={linkClass}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Tv className="w-5 h-5" /> TV Packages
        </NavLink>

        <NavLink
          to="/about"
          className={linkClass}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Info className="w-5 h-5" /> About Us
        </NavLink>
      </div>
    </header>
  );
}
