import { Icon } from "@iconify/react/dist/iconify.js";
import { Alert } from "../../assets";
import { Link } from "react-router-dom";

const BrowserWidth = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50'>
      <div className='w-[340px] h-[370px] bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center'>
        <div className='mb-4'>
          <img src={Alert} alt="Alert Icon" className='w-24 h-24 object-cover' />
        </div>

        <div className='mb-3'>
          <h2 className='text-xl font-bold text-red-600'>Your Browser Is Too Small!</h2>
        </div>

        <div className='mb-6'>
          <p className='text-gray-600 leading-relaxed'>
            Please resize your browser to be at least <br />
            <span className='font-semibold'>1200px</span>. We don't support mobile browsers.
          </p>
        </div>

        <div>
          <Link to="/dashboard">
            <button className='bg-orange-gradient py-3 px-6 rounded-md text-white font-medium flex items-center gap-2 hover:shadow-md transition-shadow duration-300'>
              Understood, thanks
              <Icon icon='material-symbols-light:check' className='text-xl' />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrowserWidth;
