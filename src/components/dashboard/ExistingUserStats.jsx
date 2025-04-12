import { Icon } from "@iconify/react/dist/iconify.js";
import { userProfile, sampleStats } from "../../utils/dummyData";
import { useState, useEffect } from "react";
import BarChart from "../ui/BarChart";

const ExistingUserStats = () => {
  const [stats, setStats] = useState(sampleStats);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Get days left in trial based on user tier
  const getDaysLeft = () => {
    return userProfile.tier === "2" ? 3 : 0;
  };
  
  const isTrialUser = false;
  const daysLeft = getDaysLeft();
  
  // Track window width for responsive design
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <div className='md:ml-[223px] transition-all duration-300 pt-6 px-4 md:px-6'>
      {/* Welcome and Trial Cards */}
      {isTrialUser ? (
        <div className='flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 xl:gap-20'>
          {/* Welcome card for subscribed users */}
          <div className='flex flex-col md:flex-row bg-light-orange bg-opacity-30 w-full md:w-[70%] lg:w-[75%] h-auto md:h-[140px] rounded-md overflow-hidden'>
            <div className='flex flex-col p-4 md:p-6 gap-2 md:gap-4 w-full md:w-[75%]'>
              <span className='font-bold text-lg md:text-xl'>
                Welcome Back, {userProfile.name.split(" ")[0]}!
              </span>
              <p className='font-light text-gray-500 text-sm md:text-base'>
                Elevate Your Brand With Our New Features
              </p>
            </div>
            <div className='flex w-full md:w-1/4 items-center justify-start md:justify-center p-4 md:p-0'>
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
          <div className='w-full md:w-[30%] lg:w-[25%] h-auto md:h-[140px] bg-light-orange bg-opacity-30 rounded-md items-center justify-center flex flex-col gap-2 p-4'>
            <span className='font-bold text-base md:text-lg'>
              Free Trial
            </span>
            <div className='w-[40px] h-[40px] bg-white border border-primary-orange rounded-full flex items-center justify-center'>
              <p className='font-bold'>{daysLeft}</p>
            </div>
            <p className='text-sm text-center'>
              {daysLeft > 0
                ? `${daysLeft} days left until free trial ends`
                : "Your free trial has ended"}
            </p>
            {daysLeft === 0 && (
              <button className='mt-1 text-xs text-primary-orange font-semibold hover:underline'>
                Upgrade now
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className='md:w-1/2 w-full h-auto md:h-[140px] bg-gradient-to-r from-light-orange/30 to-primary-orange/20 rounded-lg flex flex-col p-4 md:p-6 gap-2 md:gap-4 border-l-4 border-primary-orange shadow-sm relative overflow-hidden'>
        {/* Decorative elements */}
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
              icon="mdi:crown" 
              className='text-primary-orange text-2xl'
            />
          </div>
        </div>
        
        <div className='mt-auto relative z-10'>
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

      {/* Stats cards */}
      <div className='mt-6 md:mt-8'>
        {/* Responsive stats grid - stacks vertically on mobile, grid on larger screens */}
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
              
              <div className='text-xs text-gray-500 mb-3'>
                {stat.fromText}
              </div>
              
              {/* Simplified mini chart */}
              <div className='h-12 flex items-end mt-auto'>
                {Array(12)
                  .fill()
                  .map((_, i) => {
                    // Create a more realistic chart pattern
                    const heights = [
                      30, 45, 35, 60, 50, 40, 55, 65, 50, 70, 60,
                      stat.trend === "up" ? 80 : 40,
                    ];
                    
                    const isHighlight = i === 11;
                    const isPreHighlight = i > 8;
                    
                    return (
                      <div
                        key={i}
                        className='w-full mx-0.5 rounded-t-sm transition-all duration-300'
                        style={{
                          height: `${heights[i]}%`,
                          backgroundColor: isHighlight
                            ? stat.trend === "up"
                              ? "#10B981"
                              : "#EF4444"
                            : isPreHighlight
                            ? stat.trend === "up"
                              ? "#D1FAE5"
                              : "#FEE2E2"
                            : "#E5E7EB",
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marketing Overview */}
      <div className='bg-white rounded-lg shadow-sm mt-6 md:mt-8 p-4 md:p-8 w-full'>
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-0'>
          <div className='flex flex-col flex-1 gap-2 md:gap-3'>
            <span className='font-bold text-lg md:text-xl'>
              Marketing Overview
            </span>
            <p className='font-light text-sm md:text-base'>
              Track your marketing analytics here
            </p>
          </div>
          
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-10 border border-gray-200 p-2 rounded-xl'>
            <div className='flex items-center'>
              <div className='relative w-full'>
                <select
                  name='timeframe'
                  className='appearance-none bg-transparent border border-none rounded-md px-2 md:px-3 py-1.5 md:py-2 pr-6 md:pr-8 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent text-sm w-full'
                >
                  <option value='yearly'>Yearly</option>
                  <option value='annual'>Annual</option>
                  <option value='monthly'>Monthly</option>
                  <option value='weekly'>Last 7 days</option>
                </select>
                <Icon
                  icon={"mingcute:down-line"}
                  className='absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-gray-500'
                />
              </div>
            </div>
            
            <div className='flex items-center'>
              <div className='relative w-full'>
                <select
                  name='category'
                  className='appearance-none bg-transparent border border-none rounded-md px-2 md:px-3 py-1.5 md:py-2 pr-6 md:pr-8 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent text-sm w-full'
                >
                  <option value='categories'>Categories</option>
                  <option value='email'>Email Campaign</option>
                  <option value='ads'>Ads Creation</option>
                  <option value='posts'>Post Created</option>
                </select>
                <Icon
                  icon={"mingcute:down-line"}
                  className='absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-gray-500'
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className='mt-4 md:mt-8 overflow-x-auto'>
          <div className='min-w-[500px] md:min-w-0'>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExistingUserStats;
