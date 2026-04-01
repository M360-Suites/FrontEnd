import { socials, website1 } from "../../../assets";
import { dummyPosts, userProfile } from "../../../utils/dummyData";
import { Icon } from "@iconify/react/dist/iconify.js";
import OverallConversion from "../../ui/OverallConversion";
import useStore from "../../../state/store";

import CreatePostModal from "./CreatePostModal";
import SocialSelectionModal from "./SocialSelectionModal";
import { useState } from "react";

const ExistingUserSchedule = () => {
	const { socialPosts, connectedSocialAccounts } = useStore();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

	const toggleCreateModal = () =>
		setIsCreateModalOpen(!isCreateModalOpen);
	const toggleConnectModal = () =>
		setIsConnectModalOpen(!isConnectModalOpen);

	const handleCreatePost = () => {
		if (connectedSocialAccounts.length === 0) {
			setIsConnectModalOpen(true);
		} else {
			setIsCreateModalOpen(true);
		}
	};

	const getDaysLeft = () => {
		return userProfile.tier === "2" ? 3 : 0;
	};

	const daysLeft = getDaysLeft();
	const isTrialUser = false;

	const scheduledPosts = socialPosts.filter((p) => !p.published); // Assuming logic for now
	const lastPost = socialPosts.length > 0 ? socialPosts[0] : null;

	return (
		<div className='p-2 sm:p-4'>
			{isConnectModalOpen && (
				<SocialSelectionModal toggleModal={toggleConnectModal} />
			)}
			<CreatePostModal
				isOpen={isCreateModalOpen}
				onClose={toggleCreateModal}
			/>

			<div className='p-2'>
				{isTrialUser ? (
					<div className='flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 xl:gap-20'>
						{/* Welcome card */}
						<div className='flex flex-col bg-light-orange bg-opacity-30 rounded-md overflow-hidden w-full md:flex-1 min-h-[140px] p-4 md:p-6'>
							<div className='flex flex-col gap-2 md:gap-3 flex-1'>
								<span className='font-bold text-lg md:text-xl'>
									Welcome Back, {userProfile.name.split(" ")[0]}!
								</span>
								<p className='font-light text-gray-500 text-sm md:text-base'>
									Kickstart your social media optimization with one
									click
								</p>

								{/* Create Post button moved under the text */}
								<div className='mt-3'>
									<button
										onClick={handleCreatePost}
										className='bg-white hover:bg-gray-50 flex items-center gap-2 py-2 px-4 rounded-md transition-colors duration-200 shadow-sm group'
										aria-label='Create Post'
									>
										<p className='text-sm text-primary-orange font-bold'>
											Create Post
										</p>
										<Icon
											icon='mdi:arrow-right-thin'
											className='text-xl text-primary-orange group-hover:translate-x-0.5 transition-transform'
											aria-hidden='true'
										/>
									</button>
								</div>
							</div>
						</div>

						{/* Trial card */}
						<div className='bg-light-orange bg-opacity-30 rounded-md flex flex-col items-center justify-center p-4 md:p-6 w-full md:w-[250px] flex-shrink-0 min-h-[140px]'>
							<span className='font-bold text-base md:text-lg'>
								Free Trial
							</span>
							<div className='w-[40px] h-[40px] bg-white border border-primary-orange rounded-full flex items-center justify-center mt-2'>
								<p className='font-bold'>{daysLeft}</p>
							</div>
							<p className='text-sm text-center mt-2'>
								{daysLeft > 0
									? `${daysLeft} days left until free trial ends`
									: "Your free trial has ended"}
							</p>
							{daysLeft === 0 && (
								<button
									className='mt-2 text-xs bg-primary-orange text-white font-semibold py-1.5 px-3 rounded-md hover:bg-light-orange transition-colors'
									aria-label='Upgrade now'
								>
									Upgrade now
								</button>
							)}
						</div>
					</div>
				) : (
					<div className='w-full md:max-w-[600px] bg-gradient-to-r from-light-orange/30 to-primary-orange/20 rounded-lg flex flex-col p-4 md:p-6 gap-4 border-l-4 border-primary-orange shadow-sm relative overflow-hidden min-h-[140px]'>
						{/* Decorative blobs */}
						<div
							className='absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary-orange opacity-10'
							aria-hidden='true'
						></div>
						<div
							className='absolute right-12 bottom-4 w-16 h-16 rounded-full bg-light-orange opacity-10'
							aria-hidden='true'
						></div>

						<div className='flex justify-between items-start relative z-10'>
							<div>
								<span className='font-bold text-lg md:text-xl text-gradient-orange-diagonal'>
									Welcome Back, {userProfile.name.split(" ")[0]}!
								</span>
								<p className='font-light text-gray-600 text-sm md:text-base mt-1'>
									Test All Premium Features
								</p>

								{/* Create Post button for premium users */}
								<div className='mt-4'>
									<button
										onClick={handleCreatePost}
										className='bg-white hover:bg-gray-50 flex items-center gap-1 py-1.5 px-3 rounded-md transition-colors duration-200 shadow-sm text-sm font-medium text-primary-orange border border-primary-orange/20 group'
										aria-label='Create Post'
									>
										Create Post
										<Icon
											icon='material-symbols:arrow-forward-rounded'
											className='text-lg group-hover:translate-x-0.5 transition-transform'
											aria-hidden='true'
										/>
									</button>
								</div>
							</div>

							<div className='hidden md:flex items-center justify-center bg-white/80 backdrop-blur-sm p-2 rounded-full h-12 w-12 shadow-sm'>
								<Icon
									icon='mdi:crown'
									className='text-primary-orange text-2xl'
									aria-hidden='true'
								/>
							</div>
						</div>

						<div className='relative z-10 mt-auto'>
							<button
								className='bg-white hover:bg-gray-50 flex items-center gap-1 py-1.5 px-3 rounded-md transition-colors duration-200 shadow-sm text-sm font-medium text-primary-orange border border-primary-orange/20 group'
								aria-label='Explore Premium Features'
							>
								Explore Premium Features
								<Icon
									icon='material-symbols:arrow-forward-rounded'
									className='text-lg group-hover:translate-x-0.5 transition-transform'
									aria-hidden='true'
								/>
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Stats arena */}
			<div className='flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 mt-5'>
				<div className='w-full md:w-[260px] h-[180px] border rounded-xl flex items-center justify-center shadow-sm'>
					<div className='text-center'>
						<span className='block text-lg font-medium'>
							Posts created
						</span>
						<span className='block text-3xl font-bold text-primary-orange mt-2'>
							{socialPosts.length}
						</span>
					</div>
				</div>

				<div className='w-full md:flex-1 border rounded-xl shadow-sm overflow-hidden'>
					<div className='flex justify-between items-center px-4 py-2 border-b'>
						<span className='font-bold'>Last Edited</span>
						<button
							className='rounded-full border w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-50 transition-colors'
							aria-label='View more'
						>
							<Icon
								icon='mdi:arrow-right-thin'
								className='text-xl text-gray-600 group-hover:translate-x-0.5 transition-transform'
								aria-hidden='true'
							/>
						</button>
					</div>

					{lastPost ? (
						<div className='flex flex-col sm:flex-row px-4 py-3 gap-4 sm:gap-8'>
							<div className='w-full sm:w-[140px] h-[100px] flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center'>
								{lastPost.image ? (
									<img
										className='w-full h-full object-cover rounded-lg'
										src={lastPost.image}
										alt='Social media post preview'
									/>
								) : (
									<Icon
										icon='mdi:text-box-outline'
										className='text-4xl text-gray-400'
									/>
								)}
							</div>

							<div className='flex-1'>
								<p className='text-sm sm:text-base'>
									{lastPost.content}
								</p>

								<div className='flex items-center gap-2 mt-3'>
									<span className='text-xs text-gray-500'>
										Posted on: {lastPost.platforms?.join(", ")}
									</span>
								</div>
							</div>
						</div>
					) : (
						<div className='p-6 text-center text-gray-500'>
							No posts yet
						</div>
					)}
				</div>
			</div>

			{/* Graph Board-ish */}
			<div className='flex flex-col lg:flex-row justify-between mt-6 gap-6'>
				<div className='flex-1'>
					<OverallConversion />
				</div>
				<div className='w-full lg:w-[450px] max-h-[550px] border p-4 rounded-xl flex flex-col bg-white'>
					<div className='flex justify-between items-center mb-3'>
						<span className='font-bold'>Recent Posts</span>
						<span className='text-xs text-gray-500'>
							{socialPosts.length} posts
						</span>
					</div>

					<div className='flex-1 overflow-y-auto pr-2 mb-3 min-h-[200px]'>
						{socialPosts.length > 0 ? (
							<div className='flex flex-col gap-4'>
								{socialPosts.map((post) => (
									<div
										key={post.id}
										className='flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0'
									>
										<div className='w-12 h-12 min-w-[3rem] rounded-md bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-100'>
											{post.image ? (
												<img
													src={post.image}
													alt='Post preview'
													className='w-full h-full object-cover rounded-lg'
												/>
											) : (
												<Icon
													icon='mdi:text'
													className='text-gray-400 text-xl'
												/>
											)}
										</div>
										<div className='flex-1'>
											<p className='text-sm font-medium line-clamp-2 text-gray-800'>
												{post.content}
											</p>
											<div className='flex justify-between items-center mt-1'>
												<p className='text-xs font-medium text-primary-orange'>
													{new Date(
														post.createdAt
													).toLocaleDateString()}
												</p>
												<p className='text-xs text-gray-400'>
													{post.platforms?.length} platforms
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className='flex flex-col items-center justify-center h-full text-gray-400'>
								<Icon
									icon='mdi:post-outline'
									className='text-4xl mb-2'
								/>
								<p>No posts history</p>
							</div>
						)}
					</div>

					<button className='w-full py-2 text-center text-primary-orange border border-primary-orange rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium mt-auto'>
						View All Posts
					</button>
				</div>
			</div>
		</div>
	);
};

export default ExistingUserSchedule;
