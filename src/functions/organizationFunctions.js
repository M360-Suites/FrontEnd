import authAxios from "./authFunctions";

// ─── Organization Functions ───────────────────────────────────────────────────

/**
 * Create a new organization.
 * @param {{ email: string, name: string, url?: string, avatar?: string }} data
 */
export const createOrganization = async ({ email, name, url = "", avatar = "" }) => {
  try {
    const res = await authAxios.post(`/organization`, {
      email,
      name,
      url,
      avatar,
    });
    return res.data;
  } catch (error) {
    console.error(
      "Create Organization Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Invite a user to join the organization.
 * Requires x-organization-id header (auto-injected by authAxios interceptor).
 *
 * @param {{ email: string, role: string }} param - role: "viewer" | "editor" | "admin"
 */
export const inviteUser = async ({ email, role }) => {
  try {
    const res = await authAxios.put(`/organization`, { email, role });
    return res.data;
  } catch (error) {
    console.error(
      "Invite User Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Fetch the details of a pending invite.
 * @param {string} orgId
 * @param {string} token - JWT invite token
 */
export const fetchInvite = async (orgId, token) => {
  try {
    const res = await authAxios.get(
      `/organization/invite?orgId=${orgId}&token=${token}`
    );
    return res.data;
  } catch (error) {
    console.error(
      "Fetch Invite Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
