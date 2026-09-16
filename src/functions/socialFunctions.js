import authAxios from "./authFunctions";

// ─── Social Scheduler Functions ───────────────────────────────────────────────

/**
 * Post content to a single social media platform.
 * Supported platforms: "facebook", "instagram", "twitter", "youtube",
 *                      "linkedin", "tiktok", "pinterest"
 *
 * @param {string} platform
 * @param {{ text: string, imageUrl?: string }} content
 */
export const postToSinglePlatform = async (platform, content) => {
  try {
    const res = await authAxios.post(`/socials/post/${platform}`, { content });
    return res.data;
  } catch (error) {
    console.error(
      `Post to ${platform} Error:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Broadcast content to multiple platforms simultaneously.
 *
 * @param {{ text: string, imageUrl?: string }} content
 * @param {string[]} platforms - e.g. ["facebook", "instagram", "twitter"]
 */
export const broadcastToMultiplePlatforms = async (content, platforms) => {
  try {
    const res = await authAxios.post(`/socials/broadcast`, {
      content,
      platforms,
    });
    return res.data;
  } catch (error) {
    console.error(
      "Broadcast Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
