import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../ComponentAdmin/AdminSidebar";
import toast from "react-hot-toast";

export default function InternetPackages() {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navigate = useNavigate();

  // Network detection
  useEffect(() => {
    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users/packages");
        setPackages(response.data.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    if (isOnline) {
      fetchPackages();
    }
  }, [isOnline]);

  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    try {
      const auth = JSON.parse(localStorage.getItem("adminAuth"));
      const token = auth?.accessToken || auth?.data?.accessToken;

      await axios.delete(`http://localhost:5000/api/v1/users/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
      toast.success("Package deleted successfully");
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error(error?.response?.data?.message || "Failed to delete package");
    }
  };

  const handleEdit = (id) => {
    navigate(`/editpackage/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Offline Banner */}
        {!isOnline && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
           Offline mode — package management disabled
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Internet Packages
          </h1>

          <button
            onClick={() => navigate("/addpackages")}
            disabled={!isOnline}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              ${
                isOnline
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            <Plus size={16} />
            Add Package
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder={isOnline ? "Search packages..." : "Offline mode"}
          disabled={!isOnline}
          className={`px-4 py-2 border rounded-lg text-sm w-full max-w-sm
            ${
              isOnline
                ? "border-gray-300 focus:ring-2 focus:ring-indigo-500"
                : "bg-gray-100 cursor-not-allowed"
            }
          `}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-center">Duration</th>
                <th className="px-6 py-4 text-center">Description</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPackages.map((pkg) => (
                <tr key={pkg._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{pkg.title}</td>
                  <td className="px-6 py-4 text-center">{pkg.duration}</td>
                  <td className="px-6 py-4 text-center max-w-xs truncate">{pkg.description}</td>
                  <td className="px-6 py-4 text-center font-semibold">
                    Rs. {pkg.price}
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(pkg._id)}
                      disabled={!isOnline}
                      className={
                        isOnline
                          ? "text-blue-600 hover:text-blue-800"
                          : "text-gray-400 cursor-not-allowed"
                      }
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(pkg._id)}
                      disabled={!isOnline}
                      className={
                        isOnline
                          ? "text-red-600 hover:text-red-800"
                          : "text-gray-400 cursor-not-allowed"
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Connection Status */}
        <p className="text-xs text-gray-500">
          Connection:{" "}
          <span
            className={
              isOnline
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </p>
      </div>
    </div>
  );
}
