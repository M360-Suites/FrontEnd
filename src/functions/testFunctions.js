import authAxios from "./authFunctions";

export const testCorsYT = async () => {
	try {
		const res = await authAxios.get("/socials/auth/twitter");
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const testCorsX = async () => {
	try {
		const res = await authAxios.get("/socials/auth/twitter");
		return res.data;
	} catch (error) {
		console.error(error);
	}
};
