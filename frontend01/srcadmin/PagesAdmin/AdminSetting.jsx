import { useState } from "react";
import AdminSidebar from "../ComponentAdmin/AdminSidebar";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "My Admin Panel",
    supportEmail: "support@example.com",
    maintenanceMode: false,
    emailNotifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Saved Settings:", settings);
    alert("Settings saved successfully!");
    // Replace with API call
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Settings
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage your application preferences
          </p>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-6">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800">
            General
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Support Email
              </label>
              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-6">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800">
            System
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base font-medium text-gray-700">
                Maintenance Mode
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 bg-gray-300 rounded-full peer
                    ${settings.maintenanceMode ? "bg-indigo-500" : "bg-gray-300"}
                    transition-colors`}
                ></div>
                <div
                  className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow
                    transform transition-transform
                    ${settings.maintenanceMode ? "translate-x-5" : "translate-x-0"}`}
                ></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base font-medium text-gray-700">
                Email Notifications
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 bg-gray-300 rounded-full peer
                    ${settings.emailNotifications ? "bg-indigo-500" : "bg-gray-300"}
                    transition-colors`}
                ></div>
                <div
                  className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow
                    transform transition-transform
                    ${settings.emailNotifications ? "translate-x-5" : "translate-x-0"}`}
                ></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}
