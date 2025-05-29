import FirstTimeAds from "../../components/dashboard/AdsManager/FirstTimeAds";
import AdsAnalytics from "../../components/dashboard/AdsManager/AdsAnalytics";
const AdsManager = () => {
  const isFirstTime = true;
  return <>{isFirstTime ? <FirstTimeAds /> : <AdsAnalytics />}</>;
};
export default AdsManager;
