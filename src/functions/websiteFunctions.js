import authAxios from "./authFunctions";

// ─── Website CRUD ─────────────────────────────────────────────────────────────

export const createWebsite = async ({ name, url, description }) => {
  try {
    const response = await authAxios.post(`/website/`, {
      name,
      url,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Create Website Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get a single website by its ID.
 */
export const getWebsite = async (websiteId) => {
  try {
    const res = await authAxios.get(`/website/${websiteId}`);
    return res.data;
  } catch (error) {
    console.error("Get Website Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get all websites for the current organization.
 */
export const getAllWebsites = async () => {
  try {
    const res = await authAxios.get(`/website/`);
    return res.data;
  } catch (error) {
    console.error("Get All Websites Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update a website. Wraps payload in { updates: {...} } as the API expects.
 */
export const updateWebsite = async (websiteId, updates) => {
  try {
    const res = await authAxios.put(`/website/${websiteId}`, { updates });
    return res.data;
  } catch (error) {
    console.error("Update Website Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteWebsite = async (websiteId) => {
  try {
    const res = await authAxios.delete(`/website/${websiteId}`);
    return res.data;
  } catch (error) {
    console.error("Delete Website Error:", error.response?.data || error.message);
    throw error;
  }
};

// ─── Pages CRUD ───────────────────────────────────────────────────────────────

/**
 * Get all pages for a given website.
 * @param {string} websiteId
 * @param {object} params - { page, limit }
 */
export const getAllPages = async (websiteId, { page = 1, limit = 10 } = {}) => {
  try {
    const res = await authAxios.get(
      `/${websiteId}/pages?page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    console.error("Get All Pages Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Add a page to a website.
 * @param {object} params - { title, content, status, websiteId }
 */
export const addPage = async ({ title, content, status = "draft", websiteId }) => {
  try {
    const res = await authAxios.post(`/page/`, {
      title,
      content,
      status,
      websiteId,
    });
    return res.data;
  } catch (error) {
    console.error("Add Page Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch a single page by ID.
 */
export const getPage = async (pageId) => {
  try {
    const res = await authAxios.get(`/page/${pageId}`);
    return res.data;
  } catch (error) {
    console.error("Get Page Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update a page. Wraps payload in { updates: {...} } as the API expects.
 */
export const updatePage = async (pageId, updates) => {
  try {
    const res = await authAxios.put(`/page/${pageId}`, { updates });
    return res.data;
  } catch (error) {
    console.error("Update Page Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Publish a page.
 */
export const publishPage = async (pageId) => {
  try {
    const res = await authAxios.post(`/page/${pageId}/publish`);
    return res.data;
  } catch (error) {
    console.error("Publish Page Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete a page.
 */
export const deletePage = async (pageId) => {
  try {
    const res = await authAxios.delete(`/page/${pageId}`);
    return res.data;
  } catch (error) {
    console.error("Delete Page Error:", error.response?.data || error.message);
    throw error;
  }
};
