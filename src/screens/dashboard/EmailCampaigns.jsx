import FirstTimeCampaign from "../../components/dashboard/EmailCampaign/FirstTimeCampaign";
import ExistingEmailStats from "../../components/dashboard/EmailCampaign/ExistingEmailStats";
const EmailCampaigns = () => {
  const isFirstTime = false;
  return (
    <>{isFirstTime ? <FirstTimeCampaign /> : <ExistingEmailStats />}</>
  );
};
export default EmailCampaigns;
