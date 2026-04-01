import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Forgot } from "../assets";

const ForgotPassLayout = () => {
  const location = useLocation();
  const isChangePassword = location.pathname === "/change-password";
  return (
    <div className='flex justify-center items-center mx-auto min-h-screen px-4 py-12 mt-[-80px]'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl w-full'>
        {/* Image section - hidden on mobile */}
        <div className={`${isChangePassword ? "hidden" : "mx-auto"} `}>
          <div className='w-[220px] h-[220px] md:w-[570px] md:h-[570px] max-w-full'>
            <img
              className='w-full h-full object-cover'
              src={Forgot}
              alt='Forgot Password Illustration'
            />
          </div>
        </div>

        {/* Content section - full width  */}
        <div
          className={`w-full ${
            isChangePassword
              ? "w-full flex justify-center items-center"
              : ""
          } flex flex-col justify-center`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassLayout;
