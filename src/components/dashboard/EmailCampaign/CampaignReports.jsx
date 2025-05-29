import { Icon } from "@iconify/react/dist/iconify.js";
import { reports } from "../../../utils/dummyData";
const CampaignReports = () => {


  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "text-green-600 bg-green-50";
      case "Failed":
        return "text-red-600 bg-red-50";
      case "Active":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className='mt-4 sm:mt-6'>
      <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-16'>
        {/* Campaign Reports Card */}
        <div className='w-full lg:w-[800px] border border-gray-200 p-3 sm:p-4 md:p-6 rounded-lg shadow-sm bg-white'>
          <div className='flex justify-between items-start mb-4 sm:mb-6'>
            <div className='flex flex-col gap-0.5 sm:gap-1'>
              <div className='flex items-center gap-1.5 sm:gap-2'>
                <Icon className='text-xl sm:text-2xl text-primary-orange' icon={"ic:round-campaign"} />
                <p className='font-bold text-base sm:text-lg'>Campaign Reports</p>
              </div>
              <div>
                <p className='text-gray-500 text-xs sm:text-sm'>
                  Monitor how your campaigns are performing
                </p>
              </div>
            </div>
            <div className='flex items-center gap-0.5 sm:gap-1 cursor-pointer text-primary-orange hover:underline'>
              <p className='font-medium text-xs sm:text-sm'>View all</p>
              <Icon icon={"heroicons:chevron-right"} className='text-base sm:text-lg' />
            </div>
          </div>

          {/* Table Header - Only visible on md and up */}
          <div className='hidden md:grid grid-cols-5 gap-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-600'>
            <div className='pl-4'>Name</div>
            <div className='text-center'>Total Sent</div>
            <div className='text-center'>Delivered</div>
            <div className='text-center'>Rate</div>
            <div className='text-center pr-4'>Status</div>
          </div>

          {/* Table Body */}
          <div className='space-y-1 mt-2'>
            {reports.map((report, index) => (
              <div 
                key={index} 
                className={`rounded-lg transition-colors duration-150 cursor-pointer ${
                  index !== reports.length - 1 ? 'border-b border-gray-100 md:border-0' : ''
                }`}
              >
                {/* Mobile view - completely redesigned for better UX */}
                <div className='md:hidden p-3 hover:bg-gray-50 active:bg-gray-100'>
                  <div className='flex justify-between items-start mb-2'>
                    <h3 className='font-medium text-sm line-clamp-1 pr-2 flex-1'>{report.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  
                  <div className='flex justify-between items-center mt-3 text-xs'>
                    <div className='flex flex-col items-center'>
                      <span className='text-gray-500 mb-1'>Sent</span>
                      <span className='font-semibold'>{report.totalSent.toLocaleString()}</span>
                    </div>
                    
                    <div className='h-8 border-r border-gray-200'></div>
                    
                    <div className='flex flex-col items-center'>
                      <span className='text-gray-500 mb-1'>Delivered</span>
                      <span className='font-semibold'>{report.delivered.toLocaleString()}</span>
                    </div>
                    
                    <div className='h-8 border-r border-gray-200'></div>
                    
                    <div className='flex flex-col items-center'>
                      <span className='text-gray-500 mb-1'>Rate</span>
                      <span className='font-semibold'>{report.rate}%</span>
                    </div>
                  </div>
                </div>

                {/* Desktop view - table layout */}
                <div className='hidden md:grid md:grid-cols-5 md:gap-4 md:py-4 md:px-4 md:hover:bg-gray-50'>
                  <div className='hidden md:block font-medium truncate'>{report.name}</div>
                  <div className='hidden md:flex justify-center items-center'>{report.totalSent.toLocaleString()}</div>
                  <div className='hidden md:flex justify-center items-center'>{report.delivered.toLocaleString()}</div>
                  <div className='hidden md:flex justify-center items-center'>{report.rate}%</div>
                  <div className='hidden md:flex justify-center items-center'>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Insights Card */}
        <div className='w-full lg:w-[400px] border border-gray-200 p-3 sm:p-4 md:p-6 rounded-lg shadow-sm bg-white'>
          <div className='flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4'>
            <Icon className='text-xl sm:text-2xl text-primary-orange' icon={"mdi:account-group"} />
            <p className='font-bold text-base sm:text-lg'>Audience Insights</p>
          </div>
          
          <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4'>
            {/* Engagement Rate */}
            <div className='bg-gray-50 p-3 sm:p-4 rounded-lg'>
              <div className='flex justify-between items-center mb-1 sm:mb-2'>
                <p className='text-gray-600 text-xs sm:text-sm'>Engagement Rate</p>
                <span className='text-green-600 text-[10px] sm:text-xs font-medium bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center'>
                  <Icon icon='mdi:arrow-up' className='mr-0.5 text-xs' />
                  12%
                </span>
              </div>
              <p className='text-xl sm:text-2xl font-bold'>67%</p>
              <div className='w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-1.5 sm:mt-2'>
                <div className='bg-primary-orange h-1.5 sm:h-2 rounded-full' style={{ width: '67%' }}></div>
              </div>
            </div>
            
            {/* Open Rate */}
            <div className='bg-gray-50 p-3 sm:p-4 rounded-lg'>
              <div className='flex justify-between items-center mb-1 sm:mb-2'>
                <p className='text-gray-600 text-xs sm:text-sm'>Open Rate</p>
                <span className='text-green-600 text-[10px] sm:text-xs font-medium bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center'>
                  <Icon icon='mdi:arrow-up' className='mr-0.5 text-xs' />
                  5%
                </span>
              </div>
              <p className='text-xl sm:text-2xl font-bold'>42%</p>
              <div className='w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-1.5 sm:mt-2'>
                <div className='bg-primary-orange h-1.5 sm:h-2 rounded-full' style={{ width: '42%' }}></div>
              </div>
            </div>
            
            {/* Click Rate */}
            <div className='bg-gray-50 p-3 sm:p-4 rounded-lg'>
              <div className='flex justify-between items-center mb-1 sm:mb-2'>
                <p className='text-gray-600 text-xs sm:text-sm'>Click Rate</p>
                <span className='text-red-600 text-[10px] sm:text-xs font-medium bg-red-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center'>
                  <Icon icon='mdi:arrow-down' className='mr-0.5 text-xs' />
                  3%
                </span>
              </div>
              <p className='text-xl sm:text-2xl font-bold'>28%</p>
              <div className='w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-1.5 sm:mt-2'>
                <div className='bg-primary-orange h-1.5 sm:h-2 rounded-full' style={{ width: '28%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignReports;
