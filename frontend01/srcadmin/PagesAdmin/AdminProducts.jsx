import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminSidebar from "../ComponentAdmin/AdminSidebar";

const packagesData = [
  {
    id: 1,
    name: "Basic Plan",
    duration: "1 Month",
    speed: "50 Mbps",
    price: 25,
    status: "Active",
  },
  {
    id: 2,
    name: "Standard Plan",
    duration: "6 Months",
    speed: "100 Mbps",
    price: 120,
    status: "Active",
  },
  {
    id: 3,
    name: "Premium Plan",
    duration: "1 Year",
    speed: "200 Mbps",
    price: 220,
    status: "Inactive",
  },
];

export default function InternetPackages() {
  const [search, setSearch] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  const filteredPackages = packagesData.filter((pkg) =>
    pkg.name.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Offline Banner */}
        {!isOnline && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
            ⚠️ Offline mode — package management disabled
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Internet Packages
          </h1>

          <button
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
                <th className="px-6 py-4 text-left">Package</th>
                <th className="px-6 py-4 text-center">Duration</th>
                <th className="px-6 py-4 text-center">Speed</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {pkg.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {pkg.duration}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {pkg.speed}
                  </td>
                  <td className="px-6 py-4 text-center font-semibold">
                    ${pkg.price}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                        pkg.status
                      )}`}
                    >
                      {pkg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-3">
                    <button
                      disabled={!isOnline}
                      className={`${
                        isOnline
                          ? "text-blue-600 hover:text-blue-800"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      disabled={!isOnline}
                      className={`${
                        isOnline
                          ? "text-red-600 hover:text-red-800"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-4 md:hidden">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl shadow-sm p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">
                  {pkg.name}
                </h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyle(
                    pkg.status
                  )}`}
                >
                  {pkg.status}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                {pkg.duration} · {pkg.speed}
              </p>

              <p className="text-sm font-semibold">
                ${pkg.price}
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  disabled={!isOnline}
                  className={`${
                    isOnline
                      ? "text-blue-600"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Pencil size={16} />
                </button>
                <button
                  disabled={!isOnline}
                  className={`${
                    isOnline
                      ? "text-red-600"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
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
