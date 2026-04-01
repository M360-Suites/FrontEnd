import { useState } from "react";
import { Icon } from "@iconify/react";
import useStore from "../../../state/store";
import { toast } from "sonner";

const AdvancedSettings = () => {
	const { settings, updateSettings } = useStore();
	const [formData, setFormData] = useState(
		settings.advancedSettings || {}
	);
	const [isLoading, setIsLoading] = useState(false);
	const [showApiKey, setShowApiKey] = useState(false);

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		setIsLoading(true);
		try {
			await updateSettings("advancedSettings", formData);
			toast.success("Advanced settings saved!");
		} catch (error) {
			toast.error("Failed to save settings");
		} finally {
			setIsLoading(false);
		}
	};

	const generateApiKey = () => {
		const key =
			"sk_" +
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15);
		handleChange("apiKey", key);
		toast.success("API Key generated!");
	};

	return (
		<div className='p-6 md:p-8 max-w-4xl'>
			<div className='flex items-center justify-between mb-6'>
				<div className='flex items-center gap-3'>
					<Icon icon='mdi:cog' className='text-2xl text-blue-600' />
					<h1 className='text-2xl font-bold text-gray-800'>
						Advanced Settings
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
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						API Key
					</label>
					<div className='flex gap-3'>
						<div className='relative flex-1'>
							<input
								type={showApiKey ? "text" : "password"}
								value={formData.apiKey || ""}
								readOnly
								placeholder='Generate an API key'
								className='w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50'
							/>
							<button
								onClick={() => setShowApiKey(!showApiKey)}
								className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
							>
								<Icon
									icon={showApiKey ? "mdi:eye-off" : "mdi:eye"}
									className='text-xl'
								/>
							</button>
						</div>
						<button
							onClick={generateApiKey}
							className='bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200'
						>
							Generate
						</button>
					</div>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Webhook URL
					</label>
					<input
						type='url'
						value={formData.webhookUrl || ""}
						onChange={(e) =>
							handleChange("webhookUrl", e.target.value)
						}
						placeholder='https://your-domain.com/webhook'
						className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Custom Domain
					</label>
					<input
						type='text'
						value={formData.customDomain || ""}
						onChange={(e) =>
							handleChange("customDomain", e.target.value)
						}
						placeholder='app.yourdomain.com'
						className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				<div className='pt-4 border-t'>
					<button className='text-red-600 hover:text-red-700 font-medium flex items-center gap-2'>
						<Icon icon='mdi:delete-forever' className='text-xl' />
						Delete Account
					</button>
				</div>
			</div>
		</div>
	);
};

export default AdvancedSettings;
