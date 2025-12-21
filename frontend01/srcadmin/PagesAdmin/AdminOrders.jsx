import { useState } from "react";

const ordersData = [
  {
    id: "#ORD-1001",
    customer: "John Doe",
    date: "2025-01-10",
    amount: "$250.00",
    status: "Completed",
  },
  {
    id: "#ORD-1002",
    customer: "Jane Smith",
    date: "2025-01-11",
    amount: "$120.00",
    status: "Pending",
  },
  {
    id: "#ORD-1003",
    customer: "Michael Brown",
    date: "2025-01-12",
    amount: "$540.00",
    status: "Cancelled",
  },
];

export default function Orders() {
  const [search, setSearch] = useState("");

  const filteredOrders = ordersData.filter(
    (order) =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Orders</h1>

        <input
          type="text"
          placeholder="Search orders..."
          className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-center">Date</th>
              <th className="px-6 py-3 text-center">Amount</th>
              <th className="px-6 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-center font-semibold">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
