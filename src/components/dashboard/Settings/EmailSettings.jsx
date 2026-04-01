import { useState } from "react";
import { Icon } from "@iconify/react";
import useStore from "../../../state/store";
import { toast } from "sonner";

const EmailSettings = () => {
	const { settings, updateSettings } = useStore();
	const [formData, setFormData] = useState(
		settings.emailSettings || {}
	);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		setIsLoading(true);
		try {
			await updateSettings("emailSettings", formData);
			toast.success("Email settings saved!");
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
					<Icon icon='mdi:email' className='text-2xl text-blue-600' />
					<h1 className='text-2xl font-bold text-gray-800'>
						Email Settings
					</h1>
				</div>
				<button
					onClick={handleSave}
					disabled={isLoading}
					className='flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50'
				>
					{isLoading ? "Saving..." : "Save Changes"}
				</button>
			</div>

			<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							SMTP Host
						</label>
						<input
							type='text'
							value={formData.smtpHost || ""}
							onChange={(e) =>
								handleChange("smtpHost", e.target.value)
							}
							placeholder='smtp.gmail.com'
							className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							SMTP Port
						</label>
						<input
							type='text'
							value={formData.smtpPort || ""}
							onChange={(e) =>
								handleChange("smtpPort", e.target.value)
							}
							placeholder='587'
							className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
						/>
					</div>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						SMTP Username
					</label>
					<input
						type='text'
						value={formData.smtpUsername || ""}
						onChange={(e) =>
							handleChange("smtpUsername", e.target.value)
						}
						placeholder='your-email@gmail.com'
						className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						SMTP Password
					</label>
					<div className='relative'>
						<input
							type={showPassword ? "text" : "password"}
							value={formData.smtpPassword || ""}
							onChange={(e) =>
								handleChange("smtpPassword", e.target.value)
							}
							placeholder='••••••••'
							className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
						/>
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
						>
							<Icon
								icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
								className='text-xl'
							/>
						</button>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							From Email
						</label>
						<input
							type='email'
							value={formData.fromEmail || ""}
							onChange={(e) =>
								handleChange("fromEmail", e.target.value)
							}
							placeholder='noreply@yourdomain.com'
							className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							From Name
						</label>
						<input
							type='text'
							value={formData.fromName || ""}
							onChange={(e) =>
								handleChange("fromName", e.target.value)
							}
							placeholder='Your Company Name'
							className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmailSettings;
