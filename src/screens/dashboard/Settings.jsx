import { useState } from "react";
import GeneralSettings from "../../components/dashboard/Settings/GeneralSettings";
import AccountProfile from "../../components/dashboard/Settings/AccountProfile";
import TeamUsers from "../../components/dashboard/Settings/TeamUsers";
import Notifications from "../../components/dashboard/Settings/Notifications";
import Billing from "../../components/dashboard/Settings/Billing";
import DomainsSetting from "../../components/dashboard/Settings/DomainsSetting";
import EmailSettings from "../../components/dashboard/Settings/EmailSettings";
import AdsAndSocials from "../../components/dashboard/Settings/AdsAndSocials";
import CommunitySettings from "../../components/dashboard/Settings/CommunitySettings";
import SecurityPrivacy from "../../components/dashboard/Settings/SecurityPrivacy";
import AdvancedSettings from "../../components/dashboard/Settings/AdvancedSettings";
import { Icon } from "@iconify/react";

const Settings = () => {
	const [activeTab, setActiveTab] = useState("general");

	const settingsTabs = [
		{
			id: "general",
			name: "General Settings",
			icon: "material-symbols:settings",
		},
		{ id: "account", name: "Account & Profile", icon: "mdi:account" },
		{ id: "team", name: "Team & Users", icon: "mdi:account-group" },
		{ id: "notifications", name: "Notifications", icon: "mdi:bell" },
		{ id: "billing", name: "Billing", icon: "mdi:credit-card" },
		{ id: "domains", name: "Domains Setting", icon: "mdi:web" },
		{ id: "email", name: "Email Settings", icon: "mdi:email" },
		{ id: "ads", name: "Ads & Socials", icon: "mdi:bullhorn" },
		{
			id: "community",
			name: "Community Settings",
			icon: "mdi:forum",
		},
		{
			id: "security",
			name: "Security & Privacy",
			icon: "mdi:shield-lock",
		},
		{ id: "advanced", name: "Advance Settings", icon: "mdi:cog" },
	];

	const renderContent = () => {
		switch (activeTab) {
			case "general":
				return <GeneralSettings />;
			case "account":
				return <AccountProfile />;
			case "team":
				return <TeamUsers />;
			case "notifications":
				return <Notifications />;
			case "billing":
				return <Billing />;
			case "domains":
				return <DomainsSetting />;
			case "email":
				return <EmailSettings />;
			case "ads":
				return <AdsAndSocials />;
			case "community":
				return <CommunitySettings />;
			case "security":
				return <SecurityPrivacy />;
			case "advanced":
				return <AdvancedSettings />;
			default:
				return <GeneralSettings />;
		}
	};

	return (
		<div className='md:ml-[223px] min-h-screen bg-gray-50'>
			<div className='flex flex-col md:flex-row h-full'>
				{/* Sidebar */}
				<div className='w-full md:w-64 bg-white border-r border-gray-200 md:min-h-screen'>
					<div className='p-4 md:p-6'>
						<h2 className='text-xl font-bold text-gray-800 mb-6'>
							Settings
						</h2>
						<nav className='space-y-1'>
							{settingsTabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
										activeTab === tab.id
											? "bg-blue-50 text-blue-600 font-medium"
											: "text-gray-700 hover:bg-gray-100"
									}`}
								>
									<Icon
										icon={tab.icon}
										className='text-lg flex-shrink-0'
									/>
									<span className='text-sm'>{tab.name}</span>
								</button>
							))}
						</nav>
					</div>
				</div>

				{/* Content */}
				<div className='flex-1 overflow-auto'>{renderContent()}</div>
			</div>
		</div>
	);
};

export default Settings;
