import { Icon } from "@iconify/react/dist/iconify.js";
import { socialAccounts } from "../../../utils/data";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SocialAuthorization from "../../ui/SocialAuthorization";

const SocialSelectionModal = ({ toggleModal }) => {
  // Change to store a single selected account instead of multiple
  const [selectedAccount, setSelectedAccount] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [socialUrl, setSocialUrl] = useState("");
  const [currentAuthPlatform, setCurrentAuthPlatform] = useState(null);

  // Update to handle radio button selection
  const handleAccountSelection = (name) => {
    setSelectedAccount(name);
    // Clear error when user makes a selection
    if (error) setError("");
  };

  const handleContinue = () => {
    if (!selectedAccount) {
      setError("Please select a social account to connect!");
      return;
    }
    // Move to step 2
    setStep(2);
  };

  // Simplified to handle a single URL
  const handleUrlChange = (e) => {
    setSocialUrl(e.target.value);
  };

  const handleSubmit = () => {
    // Validate URL
    if (!socialUrl.trim()) {
      setError("Please enter your profile URL");
      return;
    }
    
    // Move to authorization step
    setCurrentAuthPlatform(selectedAccount);
    setStep(3);
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else {
      setStep(1);
    }
    // Clear any errors when going back
    if (error) setError("");
  };

  // Handle authorization completion
  const handleAuthorize = () => {
    // Successfully connected
    console.log("Account connected successfully:", {
      platform: selectedAccount,
      url: socialUrl
    });
    toggleModal();
  };

  // Handle cancellation of authorization
  const handleCancelAuth = () => {
    setStep(2);
    setCurrentAuthPlatform(null);
  };

  // Find the social account object by name
  const getSocialByName = (name) => {
    return socialAccounts.find((social) => social.name === name);
  };

  // Map social platform names to SocialAuthorization platform prop
  const getPlatformName = (name) => {
    const platformMap = {
      Twitter: "X",
      X: "X",
      Instagram: "Instagram",
      LinkedIn: "LinkedIn",
      Facebook: "Facebook",
    };
    return platformMap[name] || name;
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4'>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-[600px]'
      >
        {step !== 3 && (
          <div className='flex justify-between items-center mb-6 p-2'>
            <h2 className='text-xl font-semibold'>
              {step === 1
                ? "Select an account to connect"
                : "Enter your profile URL"}
            </h2>
            <Icon
              className='text-gray-500 cursor-pointer'
              onClick={toggleModal}
              icon={"material-symbols:cancel-rounded"}
              width={24}
              height={24}
            />
          </div>
        )}

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
                    onClick={() => handleAccountSelection(social.name)}
                  >
                    <input
                      type='radio'
                      checked={selectedAccount === social.name}
                      onChange={() => handleAccountSelection(social.name)}
                      className='mr-4 h-5 w-5 accent-primary-orange cursor-pointer'
                      name="socialAccount" // Important for radio button groups
                    />
                    <Icon icon={social.icon} className='text-2xl mr-3' />
                    <span className='font-medium'>{social.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : step === 2 ? (
            <motion.div
              key='step2'
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='mb-6'
            >
              <p className='text-gray-600 mb-4'>
                Please enter your profile URL for verification:
              </p>
              <div className='flex flex-col gap-4'>
                {/* Single account URL input */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className='flex flex-col gap-2'
                >
                  <label className='flex items-center gap-2 font-medium'>
                    <Icon icon={getSocialByName(selectedAccount)?.icon} className='text-xl' />
                    {selectedAccount}
                  </label>
                  <div className='flex items-center'>
                    <input
                      type='text'
                      value={socialUrl}
                      onChange={handleUrlChange}
                      placeholder={`Enter your ${selectedAccount} profile URL`}
                      className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange'
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key='step3'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='w-full'
            >
              {currentAuthPlatform && (
                <SocialAuthorization
                  platform={getPlatformName(currentAuthPlatform)}
                  onAuthorize={handleAuthorize}
                  onCancel={handleCancelAuth}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {step !== 3 && (
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
              {step === 1 ? "Continue" : "Connect Account"}
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SocialSelectionModal;
