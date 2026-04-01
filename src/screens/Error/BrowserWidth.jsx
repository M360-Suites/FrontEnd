import { Icon } from "@iconify/react/dist/iconify.js";
import { Alert } from "../../assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BrowserWidth = ({ onClose }) => {
  return (
    <motion.div 
      className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className='w-[340px] h-[370px] bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center'
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ type: "spring", damping: 25 }}
      >
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
          <button 
            onClick={onClose}
            className='bg-orange-gradient py-3 px-6 rounded-md text-white font-medium flex items-center gap-2 hover:shadow-md transition-shadow duration-300'
          >
            Understood, thanks
            <Icon icon='material-symbols-light:check' className='text-xl' />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BrowserWidth;
