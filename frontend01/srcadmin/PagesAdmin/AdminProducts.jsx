import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../ComponentAdmin/AdminSidebar";
import toast from "react-hot-toast";
import api from "../../src/api/api";
import { useAuth } from "../context/AuthContext";

export default function InternetPackages() {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/api/v1/users/packages");
        setPackages(response.data.data);
      } catch (error) {
        if (error.response?.status === 401) {
          setUser(null);
          navigate("/login");
        }
      }
    };
    fetchPackages();
  }, []);

  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      await api.delete(`/api/v1/users/products/${id}`);
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
      toast.success("Package deleted successfully");
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };

  const handleEdit = (pkg) => {
    navigate(`/editpackage/${pkg._id}`, { state: { packageData: pkg } });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Internet Packages
          </h1>

          <button
            onClick={() => navigate("/addpackages")}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 text-white hover:bg-gray-700"
          >
            <Plus size={16} />
            Add Package
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search packages..."
          className="px-4 py-2 border rounded-lg text-sm w-full sm:max-w-sm border-gray-300 focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ================= MOBILE VIEW ================= */}
        <div className="grid gap-4 md:hidden">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-xl shadow-sm p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <h2 className="font-semibold text-gray-800">{pkg.title}</h2>
                <span className="text-sm font-semibold text-indigo-600">
                  Rs. {pkg.price}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                <span className="font-medium">Duration:</span> {pkg.duration}
              </p>

              <p className="text-sm text-gray-500 line-clamp-2">
                {pkg.description}
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= DESKTOP VIEW ================= */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
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
                  <td className="px-6 py-4 text-center max-w-xs truncate">
                    {pkg.description}
                  </td>
                  <td className="px-6 py-4 text-center font-semibold">
                    Rs. {pkg.price}
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(pkg._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPackages.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            No packages found
          </p>
        )}
      </div>
    </div>
  );
}
