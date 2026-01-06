// src/api/api.js
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Clean error formatting
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 (Unauthorized) and we haven't tried to refresh yet
        // Skip refresh for login, register, and refresh-token endpoints
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("refresh-token") && !originalRequest.url.includes("login") && !originalRequest.url.includes("register")) {
            originalRequest._retry = true;
            try {
                await api.post("/api/v1/users/refresh-token");
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, the user must login again
                localStorage.removeItem("adminAuth");
                window.location.href = "/login";
            }
        }

        return Promise.reject(
            error?.response?.data || { message: "Server error. Try again." }
        );
    }
);

export default api;
