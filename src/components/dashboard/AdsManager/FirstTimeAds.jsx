import { Ads } from "../../../assets/index";
import { socialAccounts } from "../../../utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const FirstTimeAds = () => {
  return (
   <div className='p-4'>
   {/* First Section */}
   <div className='flex flex-col md:flex-row justify-around items-center border border-gray-200 rounded-lg p-4'>
     <div className='flex flex-col gap-5 w-full md:w-1/2 mb-4 md:mb-0'>
       <div>
         <span className='font-bold text-xl'>
           Create Ads that convert with Ease!
         </span>
       </div>
       <div>
         <p className='text-gray-600 text-sm'>
           Reach more customers and generate leads with Ads
         </p>
       </div>
       <div className='flex items-center'>
         <button className='px-8 py-2 bg-orange-gradient text-white rounded-xl'>
           Get Started
         </button>
       </div>
     </div>
     <div className='w-full md:w-1/2 flex justify-center'>
       <img src={Ads} alt='mailSent' className='max-w-full h-auto' />
     </div>
   </div>

   {/* Second Section - Improved with animations */}
   <motion.div
     className='mt-5 p-6 rounded-lg shadow-sm'
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
   >
     <div className='mb-4'>
       <span className='font-semibold text-lg'>
         Select Ads placement to get started
       </span>
     </div>

     <motion.div
       className='cursor-pointer mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
       initial='hidden'
       animate='visible'
       variants={{
         hidden: { opacity: 0 },
         visible: {
           opacity: 1,
           transition: {
             staggerChildren: 0.1,
           },
         },
       }}
     >
       {socialAccounts.map((social, index) => (
         <motion.div
           key={index}
           className='p-4 rounded-lg border hover:border-primary-orange transition-all relative'
           variants={{
             hidden: { y: 20, opacity: 0 },
             visible: { y: 0, opacity: 1 },
           }}
           whileHover={{
             y: -5,
             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
             transition: { duration: 0.2 },
           }}
         >
           <div className='flex justify-between items-center mb-3'>
             <div className='flex items-center'>
               <Icon icon={social.icon} className='text-2xl mr-3' />
               <span className='font-medium'>{social.name}</span>
             </div>
             <motion.div
               whileHover={{ x: 3 }}
               transition={{ duration: 0.2 }}
             >
               <Icon
                 icon='material-symbols:arrow-forward-rounded'
                 className='text-xl text-primary-orange'
               />
             </motion.div>
           </div>

           <div className='mt-2 pt-2 border-t border-gray-200'>
             <p className='text-sm text-gray-600'>{social.ad}</p>
           </div>
         </motion.div>
       ))}
     </motion.div>
   </motion.div>
 </div>
  )
}
export default FirstTimeAds