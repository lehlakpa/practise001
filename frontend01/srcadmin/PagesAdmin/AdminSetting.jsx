import { useEffect, useState } from "react";
import AdminSidebar from "../ComponentAdmin/AdminSidebar";
import toast from "react-hot-toast";

export default function AdminSetting() {
  const [settings, setSettings] = useState({
    siteName: "My ISP Admin",
    supportEmail: "support@isp.com",

    // Networking
    bandwidthLimit: 50,
    ipMode: "DHCP",
    dnsMode: "auto",
    primaryDNS: "8.8.8.8",
    secondaryDNS: "8.8.4.4",

    // UI
    theme: "light",
  });

  /* ================= LOAD THEME ================= */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setSettings((prev) => ({ ...prev, theme: savedTheme }));

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  /* ================= TOGGLE THEME ================= */
  const toggleTheme = () => {
    const newTheme = settings.theme === "light" ? "dark" : "light";
    setSettings({ ...settings, theme: newTheme });
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
    toast.success(`${newTheme === "dark" ? "Dark" : "Light"} mode enabled`);
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    console.log("Saved Settings:", settings);
    toast.success("Settings saved successfully");
    // connect API here
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto w-full">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Network & system configuration
          </p>
        </div>

        {/* ================= GENERAL ================= */}
        <Card title="General Settings">
          <Input
            label="ISP / Site Name"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
          />

          <Input
            label="Support Email"
            name="supportEmail"
            value={settings.supportEmail}
            onChange={handleChange}
          />
        </Card>

        {/* ================= NETWORK ================= */}
        <Card title="Network Configuration">
          <Input
            label="Default Bandwidth Limit (Mbps)"
            name="bandwidthLimit"
            type="number"
            value={settings.bandwidthLimit}
            onChange={handleChange}
          />

          <Select
            label="IP Assignment Mode"
            name="ipMode"
            value={settings.ipMode}
            onChange={handleChange}
            options={["DHCP", "Static"]}
          />

          <Select
            label="DNS Mode"
            name="dnsMode"
            value={settings.dnsMode}
            onChange={handleChange}
            options={["auto", "custom"]}
          />

          {settings.dnsMode === "custom" && (
            <>
              <Input
                label="Primary DNS"
                name="primaryDNS"
                value={settings.primaryDNS}
                onChange={handleChange}
              />
              <Input
                label="Secondary DNS"
                name="secondaryDNS"
                value={settings.secondaryDNS}
                onChange={handleChange}
              />
            </>
          )}

          {/* Status (Read Only) */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Network Status
            </label>
            <div className="mt-1 text-green-600 font-medium">
              ● Online & Stable
            </div>
          </div>
        </Card>

        {/* ================= INTERFACE ================= */}
        <Card title="Interface">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Dark Mode
            </span>
            <button
              onClick={toggleTheme}
              className={`w-14 h-7 rounded-full relative transition
                ${settings.theme === "dark" ? "bg-indigo-500" : "bg-gray-300"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform
                  ${settings.theme === "dark" ? "translate-x-7" : ""}`}
              />
            </button>
          </div>
        </Card>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
          >
            Save Settings
          </button>
        </div>
      </main>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Card({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 sm:p-8 space-y-5">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
