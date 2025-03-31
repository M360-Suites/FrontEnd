import { Icon } from "@iconify/react/dist/iconify.js";
import { userProfile } from "../../utils/dummyData";

const ProfileCard = ({ toggleOpenProfile }) => {
  return (
    <div className='card absolute right-0 top-12 bg-white border border-t-transparent rounded-lg p-4 w-[400px] h-[630px] shadow-lg z-50'>
      <div className='flex items-center space-x-4 border-b border-gray-200 pb-8'>
        <div className='w-[70px] h-[70px] rounded-full overflow-hidden'>
          <img
            className='w-full h-full object-cover rounded-full'
            src={userProfile.image}
            alt={userProfile.name}
          />
        </div>

        <div className='flex flex-col space-y-2 border-gray-200'>
          <div>
            <span className='font-bold text-gray-800'>
              {userProfile.name}
            </span>
          </div>
          <div>
            <span className='font-light text-gray-500'>
              ID: {userProfile.id}
            </span>
          </div>
        </div>
        <div className='flex flex-1 justify-end'>
          <Icon
            onClick={toggleOpenProfile}
            icon={"mdi:close"}
            className='text-xl text-gray-500 cursor-pointer hover:text-gray-700 transition-colors'
          />
        </div>
      </div>

      <div className='mt-8'>
        <div className='flex items-center space-x-4 mb-2'>
          <Icon icon={"oui:email"} className='text-xl text-gray-500' />
          <span className='text-gray-500 text-sm'>Email</span>
        </div>
        <p className='text-gray-700 text-sm pl-8'>{userProfile.email}</p>
      </div>

      <div className='flex border-b border-gray-200 py-4 gap-14 mt-6 text-gray-500'>
        <div className='flex flex-col'>
          <div className='flex items-center space-x-2 mb-2'>
            <Icon icon={"ph:phone"} className='text-xl text-gray-500' />
            <span className='text-gray-500 text-sm'>Phone</span>
          </div>
          <p className='text-gray-700 text-sm pl-7'>{userProfile.phone}</p>
        </div>

        <div className='flex flex-col'>
          <div className='flex items-center space-x-2 mb-2'>
            <Icon
              icon={"basil:location-outline"}
              className='text-xl text-gray-500'
            />
            <span className='text-gray-500 text-sm'>Location</span>
          </div>
          <p className='text-gray-700 text-sm pl-7'>
            {userProfile.address}
          </p>
        </div>
      </div>

      {/* Additional sections */}
      <div className='mt-6'>
        <button className='w-full py-2 bg-light-orange text-white rounded-lg hover:bg-primary-orange transition-colors'>
          Edit Profile
        </button>
      </div>

      <div className='flex mt-4 border-t border-gray-200 pt-4 items-center justify-around'>
        <div>
          <p className=' text-gray-500'>Storage Plan</p>
        </div>
        <div className='w-[80px] h-[30px] bg-orange-100 flex items-center justify-center rounded-md'>
          <p className='text-sm font-semibold text-primary-orange'>
            Tier {userProfile.tier}
          </p>
        </div>
      </div>

      <div className='flex flex-col'>
        <div className='w-full bg-gray-300 h-[20px] mt-4 rounded-lg'></div>

        <div className='flex justify-between mt-2 text-gray-400'>
          <p>5GB</p>
          <p>15GB</p>
        </div>
      </div>

      <div className='mt-4 pt-4 border-t border-gray-200'>
        <div className='flex items-center space-x-3 text-gray-700 cursor-pointer hover:text-primary-orange transition-colors'>
          <Icon icon={"carbon:settings"} className='text-xl' />
          <span>Account Settings</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
