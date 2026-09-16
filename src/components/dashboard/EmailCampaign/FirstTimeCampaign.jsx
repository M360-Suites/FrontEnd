import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import {
	mailSent,
	setUpMail,
	importContact,
	createCampaign,
} from "../../../assets";
import CreateCampaignModal from "./CreateCampaignModal";

const FirstTimeCampaign = () => {
	const cardsRef = useRef([]);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [campaignCreated, setCampaignCreated] = useState(false);

	const handleToggleModal = () => {
		setShowModal(!showModal);
		// Clear success message when modal is closed
		if (showModal) {
			setSuccessMessage("");
		}
	};

	// Handle successful campaign creation
	const handleCampaignCreated = (newCampaign) => {
		console.log("Campaign created successfully:", newCampaign);
		setCampaignCreated(true);
		setSuccessMessage(
			`Campaign "${
				newCampaign.name || "Untitled"
			}" created successfully!`
		);

		// Show success message for 5 seconds
		setTimeout(() => {
			setSuccessMessage("");
		}, 5000);

		// You might want to redirect to campaigns list or refresh data here
		// Example: navigate('/campaigns') or refetch campaigns
	};

	// GSAP animation for cards
	useEffect(() => {
		if (cardsRef.current.length) {
			gsap.fromTo(
				cardsRef.current,
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.2,
					ease: "power2.out",
				}
			);
		}
	}, []);

	// Add card to refs
	const addToRefs = (el) => {
		if (el && !cardsRef.current.includes(el)) {
			cardsRef.current.push(el);
		}
	};

	return (
		<>
			{showModal && (
				<CreateCampaignModal
					handleToggleModal={handleToggleModal}
					onCampaignCreated={handleCampaignCreated}
				/>
			)}

			<div className='p-4'>
				{/* Success Message */}
				{successMessage && (
					<div className='mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center justify-between animate-pulse'>
						<div className='flex items-center gap-2'>
							<Icon
								icon='mdi:check-circle'
								className='text-green-600'
							/>
							<span>{successMessage}</span>
						</div>
						<button
							onClick={() => setSuccessMessage("")}
							className='text-green-600 hover:text-green-800'
						>
							<Icon icon='mdi:close' />
						</button>
					</div>
				)}

				{/* First Section */}
				<div className='flex flex-col md:flex-row justify-around items-center border border-gray-200 rounded-lg p-4'>
					<div className='flex flex-col gap-5 w-full md:w-1/2 mb-4 md:mb-0'>
						<div>
							<span className='font-bold text-xl'>
								Track Your Email Campaigns
							</span>
						</div>
						<div>
							<p className='text-gray-600 text-sm'>
								Upgrade your account to enjoy seamless email
								automation
							</p>
						</div>
						<div className='flex items-center'>
							<button 
								onClick={handleToggleModal}
								className='px-8 py-2 bg-orange-gradient text-white rounded-xl hover:opacity-90 transition-opacity'
							>
								Get Started.
							</button>
						</div>
					</div>

					<div className='w-full md:w-1/2 flex justify-center'>
						<img
							src={mailSent}
							alt='mailSent'
							className='max-w-full h-auto'
						/>
					</div>
				</div>

				{/* Second Section */}
				<div className='flex flex-col md:flex-row justify-between gap-4 mt-10 p-4'>
					{/* Card 1 - Setup Email */}
					<div
						ref={addToRefs}
						className='flex flex-col gap-5 email-card p-4 rounded-md shadow-sm w-full md:w-1/3 mb-4 md:mb-0'
					>
						<div className='flex justify-between items-center'>
							<div className='w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white text-sm'>
								1
							</div>
							<p className='font-medium'>SetUp your email</p>
							<div className='w-6 h-6 bg-green-400 rounded-full flex items-center justify-center'>
								<Icon
									className='text-white'
									icon={"line-md:check-all"}
								/>
							</div>
						</div>
						<div className='mt-4 font-light text-gray-500 text-center'>
							Configure your email settings and provider authorization
						</div>
						<div className='flex justify-center h-40'>
							<img
								className='object-contain max-h-full'
								src={setUpMail}
								alt='Setup Email'
							/>
						</div>
					</div>

					{/* Card 2 - Import Contacts */}
					<div
						ref={addToRefs}
						className='flex flex-col gap-5 contact-card p-4 rounded-md shadow-sm w-full md:w-1/3 mb-4 md:mb-0'
					>
						<div className='flex justify-between items-center'>
							<div className='cursor-pointer w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center text-white text-sm'>
								2
							</div>
							<p className='font-medium'>Add/Import Contact</p>
							<div className='cursor-pointer w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors'>
								<Icon
									className='text-white'
									icon={"weui:arrow-outlined"}
								/>
							</div>
						</div>
						<div className='mt-4 font-light text-gray-500 text-center'>
							Import emails of your target audience
						</div>
						<div className='flex justify-center h-40'>
							<img
								className='object-contain max-h-full'
								src={importContact}
								alt='Import Contact'
							/>
						</div>
					</div>

					{/* Card 3 - Create Campaign */}
					<div
						ref={addToRefs}
						className={`flex flex-col gap-5 camp-card p-4 rounded-md shadow-sm w-full md:w-1/3 transition-all ${
							campaignCreated
								? "border-2 border-green-400 bg-green-50"
								: "hover:shadow-md"
						}`}
					>
						<div className='flex justify-between items-center'>
							<div
								className={`cursor-pointer w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${
									campaignCreated ? "bg-green-400" : "bg-yellow-400"
								}`}
							>
								{campaignCreated ? (
									<Icon icon='mdi:check' className='text-white' />
								) : (
									"3"
								)}
							</div>
							<p className='font-medium'>
								{campaignCreated
									? "Campaign Created!"
									: "Create First Campaign"}
							</p>
							<div
								className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
									campaignCreated
										? "bg-green-400"
										: "bg-yellow-400"
								}`}
								title={
									campaignCreated
										? "Campaign Created"
										: "Create your first campaign"
								}
							>
								{campaignCreated ? (
									<Icon className='text-white' icon={"mdi:plus"} />
								) : (
									<Icon
										className='text-white'
										icon={"weui:arrow-outlined"}
									/>
								)}
							</div>
						</div>
						<div className='mt-4 font-light text-gray-500 text-center'>
							{campaignCreated
								? "Great! Your campaign is ready. Create another one?"
								: "Create your first campaign and reach global audience"}
						</div>
						<div className='flex justify-center h-40'>
							<img
								className='object-contain max-h-full'
								src={createCampaign}
								alt='Create Campaign'
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FirstTimeCampaign;
