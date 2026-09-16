import authAxios from "./authFunctions";

// ─── Email Provider Detection ─────────────────────────────────────────────────

/**
 * Detect the email provider/domain for a given email address.
 * @param {string} email
 */
export const detectProvider = async (email) => {
  try {
    const res = await authAxios.post(`/auth/provider`, { email });
    return res.data;
  } catch (error) {
    console.error("Provider detection error:", error.response?.data || error.message);
    throw error;
  }
};

// ─── Email Provider OAuth Initiators ─────────────────────────────────────────
// Each of these fires the backend GET that returns { url } — the OAuth redirect.
// The caller should redirect the user (or open a popup) to that URL.

export const googleProviderAuth = async () => {
  try {
    const res = await authAxios.get(`/campaigns/auth/google`);
    const redirectUrl = res.data?.url || res.data?.redirectUrl || res.data;
    if (redirectUrl && typeof redirectUrl === "string") {
      window.open(redirectUrl, "_blank", "width=600,height=700");
    }
    return res.data;
  } catch (error) {
    console.error("Google auth error:", error.response?.data || error.message);
    throw error;
  }
};

export const microsoftProviderAuth = async () => {
  try {
    const res = await authAxios.get(`/campaigns/auth/microsoft`);
    const redirectUrl = res.data?.url || res.data?.redirectUrl || res.data;
    if (redirectUrl && typeof redirectUrl === "string") {
      window.open(redirectUrl, "_blank", "width=600,height=700");
    }
    return res.data;
  } catch (error) {
    console.error("Microsoft auth error:", error.response?.data || error.message);
    throw error;
  }
};

export const zohoProviderAuth = async () => {
  try {
    const res = await authAxios.get(`/campaigns/auth/zoho`);
    const redirectUrl = res.data?.url || res.data?.redirectUrl || res.data;
    if (redirectUrl && typeof redirectUrl === "string") {
      window.open(redirectUrl, "_blank", "width=600,height=700");
    }
    return res.data;
  } catch (error) {
    console.error("Zoho auth error:", error.response?.data || error.message);
    throw error;
  }
};

// ─── Campaigns ────────────────────────────────────────────────────────────────

/**
 * Fetch all email campaigns for the organization.
 */
export const getAllCampaigns = async () => {
  try {
    const res = await authAxios.get(`/campaigns/`);
    return res.data;
  } catch (error) {
    console.error("Get campaigns error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch the campaigns analytics dashboard.
 */
export const getCampaignDashboard = async () => {
  try {
    const res = await authAxios.get(`/campaigns/dashboard`);
    return res.data;
  } catch (error) {
    console.error("Get dashboard error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Create a new email campaign.
 * @param {{ type, name, subject, from, recipients, contents, links }} param
 */
export const createCampaign = async ({
  type,
  name,
  subject,
  from,
  recipients,
  contents,
  links,
}) => {
  try {
    const res = await authAxios.post(`/campaigns/`, {
      type,
      name,
      subject,
      from,
      recipients,
      contents,
      links,
    });
    return res.data;
  } catch (error) {
    console.error("Create campaign error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete one or more campaigns by their IDs.
 * @param {{ ids: string[] }} param
 */
export const deleteCampaign = async ({ ids }) => {
  try {
    const res = await authAxios.delete(`/campaigns/`, { data: { ids } });
    return res.data;
  } catch (error) {
    console.error("Delete campaign error:", error.response?.data || error.message);
    throw error;
  }
};

// ─── Subscribers ──────────────────────────────────────────────────────────────

/**
 * Fetch all subscribers for the current organization.
 */
export const fetchUserSubs = async () => {
  try {
    const res = await authAxios.get(`/subscribers`);
    return res.data;
  } catch (error) {
    console.error("Fetch subscribers error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Add subscribers via emails array or a .txt file.
 * Accepts FormData with:
 *   - "emails" (can be repeated for multiple email values), OR
 *   - "file"   (a .txt file with one email per line)
 *
 * @param {FormData} formData
 */
export const addSubs = async (formData) => {
  try {
    const res = await authAxios.post(`/subscribers`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Add subscribers error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Remove subscribers by their IDs.
 * @param {{ ids: string[] }} param
 */
export const removeSubs = async ({ ids }) => {
  try {
    const res = await authAxios.delete(`/subscribers`, { data: { ids } });
    return res.data;
  } catch (error) {
    console.error("Remove subscribers error:", error.response?.data || error.message);
    throw error;
  }
};
