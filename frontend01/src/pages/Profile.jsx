import React, { useEffect, useState } from "react";
import { Camera, Lock, Eye, EyeOff, CalendarDays, BadgeCheck } from "lucide-react";
import api from "../api/api";
import toast from "react-hot-toast";
import AdminSidebar from "../../srcadmin/ComponentAdmin/AdminSidebar";

const ProfileAlt = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/api/v1/users/getuser", {
          withCredentials: true,
        });
        setUser(data.data || data.user);
      } catch (err) {
        if (err.response?.status === 401) window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword)
      return toast.error("All fields are required");

    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      await api.put("/api/v1/users/change-password", {
        currentPassword,
        newPassword,
      });
      toast.success("Password updated successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: PROFILE CARD */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="relative mx-auto w-28 h-28">
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                {user.fullname.charAt(0)}
              </div>
              <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow">
                <Camera size={16} />
              </button>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.fullname}</h2>
            <p className="text-gray-500">@{user.username}</p>

            <span className="inline-flex items-center gap-2 mt-3 px-4 py-1 text-sm bg-green-100 text-green-700 rounded-full">
              <BadgeCheck size={16} /> {user.role}
            </span>

            <div className="mt-6 text-sm text-gray-600 flex items-center justify-center gap-2">
              <CalendarDays size={16} /> Joined {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* RIGHT: SETTINGS */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Lock /> Security Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: "currentPassword", label: "Current Password" },
                { key: "newPassword", label: "New Password" },
                { key: "confirmPassword", label: "Confirm Password" },
              ].map(({ key, label }) => (
                <div key={key} className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={showPassword[key] ? "text" : "password"}
                    name={key}
                    value={passwordData[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => ({ ...p, [key]: !p[key] }))}
                    className="absolute right-3 top-9 text-gray-500"
                  >
                    {showPassword[key] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleChangePassword}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition"
              >
                Update Password
              </button>

              <button
                onClick={async () => {
                  await api.post("/api/v1/users/logout", {}, { withCredentials: true });
                  window.location.href = "/login";
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAlt;
