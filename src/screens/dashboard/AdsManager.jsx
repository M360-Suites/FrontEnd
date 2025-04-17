import FirstTimeAds from "../../components/dashboard/AdsManager/FirstTimeAds";
import AdsAnalytics from "../../components/dashboard/AdsManager/AdsAnalytics";
const AdsManager = () => {
  const isFirstTime = false;
  return <>{isFirstTime ? <FirstTimeAds /> : <AdsAnalytics />}</>;
};
export default AdsManager;
