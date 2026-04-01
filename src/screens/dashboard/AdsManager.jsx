import FirstTimeAds from "../../components/dashboard/AdsManager/FirstTimeAds";
import AdsAnalytics from "../../components/dashboard/AdsManager/AdsAnalytics";
import useStore from "../../state/store";

const AdsManager = () => {
	const { adCampaigns } = useStore();
	const isFirstTime = adCampaigns.length === 0;
	return <>{isFirstTime ? <FirstTimeAds /> : <AdsAnalytics />}</>;
};
export default AdsManager;
