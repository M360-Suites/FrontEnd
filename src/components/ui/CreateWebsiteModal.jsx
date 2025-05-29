import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

const CreateWebsiteModal = ({ handleToggle }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Website details:", formData);
    // Add your API call or state management here
    handleToggle();
  };

  return (
    <motion.div 
      className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 px-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className='bg-white rounded-xl shadow-2xl w-full max-w-[286px] md:max-w-[700px] overflow-hidden'
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Create Your Website</h3>
          <button 
            onClick={handleToggle}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Icon icon="mdi:close" className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Website Name
              </label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-primary-orange/40 focus:border-primary-orange outline-none transition-all" 
                placeholder="My Awesome Website" 
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Website Description
              </label>
              <textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full h-32 focus:ring-2 focus:ring-primary-orange/40 focus:border-primary-orange outline-none transition-all resize-none" 
                placeholder="Describe your website purpose..." 
                required
              />
            </div>
          </div>
          
          <div className="mt-8 flex gap-4 justify-end">
            <motion.button
              type="button"
              onClick={handleToggle}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            
            <motion.button
              type="submit"
              className="px-5 py-2.5 bg-orange-gradient-radial rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Website
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateWebsiteModal;
