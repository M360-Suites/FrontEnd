import { Icon } from "@iconify/react";
import useStore from "../../../state/store";

const AdsAndSocials = () => {
	const { connectedSocialAccounts } = useStore();

	const platforms = [
		{
			name: "Facebook",
			icon: "logos:facebook",
			color: "bg-blue-600",
		},
		{
			name: "Instagram",
			icon: "skill-icons:instagram",
			color: "bg-pink-600",
		},
		{
			name: "X (Twitter)",
			icon: "ri:twitter-x-fill",
			color: "bg-black",
		},
		{
			name: "LinkedIn",
			icon: "logos:linkedin-icon",
			color: "bg-blue-700",
		},
		{ name: "TikTok", icon: "logos:tiktok-icon", color: "bg-black" },
		{
			name: "YouTube",
			icon: "logos:youtube-icon",
			color: "bg-red-600",
		},
	];

	return (
		<div className='p-6 md:p-8 max-w-4xl'>
			<div className='flex items-center gap-3 mb-6'>
				<Icon
					icon='mdi:bullhorn'
					className='text-2xl text-blue-600'
				/>
				<h1 className='text-2xl font-bold text-gray-800'>
					Ads & Socials
				</h1>
			</div>

			<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
				<h3 className='text-lg font-semibold text-gray-800 mb-4'>
					Connected Accounts
				</h3>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{platforms.map((platform) => {
						const isConnected = connectedSocialAccounts.some(
							(acc) => acc.platform === platform.name
						);
						return (
							<div
								key={platform.name}
								className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow'
							>
								<div className='flex items-center gap-3'>
									<Icon icon={platform.icon} className='text-3xl' />
									<div>
										<p className='font-medium text-gray-800'>
											{platform.name}
										</p>
										<p className='text-sm text-gray-500'>
											{isConnected ? "Connected" : "Not connected"}
										</p>
									</div>
								</div>
								<button
									className={`px-4 py-2 rounded-lg font-medium transition-colors ${
										isConnected
											? "bg-red-50 text-red-600 hover:bg-red-100"
											: "bg-blue-600 text-white hover:bg-blue-700"
									}`}
								>
									{isConnected ? "Disconnect" : "Connect"}
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default AdsAndSocials;
