import { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import AdminSidebar from "../ComponentAdmin/AdminSidebar";
import toast from "react-hot-toast";
import api from "../../src/api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function InternetSubscriptions() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [reasons, setReasons] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/api/v1/users/getbookings");
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response?.status === 401) {
          setUser(null);
          navigate("/login");
        }
      }
    };

    fetchOrders();
  }, [navigate, setUser]);

  // Search filter
  const filteredSubscriptions = orders.filter(
    (item) =>
      item.fullName.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search)
  );

  // Status badge style
  const statusStyle = (status) => {
    switch (status) {
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

  const handleEdit = (order) => {
    setEditingOrder(order);
    setNewStatus(order.status);
    setReasons(order.note || "");
  };

  const handleUpdateStatus = async () => {
    try {
      const payload = {
        status: newStatus,
        note: reasons.trim()
      };

      await api.put(`/api/v1/users/bookings/${editingOrder._id}`, payload);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === editingOrder._id
            ? {
                ...order,
                status: newStatus,
                note: reasons.trim(),
                updatedAt: new Date().toISOString(),
              }
            : order
        )
      );

      toast.success("Status updated successfully");
      setEditingOrder(null);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");

      if (error.response?.status === 401) {
        setUser(null);
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or phone..."
          className="px-4 py-2 border rounded-lg text-sm w-full max-w-sm border-gray-300 focus:ring-2 focus:ring-indigo-500"
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
                <th className="px-6 py-4 text-center">Location</th>
                <th className="px-6 py-4 text-center">Package</th>
                <th className="px-6 py-4 text-center">Duration</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Ordered Date</th>
                <th className="px-6 py-4 text-center">Updated Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Reasons</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubscriptions.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{item.fullName}</td>

                  <td className="px-6 py-4">
                    <a
                      href={`tel:${item.phone}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {item.phone}
                    </a>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.connectionType}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.municipality && item.tole
                      ? `${item.municipality}, ${item.tole}`
                      : item.municipality || item.tole || "-"}
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

                  <td className="px-6 py-4 text-center text-gray-600">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-6 py-4 text-center text-gray-600">
                    {item.updatedAt
                      ? new Date(item.updatedAt).toLocaleDateString()
                      : "-"}
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

                  <td className="px-6 py-4 text-center text-gray-600">
                    {item.note || "-"}
                  </td>

                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                    </button>

                    <button className="text-red-600 hover:text-red-800">
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
                  href={`tel:${item.phone}`}
                  className="text-indigo-600 font-medium"
                >
                  {item.phone}
                </a>
              </p>

              <p className="text-sm">{item.connectionType}</p>

              <p className="text-sm">
                📍{" "}
                {item.municipality && item.tole
                  ? `${item.municipality}, ${item.tole}`
                  : item.municipality || item.tole || "-"}
              </p>

              <p className="text-sm">
                {item.plan?.title} ({item.plan?.duration})
              </p>

              <p className="font-semibold">Rs. {item.plan?.price}</p>

              <p className="text-sm text-gray-500">
                Ordered:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "-"}
              </p>

              <p className="text-sm text-gray-500">
                Updated:{" "}
                {item.updatedAt
                  ? new Date(item.updatedAt).toLocaleDateString()
                  : "-"}
              </p>

              {item.note && (
                <p className="text-sm text-gray-500">
                  Note: {item.note}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600"
                >
                  <Pencil size={16} />
                </button>

                <button className="text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Status Modal */}
        {editingOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold text-lg">Update Order Status</h3>
                <button
                  onClick={() => setEditingOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Status
                  </label>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                      editingOrder.status
                    )}`}
                  >
                    {editingOrder.status}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {["Pending", "Confirmed", "Installed", "Cancelled"].map(
                      (s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reasons
                  </label>
                  <textarea
                    value={reasons}
                    onChange={(e) => setReasons(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    rows="3"
                    placeholder="Add any reasons about this order..."
                  />
                </div>
              </div>

              <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
                <button
                  onClick={() => setEditingOrder(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
