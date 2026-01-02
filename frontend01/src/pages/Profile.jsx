import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Shield,
  Calendar,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const [user, setUser] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/v1/users/getuser`,
          { withCredentials: true }
        );

        const profile = data.data || data.user;
        setUser(profile);
      } catch (err) {
        if (err.response?.status === 401) {
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 Handlers
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // 🔹 Change password
  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert("All password fields are required");
    }

    if (newPassword !== confirmPassword) {
      return alert("New passwords do not match");
    }

    try {
      await axios.put(
        `${API_BASE_URL}/api/v1/users/change-password`,
        { currentPassword, newPassword },
        { withCredentials: true }
      );

      alert("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <User size={30} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{user.fullname}</h2>
              <p className="text-gray-500">@{user.username}</p>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="w-full px-4 py-3 border rounded-xl bg-gray-50 text-gray-600">
              {user.fullname}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="w-full px-4 py-3 border rounded-xl bg-gray-50 text-gray-600">
              {user.username}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <Shield className="text-blue-600" />
            <span>{user.role}</span>
          </div>

          <div className="flex gap-3 items-center">
            <Calendar className="text-green-600" />
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* 🔐 Change Password */}
        <div className="border-t pt-8">
          <h3 className="text-xl font-bold mb-6 flex gap-2 items-center">
            <Lock /> Change Password
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {["currentPassword", "newPassword", "confirmPassword"].map(
              (field, i) => (
                <div key={i} className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    value={passwordData[field]}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              )
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleChangePassword}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-10 text-right">
          <button
            onClick={async () => {
              await axios.post(
                `${API_BASE_URL}/api/v1/users/logout`,
                {},
                { withCredentials: true }
              );
              window.location.href = "/login";
            }}
            className="bg-red-500 text-white px-6 py-3 rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
