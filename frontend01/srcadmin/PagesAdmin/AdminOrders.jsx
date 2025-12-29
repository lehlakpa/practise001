import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminSidebar from "../ComponentAdmin/AdminSidebar";
import axios from "axios";

export default function InternetSubscriptions() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Internet connection detection
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
    const fetchOrders = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("adminAuth"));
        const token = auth?.accessToken || auth?.data?.accessToken;

        const response = await axios.get("http://localhost:5000/api/v1/users/getbookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (isOnline) {
      fetchOrders();
    }
  }, [isOnline]);

  const filteredSubscriptions = orders.filter(
    (item) =>
      item.fullName.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search)
  );

  const statusStyle = (status) => {
    switch (status) {
      case "Active":
      case "Confirmed":
      case "Installed":
        return "bg-green-100 text-green-700";
      case "Inactive":
      case "Cancelled":
        return "bg-gray-200 text-gray-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Offline Banner */}
        {!isOnline && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
            ⚠️ You are offline. All actions are disabled.
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Orders & Subscriptions
          </h1>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder={isOnline ? "Search by name or phone..." : "Offline mode"}
          disabled={!isOnline}
          className={`px-4 py-2 border rounded-lg text-sm w-full max-w-sm
            ${
              isOnline
                ? "border-gray-300 focus:ring-2 focus:ring-indigo-500"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Full Name</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-center">Connection</th>
                <th className="px-6 py-4 text-center">Package</th>
                <th className="px-6 py-4 text-center">Duration</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubscriptions.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {item.fullName}
                  </td>

                  <td className="px-6 py-4">
                    <a
                      href={isOnline ? `tel:${item.phone}` : undefined}
                      className={`${
                        isOnline
                          ? "text-indigo-600 hover:underline"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {item.phone}
                    </a>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.connectionType}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.plan?.title}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.plan?.duration}
                  </td>

                  <td className="px-6 py-4 text-center font-semibold">
                    Rs. {item.plan?.price}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex justify-center gap-3">
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
        <div className="grid gap-4 lg:hidden">
          {filteredSubscriptions.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">
                  {item.fullName}
                </h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-sm">
                📞{" "}
                <a
                  href={isOnline ? `tel:${item.phone}` : undefined}
                  className={`${
                    isOnline
                      ? "text-indigo-600 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {item.phone}
                </a>
              </p>

              <p className="text-sm">
                {item.connectionType}
              </p>

              <p className="text-sm">
                {item.plan?.title} ({item.plan?.duration})
              </p>

              <p className="font-semibold">
                Rs. {item.plan?.price}
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
