import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminSidebar from "../ComponentAdmin/AdminSidebar";

const subscriptionsData = [
  {
    id: 1,
    fullName: "John Doe",
    phone: "+1 987 654 3210",
    connectionType: "Fiber",
    package: "Basic Plan",
    duration: "1 Month",
    speed: "50 Mbps",
    price: 25,
    status: "Active",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    phone: "+1 555 123 4567",
    connectionType: "Wireless",
    package: "Standard Plan",
    duration: "6 Months",
    speed: "100 Mbps",
    price: 120,
    status: "Active",
  },
  {
    id: 3,
    fullName: "Michael Brown",
    phone: "+1 444 987 6543",
    connectionType: "DSL",
    package: "Premium Plan",
    duration: "1 Year",
    speed: "200 Mbps",
    price: 220,
    status: "Inactive",
  },
];

export default function InternetSubscriptions() {
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

  const filteredSubscriptions = subscriptionsData.filter(
    (item) =>
      item.fullName.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search)
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
            Internet Subscriptions
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
                <th className="px-6 py-4 text-center">Speed</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubscriptions.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
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
                    {item.package}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.duration}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.speed}
                  </td>

                  <td className="px-6 py-4 text-center font-semibold">
                    ${item.price}
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
              key={item.id}
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
                {item.connectionType} · {item.speed}
              </p>

              <p className="text-sm">
                {item.package} ({item.duration})
              </p>

              <p className="font-semibold">
                ${item.price}
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
