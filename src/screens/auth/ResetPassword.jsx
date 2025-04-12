import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Button from "../../components/ui/Button";
import SuccessCard from "../../components/ui/SuccessCard";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleShowSuccessMessage = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  return (
    <>
      <div className='flex flex-col items-center justify-start md:justify-center min-h-screen p-4 pt-8 md:pt-4 md:space-y-6'>
        <div className='bg-white p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-xl mx-auto'>
          <div className='max-w-md mx-auto md:space-y-11'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 text-center'>
              One more step to getting your account
            </h2>
            <p className='text-gray-600 text-sm md:text-base text-center mt-2 mb-6'>
              Let's get you back in! Reset your password below.
            </p>

            <div className='mt-6 space-y-6'>
              {/* Password Field */}
              <div>
                <label className='text-gray-700 text-sm font-medium block mb-2'>
                  Create Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? "text" : "password"}
                    className='w-full px-4 py-3 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-orange focus:border-light-orange focus:outline-none transition-all'
                    placeholder='************'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-3 text-gray-500 hover:text-gray-700'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon
                      icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                      width='20'
                      height='20'
                    />
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className='text-gray-700 text-sm font-medium block mb-2'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-primary-orange focus:outline-none transition-all'
                    placeholder='************'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-3 text-gray-500 hover:text-gray-700'
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    <Icon
                      icon={
                        showConfirmPassword ? "mdi:eye-off" : "mdi:eye"
                      }
                      width='20'
                      height='20'
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              className={
                "mt-8 w-full bg-light-orange hover:bg-light-orange text-white font-medium py-3 md:py-6 rounded-lg transition duration-300 text-base md:text-lg"
              }
              title={"Recover Account"}
            />
          </div>
        </div>
        <button onClick={handleShowSuccessMessage}>next</button>
      </div>

      {showSuccessMessage && <SuccessCard />}
    </>
  );
};

export default ResetPassword;
