import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

const OverallConversion = () => {
  const [timeframe, setTimeframe] = useState("weekly");

  // Sample data for different timeframes
  const conversionData = {
    daily: [
      { day: "Mon", value: 32 },
      { day: "Tue", value: 45 },
      { day: "Wed", value: 38 },
      { day: "Thu", value: 52 },
      { day: "Fri", value: 48 },
      { day: "Sat", value: 25 },
      { day: "Sun", value: 20 },
    ],
    weekly: [
      { week: "Week 1", value: 35 },
      { week: "Week 2", value: 42 },
      { week: "Week 3", value: 38 },
      { week: "Week 4", value: 45 },
    ],
    monthly: [
      { month: "Jan", value: 30 },
      { month: "Feb", value: 35 },
      { month: "Mar", value: 40 },
      { month: "Apr", value: 38 },
      { month: "May", value: 42 },
      { month: "Jun", value: 45 },
      { month: "Jul", value: 48 },
      { month: "Aug", value: 50 },
      { month: "Sep", value: 47 },
      { month: "Oct", value: 43 },
      { month: "Nov", value: 40 },
      { month: "Dec", value: 38 },
    ],
    yearly: [
      { year: "2020", value: 32 },
      { year: "2021", value: 38 },
      { year: "2022", value: 42 },
      { year: "2023", value: 45 },
      { year: "2024", value: 48 },
    ],
  };

  // Get current data based on selected timeframe
  const currentData = conversionData[timeframe];

  // Calculate max value for scaling
  const maxValue = Math.max(...currentData.map((item) => item.value));

  // Get label key based on timeframe
  const getLabelKey = () => {
    switch (timeframe) {
      case "daily":
        return "day";
      case "weekly":
        return "week";
      case "monthly":
        return "month";
      case "yearly":
        return "year";
      default:
        return "week";
    }
  };

  // Calculate average conversion rate
  const averageConversion =
    currentData.reduce((acc, curr) => acc + curr.value, 0) /
    currentData.length;

  // Determine trend (up or down) compared to previous period
  const trend = averageConversion > 40 ? "up" : "down";

  return (
    <div className='max- w-[600px] max-h-[550px] border p-4 rounded-xl flex flex-col'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h3 className='font-bold text-lg'>Overall Conversion</h3>
          <div className='flex items-center mt-2'>
            <span className='text-2xl font-bold'>
              {averageConversion.toFixed(1)}%
            </span>
            <div
              className={`flex items-center ml-2 ${
                trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              <Icon
                icon={trend === "up" ? "mdi:arrow-up" : "mdi:arrow-down"}
                className='text-lg'
              />
              <span className='text-xs ml-1'>
                {trend === "up" ? "+2.5%" : "-1.8%"}
              </span>
            </div>
          </div>
        </div>

        <div className='flex bg-gray-100 rounded-lg p-1'>
          {["daily", "weekly", "monthly", "yearly"].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                timeframe === period
                  ? "bg-white text-primary-orange shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className='flex-1 overflow-hidden'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={timeframe}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='h-full flex flex-col'
          >
            <div className='flex-1 flex items-end space-x-2 md:space-x-4 pb-1 px-2'>
              {currentData.map((item, index) => {
                const height = `${(item.value / maxValue) * 100}%`;
                const label = item[getLabelKey()];

                return (
                  <div
                    key={index}
                    className='flex-1 flex flex-col items-center'
                  >
                    <div className='w-full flex justify-center mb-1'>
                      <span className='text-xs font-medium'>
                        {item.value}%
                      </span>
                    </div>
                    <div className='relative w-full h-[200px] flex items-end'>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className='w-full bg-orange-gradient rounded-t-md'
                        style={{ height }}
                      />
                    </div>
                    <div className='w-full text-center mt-2'>
                      <span className='text-xs text-gray-500'>
                        {label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className='mt-4 pt-3 border-t border-gray-100'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='w-3 h-3 rounded-full bg-orange-gradient mr-2'></div>
            <span className='text-xs text-gray-500'>Conversion Rate</span>
          </div>
          <button className='text-primary-orange text-sm font-medium flex items-center'>
            View Details
            <Icon
              icon='material-symbols:arrow-right-alt-rounded'
              className='ml-1'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverallConversion;
