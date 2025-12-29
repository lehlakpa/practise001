import { useEffect, useState } from "react";
import axios from "axios";
import { IndianRupee, ShoppingCart, Users, Package } from "lucide-react";
import AdminSidebar from "../ComponentAdmin/AdminSidebar";
import DashboardCard from "../ComponentAdmin/DashBoardCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("adminAuth"));
        const token = auth?.accessToken || auth?.data?.accessToken;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [ordersRes, productsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/v1/users/getbookings", config),
          axios.get("http://localhost:5000/api/v1/users/packages", config),
        ]);

        const ordersData = ordersRes.data.data;
        const productsData = productsRes.data.data;

        // Calculate revenue from confirmed/installed orders
        const totalRevenue = ordersData
          .filter((order) => ["Confirmed", "Installed"].includes(order.status))
          .reduce((sum, order) => sum + (order.plan?.price || 0), 0);

        // Calculate unique customers
        const uniqueCustomers = new Set(ordersData.map((order) => order.phone))
          .size;

        setStats({
          revenue: totalRevenue,
          orders: ordersData.length,
          customers: uniqueCustomers,
          products: productsData.length,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-x-hidden">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Dashboard
          </h2>
        </div>

        {/* Stats Cards */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4 sm:gap-6
          "
        >
          <DashboardCard
            title="Total Revenue"
            value={`Rs. ${stats.revenue.toLocaleString()}`}
            icon={<IndianRupee />}
            loading={loading}
          />
          <DashboardCard
            title="Orders"
            value={stats.orders}
            icon={<ShoppingCart />}
            loading={loading}
          />
          <DashboardCard
            title="Customers"
            value={stats.customers}
            icon={<Users />}
            loading={loading}
          />
          <DashboardCard
            title="Products"
            value={stats.products}
            icon={<Package />}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}
