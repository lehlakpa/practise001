import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../component/header";
import Footer from "../component/footer";
import api from "../api/axios";

export default function Packages() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState({
    yearly: [],
    sixMonth: [],
    threeMonth: [],
    monthly: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get(
          "/api/v1/users/packages"
        );

        const allPackages = res.data.data;

        setPlans({
          yearly: allPackages.filter((p) =>
            p.duration?.toLowerCase().includes("year") || p.duration?.includes("12")
          ),
          sixMonth: allPackages.filter((p) =>
            p.duration?.toLowerCase().includes("6 month")
          ),
          threeMonth: allPackages.filter((p) =>
            p.duration?.toLowerCase().includes("3 month")
          ),
          monthly: allPackages.filter((p) =>
            p.duration?.toLowerCase().includes("1 month")
          ),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
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

  const PlanCard = ({ plan }) => (
    <div className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
      <div className="relative h-44 w-full">
        <img
          src={plan.images?.[0]?.url || "https://via.placeholder.com/400x300"}
          alt={plan.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          {plan.duration}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg md:text-xl font-semibold mb-2">
          {plan.title}
        </h3>

        <p className="text-green-600 text-xl font-bold mb-3">
          Rs. {plan.price}
        </p>

        <p className="text-gray-600 text-sm flex-1 line-clamp-3">
          {plan.description}
        </p>

        <button
          onClick={() => handleChoosePlan(plan)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white py-3 rounded-xl font-medium transition-all"
        >
          Choose Plan
        </button>
      </div>
    </div>
  );

  const Section = ({ title, items }) =>
    items.length > 0 && (
      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((plan) => (
            <PlanCard key={plan._id} plan={plan} />
          ))}
        </div>
      </section>
    );

  const Skeleton = () => (
    <div className="animate-pulse bg-white rounded-3xl h-[380px]" />
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-12 py-14 space-y-20 pt-30">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <Section
              title="Monthly Internet Packages"
              items={plans.monthly}
            />
            <Section
              title="3-Month Internet Packages"
              items={plans.threeMonth}
            />
            <Section
              title="6-Month Internet Packages"
              items={plans.sixMonth}
            />
            <Section
              title="1-Year Internet Packages"
              items={plans.yearly}
            />

            {Object.values(plans).every((arr) => arr.length === 0) && (
              <div className="text-center text-gray-500 text-lg">
                No packages available at the moment.
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
