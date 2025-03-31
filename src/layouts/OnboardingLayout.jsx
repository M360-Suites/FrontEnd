import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { StatData } from "../assets/index";

const OnboardingLayout = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";

  return (
    <div className='flex justify-center items-center mx-auto min-h-screen px-4 py-12 mt-[-80px]'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl w-full'>
        {/* Image section - hidden on mobile for register page */}
        <div className={`${isRegisterPage ? 'hidden' : ''} md:block md:w-1/2 flex justify-center`}>
          <div className='w-[220px] h-[220px] md:w-[570px] md:h-[570px] max-w-full'>
            <img
              className='w-full h-full object-cover'
              src={StatData}
              alt='Business Analytics Dashboard'
            />
          </div>
        </div>

        {/* Content section - full width on mobile for register page */}
        <div className={`w-full ${isRegisterPage ? '' : 'md:w-1/2'} flex flex-col justify-center`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
