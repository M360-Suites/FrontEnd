import { liveAdspost } from "../../../utils/dummyData";
import { Icon } from "@iconify/react/dist/iconify.js";

const LiveAds = () => {
  return (
    <div className='mt-8'>
      <div className='flex justify-between'>
        <p className='font-semibold'>Live Ads</p>
        <button className='bg-orange-gradient px-2 py-2 text-white rounded-md'>
          View All
        </button>
      </div>

      <div className='grid grid-cols-3 mt-4 gap-16'>
        {liveAdspost.map((ads, index) => (
          <div key={index} className='border rounded-lg p-4'>
            <div className='flex items-center gap-8'>
              <Icon className='text-2xl' icon={ads.icon} />{" "}
              <span className='font-bold'>{ads.title}</span>
            </div>
            <div className='mt-2 py-2'>
              <p className='font-light'>{ads.body}</p>
            </div>
            <div className='mt-2 h-[150px]'>
              <img
                className='w-full h-full object-cover rounded-lg'
                src={ads.image}
                alt=''
              />
            </div>
            <div className='flex justify-end items-center gap-2 mt-4'>
              <Icon
                icon={"lets-icons:check-fill"}
                className='text-xl text-green-700'
              />
              <p className='text-green-700 font-semibold'>
                posted {ads.postedAt}
              </p>
            </div>

            <div className='flex flex-col mt-4 border-t p-3 gap-4'>
              <div className='flex justify-between'>
                <p>Total Engagement </p> <p>{ads.engagement}</p>
              </div>
              <div className='flex justify-between'>
                <p>Clicks </p> <p>{ads.clicks}</p>
              </div>
              <div className='flex justify-between'>
                <p>Views </p> <p>{ads.views}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LiveAds;
