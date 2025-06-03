import { Icon } from "@iconify/react/dist/iconify.js";
import { sampleStats } from "../../utils/dummyData";
import { useState, useEffect } from "react";
import BarChart from "../ui/BarChart";

const ExistingUserStats = ({ user }) => {
  const [stats, setStats] = useState(sampleStats);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Enhanced trial calculation functions
  const getTrialInfo = () => {
    if (!user.trialEnd || !user.trialStart) {
      return {
        daysLeft: 0,
        totalDays: 30,
        progressPercentage: 100,
        isExpired: true,
        daysUsed: 30,
      };
    }

    const now = new Date();
    const trialEnd = new Date(user.trialEnd);
    const trialStart = new Date(user.trialStart);
    
    // Calculate total trial duration
    const totalTrialTime = trialEnd.getTime() - trialStart.getTime();
    const totalDays = Math.ceil(totalTrialTime / (1000 * 60 * 60 * 24));
    
    // Calculate time remaining
    const timeLeft = trialEnd.getTime() - now.getTime();
    const daysLeft = Math.max(0, Math.ceil(timeLeft / (1000 * 60 * 60 * 24)));
    
    // Calculate days used
    const timeUsed = now.getTime() - trialStart.getTime();
    const daysUsed = Math.max(0, Math.ceil(timeUsed / (1000 * 60 * 60 * 24)));
    
    // Calculate progress percentage
    const progressPercentage = Math.min(100, Math.max(0, (daysUsed / totalDays) * 100));
    
    const isExpired = daysLeft === 0;

    return {
      daysLeft,
      totalDays,
      progressPercentage,
      isExpired,
      daysUsed,
      trialEndDate: trialEnd,
    };
  };

  const formatTrialEndDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isTrialUser = user.onTrial;
  const trialInfo = getTrialInfo();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get urgency styling based on days left
  const getUrgencyStyle = (daysLeft) => {
    if (daysLeft === 0) return 'border-red-500 bg-red-50';
    if (daysLeft <= 3) return 'border-orange-500 bg-orange-50';
    if (daysLeft <= 7) return 'border-yellow-500 bg-yellow-50';
    return 'border-light-orange/20 bg-light-orange/30';
  };

  const getProgressBarColor = (daysLeft, percentage) => {
    if (daysLeft === 0) return 'bg-red-500';
    if (daysLeft <= 3) return 'bg-orange-500';
    if (daysLeft <= 7) return 'bg-yellow-500';
    return 'bg-primary-orange';
  };

  return (
    <div className='md:ml-[223px] transition-all duration-300 pt-6 px-4 md:px-6'>
      {/* Welcome + Trial Card */}
      {isTrialUser ? (
        <div className='flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 xl:gap-20'>
          {/* Welcome card */}
          <div className='flex flex-col md:flex-row bg-light-orange bg-opacity-30 rounded-md overflow-hidden w-full md:flex-1 min-h-[140px]'>
            <div className='flex flex-col gap-2 md:gap-4 p-4 md:p-6 flex-1'>
              <span className='font-bold text-lg md:text-xl'>
                Welcome Back, {user.companyName}!
              </span>
              <p className='font-light text-gray-500 text-sm md:text-base'>
                {trialInfo.isExpired 
                  ? "Your trial has ended. Upgrade to continue accessing all features."
                  : "Elevate Your Brand With Our Premium Features"
                }
              </p>
            </div>
            <div className='flex items-center justify-start md:justify-center p-4 md:p-0 md:w-[25%] flex-shrink-0'>
              <button className={`${
                trialInfo.isExpired 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-white hover:bg-gray-50 text-primary-orange'
              } flex p-2 rounded-md items-center justify-center transition-colors duration-200 shadow-sm`}>
                <p className='text-sm font-bold'>
                  {trialInfo.isExpired ? 'Upgrade Now' : 'Upgrade'}
                </p>
                <Icon
                  icon='mdi:arrow-right-thin'
                  className={`text-2xl ${trialInfo.isExpired ? 'text-white' : 'text-primary-orange'}`}
                />
              </button>
            </div>
          </div>

          {/* Enhanced Trial card */}
          <div className={`${getUrgencyStyle(trialInfo.daysLeft)} rounded-md flex flex-col p-4 md:p-6 md:w-[300px] flex-shrink-0 min-h-[140px] border-2 transition-all duration-300 hover:shadow-md`}>
            <div className='flex items-center justify-between mb-3'>
              <span className='font-bold text-base md:text-lg flex items-center gap-2'>
                <Icon 
                  icon={trialInfo.isExpired ? 'mdi:alert-circle' : 'mdi:clock-outline'} 
                  className={`text-xl ${
                    trialInfo.isExpired 
                      ? 'text-red-500' 
                      : trialInfo.daysLeft <= 3 
                        ? 'text-orange-500' 
                        : 'text-primary-orange'
                  }`}
                />
                Free Trial
              </span>
              {!trialInfo.isExpired && (
                <span className='text-xs text-gray-500 bg-white px-2 py-1 rounded-full'>
                  {trialInfo.daysUsed}/{trialInfo.totalDays} days
                </span>
              )}
            </div>

            {/* Days left display */}
            <div className='flex items-center justify-center mb-3'>
              <div className={`w-[50px] h-[50px] ${
                trialInfo.isExpired 
                  ? 'bg-red-100 border-red-500' 
                  : 'bg-white border-primary-orange'
              } border-2 rounded-full flex items-center justify-center`}>
                <p className={`font-bold text-lg ${
                  trialInfo.isExpired ? 'text-red-600' : 'text-gray-800'
                }`}>
                  {trialInfo.daysLeft}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            {!trialInfo.isExpired && (
              <div className='mb-3'>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(trialInfo.daysLeft, trialInfo.progressPercentage)}`}
                    style={{ width: `${trialInfo.progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Trial status text */}
            <div className='text-center'>
              <p className={`text-sm font-medium ${
                trialInfo.isExpired 
                  ? 'text-red-600' 
                  : trialInfo.daysLeft <= 3 
                    ? 'text-orange-600' 
                    : 'text-gray-700'
              }`}>
                {trialInfo.isExpired 
                  ? "Trial Expired" 
                  : trialInfo.daysLeft === 1
                    ? "Last day of trial"
                    : `${trialInfo.daysLeft} days remaining`
                }
              </p>
              
              {!trialInfo.isExpired && (
                <p className='text-xs text-gray-500 mt-1'>
                  Ends {formatTrialEndDate(trialInfo.trialEndDate)}
                </p>
              )}

              {trialInfo.isExpired && (
                <button className='mt-2 text-xs text-red-600 font-semibold hover:underline transition-colors'>
                  Upgrade to continue →
                </button>
              )}

              {!trialInfo.isExpired && trialInfo.daysLeft <= 7 && (
                <button className='mt-2 text-xs text-primary-orange font-semibold hover:underline transition-colors'>
                  Upgrade now to save 20% →
                </button>
              )}
            </div>
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
                Welcome Back, {user.companyName}!
              </span>
              <p className='font-light text-gray-600 text-sm md:text-base mt-1'>
                Enjoy All Premium Features
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

      {/* Trial expiration banner for expired trials */}
      {isTrialUser && trialInfo.isExpired && (
        <div className='mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Icon icon='mdi:alert-circle' className='text-red-500 text-xl' />
            <div>
              <p className='font-medium text-red-800'>Your free trial has ended</p>
              <p className='text-sm text-red-600'>Upgrade now to continue using all features</p>
            </div>
          </div>
          <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm'>
            Upgrade Now
          </button>
        </div>
      )}

      {/* Low trial days warning */}
      {isTrialUser && !trialInfo.isExpired && trialInfo.daysLeft <= 3 && (
        <div className='mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Icon icon='mdi:clock-alert' className='text-orange-500 text-xl' />
            <div>
              <p className='font-medium text-orange-800'>
                Your trial expires {trialInfo.daysLeft === 1 ? 'tomorrow' : `in ${trialInfo.daysLeft} days`}
              </p>
              <p className='text-sm text-orange-600'>Upgrade now to avoid losing access</p>
            </div>
          </div>
          <button className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm'>
            Upgrade & Save 20%
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className='mt-6 md:mt-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg p-4 border border-gray-100 ${
                isTrialUser && trialInfo.isExpired ? 'opacity-50 pointer-events-none' : ''
              }`}
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
              {isTrialUser && trialInfo.isExpired && (
                <div className='absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg'>
                  <div className='text-center'>
                    <Icon icon='mdi:lock' className='text-gray-400 text-2xl mx-auto mb-1' />
                    <p className='text-xs text-gray-500'>Upgrade to view</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Marketing Overview */}
      <div className={`bg-white rounded-lg shadow-sm mt-6 md:mt-8 p-4 md:p-6 w-full relative ${
        isTrialUser && trialInfo.isExpired ? 'opacity-50' : ''
      }`}>
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

          {/* Controls section */}
          <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
            <div className='relative w-full sm:w-[140px] md:w-[160px]'>
              <select
                name='timeframe'
                className='appearance-none w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary-orange focus:border-primary-orange text-sm'
                disabled={isTrialUser && trialInfo.isExpired}
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
                disabled={isTrialUser && trialInfo.isExpired}
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

        {/* Chart container */}
        <div className='mt-4 md:mt-6'>
          <div className='w-full overflow-hidden'>
            <div className='min-w-[300px] w-full h-[300px] md:h-[350px]'>
              <BarChart />
            </div>
          </div>
        </div>

        {/* Overlay for expired trials */}
        {isTrialUser && trialInfo.isExpired && (
          <div className='absolute inset-0 flex items-center justify-center bg-white/90 rounded-lg'>
            <div className='text-center p-6'>
              <Icon icon='mdi:chart-line-variant' className='text-gray-400 text-4xl mx-auto mb-3' />
              <p className='text-lg font-medium text-gray-700 mb-2'>Analytics Locked</p>
              <p className='text-sm text-gray-500 mb-4'>Upgrade to view your marketing analytics</p>
              <button className='bg-primary-orange hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors'>
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExistingUserStats;