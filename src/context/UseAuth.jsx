import { createContext, useContext, useState, useEffect } from "react";
import { getCookie, setCookie, removeCookie } from "../utils/cookies";
import { mainLogo } from "../assets";

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();

    // Listen for logout events from auth service
    const handleLogoutEvent = () => {
      setUser(null);
      setIsAuthenticated(false);
    };

    window.addEventListener("auth:logout", handleLogoutEvent);

    return () => {
      window.removeEventListener("auth:logout", handleLogoutEvent);
    };
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = getCookie("authToken");
      const userData = getCookie("user");

      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      // Add a minimum loading time for better UX
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const login = (userData, token) => {
    setCookie("authToken", token);
    setCookie("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeCookie("authToken");
    removeCookie("user");
    removeCookie("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    setCookie("user", JSON.stringify(userData));
    setUser(userData);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    checkAuthStatus,
  };

  // Loading screen with logo
  if (loading) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='animate-pulse'>
            <img src={mainLogo} alt='Logo' className='h-12 w-auto' />
          </div>
          <div className='flex space-x-1'>
            <div className='w-2 h-2 bg-primary-orange rounded-full animate-bounce'></div>
            <div
              className='w-2 h-2 bg-primary-orange rounded-full animate-bounce'
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className='w-2 h-2 bg-primary-orange rounded-full animate-bounce'
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
