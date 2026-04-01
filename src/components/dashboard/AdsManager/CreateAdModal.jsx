import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import useStore from "../../../state/store";

const CreateAdModal = ({
	isOpen,
	onClose,
	selectedPlatform,
	onAdCreated,
}) => {
	const { createAdCampaign } = useStore();
	const [name, setName] = useState("");
	const [budget, setBudget] = useState("500");
	const [duration, setDuration] = useState("7 days");
	const [isLoading, setIsLoading] = useState(false);

	const handleCreate = async () => {
		if (!name) {
			alert("Please enter a campaign name");
			return;
		}

		setIsLoading(true);
		await createAdCampaign({
			name,
			platform: selectedPlatform || "Facebook",
			budget,
			duration,
		});
		setIsLoading(false);
		onAdCreated && onAdCreated();
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.95, opacity: 0 }}
				className='bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden'
			>
				<div className='p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50'>
					<h2 className='text-xl font-bold text-gray-800'>
						Create Ad Campaign
					</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700'
					>
						<Icon icon='mdi:close' className='text-2xl' />
					</button>
				</div>

				<div className='p-6 space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Platform
						</label>
						<div className='flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200'>
							<Icon
								icon={
									selectedPlatform === "Facebook"
										? "logos:facebook"
										: selectedPlatform === "Instagram"
										? "logos:instagram-icon"
										: selectedPlatform === "Twitter" ||
										  selectedPlatform === "X"
										? "ri:twitter-x-fill"
										: selectedPlatform === "LinkedIn"
										? "logos:linkedin-icon"
										: "mdi:web"
								}
							/>
							<span className='font-semibold'>
								{selectedPlatform || "Select Platform"}
							</span>
						</div>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Campaign Name
						</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-orange'
							placeholder='e.g. Summer Sale, Brand Awareness'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Budget ($)
						</label>
						<input
							type='number'
							value={budget}
							onChange={(e) => setBudget(e.target.value)}
							className='w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-orange'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Duration
						</label>
						<select
							value={duration}
							onChange={(e) => setDuration(e.target.value)}
							className='w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-orange'
						>
							<option value='3 days'>3 days</option>
							<option value='7 days'>7 days</option>
							<option value='14 days'>14 days</option>
							<option value='30 days'>30 days</option>
						</select>
					</div>
				</div>

				<div className='p-6 border-t border-gray-100 flex justify-end gap-3 bg-white'>
					<button
						onClick={onClose}
						className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50'
					>
						Cancel
					</button>
					<button
						onClick={handleCreate}
						disabled={isLoading}
						className='px-6 py-2 bg-orange-gradient text-white rounded-lg hover:opacity-90 flex items-center gap-2'
					>
						{isLoading && <Icon icon='eos-icons:loading' />}
						{isLoading ? "Creating..." : "Create Campaign"}
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default CreateAdModal;
