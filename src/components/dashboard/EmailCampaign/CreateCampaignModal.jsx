import { Icon } from "@iconify/react/dist/iconify.js";

const CreateCampaignModal = ({ handleToggleModal }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4'>
      <div className='bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-[600px] flex flex-col items-center'>
        {/* Header */}
        <div className='flex justify-between items-center w-full mb-6'>
          <div className='flex flex-col'>
            <h2 className='text-lg sm:text-xl font-semibold'>Select campaign type</h2>
            <p className='text-xs sm:text-sm font-light text-gray-500'>
              Choose a campaign type to continue
            </p>
          </div>
          <button
            onClick={handleToggleModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <Icon
              icon={"hugeicons:cancel-02"}
              className="text-black text-xl sm:text-2xl"
            />
          </button>
        </div>

        {/* Campaign Options */}
        <div className='w-full space-y-4'>
          {/* One Time Campaign */}
          <div className='flex items-center border border-orange-500 rounded-lg p-4 w-full cursor-pointer hover:shadow-md transition-shadow'>
            <div className='w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] border-orange-500 border rounded-full flex items-center justify-center flex-shrink-0'>
              <Icon icon="mdi:email-outline" className="text-orange-500 text-xl" />
            </div>
            <div className='flex flex-col ml-4'>
              <span className="font-medium">One time Campaign</span>
              <p className='text-xs sm:text-sm text-gray-600 font-light'>
                Create a one time campaign to reach global audience
              </p>
            </div>
          </div>

          {/* Drip Campaign */}
          <div className='flex items-center border border-orange-500 rounded-lg p-4 w-full cursor-pointer hover:shadow-md transition-shadow relative'>
            {/* Premium Badge */}
            <div className="absolute -top-2 -right-2 bg-primary-orange text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Icon icon="mdi:crown" className="mr-1 text-yellow-300" />
              <span>Premium</span>
            </div>
            
            <div className='w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] border-orange-500 border rounded-full flex items-center justify-center flex-shrink-0'>
              <Icon icon="mdi:clock-time-four-outline" className="text-orange-500 text-xl" />
            </div>
            <div className='flex flex-col ml-4'>
              <span className="font-medium">Drip Campaign</span>
              <p className='text-xs sm:text-sm text-gray-600 font-light'>
                Schedule and automate email with drip campaign
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
