import React, { useState } from "react";
import {
  Wifi,
  Loader2,
  CheckCircle,
  Home,
  Building2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../component/header";

const OrderForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.product; // Internet plan

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    connectionType: "Home",
    fullName: "",
    phone: "",
    district: "",
    municipality: "",
    tole: "",
    paymentMethod: "COD",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!plan) {
      toast.error("No internet plan selected");
      return;
    }

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.district ||
      !formData.municipality
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("Internet Connection Request:", {
        plan,
        formData,
      });

      toast.success("Request submitted successfully!");
      setLoading(false);
      navigate("/thank-you");
    }, 1000);
  };


  const resolveImageUrl = (item) =>
    item?.image ||
    item?.images?.[0]?.url ||
    "https://via.placeholder.com/200x200?text=Internet+Plan";

  if (!plan) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <p className="text-gray-600 mb-4">No internet plan selected</p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Wifi className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold">
              New Internet Connection Request
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Plan Summary */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Selected Internet Plan</h3>

              <div className="bg-gray-50 p-4 rounded-xl flex gap-4">
                <img
                  src={resolveImageUrl(plan)}
                  alt={plan.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div>
                  <h4 className="font-semibold">{plan.title}</h4>
                  <p className="text-sm text-gray-600">
                    {plan.description}
                  </p>
                  <p className="mt-2 font-bold text-blue-600">
                    Rs. {plan.price} / month
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex justify-between">
                  <span>Monthly Charge:</span>
                  <span className="font-bold text-blue-600">
                    Rs. {plan.price}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  * Installation charges may apply separately
                </p>
              </div>
            </div>

            {/* Installation Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-semibold text-lg">
                Installation Address & Contact
              </h3>

              {/* Connection Type */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Connection Type *
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="connectionType"
                      value="Home"
                      checked={formData.connectionType === "Home"}
                      onChange={handleInputChange}
                    />
                    <Home size={18} /> Home
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="connectionType"
                      value="Office"
                      checked={formData.connectionType === "Office"}
                      onChange={handleInputChange}
                    />
                    <Building2 size={18} /> Office
                  </label>
                </div>
              </div>

              <input
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="municipality"
                  placeholder="Municipality *"
                  value={formData.municipality}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2"
                />
              </div>

              <input
                name="tole"
                placeholder="Tole / Area / Landmark"
                value={formData.tole}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="COD">Cash on Installation</option>
                <option value="Khalti">Khalti</option>
                <option value="Esewa">Esewa</option>
                <option value="CreditCard">Credit Card</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg flex justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <CheckCircle />
                    Request Connection
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
