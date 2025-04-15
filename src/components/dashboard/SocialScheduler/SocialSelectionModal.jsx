import { Icon } from "@iconify/react/dist/iconify.js";
import { socialAccounts } from "../../../utils/data";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SocialSelectionModal = ({ toggleModal }) => {
  const [selectedAccounts, setSelectedAccounts] = useState({});
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [socialUrls, setSocialUrls] = useState({});

  const handleCheckboxChange = (name) => {
    setSelectedAccounts((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
    // Clear error when user makes a selection
    if (error) setError("");
  };

  const handleContinue = () => {
    const selected = Object.keys(selectedAccounts).filter(
      (key) => selectedAccounts[key]
    );
    if (selected.length === 0) {
      setError("Please select at least one social account!");
      return;
    }

    // Initialize socialUrls with empty strings for selected accounts
    const initialUrls = {};
    selected.forEach((name) => {
      initialUrls[name] = "";
    });
    setSocialUrls(initialUrls);

    // Move to step 2
    setStep(2);
  };

  const handleUrlChange = (name, value) => {
    setSocialUrls((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate URLs
    const selected = Object.keys(socialUrls);
    const isValid = selected.every(
      (name) => socialUrls[name].trim() !== ""
    );

    if (!isValid) {
      setError("Please fill in all profile URLs");
      return;
    }

    console.log("Connected accounts with URLs:", socialUrls);
    // Process the data and close modal
    toggleModal();
  };

  const handleBack = () => {
    setStep(1);
    // Clear any errors when going back
    if (error) setError("");
  };

  // Find the social account object by name
  const getSocialByName = (name) => {
    return socialAccounts.find((social) => social.name === name);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4'>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-[600px]'
      >
        <div className='flex justify-between items-center mb-6 p-2'>
          <h2 className='text-xl font-semibold'>
            {step === 1
              ? "Select accounts to connect"
              : "Enter your profile URLs"}
          </h2>
          <Icon
            className='text-gray-500 cursor-pointer'
            onClick={toggleModal}
            icon={"material-symbols:cancel-rounded"}
            width={24}
            height={24}
          />
        </div>

        {/* Error message displayed at the top */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-4 p-2 bg-red-50 border border-red-200 rounded-md"
            >
              <p className='text-red-600 text-sm flex items-center'>
                <Icon icon="mdi:alert-circle" className="mr-2" />
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          {step === 1 ? (
            <motion.div
              key='step1'
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='max-h-[400px] overflow-y-auto mb-6'
            >
              <div className='flex flex-col gap-3'>
                {socialAccounts.map((social, index) => (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    key={index}
                    className='flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer'
                    onClick={() => handleCheckboxChange(social.name)}
                  >
                    <input
                      type='checkbox'
                      checked={selectedAccounts[social.name] || false}
                      onChange={() => handleCheckboxChange(social.name)}
                      className='mr-4 h-5 w-5 accent-primary-orange cursor-pointer'
                    />
                    <Icon icon={social.icon} className='text-2xl mr-3' />
                    <span className='font-medium'>{social.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key='step2'
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='mb-6'
            >
              <p className='text-gray-600 mb-4'>
                Please enter your profile URLs for verification:
              </p>
              <div className='flex flex-col gap-4'>
                {Object.keys(socialUrls).map((name, index) => {
                  const social = getSocialByName(name);
                  return (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      key={index}
                      className='flex flex-col gap-2'
                    >
                      <label className='flex items-center gap-2 font-medium'>
                        <Icon icon={social?.icon} className='text-xl' />
                        {name}
                      </label>
                      <div className='flex items-center'>
                        <input
                          type='text'
                          value={socialUrls[name]}
                          onChange={(e) =>
                            handleUrlChange(name, e.target.value)
                          }
                          placeholder={`Enter your ${name} profile URL`}
                          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange'
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className='flex justify-end items-center gap-3 mt-4'>
          {step === 2 && (
            <button
              onClick={handleBack}
              className='px-6 py-2 rounded-md font-medium border border-gray-300 hover:bg-gray-100 transition-colors'
            >
              Back
            </button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={step === 1 ? handleContinue : handleSubmit}
            className='bg-orange-gradient text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity'
          >
            {step === 1 ? "Continue" : "Connect Accounts"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SocialSelectionModal;
