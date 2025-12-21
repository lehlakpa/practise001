import AdminSidebar from "../ComponentAdmin/AdminSidebar";
import DashboardCard from "../ComponentAdmin/DashBoardCard";
import OrdersTable from "../ComponentAdmin/OrdersTable";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar (hidden on mobile inside component) */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-x-hidden">

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Dashboard</h2>
        </div>

        {/* Stats Cards */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-4 sm:gap-6
        ">
          <DashboardCard title="Total Revenue" value="Rs. 1,25,000" />
          <DashboardCard title="Orders" value="320" />
          <DashboardCard title="Customers" value="150" />
          <DashboardCard title="Products" value="85" />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto">
          <OrdersTable />
        </div>

      </main>
    </div>
  );
}
