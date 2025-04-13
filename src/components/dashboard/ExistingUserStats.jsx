import { Icon } from "@iconify/react/dist/iconify.js";
import { userProfile, sampleStats } from "../../utils/dummyData";
import { useState, useEffect } from "react";
import BarChart from "../ui/BarChart";

const ExistingUserStats = () => {
  const [stats, setStats] = useState(sampleStats);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getDaysLeft = () => {
    return userProfile.tier === "2" ? 3 : 0;
  };

  const isTrialUser = false;
  const daysLeft = getDaysLeft();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='md:ml-[223px] transition-all duration-300 pt-6 px-4 md:px-6'>
      {/* Welcome + Trial Card */}
      {isTrialUser ? (
        <div className='flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 xl:gap-20'>
          {/* Welcome card */}
          <div className='flex flex-col md:flex-row bg-light-orange bg-opacity-30 rounded-md overflow-hidden w-full md:flex-1 min-h-[140px]'>
            <div className='flex flex-col gap-2 md:gap-4 p-4 md:p-6 flex-1'>
              <span className='font-bold text-lg md:text-xl'>
                Welcome Back, {userProfile.name.split(" ")[0]}!
              </span>
              <p className='font-light text-gray-500 text-sm md:text-base'>
                Elevate Your Brand With Our New Features
              </p>
            </div>
            <div className='flex items-center justify-start md:justify-center p-4 md:p-0 md:w-[25%] flex-shrink-0'>
              <button className='bg-white hover:bg-gray-50 flex p-2 rounded-md items-center justify-center transition-colors duration-200 shadow-sm'>
                <p className='text-sm text-primary-orange font-bold'>
                  Upgrade
                </p>
                <Icon
                  icon='mdi:arrow-right-thin'
                  className='text-2xl text-primary-orange'
                />
              </button>
            </div>
          </div>

          {/* Trial card */}
          <div className='bg-light-orange bg-opacity-30 rounded-md flex flex-col items-center justify-center p-4 md:p-6 md:w-[250px] flex-shrink-0 min-h-[140px]'>
            <span className='font-bold text-base md:text-lg'>
              Free Trial
            </span>
            <div className='w-[40px] h-[40px] bg-white border border-primary-orange rounded-full flex items-center justify-center mt-1'>
              <p className='font-bold'>{daysLeft}</p>
            </div>
            <p className='text-sm text-center mt-2'>
              {daysLeft > 0
                ? `${daysLeft} days left until free trial ends`
                : "Your free trial has ended"}
            </p>
            {daysLeft === 0 && (
              <button className='mt-2 text-xs text-primary-orange font-semibold hover:underline'>
                Upgrade now
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className='w-full md:max-w-[600px] bg-gradient-to-r from-light-orange/30 to-primary-orange/20 rounded-lg flex flex-col p-4 md:p-6 gap-4 border-l-4 border-primary-orange shadow-sm relative overflow-hidden min-h-[140px]'>
          {/* Decorative blobs */}
          <div className='absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary-orange opacity-10'></div>
          <div className='absolute right-12 bottom-4 w-16 h-16 rounded-full bg-light-orange opacity-10'></div>

          <div className='flex justify-between items-start relative z-10'>
            <div>
              <span className='font-bold text-lg md:text-xl text-gradient-orange-diagonal'>
                Welcome Back, {userProfile.name.split(" ")[0]}!
              </span>
              <p className='font-light text-gray-600 text-sm md:text-base mt-1'>
                Test All Premium Features
              </p>
            </div>

            <div className='hidden md:flex items-center justify-center bg-white/80 backdrop-blur-sm p-2 rounded-full h-12 w-12 shadow-sm'>
              <Icon
                icon='mdi:crown'
                className='text-primary-orange text-2xl'
              />
            </div>
          </div>

          <div className='relative z-10 mt-auto'>
            <button className='bg-white hover:bg-gray-50 flex items-center gap-1 py-1.5 px-3 rounded-md transition-colors duration-200 shadow-sm text-sm font-medium text-primary-orange border border-primary-orange/20 group'>
              Explore Premium Features
              <Icon
                icon='material-symbols:arrow-forward-rounded'
                className='text-lg group-hover:translate-x-0.5 transition-transform'
              />
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className='mt-6 md:mt-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg p-4 border border-gray-100'
            >
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-700 font-medium text-sm'>
                  {stat.title}
                </span>
                <div
                  className={`flex items-center ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  } text-xs font-semibold px-2 py-0.5 rounded-full ${
                    stat.trend === "up" ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <Icon
                    icon={
                      stat.trend === "up"
                        ? "heroicons:arrow-trending-up"
                        : "heroicons:arrow-trending-down"
                    }
                    className='mr-0.5'
                    width='14'
                  />
                  {stat.trend === "up" ? "+" : ""}
                  {stat.change}%
                </div>
              </div>
              <div className='text-2xl font-bold mb-1'>
                {stat.title.includes("Rate")
                  ? `${stat.value}%`
                  : stat.value.toLocaleString()}
              </div>
              <div>
                <small>{stat.fromText}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marketing Overview */}
      <div className='bg-white rounded-lg shadow-sm mt-6 md:mt-8 p-4 md:p-6 w-full'>
        <div className='flex flex-col sm:flex-row items-start justify-between gap-4'>
          {/* Title section */}
          <div className='flex flex-col gap-1 md:gap-2'>
            <span className='font-bold text-lg md:text-xl'>
              Marketing Overview
            </span>
            <p className='font-light text-sm md:text-base text-gray-600'>
              Track your marketing analytics here
            </p>
          </div>

          {/* Controls section - completely restructured */}
          <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
            <div className='relative w-full sm:w-[140px] md:w-[160px]'>
              <select
                name='timeframe'
                className='appearance-none w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange text-sm'
              >
                <option value='yearly'>Yearly</option>
                <option value='annual'>Annual</option>
                <option value='monthly'>Monthly</option>
                <option value='weekly'>Last 7 days</option>
              </select>
              <Icon
                icon={"mingcute:down-line"}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none'
              />
            </div>

            <div className='relative w-full sm:w-[140px] md:w-[160px]'>
              <select
                name='category'
                className='appearance-none w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange text-sm'
              >
                <option value='categories'>Categories</option>
                <option value='email'>Email Campaign</option>
                <option value='ads'>Ads Creation</option>
                <option value='posts'>Post Created</option>
              </select>
              <Icon
                icon={"mingcute:down-line"}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none'
              />
            </div>
          </div>
        </div>

        {/* Chart container with better responsive handling */}
        <div className='mt-4 md:mt-6'>
          <div className='w-full overflow-hidden'>
            <div className='min-w-[300px] w-full h-[300px] md:h-[350px]'>
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExistingUserStats;
