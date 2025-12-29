import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";

export default function TvPackages() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users/packages");
        // Filter packages where tvOptions is "TV"
        const filteredPlans = response.data.data.filter((pkg) =>
          pkg.tvOptions === "TV"
        );
        setPlans(filteredPlans);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleChoosePlan = (plan) => {
    navigate("/order", {
      state: {
        product: {
          _id: plan._id,
          title: plan.title,
          price: plan.price,
          description: plan.description,
          image: plan.images?.[0]?.url,
          duration: plan.duration,
          tvOptions: plan.tvOptions,
        },
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
      <main className="w-full px-4 sm:px-6 md:px-12 py-12 bg-gray-100 flex-1 pt-30">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10">
          Our TV Packages
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white rounded-2xl shadow-lg border flex flex-col"
            >
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={plan.images?.[0]?.url || "https://via.placeholder.com/400x300"}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="text-lg font-bold text-green-600 mb-3">
                  Rs. {plan.price} / {plan.duration}
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