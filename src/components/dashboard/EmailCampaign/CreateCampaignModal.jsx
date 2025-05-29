import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CreateCampaignModal = ({ handleToggleModal }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const campaignOptions = [
    {
      id: "one-time",
      title: "One time Campaign",
      description: "Create a one time campaign to reach global audience",
      icon: "mdi:email-outline",
      isPremium: false
    },
    {
      id: "drip",
      title: "Drip Campaign",
      description: "Schedule and automate email with drip campaign",
      icon: "mdi:clock-time-four-outline",
      isPremium: true
    }
  ];

  return (
    <AnimatePresence>
      <motion.div 
        className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-3 sm:p-4 backdrop-blur-sm'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className='bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-xl w-full max-w-[600px] flex flex-col max-h-[90vh] overflow-auto'
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {/* Header with gradient accent */}
          <div className='relative mb-5 sm:mb-8'>
            <div className='absolute top-0 left-0 w-12 sm:w-16 h-1 bg-orange-gradient-radial rounded-full'></div>
            <div className='flex justify-between items-start sm:items-center w-full pt-4'>
              <div className='flex flex-col pr-4'>
                <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800'>Select campaign type</h2>
                <p className='text-xs sm:text-sm font-normal text-gray-500 mt-1'>
                  Choose a campaign type to continue
                </p>
              </div>
              <motion.button
                onClick={handleToggleModal}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                aria-label="Close modal"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Icon
                  icon={"mdi:close"}
                  className="text-gray-500 text-lg sm:text-xl"
                />
              </motion.button>
            </div>
          </div>

          {/* Campaign Options */}
          <div className='w-full space-y-3 sm:space-y-4 mb-5 sm:mb-6'>
            {campaignOptions.map((option) => (
              <motion.div
                key={option.id}
                className={`flex items-center border rounded-xl p-3 sm:p-5 w-full cursor-pointer transition-all ${
                  selectedOption === option.id
                    ? 'border-primary-orange bg-light-orange/10 shadow-md'
                    : 'border-gray-200 hover:border-primary-orange/50 hover:shadow-sm'
                }`}
                onClick={() => setSelectedOption(option.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedOption === option.id
                    ? 'bg-primary-orange text-white'
                    : 'bg-light-orange/10 text-primary-orange'
                }`}>
                  <Icon icon={option.icon} className="text-xl sm:text-2xl" />
                </div>
                
                <div className='flex flex-col ml-3 sm:ml-4 flex-grow'>
                  <span className="font-medium text-gray-800 text-sm sm:text-base">{option.title}</span>
                  <p className='text-xs sm:text-sm text-gray-600 mt-0.5 line-clamp-2 sm:line-clamp-none'>
                    {option.description}
                  </p>
                </div>
                
                {option.isPremium && (
                  <div className="flex items-center justify-center bg-gradient-to-r from-primary-orange to-light-orange text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm whitespace-nowrap">
                    <Icon icon="mdi:crown" className="mr-0.5 sm:mr-1 text-yellow-100" />
                    <span>Premium</span>
                  </div>
                )}
                
                <motion.div 
                  className={`ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedOption === option.id
                      ? 'border-primary-orange'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedOption === option.id && (
                    <motion.div 
                      className="w-2 h-2 sm:w-3 sm:h-3 bg-primary-orange rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-2 sm:gap-3 mt-auto">
            <motion.button
              onClick={handleToggleModal}
              className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 text-sm sm:text-base font-medium hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            
            <motion.button
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-white text-sm sm:text-base font-medium shadow-md transition-all flex items-center ${
                selectedOption 
                  ? 'bg-orange-gradient-radial hover:shadow-lg opacity-100'
                  : 'bg-gray-400 opacity-70 cursor-not-allowed'
              }`}
              whileHover={selectedOption ? { scale: 1.02 } : {}}
              whileTap={selectedOption ? { scale: 0.98 } : {}}
              disabled={!selectedOption}
            >
              Continue
              <Icon icon="mdi:arrow-right" className="ml-1 text-base sm:text-lg" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateCampaignModal;
