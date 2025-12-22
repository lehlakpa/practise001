import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  const menuItems = [
    { icon: <LayoutDashboard />, label: "Dashboard", path: "/dashboard" },
    { icon: <Package />, label: "Products", path: "/products" },
    { icon: <ShoppingCart />, label: "Orders", path: "/orders" },
    { icon: <Users />, label: "Customers", path: "/customers" },
    { icon: <Settings />, label: "Settings", path: "/settings" },
  ];

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-64"}
        bg-gray-800 text-white min-h-screen
        transition-all duration-300
        flex flex-col
      `}
    >
      {/* Top Toggle */}
      <div className="flex items-center justify-end p-4 border-b border-white/10">
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Admin Profile */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
          <User size={20} />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-3">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="text-xs text-gray-400 p-4 border-t border-white/10">
          © 2025 Admin Panel
        </div>
      )}
    </aside>
  );
}

function SidebarItem({ icon, label, collapsed, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
        ${active ? "bg-gray-700 font-semibold" : "hover:bg-white/10"}
      `}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </div>
  );
}
