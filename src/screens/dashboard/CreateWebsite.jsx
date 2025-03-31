import { useState, useEffect } from "react";
import { website1, website2, website3 } from "../../assets";
import BrowserWidth from "../Error/BrowserWidth";

const CreateWebsite = () => {
  const [showBrowserWarning, setShowBrowserWarning] = useState(false);

  // Check browser width on mount and resize
  useEffect(() => {
    const checkBrowserWidth = () => {
      if (window.innerWidth < 1200) {
        setShowBrowserWarning(true);
      } else {
        setShowBrowserWarning(false);
      }
    };

    // Check on mount
    checkBrowserWidth();

    // Add resize listener
    window.addEventListener('resize', checkBrowserWidth);

    // Clean up
    return () => window.removeEventListener('resize', checkBrowserWidth);
  }, []);

  return (
    <>
      {showBrowserWarning && <BrowserWidth />}
      
      <div className='p-4'>
        <div className='flex flex-col justify-start items-center gap-4 mb-4'>
          <div>
            <span className='md:text-3xl text-xl font-semibold'>
              <span className='text-gradient-orange'>
                {" "}
                Create a stunning website for your business
              </span>{" "}
              <br />{" "}
              <span className='text-gradient-fire'>
                with ease, build with amazing templates.
              </span>
            </span>
          </div>
          <div className='md:w-[210px] h-[55px]'>
            <button className='bg-orange-gradient-vertical hover:bg-light-orange transition-colors duration-300 text-white py-2 px-4 rounded-md w-full h-full'>
              Get Started
            </button>
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden scroll-auto custom-scrollbar'>
          <div className='rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 max-w-[526px] h-[350px]'>
            <img
              className='object-cover w-full h-full'
              src={website1}
              alt='Website Template 1'
            />
          </div>
          <div className='rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 max-w-[526px] h-[350px]'>
            <img
              className='object-cover w-full h-full'
              src={website2}
              alt='Website Template 2'
            />
          </div>
          <div className='rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 max-w-[526px] h-[350px]'>
            <img
              className='object-cover w-full h-full'
              src={website3}
              alt='Website Template 3'
            />
          </div>
          <div className='rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 max-w-[526px] h-[350px]'>
            <img
              className='object-cover w-full h-full'
              src={website3}
              alt='Website Template 4'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateWebsite;
