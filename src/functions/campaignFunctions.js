import authAxios from "./authFunctions";

export const detectProvider = async ({ email }) => {
	try {
		const res = await authAxios.post(`/auth/provider`, { email });
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const googleProviderAuth = async () => {
	try {
		const res = await authAxios.get(`/campaigns/google`);
		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const microsoftProviderAuth = async () => {
	try {
		const res = await authAxios.get(`/campaigns/microsoft`);
		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const zohoProviderAuth = async () => {
	try {
		const res = await authAxios.get(`/campaigns/zoho`);
		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getAllCampaigns = async () => {
	try {
		const res = await authAxios.get(`/campaigns`);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getCampaignDashboard = async () => {
	try {
		const res = await authAxios.get(`/campaigns/dashboard`);
		return res.data;
	} catch (error) {
		console.error(error);
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
		console.error(error);
	}
};

export const deleteCampaign = async ({ ids }) => {
	try {
		const res = await authAxios.delete(`/campaigns`, { ids });
		return res.data;
	} catch (error) {
		console.error;
	}
};

export const fetchUserSubs = async () => {
	try {
		const res = await authAxios.get(`/subscribers`);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

