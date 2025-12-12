import React from "react";
import { Facebook, Instagram, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 px-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold">FiberWorld Communication</h2>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            Providing fast and reliable internet services across the valley with excellent support and customer satisfaction.
          </p>
          <p className="text-gray-400 text-sm mt-2">Location: Thali Branch</p>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <div className="flex items-center gap-3 text-gray-300 mt-4">
            <Phone className="w-5 h-5" />
            <span className="text-sm">+977-9800000000</span>
          </div>

          <div className="flex items-center gap-3 text-gray-300 mt-3">
            <Mail className="w-5 h-5" />
            <span className="text-sm">support@fiberworld.com</span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 mt-5">
            <a href="#" className="text-gray-300 hover:text-white transition-all">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-all">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Credits */}
      <div className="text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} FiberWorld Communication. All rights reserved.
      </div>
    </footer>
  );
}