import { useState } from "react";
import mainLogo from "/dm360.png";
import { useAuth } from "../context/UseAuth";
import { Icon } from "@iconify/react";
import ProfileCard from "../components/ui/ProfileCard";

const Header = () => {
	const user = useAuth();
	console.log(user);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const toggleOpenProfile = () => {
		setIsProfileOpen(!isProfileOpen);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleSearch = () => {
		setIsSearchOpen(!isSearchOpen);
	};

	return (
		<div className='sticky top-0 z-50 bg-white px-5 py-2 border-b border-gray-200 min-w-full'>
			<div className='flex justify-between items-center'>
				{/* Logo */}
				<div className='flex-shrink-0 h-[55px] w-[120px] md:w-[150px] py-2'>
					<img
						className='h-full object-cover'
						src={mainLogo}
						alt='Logo'
					/>
				</div>

				{/* Desktop search bar */}
				<div className='hidden md:flex justify-center items-center w-[450px] h-[20px] border border-gray-300 py-4 rounded-xl'>
					<div className='px-2'>
						<Icon icon='proicons:search' />
					</div>
					<div className='flex-grow'>
						<input
							type='text'
							placeholder='Search'
							className='w-full outline-none bg-transparent'
						/>
					</div>
				</div>

				{/* Mobile icons */}
				<div className='flex items-center gap-5 md:hidden'>
					<button onClick={toggleSearch} className='text-gray-600'>
						<Icon icon='proicons:search' className='w-6 h-6' />
					</button>

					<button onClick={toggleMenu} className='text-gray-600'>
						<Icon
							icon={isMenuOpen ? "mdi:close" : "mdi:menu"}
							className='w-6 h-6'
						/>
					</button>
				</div>

				{/* User section - desktop */}
				<div className='hidden md:flex justify-end items-center space-x-4'>
					<div className='flex flex-col relative'>
						<div>
							<span className='font-medium'>{user?.user?.name || user?.user?.companyName || "User"}</span>
						</div>
						<div className='flex items-center'>
							{/* <small className='text-xs text-gray-500 font-extralight'>
								ID-204-5089
							</small> */}
							<Icon
								onClick={toggleOpenProfile}
								icon='lsicon:down-filled'
								className='text-xl text-gray-600 cursor-pointer'
							/>
						</div>
						{isProfileOpen && (
							<ProfileCard user={user} toggleOpenProfile={toggleOpenProfile} />
						)}
					</div>
				</div>
			</div>

			{/* Mobile search bar */}
			{isSearchOpen && (
				<div className='md:hidden mt-2 flex items-center border border-gray-300 rounded-lg py-2 px-3'>
					<Icon icon='proicons:search' className='mr-2' />
					<input
						type='text'
						placeholder='Search'
						className='w-full outline-none bg-transparent'
					/>
				</div>
			)}

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className='md:hidden mt-2 py-2 border-t border-gray-200'>
					<div className='flex items-center space-x-3 py-3 px-3'>
						<div>
							<div className='font-medium text-lg'>{user?.user?.name || user?.user?.companyName || "User"}</div>
						</div>
					</div>

					<div className='py-2 border-t border-gray-200 px-3'>
						<div className='flex items-center space-x-2 py-2'>
							<Icon
								icon='carbon:user-profile'
								className='text-gray-600'
							/>
							<span>Profile</span>
						</div>
						<div className='flex items-center space-x-2 py-2'>
							<Icon
								icon='carbon:settings'
								className='text-gray-600'
							/>
							<span>Settings</span>
						</div>
						<div className='flex items-center space-x-2 py-2'>
							<Icon icon='carbon:logout' className='text-gray-600' />
							<span>Logout</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
