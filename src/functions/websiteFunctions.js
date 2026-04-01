import authAxios from "./authFunctions";

export const createWebsite = async ({ name, url, description }) => {
	try {
		const response = await authAxios.post(`/website`, {
			name,
			url,
			description,
		});
		return response.data;
	} catch (error) {
		console.error(
			"Create Website Error:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const getWebsites = async () => {
	try {
		const res = await authAxios.get(`/website/${id}`);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const updateWebsite = async (websiteId, { newData }) => {
	try {
		const res = await authAxios.put(`/website/${websiteId}`, {
			newData,
		});
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const deleteWebsite = async (websiteId) => {
	try {
		const res = await authAxios.delete(`/website/${websiteId}`);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getAllWebsites = async () => {
	try {
		const res = await authAxios.get(`/websites`);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};
