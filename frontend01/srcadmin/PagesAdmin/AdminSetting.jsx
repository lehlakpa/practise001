import { useState } from "react";

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
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-gray-500 text-sm">
          Manage your application preferences
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-medium">General</h2>

        <div>
          <label className="block text-sm font-medium mb-1">
            Site Name
          </label>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Support Email
          </label>
          <input
            type="email"
            name="supportEmail"
            value={settings.supportEmail}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring focus:outline-none"
          />
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-medium">System</h2>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Maintenance Mode</span>
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={settings.maintenanceMode}
            onChange={handleChange}
            className="h-5 w-5"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Email Notifications</span>
          <input
            type="checkbox"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
            className="h-5 w-5"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
