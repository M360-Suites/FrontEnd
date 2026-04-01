import FirstTimeSchedule from "../../components/dashboard/SocialScheduler/FirstTimeSchedule";
import ExistingUserSchedule from "../../components/dashboard/SocialScheduler/ExistingUserSchedule";
import useStore from "../../state/store";

const SocialScheduler = () => {
	const { socialPosts } = useStore();
	const isNewSchedule = socialPosts.length === 0;

	return (
		<>
			{isNewSchedule ? (
				<FirstTimeSchedule />
			) : (
				<ExistingUserSchedule />
			)}
		</>
	);
};
export default SocialScheduler;
