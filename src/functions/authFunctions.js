import { prodApiUrl } from "../utils/api";
import { setCookie, getCookie, removeCookie } from "../utils/cookies";
import axios from "axios";

// axios instance with auth headers.
const authAxios = axios.create({
  baseURL: prodApiUrl,
  withCredentials: true,
});

export default authAxios;

// request interceptors to include token in requests
authAxios.interceptors.request.use(
  (config) => {
    // Check for both token types for backward compatibility
    const token = getCookie("authToken") || getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor to handle token expiration
authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      removeCookie("authToken");
      removeCookie("token");
      removeCookie("user");

      // Dispatch a custom event to trigger logout across the app
      window.dispatchEvent(new CustomEvent('auth:logout'));

      // Only redirect if not already on auth pages
      const currentPath = window.location.pathname;
      if (!["/login", "/register", "/verify", "/forgot-password", "/enter-otp", "/change-password"].includes(currentPath)) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// all auth functions start here.

export const requestTrial = async (email) => {
  try {
    const response = await authAxios.post(`/auth/trial`, {
      email,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getCookie("authToken") || getCookie("token");
  console.log("isAuthenticated check:", !!token);
  return !!token;
};

export const signUp = async ({
  companyName,
  email,
  token,
  companyUrl,
  password,
}) => {
  try {
    const response = await authAxios.post(`/auth/signup`, {
      name: companyName,
      email,
      token,
      url: companyUrl,
      password,
    });

    // Return the response data so it can be handled by the calling component
    return response.data;
  } catch (error) {
    // Enhanced error handling
    console.error("SignUp Error:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await authAxios.post(`/auth/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleAuth = async () => {
  try {
    const res = await authAxios.get(`/auth/signup`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const requestOTP = async (email, reason) => {
  try {
    const response = await authAxios.post(`/auth/sendCode`, {
      email,
      reason,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyCode = async (email, reason, code) => {
  try {
    const response = await authAxios.post(`auth/verify-code`, {
      email,
      reason,
      code,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (newPassword, token) => {
  try {
    const response = await authAxios.post(`/auth/reset-password`, {
      newPassword,
      token
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Logout function to be called from components
export const logout = () => {
  removeCookie("authToken");
  removeCookie("token");
  removeCookie("user");
  
  // Dispatch logout event
  window.dispatchEvent(new CustomEvent('auth:logout'));
  
  // Redirect to login
  window.location.href = "/login";
};