import { useState } from "react";
import { Icon } from "@iconify/react";
import useStore from "../../../state/store";
import { toast } from "sonner";

const SecurityPrivacy = () => {
	const { settings, updateSettings } = useStore();
	const [formData, setFormData] = useState(settings.security || {});
	const [isLoading, setIsLoading] = useState(false);

	const handleToggle = (field) => {
		setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		setIsLoading(true);
		try {
			await updateSettings("security", formData);
			toast.success("Security settings saved!");
		} catch (error) {
			toast.error("Failed to save settings");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='p-6 md:p-8 max-w-4xl'>
			<div className='flex items-center justify-between mb-6'>
				<div className='flex items-center gap-3'>
					<Icon
						icon='mdi:shield-lock'
						className='text-2xl text-blue-600'
					/>
					<h1 className='text-2xl font-bold text-gray-800'>
						Security & Privacy
					</h1>
				</div>
				<button
					onClick={handleSave}
					disabled={isLoading}
					className='bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50'
				>
					{isLoading ? "Saving..." : "Save Changes"}
				</button>
			</div>

			<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6'>
				<div className='flex items-center justify-between py-3 border-b'>
					<div>
						<p className='font-medium text-gray-800'>
							Two-Factor Authentication
						</p>
						<p className='text-sm text-gray-500'>
							Add an extra layer of security
						</p>
					</div>
					<button
						onClick={() => handleToggle("twoFactorEnabled")}
						className={`relative w-12 h-6 rounded-full ${
							formData.twoFactorEnabled
								? "bg-blue-600"
								: "bg-gray-300"
						}`}
					>
						<span
							className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
								formData.twoFactorEnabled
									? "translate-x-6"
									: "translate-x-0"
							}`}
						/>
					</button>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Session Timeout (minutes)
					</label>
					<input
						type='number'
						value={formData.sessionTimeout || 30}
						onChange={(e) =>
							handleChange("sessionTimeout", parseInt(e.target.value))
						}
						className='w-full md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				<div className='flex items-center justify-between py-3 border-b'>
					<div>
						<p className='font-medium text-gray-800'>
							Login Notifications
						</p>
						<p className='text-sm text-gray-500'>
							Get notified of new logins
						</p>
					</div>
					<button
						onClick={() => handleToggle("loginNotifications")}
						className={`relative w-12 h-6 rounded-full ${
							formData.loginNotifications
								? "bg-blue-600"
								: "bg-gray-300"
						}`}
					>
						<span
							className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
								formData.loginNotifications
									? "translate-x-6"
									: "translate-x-0"
							}`}
						/>
					</button>
				</div>

				<div className='pt-4'>
					<button className='text-red-600 hover:text-red-700 font-medium flex items-center gap-2'>
						<Icon icon='mdi:lock-reset' className='text-xl' />
						Change Password
					</button>
				</div>
			</div>
		</div>
	);
};

export default SecurityPrivacy;
