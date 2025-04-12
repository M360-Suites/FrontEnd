import { useState } from "react";
import { mainLogo } from "../assets/index";
import { Icon } from "@iconify/react";
import NotificationCard from "../components/ui/NotificationCard";
import ProfileCard from "../components/ui/ProfileCard";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleOpenProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
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
        <div className='flex-shrink-0 h-[35px] w-[120px] md:w-[150px] py-2'>
          <img className='h-full object-cover' src={mainLogo} alt='Logo' />
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

          <div className='relative'>
            <Icon
              onClick={toggleNotification}
              className='w-6 h-6 text-gray-600'
              icon='mingcute:notification-line'
            />
            <div className='absolute -top-1 -right-1 w-4 h-4 bg-primary-orange rounded-full flex items-center justify-center'>
              <span className='text-white text-xs'>3</span>
            </div>

            {isNotificationOpen && (
              <NotificationCard toggleNotification={toggleNotification} />
            )}
          </div>

            <button onClick={toggleMenu} className='text-gray-600'>
              <Icon
                icon={isMenuOpen ? "mdi:close" : "mdi:menu"}
                className='w-6 h-6'
              />
            </button>
        </div>

        {/* User section - desktop */}
        <div className='hidden md:flex justify-end items-center space-x-4'>
          {/* notifications */}
          <div className='relative'>
            <Icon
              onClick={toggleNotification}
              className='w-[24px] h-[24px] text-gray-600 cursor-pointer'
              icon='mingcute:notification-line'
            />
            <div className='absolute -top-1 -right-1 w-4 h-4 bg-primary-orange rounded-full flex items-center justify-center'>
              <span className='text-white text-xs'>3</span>
            </div>

            {isNotificationOpen && (
              <NotificationCard toggleNotification={toggleNotification} />
            )}
          </div>

          <div className='bg-black rounded-full w-[40px] h-[40px] cursor-pointer'></div>

          <div className='flex flex-col relative'>
            <div>
              <span className='font-medium'>M360 Bakes</span>
            </div>
            <div className='flex items-center'>
              <small className='text-xs text-gray-500 font-extralight'>
                ID-204-5089
              </small>
              <Icon
                onClick={toggleOpenProfile}
                icon='lsicon:down-filled'
                className='text-xl text-gray-600 cursor-pointer'
              />
            </div>
            {isProfileOpen && (
              <ProfileCard toggleOpenProfile={toggleOpenProfile} />
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
          <div className='flex items-center space-x-3 py-3'>
            <div className='bg-black rounded-full w-[40px] h-[40px]'></div>
            <div>
              <div className='font-medium'>M360 Bakes</div>
              <div className='text-xs text-gray-500'>ID-204-5089</div>
            </div>
          </div>

          <div className='py-2 border-t border-gray-200'>
            <div className='flex items-center space-x-2 py-2'>
              <Icon
                icon='mingcute:notification-line'
                className='text-gray-600'
              />
              <span>Notifications</span>
            </div>
            <div className='flex items-center space-x-2 py-2'>
              <Icon icon='carbon:user-profile' className='text-gray-600' />
              <span>Profile</span>
            </div>
            <div className='flex items-center space-x-2 py-2'>
              <Icon icon='carbon:settings' className='text-gray-600' />
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
