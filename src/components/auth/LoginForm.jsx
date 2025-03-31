import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Google } from "../../assets/index";
import Button from "../ui/Button";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);
    // login logic here
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-md mx-auto'>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>
        Welcome Back!
      </h1>

      {/* Email Input */}
      <div className='mb-4'>
        <label
          htmlFor='email'
          className='text-gray-700 font-medium block mb-1'
        >
          Email
        </label>
        <input
          suggested='email'
          autoComplete="on"
          id='email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Enter your email'
          className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500'
          required
        />
      </div>

      {/* Password Input */}
      <div className='mb-4'>
        <label
          htmlFor='password'
          className='text-gray-700 font-medium block mb-1'
        >
          Enter Password
        </label>
        <div className='relative'>
          <input
            id='password'
            autoComplete='current-password'
            name='password'
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password'
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500'
            required
          />
          <button
            type='button'
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon
              icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
              width={24}
            />
          </button>
        </div>
        <div className='text-right mt-2'>
          <a
            href='/forgot-password'
            className='text-orange-500 text-sm font-medium hover:underline'
          >
            Forgot password?
          </a>
        </div>
      </div>

      {/* Login Button */}
      <div className='mt-6'>
        <Button
          type='submit'
          title='Login'
          className='w-full bg-orange-500 text-white py-3 text-lg font-semibold rounded-xl hover:bg-orange-600 transition-all'
        />
      </div>

      {/* OR Divider */}
      <div className='flex items-center my-6'>
        <div className='flex-grow border-t border-gray-300'></div>
        <span className='mx-4 text-gray-500'>or</span>
        <div className='flex-grow border-t border-gray-300'></div>
      </div>

      {/* Google Login Button */}
      <button
        type='button'
        className='w-full flex items-center justify-center border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition-all'
      >
        <img src={Google} alt='Google Logo' className='w-6 h-6 mr-2' />
        <span className='text-gray-700 font-medium'>
          Continue with Google
        </span>
      </button>

      {/* Sign up link */}
      <div className='text-center mt-6'>
        <p className='text-gray-600'>
          Don't have an account?{" "}
          <a
            href='/register'
            className='text-orange-500 font-semibold hover:underline'
          >
            Sign up
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
