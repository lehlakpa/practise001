import React from "react";
import Header from "./header";
import Footer from "./Footer";

export default function Packages() {
  const plans = [
    {
      id: 1,
      speed: "50 Mbps",
      price: "Rs. 799 / month",
      img: "https://images.unsplash.com/photo-1581091215367-1b1a1b7c7f92?auto=format&fit=crop&w=800&q=80",
      description: "Good for light browsing, YouTube, and social media.",
    },
    {
      id: 2,
      speed: "100 Mbps",
      price: "Rs. 999 / month",
      img: "https://images.unsplash.com/photo-1595376952620-38a4f42a4375?auto=format&fit=crop&w=800&q=80",
      description: "Ideal for HD streaming and online classes.",
    },
    {
      id: 3,
      speed: "200 Mbps",
      price: "Rs. 1299 / month",
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      description: "Perfect for multi-device households and fast downloads.",
    },
    {
      id: 4,
      speed: "300 Mbps",
      price: "Rs. 1499 / month",
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      description: "Great for gamers and 4K streaming.",
    },
    {
      id: 5,
      speed: "500 Mbps",
      price: "Rs. 1999 / month",
      img: "https://images.unsplash.com/photo-1580894908361-967195033a28?auto=format&fit=crop&w=800&q=80",
      description: "Ideal for heavy streaming, gaming, and large families.",
    },
  ];

  return (

    <div className="flex flex-col min-h-screen">
      <main className="w-full px-4 sm:px-6 md:px-12 py-12 bg-gray-100 flex-1">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
          Our Internet Packages
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl shadow-lg border hover:shadow-xl transition-all flex flex-col"
            >
              {/* Image with gradient overlay */}
              <div className="relative w-full h-40 sm:h-48 md:h-52 rounded-t-2xl overflow-hidden">
                <img
                  src={plan.img}
                  alt={plan.speed}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/80 to-white/0"></div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">{plan.speed}</h3>
                <p className="text-lg sm:text-xl font-bold text-green-600 mb-3">{plan.price}</p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-1">
                  {plan.description}
                </p>

                <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
