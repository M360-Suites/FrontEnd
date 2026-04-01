import authAxios from "./authFunctions";

export const detectProvider = async (email) => {
	try {
		const res = await authAxios.post(`/auth/provider`, { email });
		return res.data;
	} catch (error) {
		console.error("Provider detection error:", error);
		throw error;
	}
};

export const googleProviderAuth = async () => {
	try {
		const res = await authAxios.get(`/campaigns/auth/google`);
		// return res.data;
		console.log(res.data)
	} catch (error) {
		console.error("Google auth error:", error);
		throw error;
	}
};

export const microsoftProviderAuth = async () => {
	try {
		const res = await authAxios.get(`/auth/microsoft`);
		return res.data;
	} catch (error) {
		console.error("Microsoft auth error:", error);
		throw error;
	}
};

export const zohoProviderAuth = async () => {
	try {
		const res = await authAxios.get(`/auth/zoho`);
		return res.data;
	} catch (error) {
		console.error("Zoho auth error:", error);
		throw error;
	}
};

export const getAllCampaigns = async () => {
	try {
		const res = await authAxios.get(`/campaigns`);
		return res.data;
	} catch (error) {
		console.error("Get campaigns error:", error);
		throw error;
	}
};

export const getCampaignDashboard = async () => {
	try {
		const res = await authAxios.get(`/campaigns/dashboard`);
		return res.data;
	} catch (error) {
		console.error("Get dashboard error:", error);
		throw error;
	}
};

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
		const res = await authAxios.post(`/campaigns`, {
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
		console.error("Create campaign error:", error);
		throw error;
	}
};

export const deleteCampaign = async ({ ids }) => {
	try {
		const res = await authAxios.delete(`/campaigns`, {
			data: { ids },
		});
		return res.data;
	} catch (error) {
		console.error("Delete campaign error:", error);
		throw error;
	}
};

export const fetchUserSubs = async () => {
	try {
		const res = await authAxios.get(`/subscribers`);
		return res.data;
	} catch (error) {
		console.error("Fetch subscribers error:", error);
		throw error;
	}
};

// export const fetchUserSubs = async () => {
// 	try {
// 		const res = await authAxios.get(`/subscribers`);
// 		return res.data; // This returns the full response including status, message, and data
// 	} catch (error) {
// 		console.error("Fetch subscribers error:", error);
// 		throw error;
// 	}
// };

export const addSubs = async (formData) => {
	try {
		const res = await authAxios.post(`/subscribers`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return res.data;
	} catch (error) {
		console.error("Add subscribers error:", error);
		throw error;
	}
};
