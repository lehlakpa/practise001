import React from "react";
import { useNavigate } from "react-router-dom";

export default function Packages() {
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      speed: "50 Mbps",
      price: 799,
      img: "https://images.unsplash.com/photo-1581091215367-1b1a1b7c7f92?auto=format&fit=crop&w=800&q=80",
      description: "Good for light browsing, YouTube, and social media.",
    },
    {
      id: 2,
      speed: "100 Mbps",
      price: 999,
      img: "https://images.unsplash.com/photo-1595376952620-38a4f42a4375?auto=format&fit=crop&w=800&q=80",
      description: "Ideal for HD streaming and online classes.",
    },
    {
      id: 3,
      speed: "200 Mbps",
      price: 1299,
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      description: "Perfect for multi-device households and fast downloads.",
    },
    {
      id: 4,
      speed: "300 Mbps",
      price: 1499,
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      description: "Great for gamers and 4K streaming.",
    },
    {
      id: 5,
      speed: "500 Mbps",
      price: 1999,
      img: "https://images.unsplash.com/photo-1580894908361-967195033a28?auto=format&fit=crop&w=800&q=80",
      description: "Ideal for heavy streaming, gaming, and large families.",
    },
  ];

  const handleChoosePlan = (plan) => {
    navigate("/order", {
      state: {
        product: {
          _id: plan.id,
          title: plan.speed,
          price: plan.price,
          description: plan.description,
          image: plan.img,
        },
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="w-full px-4 sm:px-6 md:px-12 py-12 bg-gray-100 flex-1">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10">
          Our Internet Packages
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl shadow-lg border flex flex-col"
            >
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={plan.img}
                  alt={plan.speed}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2">{plan.speed}</h3>
                <p className="text-lg font-bold text-green-600 mb-3">
                  Rs. {plan.price} / month
                </p>
                <p className="text-gray-600 flex-1">{plan.description}</p>

                <button
                  onClick={() => handleChoosePlan(plan)}
                  className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                >
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
