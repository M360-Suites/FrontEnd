import React from "react";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div>
      <div className='mb-4'>
        <h1 className='text-3xl font-bold text-gray-800'>
          Forgot Password?{" "}
        </h1>
        <small className='text-gray-500 text-base mt-2 block'>
          Get your account back in one step
        </small>
      </div>

      <div className='mt-4'>
        <p className='text-gray-600 leading-relaxed'>
          No stress! Enter your email to reset your password. <br />
          We've got you covered.
        </p>
      </div>

      {/* Email signup form */}
      <div className='mt-8 w-full sm:w-[350px] md:w-[400px] lg:w-[450px] border border-gray-300 rounded-xl flex overflow-hidden transition-all duration-300'>
        <div className='flex-grow'>
          <input
            type='email'
            placeholder='Email'
            className='w-full h-full px-4 py-3 sm:py-3.5 md:py-4 outline-none text-sm md:text-base'
            required
          />
        </div>
        <div>
          <Button
            className='bg-light-orange hover:bg-orange-600 transition-colors duration-300 h-full text-sm md:text-base px-3 md:px-6'
            title={"Get account"}
          />
        </div>
      </div>
      <Link to={"/enter-otp"}>Next</Link>
    </div>
  );
};

export default ForgotPassword;
