import { prodApiUrl } from "../utils/api";
import { setCookie, getCookie, removeCookie } from "../utils/cookies";
import axios from "axios";

// ─── axios instance ───────────────────────────────────────────────────────────

const authAxios = axios.create({
  baseURL: prodApiUrl,
  withCredentials: true,
});

export default authAxios;

// ─── Storage keys (single source of truth) ───────────────────────────────────

const KEYS = {
  authToken: "authToken",
  legacyToken: "token",
  user: "user",
  orgId: "orgId",
};

// ─── Org ID helpers ───────────────────────────────────────────────────────────

/**
 * Walk every possible field in an object to find an org ID string.
 */
const extractOrgIdFromObject = (obj) => {
  if (!obj || typeof obj !== "object") return null;

  const candidates = [
    obj?.organization?._id,
    obj?.organization,
    obj?.organizationId,
    obj?.orgId,
    obj?.org?._id,
    obj?.org,
    obj?.data?.organization?._id,
    obj?.data?.organization,
    obj?.data?.organizationId,
    obj?.data?.orgId,
    obj?.data?.defaultOrg?._id,
    obj?.data?.defaultOrg,
    obj?.defaultOrg?._id,
    obj?.defaultOrg,
    obj?.user?.organization?._id,
    obj?.user?.organization,
    obj?.user?.organizationId,
    obj?.user?.orgId,
    obj?.user?.org?._id,
    obj?.user?.org,
  ];

  for (const c of candidates) {
    if (c && typeof c === "string") return c;
  }
  return null;
};

/**
 * Returns the org ID from every possible storage location.
 * Priority: dedicated cookie → localStorage → sessionStorage → user cookie JSON.
 */
export const getOrgId = () => {
  // 1. Dedicated orgId cookie (fastest)
  try {
    const fromCookie = getCookie(KEYS.orgId);
    if (fromCookie) return fromCookie;
  } catch (_) {}

  // 2. localStorage
  try {
    const fromStorage = localStorage.getItem(KEYS.orgId);
    if (fromStorage) return fromStorage;
  } catch (_) {}

  // 3. sessionStorage
  try {
    const fromSession = sessionStorage.getItem(KEYS.orgId);
    if (fromSession) return fromSession;
  } catch (_) {}

  // 4. Parse the full user cookie JSON
  try {
    const userRaw = getCookie(KEYS.user);
    if (userRaw) {
      const user = JSON.parse(userRaw);
      const orgId = extractOrgIdFromObject(user);
      if (orgId) {
        // Cache it so we don't re-parse next time
        try { localStorage.setItem(KEYS.orgId, orgId); } catch (_) {}
        return orgId;
      }
    }
  } catch (_) {}

  console.warn(
    "[getOrgId] Org ID not found in any storage location.\n" +
    "Run debugAuthState() in the console to inspect stored values."
  );
  return null;
};

// ─── storeUserData ────────────────────────────────────────────────────────────

/**
 * Persist auth data after a successful login or sign-up.
 * Call this with the raw API response — handles all nesting shapes.
 */
export const storeUserData = (responseData) => {
  if (!responseData) {
    console.error("[storeUserData] Called with empty response.");
    return;
  }

  console.log("[storeUserData] Raw response:", responseData);

  // Unwrap nested { data: { ... } } if present
  const payload = responseData?.data ?? responseData;

  // ── Token ──
  const token =
    payload?.token ||
    payload?.accessToken ||
    payload?.authToken ||
    responseData?.token ||
    responseData?.accessToken ||
    responseData?.authToken;

  if (token) {
    setCookie(KEYS.authToken, token);
    console.log("[storeUserData] Token stored.");
  } else {
    console.warn("[storeUserData] No token found in:", responseData);
  }

  // ── User object ──
  const user =
    payload?.user ||
    (payload?.email ? payload : null) ||
    responseData?.user;
  if (user) {
    setCookie(KEYS.user, JSON.stringify(user));
    console.log("[storeUserData] User stored.");
  }

  // ── Org ID — search the entire response tree ──
  const orgId =
    extractOrgIdFromObject(payload?.user) ||
    extractOrgIdFromObject(payload) ||
    extractOrgIdFromObject(responseData);

  if (orgId) {
    setCookie(KEYS.orgId, orgId);
    localStorage.setItem(KEYS.orgId, orgId);
    console.log("[storeUserData] Org ID stored:", orgId);
  } else {
    console.error(
      "[storeUserData] Could not extract org ID.\n" +
      "Full response:", JSON.stringify(responseData, null, 2),
      "\nFind the correct field name in the response above and add it to extractOrgIdFromObject()."
    );
  }
};

// ─── Debug utility ────────────────────────────────────────────────────────────

/**
 * Run debugAuthState() in your browser console to see exactly what's stored.
 * It is also available as window.debugAuthState() globally.
 */
export const debugAuthState = () => {
  console.group("Auth Debug State");
  console.log("authToken cookie  :", getCookie(KEYS.authToken));
  console.log("token cookie      :", getCookie(KEYS.legacyToken));
  console.log("orgId cookie      :", getCookie(KEYS.orgId));
  console.log("orgId localStorage:", localStorage.getItem(KEYS.orgId));
  try {
    const userRaw = getCookie(KEYS.user);
    console.log("user cookie (parsed):", userRaw ? JSON.parse(userRaw) : null);
  } catch (_) {
    console.log("user cookie (raw):", getCookie(KEYS.user));
  }
  console.log("getOrgId() returns:", getOrgId());
  console.groupEnd();
};

if (typeof window !== "undefined") {
  window.debugAuthState = debugAuthState;
}

// ─── Axios interceptors ───────────────────────────────────────────────────────

