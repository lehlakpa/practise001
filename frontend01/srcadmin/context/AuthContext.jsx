import { createContext, useContext, useEffect, useState } from "react";
import api from "../../src/api/api";

const AuthContext = createContext(null);

export  const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const checkAuthStatus = async () => {
      const authData = localStorage.getItem("adminAuth");
      if (!authData) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // This endpoint should correspond to your backend route that gets the current user.
        const response = await api.get("/api/v1/users/dashboard");
        if (response.data && response.data.data) {
          setUser(response.data.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        // The api client might throw an error for 4xx/5xx responses
        console.error("Auth check failed:", error);
        setUser(null);
        localStorage.removeItem("adminAuth");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
