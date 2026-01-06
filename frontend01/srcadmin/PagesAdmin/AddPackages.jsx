import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Upload,
  Loader2,
  X,
  ImagePlus,
  Package,
  FileText,
  Clock,
  IndianRupee,
  Wifi,
  Tv,
} from "lucide-react";
import AdminSidebar from "../ComponentAdmin/AdminSidebar";
import api from "../../src/api/api";
import { useAuth } from "../context/AuthContext";

const AddPackages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    tvOptions: "Internet",
  });

  const [images, setImages] = useState([]); // new uploads
  const [existingImages, setExistingImages] = useState([]); // from backend
  const [loading, setLoading] = useState(false);

  // Fetch package if editing
  useEffect(() => {
    if (!id) return;

    if (location.state?.packageData) {
      const pkg = location.state.packageData;
      setFormData({
        title: pkg.title,
        description: pkg.description,
        price: pkg.price,
        duration: pkg.duration,
        tvOptions: pkg.tvOptions || "Internet",
      });
      setExistingImages(pkg.images || []);
      return;
    }

    const fetchPackage = async () => {
      try {
        const { data } = await api.get(`/api/v1/users/products/${id}`);
        console.log(data);
        const pkg = data.data;
        setFormData({
          title: pkg.title,
          description: pkg.description,
          price: pkg.price,
          duration: pkg.duration,
          tvOptions: pkg.tvOptions || "Internet",
        });
        setExistingImages(pkg.images || []);
      } catch (err) {
        console.error("Error fetching package details:", err);
        toast.error("Failed to load package details");
        if (err.response?.status === 401) {
          setUser(null);
          navigate("/login");
        }
      }
    };

    fetchPackage();
  }, [id, location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const removeNewImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price || !formData.duration) {
      return toast.error("All fields are required");
    }

    if (!id && images.length === 0) {
      return toast.error("Please upload at least one image");
    }

    try {
      setLoading(true);

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));

      images.forEach((img) => data.append("images", img));
      existingImages.forEach((img) => data.append("existingImages", img._id)); // backend handles deletion if not included

      if (id) {
        await api.put(`/api/v1/users/products/${id}`, data);
        toast.success("Package updated successfully!");
        navigate("/products");
      } else {
        await api.post("/api/v1/users/upload", data);
        toast.success("Package created successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          duration: "",
          tvOptions: "Internet",
        });
        setImages([]);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save package");
      if (err.response?.status === 401) {
        setUser(null);
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen from-gray-100 to-gray-200">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8">
          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
            <Package className="text-blue-600" />
            {id ? "Edit Package" : "Add New Package"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                <Package size={16} /> Package Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Premium Internet Plan"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                <FileText size={16} /> Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe package benefits..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Package Type */}
            <div>
              <label className="font-medium text-gray-700 mb-2 block">Package Type</label>
              <div className="flex gap-4 flex-wrap">
                {["Internet", "TV"].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition ${
                      formData.tvOptions === type
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="tvOptions"
                      value={type}
                      checked={formData.tvOptions === type}
                      onChange={handleChange}
                      className="hidden"
                    />
                    {type === "Internet" ? <Wifi size={18} /> : <Tv size={18} />}
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Duration & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                  <Clock size={16} /> Duration
                </label>
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="1 Month / 1 Year"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                  <IndianRupee size={16} /> Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Rs. 999"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
                <ImagePlus size={16} /> Upload Images
              </label>

              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer hover:border-blue-500 transition text-gray-600">
                <ImagePlus />
                <span>Click to upload images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* New images preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className="h-24 w-full object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(i)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Existing images */}
              {existingImages.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                  {existingImages.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img.url}
                        alt="existing"
                        className="h-24 w-full object-cover rounded-xl border-2 border-blue-100"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(i)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold flex justify-center items-center gap-2 transition ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload />
                  {id ? "Update Package" : "Create Package"}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPackages;