authAxios.interceptors.request.use(
  (config) => {
    const token = getCookie(KEYS.authToken) || getCookie(KEYS.legacyToken);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const orgId = getOrgId();
    if (orgId) {
      config.headers["x-organization-id"] = orgId;
      config.headers["x-org-id"] = orgId;
    } else {
      console.error(
        `[authAxios] No org ID for ${config.method?.toUpperCase()} ${config.url}. ` +
        "Run window.debugAuthState() in DevTools to diagnose."
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeCookie(KEYS.authToken);
      removeCookie(KEYS.legacyToken);
      removeCookie(KEYS.user);
      removeCookie(KEYS.orgId);
      try { localStorage.removeItem(KEYS.orgId); } catch (_) {}

      window.dispatchEvent(new CustomEvent("auth:logout"));

      const authPaths = ["/login", "/register", "/verify", "/forgot-password", "/enter-otp", "/change-password"];
      if (!authPaths.includes(window.location.pathname)) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth functions ───────────────────────────────────────────────────────────

export const requestTrial = async (email) => {
  const response = await authAxios.post(`/auth/trial`, { email });
  return response;
};

export const isAuthenticated = () => {
  return !!(getCookie(KEYS.authToken) || getCookie(KEYS.legacyToken));
};

export const signUp = async ({ name, org, email, token, url, password }) => {
  try {
    const response = await authAxios.post(`/auth/signup`, { name, org, email, token, url, password });
    if (response.data) storeUserData(response.data);
    return response.data;
  } catch (error) {
    console.error("SignUp Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Login — automatically stores token, user, and org ID via storeUserData().
 */
export const login = async ({ email, password }) => {
  try {
    const response = await authAxios.post(`/auth/signin`, { email, password });
    storeUserData(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleAuth = async () => {
  const res = await authAxios.get(`/auth/google`);
  return res;
};

export const requestOTP = async (email, reason) => {
  const response = await authAxios.post(`/auth/sendCode`, { email, reason });
  return response;
};

export const verifyCode = async (email, reason, code) => {
  const response = await authAxios.post(`/auth/verify-code`, { email, reason, code });
  return response;
};

export const resetPassword = async (newPassword, token) => {
  const response = await authAxios.post(`/auth/reset-password`, { newPassword, token });
  return response;
};

// ─── OAuth callbacks ──────────────────────────────────────────────────────────

export const mailCallback = async (code, state) => {
  return authAxios.get(`/campaigns/callback?code=${code}&state=${state}`);
};

export const adsCallback = async (code, state, oauth_token, oauth_verifier) => {
  const params = new URLSearchParams();
  if (code) params.append("code", code);
  if (state) params.append("state", state);
  if (oauth_token) params.append("oauth_token", oauth_token);
  if (oauth_verifier) params.append("oauth_verifier", oauth_verifier);
  return authAxios.get(`/ads/callback?${params.toString()}`);
};

export const commCallback = async (code, state, oauth_token, oauth_verifier) => {
  const params = new URLSearchParams();
  if (code) params.append("code", code);
  if (state) params.append("state", state);
  if (oauth_token) params.append("oauth_token", oauth_token);
  if (oauth_verifier) params.append("oauth_verifier", oauth_verifier);
  return authAxios.get(`/comm/callback?${params.toString()}`);
};

export const socialCallback = async (code, state) => {
  return authAxios.get(`/socials/callback?code=${code}&state=${state}`);
};

// ─── Platform auth initiators ─────────────────────────────────────────────────

// Helper to detect URL and open popup
const handleOAuthRedirect = (responseData) => {
  // Extract URL from various possible payload shapes
  let redirectUrl = null;
  
  if (typeof responseData === "string") {
    redirectUrl = responseData;
  } else if (responseData?.url) {
    redirectUrl = responseData.url;
  } else if (responseData?.redirectUrl) {
    redirectUrl = responseData.redirectUrl;
  } else if (typeof responseData?.data === "string") {
    redirectUrl = responseData.data;
  } else if (responseData?.data?.url) {
    redirectUrl = responseData.data.url;
  } else if (responseData?.data?.redirectUrl) {
    redirectUrl = responseData.data.redirectUrl;
  }

  if (redirectUrl && typeof redirectUrl === "string" && redirectUrl.startsWith("http")) {
    console.log("Redirecting to OAuth URL:", redirectUrl);
    // Open in a centered popup window
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const popup = window.open(
      redirectUrl,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    
    // Fallback: If the browser blocked the popup (because it's inside an async chain),
    // redirect the current page instead.
    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      console.warn("Popup blocked by browser. Redirecting current tab instead.");
      window.location.href = redirectUrl;
    }
  } else {
    console.error("No valid OAuth URL found in response:", responseData);
  }
  return responseData;
};

export const initMailAuth = async (provider = "google") => {
  const res = await authAxios.get(`/campaigns/auth/${provider}`);
  return handleOAuthRedirect(res.data);
};

export const initAdsAuth = async (platform = "google") => {
  const res = await authAxios.get(`/ads/auth/${platform}`);
  return handleOAuthRedirect(res.data);
};

export const initCommAuth = async (platform = "linkedin") => {
  const res = await authAxios.get(`/comm/auth/${platform}`);
  return handleOAuthRedirect(res.data);
};

export const initSocialAuth = async (platform) => {
  const res = await authAxios.get(`/socials/auth/${platform}`);
  return handleOAuthRedirect(res.data);
};

// ─── Logout ───────────────────────────────────────────────────────────────────

export const logout = () => {
  removeCookie(KEYS.authToken);
  removeCookie(KEYS.legacyToken);
  removeCookie(KEYS.user);
  removeCookie(KEYS.orgId);
  try { localStorage.removeItem(KEYS.orgId); } catch (_) {}

  window.dispatchEvent(new CustomEvent("auth:logout"));
  window.location.href = "/login";
};