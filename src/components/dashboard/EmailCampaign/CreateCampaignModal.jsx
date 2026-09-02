import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import useStore from "../../../state/store";
import EmailSentModal from "./EmailSentModal";

const CreateCampaignModal = ({
	handleToggleModal,
	onCampaignCreated,
}) => {
	const { createEmailCampaign, emailSubscribers } = useStore();
	const [selectedOption, setSelectedOption] = useState(null);
	const [currentStep, setCurrentStep] = useState("select");
	const [isLoading, setIsLoading] = useState(false);
	const [authorizationStatus, setAuthorizationStatus] = useState(null);
	const [detectedProvider, setDetectedProvider] = useState(null);
	const [providerEmail, setProviderEmail] = useState("");
	const [campaignData, setCampaignData] = useState({
		name: "",
		subject: "",
		from: "",
		recipients: [],
		contents: [""],
		links: [""],
	});
	const [subscribers, setSubscribers] = useState([]);
	const [error, setError] = useState(null);
	const [showSentModal, setShowSentModal] = useState(false);

	const campaignOptions = [
		{
			id: "one-time",
			title: "One time Campaign",
			description:
				"Create a one time campaign to reach global audience",
			icon: "mdi:email-outline",
			isPremium: false,
			type: "oneTime",
		},
		{
			id: "drip",
			title: "Drip Campaign",
			description: "Schedule and automate email with drip campaign",
			icon: "mdi:clock-time-four-outline",
			isPremium: true,
			type: "drip",
		},
	];

	// Load subscribers on component mount
	useEffect(() => {
		setSubscribers(emailSubscribers || []);
	}, [emailSubscribers]);

	const handleContinue = async () => {
		if (!selectedOption) return;

		const selectedCampaign = campaignOptions.find(
			(opt) => opt.id === selectedOption
		);
		setCampaignData((prev) => ({
			...prev,
			type: selectedCampaign.type,
		}));
		setCurrentStep("detect-provider");
	};

	const handleDetectProvider = async () => {
		if (!providerEmail) {
			setError("Please enter your email address");
			return;
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(providerEmail)) {
			setError("Please enter a valid email address");
			return;
		}

		setIsLoading(true);
		setError(null);

		// Mock provider detection
		setTimeout(() => {
			setDetectedProvider("google"); // Mocking Google for now
			setCampaignData((prev) => ({
				...prev,
				from: providerEmail,
			}));
			setCurrentStep("authorize");
			setIsLoading(false);
		}, 1000);
	};

	const handleProviderAuth = async (provider) => {
		setIsLoading(true);
		setError(null);

		// Mock auth
		setTimeout(() => {
			setCurrentStep("create");
			setIsLoading(false);
		}, 1500);
	};

	const handleSkipAuth = () => {
		setCurrentStep("create");
	};

	const handleInputChange = (field, value) => {
		setCampaignData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleArrayInputChange = (field, index, value) => {
		setCampaignData((prev) => ({
			...prev,
			[field]: prev[field].map((item, i) =>
				i === index ? value : item
			),
		}));
	};

	const addArrayItem = (field) => {
		setCampaignData((prev) => ({
			...prev,
			[field]: [...prev[field], ""],
		}));
	};

	const removeArrayItem = (field, index) => {
		setCampaignData((prev) => ({
			...prev,
			[field]: prev[field].filter((_, i) => i !== index),
		}));
	};

	const handleRecipientToggle = (subscriberId) => {
		setCampaignData((prev) => ({
			...prev,
			recipients: prev.recipients.includes(subscriberId)
				? prev.recipients.filter((id) => id !== subscriberId)
				: [...prev.recipients, subscriberId],
		}));
	};

	const handleCreateCampaign = async () => {
		setIsLoading(true);
		setError(null);

		try {
			// Validate required fields
			if (
				!campaignData.name ||
				!campaignData.subject ||
				!campaignData.from
			) {
				setError("Please fill in all required fields");
				setIsLoading(false);
				return;
			}

			// Allow at least one dummy recipient if none selected for demo purposes
			if (
				campaignData.recipients.length === 0 &&
				subscribers.length > 0
			) {
				setError("Please select at least one recipient");
				setIsLoading(false);
				return;
			}

			// Filter out empty contents and links
			const filteredData = {
				...campaignData,
				contents: campaignData.contents.filter((content) =>
					content.trim()
				),
				links: campaignData.links.filter((link) => link.trim()),
			};

			const response = await createEmailCampaign(filteredData);

			if (response) {
				onCampaignCreated?.(response);
				// Show success modal instead of immediately closing
				setShowSentModal(true);
			}
		} catch (error) {
			console.error("Campaign creation error:", error);
			setError(
				error.message ||
					"Failed to create campaign. Please try again."
			);
		} finally {
			setIsLoading(false);
		}
	};

	const renderSelectStep = () => (
		<>
			{/* Header */}
			<div className='relative mb-5 sm:mb-8'>
				<div className='absolute top-0 left-0 w-12 sm:w-16 h-1 bg-orange-gradient-radial rounded-full'></div>
				<div className='flex justify-between items-start sm:items-center w-full pt-4'>
					<div className='flex flex-col pr-4'>
						<h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800'>
							Select campaign type
						</h2>
						<p className='text-xs sm:text-sm font-normal text-gray-500 mt-1'>
							Choose a campaign type to continue
						</p>
					</div>
					<motion.button
						onClick={handleToggleModal}
						className='p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0'
						whileHover={{ rotate: 90 }}
						transition={{ duration: 0.2 }}
					>
						<Icon
							icon={"mdi:close"}
							className='text-gray-500 text-lg sm:text-xl'
						/>
					</motion.button>
				</div>
			</div>

			{/* Campaign Options */}
			<div className='w-full space-y-3 sm:space-y-4 mb-5 sm:mb-6'>
				{campaignOptions.map((option) => (
					<motion.div
						key={option.id}
						className={`flex items-center border rounded-xl p-3 sm:p-5 w-full cursor-pointer transition-all ${
							selectedOption === option.id
								? "border-primary-orange bg-light-orange/10 shadow-md"
								: "border-gray-200 hover:border-primary-orange/50 hover:shadow-sm"
						}`}
						onClick={() => setSelectedOption(option.id)}
						whileHover={{ y: -2 }}
						whileTap={{ scale: 0.98 }}
					>
						<div
							className={`w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
								selectedOption === option.id
									? "bg-primary-orange text-white"
									: "bg-light-orange/10 text-primary-orange"
							}`}
						>
							<Icon
								icon={option.icon}
								className='text-xl sm:text-2xl'
							/>
						</div>

						<div className='flex flex-col ml-3 sm:ml-4 flex-grow'>
							<span className='font-medium text-gray-800 text-sm sm:text-base'>
								{option.title}
							</span>
							<p className='text-xs sm:text-sm text-gray-600 mt-0.5 line-clamp-2 sm:line-clamp-none'>
								{option.description}
							</p>
						</div>

						{option.isPremium && (
							<div className='flex items-center justify-center bg-gradient-to-r from-primary-orange to-light-orange text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm whitespace-nowrap'>
								<Icon
									icon='mdi:crown'
									className='mr-0.5 sm:mr-1 text-yellow-100'
								/>
								<span>Premium</span>
							</div>
						)}

						<motion.div
							className={`ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
								selectedOption === option.id
									? "border-primary-orange"
									: "border-gray-300"
							}`}
						>
							{selectedOption === option.id && (
								<motion.div
									className='w-2 h-2 sm:w-3 sm:h-3 bg-primary-orange rounded-full'
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ duration: 0.2 }}
								/>
							)}
						</motion.div>
					</motion.div>
				))}
			</div>

			{/* Action Buttons */}
			<div className='flex justify-end gap-2 sm:gap-3 mt-auto'>
				<motion.button
					onClick={handleToggleModal}
					className='px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 text-sm sm:text-base font-medium hover:bg-gray-50 transition-colors'
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					Cancel
				</motion.button>

				<motion.button
					onClick={handleContinue}
					disabled={!selectedOption || isLoading}
					className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-white text-sm sm:text-base font-medium shadow-md transition-all flex items-center ${
						selectedOption && !isLoading
							? "bg-orange-gradient-radial hover:shadow-lg opacity-100"
							: "bg-gray-400 opacity-70 cursor-not-allowed"
					}`}
					whileHover={
						selectedOption && !isLoading ? { scale: 1.02 } : {}
					}
					whileTap={
						selectedOption && !isLoading ? { scale: 0.98 } : {}
					}
				>
					{isLoading ? "Loading..." : "Continue"}
					{!isLoading && (
						<Icon
							icon='mdi:arrow-right'
							className='ml-1 text-base sm:text-lg'
						/>
					)}
				</motion.button>
			</div>
		</>
	);

	const renderDetectProviderStep = () => (
		<>
			<div className='relative mb-5 sm:mb-8'>
				<div className='absolute top-0 left-0 w-12 sm:w-16 h-1 bg-orange-gradient-radial rounded-full'></div>
				<div className='flex justify-between items-start sm:items-center w-full pt-4'>
					<div className='flex flex-col pr-4'>
						<h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800'>
							Detect Email Provider
						</h2>
						<p className='text-xs sm:text-sm font-normal text-gray-500 mt-1'>
							Enter your email to detect your email provider
						</p>
					</div>
					<motion.button
						onClick={handleToggleModal}
						className='p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0'
						whileHover={{ rotate: 90 }}
						transition={{ duration: 0.2 }}
					>
						<Icon
							icon={"mdi:close"}
							className='text-gray-500 text-lg sm:text-xl'
						/>
					</motion.button>
				</div>
			</div>

			<div className='mb-6'>
				<label className='block text-sm font-medium text-gray-700 mb-2'>
					Your Email Address *
				</label>
				<input
					type='email'
					value={providerEmail}
					onChange={(e) => {
						setProviderEmail(e.target.value);
						setError(null);
					}}
					className='w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent'
					placeholder='your-email@example.com'
					disabled={isLoading}
				/>
				<p className='text-xs text-gray-500 mt-2'>
					We'll detect your email provider (Gmail, Outlook, Zoho,
					etc.)
				</p>
			</div>

			<div className='flex justify-between gap-3'>
				<motion.button
					onClick={() => setCurrentStep("select")}
					disabled={isLoading}
					className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50'
					whileHover={!isLoading ? { scale: 1.02 } : {}}
					whileTap={!isLoading ? { scale: 0.98 } : {}}
				>
					Back
				</motion.button>

				<motion.button
					onClick={handleDetectProvider}
					disabled={!providerEmail || isLoading}
					className={`px-6 py-2 rounded-lg text-white font-medium shadow-md transition-all flex items-center gap-2 ${
						providerEmail && !isLoading
							? "bg-orange-gradient-radial hover:shadow-lg"
							: "bg-gray-400 cursor-not-allowed"
					}`}
					whileHover={
						providerEmail && !isLoading ? { scale: 1.02 } : {}
					}
					whileTap={
						providerEmail && !isLoading ? { scale: 0.98 } : {}
					}
				>
					{isLoading ? (
						<>
							<Icon icon='mdi:loading' className='animate-spin' />
							Detecting...
						</>
					) : (
						<>
							Detect Provider
							<Icon icon='mdi:arrow-right' />
						</>
					)}
				</motion.button>
			</div>
		</>
	);

	const renderAuthorizeStep = () => (
		<>
			<div className='relative mb-5 sm:mb-8'>
				<div className='absolute top-0 left-0 w-12 sm:w-16 h-1 bg-orange-gradient-radial rounded-full'></div>
				<div className='flex justify-between items-start sm:items-center w-full pt-4'>
					<div className='flex flex-col pr-4'>
						<h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800'>
							Authorize Email Provider
						</h2>
						<p className='text-xs sm:text-sm font-normal text-gray-500 mt-1'>
							{detectedProvider ? (
								<>
									Detected:{" "}
									<span className='font-medium capitalize'>
										{detectedProvider}
									</span>
								</>
							) : (
								"Connect your email provider to send campaigns"
							)}
						</p>
					</div>
					<motion.button
						onClick={handleToggleModal}
						className='p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0'
						whileHover={{ rotate: 90 }}
						transition={{ duration: 0.2 }}
					>
						<Icon
							icon={"mdi:close"}
							className='text-gray-500 text-lg sm:text-xl'
						/>
					</motion.button>
				</div>
			</div>

			<div className='space-y-4 mb-6'>
				{detectedProvider ? (
					<motion.button
						onClick={() => handleProviderAuth(detectedProvider)}
						disabled={isLoading}
						className={`w-full p-4 border-2 border-primary-orange bg-light-orange/10 rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-3 ${
							isLoading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						whileHover={!isLoading ? { y: -2 } : {}}
						whileTap={!isLoading ? { scale: 0.98 } : {}}
					>
						<Icon
							icon={`mdi:${
								detectedProvider === "microsoft"
									? "microsoft"
									: detectedProvider
							}`}
							className='text-2xl text-primary-orange'
						/>
						<span className='font-semibold text-primary-orange capitalize'>
							{isLoading
								? "Connecting..."
								: `Connect ${detectedProvider}`}
						</span>
					</motion.button>
				) : (
					["google", "microsoft", "zoho"].map((provider) => (
						<motion.button
							key={provider}
							onClick={() => handleProviderAuth(provider)}
							disabled={isLoading}
							className={`w-full p-4 border border-gray-200 rounded-xl hover:border-primary-orange/50 hover:shadow-sm transition-all flex items-center justify-center gap-3 ${
								isLoading ? "opacity-50 cursor-not-allowed" : ""
							}`}
							whileHover={!isLoading ? { y: -2 } : {}}
							whileTap={!isLoading ? { scale: 0.98 } : {}}
						>
							<Icon
								icon={`mdi:${
									provider === "microsoft" ? "microsoft" : provider
								}`}
								className='text-2xl'
							/>
							<span className='font-medium capitalize'>
								{isLoading ? "Connecting..." : `Connect ${provider}`}
							</span>
						</motion.button>
					))
				)}
			</div>

			{authorizationStatus === "pending" && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-700 rounded-lg flex items-center gap-2'
				>
					<Icon icon='mdi:information' />
					<span className='text-sm'>
						Complete authorization in the new tab, then click Continue
						below
					</span>
				</motion.div>
			)}

			<div className='flex justify-between gap-3'>
				<motion.button
					onClick={() => setCurrentStep("detect-provider")}
					disabled={isLoading}
					className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50'
					whileHover={!isLoading ? { scale: 1.02 } : {}}
					whileTap={!isLoading ? { scale: 0.98 } : {}}
				>
					Back
				</motion.button>

				<div className='flex gap-2'>
					<motion.button
						onClick={handleSkipAuth}
						disabled={isLoading}
						className='px-4 py-2 text-primary-orange font-medium hover:bg-light-orange/10 rounded-lg transition-colors disabled:opacity-50'
						whileHover={!isLoading ? { scale: 1.02 } : {}}
						whileTap={!isLoading ? { scale: 0.98 } : {}}
					>
						Skip for now
					</motion.button>

					{authorizationStatus === "pending" && (
						<motion.button
							onClick={() => setCurrentStep("create")}
							className='px-4 py-2 bg-orange-gradient-radial text-white font-medium rounded-lg hover:shadow-lg transition-all'
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							Continue
						</motion.button>
					)}
				</div>
			</div>
		</>
	);

	const renderCreateStep = () => (
		<>
			<div className='relative mb-6'>
				<div className='absolute top-0 left-0 w-12 sm:w-16 h-1 bg-orange-gradient-radial rounded-full'></div>
				<div className='flex justify-between items-start pt-4'>
					<div className='flex flex-col pr-4'>
						<h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800'>
							Create Campaign
						</h2>
						<p className='text-xs sm:text-sm font-normal text-gray-500 mt-1'>
							Fill in campaign details
						</p>
					</div>
					<motion.button
						onClick={handleToggleModal}
						className='p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0'
						whileHover={{ rotate: 90 }}
						transition={{ duration: 0.2 }}
					>
						<Icon
							icon={"mdi:close"}
							className='text-gray-500 text-lg sm:text-xl'
						/>
					</motion.button>
				</div>
			</div>

			<div className='space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar mb-6 pr-2'>
				{/* Basic Info */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Campaign Name *
					</label>
					<input
						type='text'
						value={campaignData.name}
						onChange={(e) =>
							handleInputChange("name", e.target.value)
						}
						className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent'
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
							handleInputChange("subject", e.target.value)
						}
						className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent'
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
							handleInputChange("from", e.target.value)
						}
						className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent'
						placeholder='sender@example.com'
					/>
				</div>

				{/* Recipients */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Recipients * ({campaignData.recipients.length} selected)
					</label>
					<div className='max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2 custom-scrollbar'>
						{subscribers.length > 0 ? (
							subscribers.map((subscriber) => (
								<label
									key={subscriber._id}
									className='flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer'
								>
									<input
										type='checkbox'
										checked={campaignData.recipients.includes(
											subscriber._id
										)}
										onChange={() =>
											handleRecipientToggle(subscriber._id)
										}
										className='mr-3 w-4 h-4 text-primary-orange accent-primary-orange'
									/>
									<span className='text-sm'>
										{subscriber.email || subscriber.name}
									</span>
								</label>
							))
						) : (
							<p className='text-sm text-gray-500 p-2'>
								No subscribers found. Please add subscribers first.
							</p>
						)}
					</div>
				</div>

				{/* Content */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Content
					</label>
					{campaignData.contents.map((content, index) => (
						<div key={index} className='flex gap-2 mb-2'>
							<textarea
								value={content}
								onChange={(e) =>
									handleArrayInputChange(
										"contents",
										index,
										e.target.value
									)
								}
								className='flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent resize-none'
								placeholder='Enter email content'
								rows='3'
							/>
							{campaignData.contents.length > 1 && (
								<button
									onClick={() => removeArrayItem("contents", index)}
									className='p-2 text-red-500 hover:bg-red-50 rounded h-fit'
								>
									<Icon icon='mdi:delete' className='text-xl' />
								</button>
							)}
						</div>
					))}
					<button
						onClick={() => addArrayItem("contents")}
						className='text-primary-orange hover:bg-light-orange/10 p-2 rounded flex items-center gap-1 text-sm font-medium'
					>
						<Icon icon='mdi:plus' />
						Add Content
					</button>
				</div>
				{/* Links */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Links (Optional)
					</label>
					{campaignData.links.map((link, index) => (
						<div key={index} className='flex gap-2 mb-2'>
							<input
								type='url'
								value={link}
								onChange={(e) =>
									handleArrayInputChange(
										"links",
										index,
										e.target.value
									)
								}
								className='flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent'
								placeholder='https://example.com'
							/>
							{campaignData.links.length > 1 && (
								<button
									onClick={() => removeArrayItem("links", index)}
									className='p-2 text-red-500 hover:bg-red-50 rounded h-fit'
								>
									<Icon icon='mdi:delete' className='text-xl' />
								</button>
							)}
						</div>
					))}
					<button
						onClick={() => addArrayItem("links")}
						className='text-primary-orange hover:bg-light-orange/10 p-2 rounded flex items-center gap-1 text-sm font-medium'
					>
						<Icon icon='mdi:plus' />
						Add Link
					</button>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='flex justify-between gap-3 pt-4 border-t'>
				<motion.button
					onClick={() => setCurrentStep("authorize")}
					disabled={isLoading}
					className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50'
					whileHover={!isLoading ? { scale: 1.02 } : {}}
					whileTap={!isLoading ? { scale: 0.98 } : {}}
				>
					Back
				</motion.button>

				<motion.button
					onClick={handleCreateCampaign}
					disabled={isLoading}
					className={`px-6 py-2 rounded-lg text-white font-medium shadow-md transition-all flex items-center gap-2 ${
						!isLoading
							? "bg-orange-gradient-radial hover:shadow-lg"
							: "bg-gray-400 cursor-not-allowed"
					}`}
					whileHover={!isLoading ? { scale: 1.02 } : {}}
					whileTap={!isLoading ? { scale: 0.98 } : {}}
				>
					{isLoading ? (
						<>
							<Icon icon='mdi:loading' className='animate-spin' />
							Creating...
						</>
					) : (
						<>
							Create Campaign
							<Icon icon='mdi:send' />
						</>
					)}
				</motion.button>
			</div>
		</>
	);

	return (
		<>
		<EmailSentModal
			isOpen={showSentModal}
			onClose={() => { setShowSentModal(false); handleToggleModal(); }}
			recipientCount={campaignData.recipients.length || subscribers.length || 1}
			campaignName={campaignData.name}
		/>
		<AnimatePresence>
			<motion.div
				className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-3 sm:p-4 backdrop-blur-sm'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={(e) => {
					if (e.target === e.currentTarget) {
						handleToggleModal();
					}
				}}
			>
				<motion.div
					className='bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-xl w-full max-w-[600px] flex flex-col max-h-[90vh]'
					initial={{ scale: 0.9, y: 20 }}
					animate={{ scale: 1, y: 0 }}
					exit={{ scale: 0.9, y: 20 }}
					transition={{ type: "spring", damping: 25 }}
					onClick={(e) => e.stopPropagation()}
				>
					{error && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className='mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-start gap-2'
						>
							<Icon
								icon='mdi:alert-circle'
								className='flex-shrink-0 mt-0.5'
							/>
							<span className='text-sm'>{error}</span>
						</motion.div>
					)}

					{currentStep === "select" && renderSelectStep()}
					{currentStep === "detect-provider" &&
						renderDetectProviderStep()}
					{currentStep === "authorize" && renderAuthorizeStep()}
					{currentStep === "create" && renderCreateStep()}
				</motion.div>
			</motion.div>
		</AnimatePresence>
		</>
	);
};

export default CreateCampaignModal;
