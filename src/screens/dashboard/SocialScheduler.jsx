import FirstTimeSchedule from "../../components/dashboard/SocialScheduler/FirstTimeSchedule";
import ExistingUserSchedule from "../../components/dashboard/SocialScheduler/ExistingUserSchedule";

const SocialScheduler = () => {
  const isNewSchedule = false;

  return (
    <>{isNewSchedule ? <FirstTimeSchedule /> : <ExistingUserSchedule />}</>
  );
};
export default SocialScheduler;
