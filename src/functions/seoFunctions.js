import authAxios from "./authFunctions";

// ─── SEO Functions ────────────────────────────────────────────────────────────

/**
 * Get all SEO stats for the current organization.
 */
export const getSeoStats = async () => {
  try {
    const res = await authAxios.get(`/seo`);
    return res.data;
  } catch (error) {
    console.error("Get SEO Stats error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get Google PageSpeed Insights for a URL.
 * @param {string} url - e.g. "https://m360solutionsgroup.com/"
 */
export const getPageSpeed = async (url) => {
  try {
    const res = await authAxios.get(
      `/seo/pagespeed?url=${encodeURIComponent(url)}`
    );
    return res.data;
  } catch (error) {
    console.error("Get PageSpeed error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Save SEO credentials / settings for the organization.
 * @param {{ gaPropertyId, gaApiSecret, gaMeasurementId, clarityProjectId, clarityApiKey, url }} credentials
 */
export const saveSeoDetails = async (credentials) => {
  try {
    const res = await authAxios.post(`/seo/cred`, credentials);
    return res.data;
  } catch (error) {
    console.error("Save SEO Details error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get Microsoft Clarity analytics details.
 * Note: dimensions are sent as query params since browsers don't support
 * request bodies on GET requests reliably.
 * @param {string[]} dimensions - e.g. ["OS", "Browser"]
 */
export const getClarityDetails = async (dimensions = []) => {
  try {
    const params = dimensions.length
      ? `?dimensions=${dimensions.map(encodeURIComponent).join(",")}`
      : "";
    const res = await authAxios.get(`/seo/clarity${params}`);
    return res.data;
  } catch (error) {
    console.error("Get Clarity Details error:", error.response?.data || error.message);
    throw error;
  }
};
