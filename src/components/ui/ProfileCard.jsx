import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const ProfileCard = ({ toggleOpenProfile, user }) => {
  return (
    <div className='absolute right-0 top-14 bg-white border border-gray-100 rounded-2xl p-6 w-[340px] shadow-2xl z-50 transform origin-top-right transition-all'>
      {/* Header */}
      <div className='flex items-start justify-between pb-5 border-b border-gray-100'>
        <div className='flex flex-col'>
          <span className='font-bold text-gray-900 text-lg leading-tight truncate max-w-[240px]'>
            {user?.user?.name || user?.user?.companyName || "User"}
          </span>
          <span className='text-sm text-gray-500 mt-1 truncate max-w-[240px]'>
            {user?.user?.email || "No email provided"}
          </span>
        </div>
        <button 
          onClick={toggleOpenProfile}
          className='text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100'
        >
          <Icon icon={"mdi:close"} className='text-xl' />
        </button>
      </div>

      {/* Action Links */}
      <div className='flex flex-col gap-3 mt-5'>
        <Link 
          to='/settings'
          onClick={toggleOpenProfile}
          className='w-full flex items-center justify-center gap-2 py-2.5 bg-primary-orange text-white rounded-xl hover:bg-orange-600 transition-colors font-medium shadow-md shadow-orange-500/20'
        >
          <Icon icon={"carbon:user-profile"} className='text-lg' />
          Edit Profile
        </Link>
        
        <Link 
          to='/settings'
          onClick={toggleOpenProfile}
          className='w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium border border-gray-200'
        >
          <Icon icon={"carbon:settings"} className='text-lg' />
          Account Settings
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
