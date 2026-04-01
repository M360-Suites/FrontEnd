import { mailSent } from "../../../assets";
import { Icon } from "@iconify/react/dist/iconify.js";
import CreateCampaignModal from "./CreateCampaignModal";
import ManageSubscribersModal from "./ManageSubscribersModal";
import { useState, useEffect } from "react";
import CampaignReports from "./CampaignReports";
import EmailPerfomanceChart from "./EmailPerfomanceChart";
import useStore from "../../../state/store";

const ExistingEmailStats = () => {
	const { emailCampaigns } = useStore();
	const [showModal, setShowModal] = useState(false);
	const [showSubscribersModal, setShowSubscribersModal] =
		useState(false);

	// Calculate stats based on campaigns
	const totalSent = emailCampaigns.reduce(
		(sum, camp) => sum + (camp.stats?.sent || 0),
		0
	);
	const totalOpened = emailCampaigns.reduce(
		(sum, camp) => sum + (camp.stats?.opened || 0),
		0
	);
	const totalClicked = emailCampaigns.reduce(
		(sum, camp) => sum + (camp.stats?.clicked || 0),
		0
	);

	const avgOpenRate = emailCampaigns.length
		? (totalOpened / totalSent) * 100
		: 0;
	const avgClickRate = emailCampaigns.length
		? (totalClicked / totalOpened) * 100
		: 0;
	// Mock conversion rate logic
	const avgConversionRate = emailCampaigns.length ? 2.4 : 0;

	const statsData = [
		{
			title: "Total Emails Sent",
			value: totalSent,
			change: 12.5,
			trend: "up",
			fromText: "from last month",
		},
		{
			title: "Average Open Rate",
			value: avgOpenRate.toFixed(1),
			change: 8.2,
			trend: "up",
			fromText: "from last month",
		},
		{
			title: "Average Click Rate",
			value: avgClickRate.toFixed(1),
			change: -2.4,
			trend: "down",
			fromText: "from last month",
		},
		{
			title: "Conversion Rate",
			value: avgConversionRate,
			change: 5.4,
			trend: "up",
			fromText: "from last month",
		},
	];

	const handleToggleModal = () => {
		setShowModal(!showModal);
	};

	const handleToggleSubscribersModal = () => {
		setShowSubscribersModal(!showSubscribersModal);
	};

	return (
		<>
			{showModal && (
				<CreateCampaignModal handleToggleModal={handleToggleModal} />
			)}
			{showSubscribersModal && (
				<ManageSubscribersModal
					isOpen={showSubscribersModal}
					onClose={handleToggleSubscribersModal}
				/>
			)}

			<div className='p-4'>
				<div className='flex flex-col md:flex-row justify-around items-center border border-gray-200 rounded-lg p-4'>
					<div className='flex flex-col gap-5 w-full md:w-1/2 mb-4 md:mb-0'>
						<div>
							<span className='font-bold text-xl'>
								Track Your Email Campaigns
							</span>
						</div>
						<div>
							<p className='text-gray-500 text-sm'>
								Smart Email Automation: Save Time, Stay Connected, and
								Boost <br />
								Engagement Effortlessly
							</p>
						</div>
						<div className='flex items-center gap-3'>
							<button
								onClick={handleToggleModal}
								className='px-6 py-2 bg-orange-gradient text-white rounded-xl text-sm font-medium'
							>
								Create Campaign
							</button>
							<button
								onClick={handleToggleSubscribersModal}
								className='px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium transition-colors'
							>
								Manage Subscribers
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
				{/* stats */}
				<div className='mt-6 md:mt-8'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
						{statsData.map((stat, index) => (
							<div
								key={index}
								className='w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg p-4 border border-gray-100'
							>
								<div className='flex justify-between items-center mb-2'>
									<span className='text-gray-700 font-medium text-sm'>
										{stat.title}
									</span>
									<div
										className={`flex items-center ${
											stat.trend === "up"
												? "text-green-600"
												: "text-red-600"
										} text-xs font-semibold px-2 py-0.5 rounded-full ${
											stat.trend === "up"
												? "bg-green-50"
												: "bg-red-50"
										}`}
									>
										<Icon
											icon={
												stat.trend === "up"
													? "heroicons:arrow-trending-up"
													: "heroicons:arrow-trending-down"
											}
											className='mr-0.5'
											width='14'
										/>
										{stat.trend === "up" ? "+" : ""}
										{stat.change}%
									</div>
								</div>

								<div className='text-2xl font-bold mb-1'>
									{stat.title.includes("Rate")
										? `${stat.value}%`
										: stat.value.toLocaleString()}
								</div>
								<div>
									<small>{stat.fromText}</small>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* reports */}
				<CampaignReports campaigns={emailCampaigns} />
				<EmailPerfomanceChart />
			</div>
		</>
	);
};
export default ExistingEmailStats;
