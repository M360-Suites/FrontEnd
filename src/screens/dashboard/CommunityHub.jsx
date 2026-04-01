import { RoundTable } from "../../assets"; // verify asset import
import { Icon } from "@iconify/react";
import { useState } from "react";
import SocialSelectionModal from "../../components/dashboard/SocialScheduler/SocialSelectionModal";
import useStore from "../../state/store";

const CommunityHub = () => {
	const { connectedSocialAccounts } = useStore();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const communities = [
		{
			name: "Facebook",
			description: "Pages",
			icon: "logos:facebook",
			platform: "Facebook",
		},
		{
			name: "Instagram",
			description: "Professional/business account",
			icon: "logos:instagram-icon",
			platform: "Instagram",
		},
		{
			name: "LinkedIn",
			description: "Profile, company pages",
			icon: "logos:linkedin-icon",
			platform: "LinkedIn",
		},
		{
			name: "X (formerly twitter)",
			description: "Profiles",
			icon: "ri:twitter-x-fill",
			platform: "X", // or Twitter
		},
	];

	const isConnected = (platform) => {
		// Normalize platform name for check if needed, mainly handling X/Twitter
		return connectedSocialAccounts.some(
			(acc) =>
				acc.platform === platform ||
				(platform === "X (formerly twitter)" &&
					(acc.platform === "X" || acc.platform === "Twitter"))
		);
	};

	return (
		<div className='p-6'>
			{isModalOpen && (
				<SocialSelectionModal toggleModal={toggleModal} />
			)}

			{/* Hero Section */}
			<div className='bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 mb-10'>
				<div className='flex-1 space-y-4'>
					<h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
						Manage all your communities from one place
					</h1>
					<p className='text-gray-500'>
						Stay organized with your community members
					</p>
					<button
						onClick={toggleModal}
						className='flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg'
					>
						Get Started
						<Icon
							icon='material-symbols:arrow-right-alt'
							className='text-xl'
						/>
					</button>
				</div>
				<div className='flex-1 flex justify-center'>
					{/* Find a relevant image or use a placeholder if 'community' asset not valid */}
					<img
						src={
							RoundTable ||
							"https://placehold.co/400x300?text=Community+Hub"
						}
						alt='Community Hub'
						className='max-w-full h-auto'
					/>
				</div>
			</div>

			{/* Selection Grid */}
			<div>
				<h2 className='text-lg font-semibold text-gray-700 mb-6'>
					Select Community to Connect & Manage
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl'>
					{communities.map((comm, index) => {
						const connected = isConnected(comm.name);
						return (
							<div
								key={index}
								className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow'
							>
								<div className='flex items-center gap-4'>
									<div className='p-3 bg-gray-50 rounded-full'>
										<Icon icon={comm.icon} className='text-3xl' />
									</div>
									<div>
										<h3 className='font-bold text-blue-500 text-lg'>
											{comm.name}
										</h3>
										<p className='text-sm text-gray-400 mt-1'>
											{comm.description}
										</p>
									</div>
								</div>
								<button
									onClick={toggleModal}
									disabled={connected}
									className={`p-2 rounded-lg transition-colors ${
										connected
											? "bg-green-100 text-green-600"
											: "bg-purple-100 text-purple-600 hover:bg-purple-200"
									}`}
								>
									<Icon
										icon={connected ? "mdi:check" : "mdi:plus"}
										className='text-xl'
									/>
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CommunityHub;
