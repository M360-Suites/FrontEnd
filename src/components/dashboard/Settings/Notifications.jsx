import { useState } from "react";
import useStore from "../../../state/store";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

const Notifications = () => {
	const { settings, updateSettings } = useStore();
	const [formData, setFormData] = useState(settings.notifications);
	const [isLoading, setIsLoading] = useState(false);

	const handleToggle = (field) => {
		setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	const handleTypeToggle = (type) => {
		setFormData((prev) => ({
			...prev,
			types: {
				...prev.types,
				[type]: !prev.types[type],
			},
		}));
	};

	const handleSave = async () => {
		setIsLoading(true);
		try {
			const result = await updateSettings("notifications", formData);
			if (result.success) {
				toast.success("Notification settings saved!");
			}
		} catch (error) {
			toast.error("Failed to save settings");
		} finally {
			setIsLoading(false);
		}
	};

	const notificationTypes = [
		{
			id: "emailAutomation",
			label: "Email automation",
			icon: "mdi:email-fast",
		},
		{
			id: "socialScheduler",
			label: "Social scheduler",
			icon: "mdi:calendar-clock",
		},
		{
			id: "websiteBuilder",
			label: "Website builder",
			icon: "mdi:web",
		},
		{
			id: "seoOptimization",
			label: "SEO optimization",
			icon: "mdi:chart-line",
		},
		{
			id: "communityManager",
			label: "Community Manager",
			icon: "mdi:account-group",
		},
	];

	return (
		<div className='p-6 md:p-8 max-w-4xl'>
			<div className='flex items-center justify-between mb-6'>
				<div className='flex items-center gap-3'>
					<Icon icon='mdi:bell' className='text-2xl text-blue-600' />
					<h1 className='text-2xl font-bold text-gray-800'>
						Notification settings
					</h1>
				</div>
			</div>

			<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6'>
				{/* Main Toggles */}
				<div className='space-y-4'>
					<div className='flex items-center justify-between py-3 border-b border-gray-100'>
						<span className='text-gray-700 font-medium'>
							Allow email notification
						</span>
						<button
							onClick={() => handleToggle("allowEmail")}
							className={`relative w-12 h-6 rounded-full transition-colors ${
								formData.allowEmail ? "bg-blue-600" : "bg-gray-300"
							}`}
						>
							<span
								className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
									formData.allowEmail
										? "translate-x-6"
										: "translate-x-0"
								}`}
							/>
						</button>
					</div>

					<div className='flex items-center justify-between py-3 border-b border-gray-100'>
						<span className='text-gray-700 font-medium'>
							Allow SMS notification
						</span>
						<button
							onClick={() => handleToggle("allowSMS")}
							className={`relative w-12 h-6 rounded-full transition-colors ${
								formData.allowSMS ? "bg-blue-600" : "bg-gray-300"
							}`}
						>
							<span
								className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
									formData.allowSMS
										? "translate-x-6"
										: "translate-x-0"
								}`}
							/>
						</button>
					</div>

					<div className='flex items-center justify-between py-3 border-b border-gray-100'>
						<span className='text-gray-700 font-medium'>
							Allow push notification
						</span>
						<button
							onClick={() => handleToggle("allowPush")}
							className={`relative w-12 h-6 rounded-full transition-colors ${
								formData.allowPush ? "bg-blue-600" : "bg-gray-300"
							}`}
						>
							<span
								className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
									formData.allowPush
										? "translate-x-6"
										: "translate-x-0"
								}`}
							/>
						</button>
					</div>
				</div>

				{/* Notification Types */}
				<div className='pt-4'>
					<h3 className='text-sm font-semibold text-gray-700 mb-4'>
						Notification Type
					</h3>
					<p className='text-sm text-gray-500 mb-4'>
						Set which features you want to get notified for
					</p>
					<div className='space-y-3'>
						{notificationTypes.map((type) => (
							<label
								key={type.id}
								className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'
							>
								<input
									type='checkbox'
									checked={formData.types[type.id]}
									onChange={() => handleTypeToggle(type.id)}
									className='w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
								/>
								<Icon
									icon={type.icon}
									className='text-xl text-gray-600'
								/>
								<span className='text-gray-700'>{type.label}</span>
							</label>
						))}
					</div>
				</div>

				{/* Save Button */}
				<div className='pt-4 border-t border-gray-200'>
					<button
						onClick={handleSave}
						disabled={isLoading}
						className='flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50'
					>
						{isLoading ? (
							<>
								<Icon icon='eos-icons:loading' className='text-lg' />
								Saving...
							</>
						) : (
							<>
								<Icon icon='mdi:content-save' className='text-lg' />
								Save Changes
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Notifications;
