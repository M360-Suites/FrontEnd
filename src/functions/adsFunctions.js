import authAxios from "./authFunctions";

// ─── Ads Manager Functions ────────────────────────────────────────────────────

/**
 * Initiate OAuth authorization for ads operations.
 * Returns a redirect URL — caller should open it as a popup or redirect.
 * @param {string} platform - e.g. "google", "meta"
 */
export const authAds = async (platform = "google") => {
  try {
    const res = await authAxios.get(`/ads/auth/${platform}`);
    const redirectUrl = res.data?.url || res.data?.redirectUrl || res.data;
    if (redirectUrl && typeof redirectUrl === "string") {
      window.open(redirectUrl, "_blank", "width=600,height=700");
    }
    return res.data;
  } catch (error) {
    console.error(
      `Ads Auth (${platform}) Error:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Create a complete ad (campaign + adset + creative + ad) in one call.
 * @param {{ platform, campaignData, adSetData, creativeData, adData }} param
 */
export const createAd = async ({
  platform,
  campaignData,
  adSetData,
  creativeData,
  adData,
}) => {
  try {
    const res = await authAxios.post(`/ads/create`, {
      platform,
      campaignData,
      adSetData,
      creativeData,
      adData,
    });
    return res.data;
  } catch (error) {
    console.error("Create Ad error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch ad accounts for a given platform.
 * @param {string} platform - e.g. "google", "meta"
 */
export const fetchAdAccounts = async (platform) => {
  try {
    const res = await authAxios.get(`/ads/accounts/${platform}`);
    return res.data;
  } catch (error) {
    console.error(
      `Fetch ${platform} Ad Accounts error:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Get or create campaigns for a given platform.
 * @param {{ platform: string, data: object, action: "get" | "create" }} param
 */
export const getOrCreateCampaigns = async ({ platform, data, action }) => {
  try {
    const res = await authAxios.post(`/ads/campaigns/${platform}`, {
      data,
      action,
    });
    return res.data;
  } catch (error) {
    console.error(
      `Get/Create ${platform} Campaign error:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
