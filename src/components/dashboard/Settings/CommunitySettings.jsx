import { useState } from "react";
import { Icon } from "@iconify/react";
import useStore from "../../../state/store";
import { toast } from "sonner";

const CommunitySettings = () => {
	const { settings, updateSettings } = useStore();
	const [formData, setFormData] = useState(
		settings.communitySettings || {}
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleToggle = (field) => {
		setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	const handleSave = async () => {
		setIsLoading(true);
		try {
			await updateSettings("communitySettings", formData);
			toast.success("Community settings saved!");
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
					<Icon icon='mdi:forum' className='text-2xl text-blue-600' />
					<h1 className='text-2xl font-bold text-gray-800'>
						Community Settings
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

			<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4'>
				<div className='flex items-center justify-between py-3 border-b'>
					<div>
						<p className='font-medium text-gray-800'>
							Enable Moderation
						</p>
						<p className='text-sm text-gray-500'>
							Moderate posts before publishing
						</p>
					</div>
					<button
						onClick={() => handleToggle("moderationEnabled")}
						className={`relative w-12 h-6 rounded-full ${
							formData.moderationEnabled
								? "bg-blue-600"
								: "bg-gray-300"
						}`}
					>
						<span
							className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
								formData.moderationEnabled
									? "translate-x-6"
									: "translate-x-0"
							}`}
						/>
					</button>
				</div>

				<div className='flex items-center justify-between py-3 border-b'>
					<div>
						<p className='font-medium text-gray-800'>Auto Approve</p>
						<p className='text-sm text-gray-500'>
							Automatically approve new posts
						</p>
					</div>
					<button
						onClick={() => handleToggle("autoApprove")}
						className={`relative w-12 h-6 rounded-full ${
							formData.autoApprove ? "bg-blue-600" : "bg-gray-300"
						}`}
					>
						<span
							className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
								formData.autoApprove
									? "translate-x-6"
									: "translate-x-0"
							}`}
						/>
					</button>
				</div>

				<div className='flex items-center justify-between py-3'>
					<div>
						<p className='font-medium text-gray-800'>
							Allow Guest Posts
						</p>
						<p className='text-sm text-gray-500'>
							Let non-members post content
						</p>
					</div>
					<button
						onClick={() => handleToggle("allowGuestPosts")}
						className={`relative w-12 h-6 rounded-full ${
							formData.allowGuestPosts ? "bg-blue-600" : "bg-gray-300"
						}`}
					>
						<span
							className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
								formData.allowGuestPosts
									? "translate-x-6"
									: "translate-x-0"
							}`}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default CommunitySettings;
