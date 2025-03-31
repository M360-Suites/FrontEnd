import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { Icon } from "@iconify/react";

const Register = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyUrl: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation logic here
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    
    // Submit form data
    console.log("Form submitted:", formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='max-w-md md:mt-0 mt-10'>
      <div className="mb-8">
        <h1 className='text-3xl font-bold text-gray-800'>
          One step to your customized platform
        </h1>
        <small className='text-gray-500 text-base mt-2 block'>
          Personalize your platform for a better experience
        </small>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Company's name
          </label>
          <div className='w-full border border-gray-300 rounded-xl overflow-hidden transition-all duration-300'>
            <input
              id="companyName"
              name="companyName"
              type='text'
              placeholder='Enter Your Company Name'
              className='w-full px-4 py-3 sm:py-3.5 outline-none text-sm md:text-base'
              required
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Company URL */}
        <div>
          <label htmlFor="companyUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Company URL
          </label>
          <div className='w-full border border-gray-300 rounded-xl overflow-hidden transition-all duration-300'>
            <div className="flex items-center">
              <span className="text-gray-500 pl-4">https://</span>
              <input
                id="companyUrl"
                autoComplete="off"
                name="companyUrl"
                type='text'
                placeholder='yourcompany.m360.com'
                className='w-full px-2 py-3 sm:py-3.5 outline-none text-sm md:text-base'
                required
                value={formData.companyUrl}
                onChange={handleChange}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">This will be your unique URL for accessing your platform</p>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Create Password
          </label>
          <div className='w-full border border-gray-300 rounded-xl overflow-hidden transition-all duration-300'>
            <div className="flex items-center">
              <input
                id="password"
                autoComplete="new-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter Password'
                className='w-full px-4 py-3 sm:py-3.5 outline-none text-sm md:text-base'
                required
                value={formData.password}
                onChange={handleChange}
                minLength={8}
              />
              <button 
                type="button"
                className="pr-4"
                onClick={togglePasswordVisibility}
              >
                <Icon 
                  icon={showPassword ? "mdi:eye-off" : "mdi:eye"} 
                  className="h-5 w-5 text-gray-500"
                />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className='w-full border border-gray-300 rounded-xl overflow-hidden transition-all duration-300'>
            <div className="flex items-center">
              <input
                id="confirmPassword"
                autoComplete="new-password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm Password'
                className='w-full px-4 py-3 sm:py-3.5 outline-none text-sm md:text-base'
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button 
                type="button"
                className="pr-4"
                onClick={toggleConfirmPasswordVisibility}
              >
                <Icon 
                  icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"} 
                  className="h-5 w-5 text-gray-500"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start mt-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-primary-orange border-gray-300 rounded focus:ring-primary-orange"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-600">
              I agree to the <a href="/terms" className="text-primary-orange hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary-orange hover:underline">Privacy Policy</a>
            </label>
          </div>
        </div>

        {/* Create Account Button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="bg-light-orange w-full py-4 rounded-xl hover:bg-orange-600 transition-colors duration-300"
            title="Create Account"
          />
        </div>

        {/* Already have an account */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-primary-orange font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
