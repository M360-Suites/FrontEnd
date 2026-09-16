import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../../state/store";
import EmailSentModal from "./EmailSentModal";

const SendTemplateModal = ({ isOpen, onClose, templateData }) => {
	const { emailSubscribers } = useStore();
	const [subscribers, setSubscribers] = useState([]);
	const [campaignData, setCampaignData] = useState({
		name: templateData?.meta?.subject || "New Campaign from Template",
		subject: templateData?.meta?.subject || "",
		from: "",
		recipients: [],
	});
	const [isLoading, setIsLoading] = useState(false);
	const [showSentModal, setShowSentModal] = useState(false);
	const [error, setError] = useState(null);

	// Load subscribers on component mount
	useEffect(() => {
		setSubscribers(emailSubscribers || []);
	}, [emailSubscribers]);

    // Update campaignData when templateData changes
	useEffect(() => {
		if (templateData?.meta?.subject) {
			setCampaignData(prev => ({
				...prev,
				subject: templateData.meta.subject,
				name: templateData.meta.subject || prev.name
			}));
		}
	}, [templateData]);

	const handleRecipientToggle = (subscriberId) => {
		setCampaignData((prev) => ({
			...prev,
			recipients: prev.recipients.includes(subscriberId)
				? prev.recipients.filter((id) => id !== subscriberId)
				: [...prev.recipients, subscriberId],
		}));
	};

	const handleSend = () => {
		setError(null);
		if (!campaignData.name || !campaignData.subject || !campaignData.from) {
			setError("Please fill in all required fields.");
			return;
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(campaignData.from)) {
			setError("Please enter a valid 'From Email' address");
			return;
		}

		if (campaignData.recipients.length === 0 && subscribers.length > 0) {
			setError("Please select at least one recipient");
			return;
		}

		setIsLoading(true);
		
		// Simulate network request
		setTimeout(() => {
			setIsLoading(false);
			setShowSentModal(true);
		}, 1500);
	};

	if (!isOpen && !showSentModal) return null;

	return (
		<>
			<EmailSentModal
				isOpen={showSentModal}
				onClose={() => {
					setShowSentModal(false);
					onClose();
				}}
				recipientCount={campaignData.recipients.length || subscribers.length || 1}
				campaignName={campaignData.name}
			/>

			<AnimatePresence>
				{isOpen && !showSentModal && (
					<motion.div
						className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-3 sm:p-4 backdrop-blur-sm'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							initial={{ scale: 0.95, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.95, opacity: 0, y: 20 }}
							className='bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]'
						>
							<div className='p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50'>
								<div>
									<h2 className='text-xl font-bold text-gray-800'>
										Send Email Campaign
									</h2>
									<p className='text-xs text-gray-500 mt-1'>
										Finalize details to send your template
									</p>
								</div>
								<button
									onClick={onClose}
									className='text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-1 rounded-full transition-colors'
								>
									<Icon icon='mdi:close' className='text-2xl' />
								</button>
							</div>

							<div className='p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1'>
								{error && (
									<div className='p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100'>
										{error}
									</div>
								)}

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Campaign Name *
									</label>
									<input
										type='text'
										value={campaignData.name}
										onChange={(e) =>
											setCampaignData({ ...campaignData, name: e.target.value })
										}
										className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-shadow'
										placeholder='Enter campaign name'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Subject *
									</label>
									<input
										type='text'
										value={campaignData.subject}
										onChange={(e) =>
											setCampaignData({ ...campaignData, subject: e.target.value })
										}
										className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-shadow'
										placeholder='Enter email subject'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										From Email *
									</label>
									<input
										type='email'
										value={campaignData.from}
										onChange={(e) =>
											setCampaignData({ ...campaignData, from: e.target.value })
										}
										className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition-shadow'
										placeholder='you@yourcompany.com'
									/>
								</div>

								{/* Recipients */}
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-2'>
										Recipients * ({campaignData.recipients.length} selected)
									</label>
									<div className='max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2 custom-scrollbar'>
										{subscribers.length > 0 ? (
											subscribers.map((subscriber) => (
												<label
													key={subscriber._id}
													className='flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors'
												>
													<input
														type='checkbox'
														checked={campaignData.recipients.includes(
															subscriber._id
														)}
														onChange={() =>
															handleRecipientToggle(subscriber._id)
														}
														className='mr-3 w-4 h-4 text-orange-500 accent-orange-500 border-gray-300 rounded focus:ring-orange-500'
													/>
													<span className='text-sm text-gray-700'>
														{subscriber.email || subscriber.name}
													</span>
												</label>
											))
										) : (
											<div className='text-sm text-gray-500 p-4 text-center'>
												<span className='block mb-2'>No subscribers found.</span>
												<button className='text-orange-500 font-medium hover:underline'>
													Add subscribers
												</button>
											</div>
										)}
									</div>
								</div>
							</div>

							<div className='p-6 border-t border-gray-100 flex justify-end gap-3 bg-white shrink-0'>
								<button
									onClick={onClose}
									disabled={isLoading}
									className='px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50'
								>
									Cancel
								</button>
								<button
									onClick={handleSend}
									disabled={isLoading}
									className={`px-6 py-2.5 rounded-xl text-white font-medium shadow-md transition-all flex items-center gap-2 ${
										!isLoading
											? "bg-orange-500 hover:bg-orange-600 hover:shadow-lg"
											: "bg-gray-400 cursor-not-allowed"
									}`}
								>
									{isLoading ? (
										<>
											<Icon icon='mdi:loading' className='animate-spin' />
											Sending...
										</>
									) : (
										<>
											Send Campaign
											<Icon icon='mdi:send' />
										</>
									)}
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default SendTemplateModal;
