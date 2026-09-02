import authAxios from "./authFunctions";

// ─── Media Functions ──────────────────────────────────────────────────────────

/**
 * Upload one or more media files.
 * Expects a FormData object with a "files" field (array of File objects).
 *
 * @param {FormData} formData
 */
export const uploadMedia = async (formData) => {
  try {
    const res = await authAxios.post(`/media/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Upload Media Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch all media files for the current organization.
 */
export const fetchMedia = async () => {
  try {
    const res = await authAxios.get(`/media/`);
    return res.data;
  } catch (error) {
    console.error("Fetch Media Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch a single media item by its ID.
 *
 * @param {string} mediaId
 */
export const fetchMediaById = async (mediaId) => {
  try {
    const res = await authAxios.get(`/media/${mediaId}`);
    return res.data;
  } catch (error) {
    console.error(
      "Fetch Media By ID Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Helper — build a FormData object from an array of File objects.
 *
 * @param {File[]} files
 * @returns {FormData}
 */
export const buildMediaFormData = (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  return formData;
};
