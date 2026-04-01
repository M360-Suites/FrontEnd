import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../../state/store";

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
	const { connectedSocialAccounts, createSocialPost } = useStore();
	const [selectedPlatforms, setSelectedPlatforms] = useState([]);
	const [content, setContent] = useState("");
	const [media, setMedia] = useState(null);
	const [scheduledDate, setScheduledDate] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (connectedSocialAccounts.length > 0) {
			// Auto-select first account by default if none selected
			if (selectedPlatforms.length === 0) {
				setSelectedPlatforms([connectedSocialAccounts[0].platform]);
			}
		}
	}, [connectedSocialAccounts]);

	const handlePlatformToggle = (platform) => {
		setSelectedPlatforms((prev) =>
			prev.includes(platform)
				? prev.filter((p) => p !== platform)
				: [...prev, platform]
		);
	};

	const handlePublish = async () => {
		if (selectedPlatforms.length === 0) {
			setError("Please select at least one platform");
			return;
		}
		if (!content.trim()) {
			setError("Please enter post content");
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			await createSocialPost({
				content,
				platforms: selectedPlatforms,
				image: media ? URL.createObjectURL(media) : null, // Mock image URL
				scheduledFor: scheduledDate || null,
				createdAt: new Date().toISOString(),
			});
			onPostCreated && onPostCreated();
			onClose();
		} catch (err) {
			setError("Failed to create post");
		} finally {
			setIsLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.95, opacity: 0 }}
				className='bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]'
			>
				<div className='p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50'>
					<h2 className='text-xl font-bold text-gray-800'>
						Create New Post
					</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700'
					>
						<Icon icon='mdi:close' className='text-2xl' />
					</button>
				</div>

				<div className='p-6 overflow-y-auto flex-1 custom-scrollbar'>
					{/* Platform Selection */}
					<div className='mb-6'>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Select Platforms
						</label>
						<div className='flex flex-wrap gap-3'>
							{connectedSocialAccounts.map((account) => (
								<button
									key={account.id}
									onClick={() =>
										handlePlatformToggle(account.platform)
									}
									className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
										selectedPlatforms.includes(account.platform)
											? "border-primary-orange bg-orange-50 text-primary-orange shadow-sm"
											: "border-gray-200 text-gray-600 hover:bg-gray-50"
									}`}
								>
									<Icon
										icon={
											account.platform === "Facebook"
												? "logos:facebook"
												: account.platform === "Instagram"
												? "logos:instagram-icon"
												: account.platform === "Twitter" ||
												  account.platform === "X"
												? "ri:twitter-x-fill"
												: account.platform === "LinkedIn"
												? "logos:linkedin-icon"
												: "mdi:web"
										}
									/>
									<span className='font-medium text-sm'>
										{account.platform}
									</span>
								</button>
							))}
							{connectedSocialAccounts.length === 0 && (
								<p className='text-sm text-red-500'>
									No accounts connected. Please connect an account
									first.
								</p>
							)}
						</div>
					</div>

					{/* Content Input */}
					<div className='mb-6'>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Post Content
						</label>
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="What's on your mind?"
							className='w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-orange focus:border-transparent min-h-[150px] resize-none outline-none text-base'
						/>
					</div>

					{/* Image Upload */}
					<div className='mb-6'>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Media
						</label>
						<div
							className='border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative'
							onClick={() =>
								document.getElementById("media-upload").click()
							}
						>
							<input
								type='file'
								id='media-upload'
								className='hidden'
								accept='image/*,video/*'
								onChange={(e) => setMedia(e.target.files[0])}
							/>
							{media ? (
								<div className='flex items-center justify-center gap-2'>
									<Icon
										icon='mdi:check-circle'
										className='text-green-500'
									/>
									<span className='text-gray-700 text-sm'>
										{media.name}
									</span>
								</div>
							) : (
								<div className='flex flex-col items-center gap-2 text-gray-400'>
									<Icon icon='mdi:image-plus' className='text-3xl' />
									<span className='text-sm'>
										Click to upload image or video
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Schedule */}
					<div className='mb-2'>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Schedule (Optional)
						</label>
						<input
							type='datetime-local'
							value={scheduledDate}
							onChange={(e) => setScheduledDate(e.target.value)}
							className='w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary-orange'
						/>
					</div>

					{error && (
						<div className='mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2'>
							<Icon icon='mdi:alert-circle' />
							{error}
						</div>
					)}
				</div>

				<div className='p-6 border-t border-gray-100 flex justify-end gap-3 bg-white'>
					<button
						onClick={onClose}
						className='px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors'
					>
						Cancel
					</button>
					<button
						onClick={handlePublish}
						disabled={isLoading}
						className='px-6 py-2.5 rounded-lg bg-orange-gradient text-white font-medium hover:shadow-lg hover:opacity-95 transition-all disabled:opacity-70 flex items-center gap-2'
					>
						{isLoading && <Icon icon='eos-icons:loading' />}
						{isLoading
							? scheduledDate
								? "Scheduling..."
								: "Publishing..."
							: scheduledDate
							? "Schedule Post"
							: "Publish Now"}
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default CreatePostModal;
