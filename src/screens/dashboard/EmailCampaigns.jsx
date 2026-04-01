import FirstTimeCampaign from "../../components/dashboard/EmailCampaign/FirstTimeCampaign";
import ExistingEmailStats from "../../components/dashboard/EmailCampaign/ExistingEmailStats";
import useStore from "../../state/store";

const EmailCampaigns = () => {
	const { emailCampaigns } = useStore();
	const isFirstTime = emailCampaigns.length === 0;
	return (
		<>
			{isFirstTime ? <FirstTimeCampaign /> : <ExistingEmailStats />}
		</>
	);
};
export default EmailCampaigns;
