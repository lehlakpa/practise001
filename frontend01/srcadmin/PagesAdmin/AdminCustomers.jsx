import { useState } from "react";
import AdminSidebar from "../ComponentAdmin/AdminSidebar";

const customersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    orders: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    orders: 4,
    status: "Inactive",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    orders: 9,
    status: "Active",
  },
];

export default function Customers() {
  const [search, setSearch] = useState("");

  const filteredCustomers = customersData.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Customers
          </h1>

          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-center">Orders</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {customer.orders}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            customer.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-4 md:hidden">
          {filteredCustomers.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No customers found
            </p>
          ) : (
            filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white rounded-xl shadow-sm p-4 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800">
                    {customer.name}
                  </h2>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {customer.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  {customer.email}
                </p>

                <p className="text-sm text-gray-500">
                  Orders:{" "}
                  <span className="font-medium text-gray-800">
                    {customer.orders}
                  </span>
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
