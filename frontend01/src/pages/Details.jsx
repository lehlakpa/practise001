import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Check, CreditCard, MapPin, Phone, User, Wifi } from "lucide-react";
import toast from "react-hot-toast";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    municipality: "",
    tole: "",
    connectionType: "Home",
    paymentMethod: "COD",
  });

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600 mb-4">No package selected.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        plan: {
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          duration: product.duration,
          tvOptions: product.tvOptions || "Internet",
        },
        ...formData
      };

      await axios.post("http://localhost:5000/api/v1/users/bookings", payload);
      toast.success("Booking placed successfully!");
      navigate("/thankyou");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to place booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Side: Package Summary */}
        <div className="bg-blue-600 text-white p-8 md:w-1/3 flex flex-col">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-100 hover:text-white mb-6">
            <ArrowLeft size={20} /> Back
          </button>
          <h2 className="text-2xl font-bold mb-4">Selected Plan</h2>
          <div className="bg-blue-700/50 p-4 rounded-xl mb-6">
            <h3 className="text-xl font-semibold">{product.title}</h3>
            <p className="text-blue-100 mt-1">{product.duration}</p>
            <p className="text-2xl font-bold mt-2">Rs. {product.price}</p>
            <div className="mt-4 flex items-center gap-2 text-sm bg-blue-800/50 px-3 py-1 rounded-lg w-fit">
              <Wifi size={16} /> {product.tvOptions === "TV" ? "TV Package" : "Internet Package"}
            </div>
          </div>
          <div className="mt-auto">
            <p className="text-sm text-blue-200">Includes:</p>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Check size={16} /> Free Installation</li>
              <li className="flex items-center gap-2"><Check size={16} /> 24/7 Support</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="p-8 md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Your Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input required name="fullName" value={formData.fullName} onChange={handleChange} className="pl-10 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input required name="phone" value={formData.phone} onChange={handleChange} className="pl-10 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="98XXXXXXXX" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Municipality</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input required name="municipality" value={formData.municipality} onChange={handleChange} className="pl-10 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Kathmandu" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tole / Area</label>
                <input required name="tole" value={formData.tole} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Baneshwor" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Connection Type</label>
              <select name="connectionType" value={formData.connectionType} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="Home">Home Connection</option>
                <option value="Office">Office Connection</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="COD">Cash on Delivery</option>
                <option value="Khalti">Khalti Digital Wallet</option>
                <option value="Esewa">eSewa Mobile Wallet</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition mt-4">
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Details;