import React from "react";
import Header from "../component/header";
import Footer from "../component/footer";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-700">
      <Header />

      <main className="relative flex-1 w-full px-4 sm:px-6 md:px-12 py-16 mt-20 overflow-hidden">
        {/* Decorative Background Shapes */}
        <div className="absolute top-0 left-0 w-40 h-40 sm:w-60 sm:h-60 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 sm:w-72 sm:h-72 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6">
            About Us
          </h2>

          {/* Subtitle */}
          <p className="text-gray-300 text-base sm:text-lg md:text-lg max-w-3xl mx-auto leading-relaxed">
            We provide fast and reliable fiber internet with a customer-first approach.
            Our mission is to connect communities and empower digital growth.
          </p>

          {/* White Card */}
          <div className="mt-8 sm:mt-12 bg-white shadow-xl p-6 sm:p-8 md:p-10 rounded-3xl border border-gray-200">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Thali Branch — Established <span className="text-gray-700 font-bold">2025</span>
            </h3>

            <p className="text-gray-700 text-sm sm:text-base md:text-md leading-relaxed">
              Our Thali Branch was officially launched in <strong>2025</strong>, expanding
              our mission to provide high-speed fiber internet across Kathmandu. With
              modern infrastructure and a dedicated team, we ensure seamless connectivity
              for homes, students, and businesses.
            </p>

            <p className="text-gray-700 text-sm sm:text-base md:text-md leading-relaxed mt-3 sm:mt-4">
              We focus on exceptional service, reliable performance, and plans that
              meet every household’s or company's needs.
            </p>

            {/* Info Box */}
            <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700">
              <p className="text-sm sm:text-base md:text-lg font-semibold">
                📍 Location: Thali Branch, Kathmandu
              </p>
              <p className="text-sm sm:text-base md:text-lg font-semibold mt-1">
                📅 Established: 2025
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
