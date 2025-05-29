import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { web1, web4 } from "../../../assets";
import { motion } from "framer-motion";

const ExistingWebsites = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample website data
  const websites = [
    {
      id: 1,
      name: "M100 technology",
      image: web1,
      dateCreated: "2023-10-15",
      lastUpdated: "2023-11-02",
      status: "Published"
    },
    {
      id: 2,
      name: "Adler Store",
      image: web4,
      dateCreated: "2023-09-28",
      lastUpdated: "2023-10-30",
      status: "Published"
    },
    {
      id: 3,
      name: "Personal Blog",
      image: web1,
      dateCreated: "2023-11-05",
      lastUpdated: "2023-11-05",
      status: "Draft"
    },
    {
      id: 4,
      name: "Chowtable logistics",
      image: web4,
      dateCreated: "2023-10-20",
      lastUpdated: "2023-10-25",
      status: "Draft"
    }
  ];

  // Filter websites based on active filter and search query
  const filteredWebsites = websites.filter(website => {
    const matchesFilter = activeFilter === "All" || website.status === activeFilter;
    const matchesSearch = website.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Format date to more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className='p-4 md:p-6 bg-gray-50 rounded-lg'>
      <div className='flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4 gap-4'>
        <div className='flex gap-6'>
          {["All", "Published", "Drafts"].map((filter) => (
            <button
              key={filter}
              className={`px-2 py-1 font-medium text-sm transition-colors relative ${
                activeFilter === filter 
                  ? 'text-primary-orange' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-orange"
                  layoutId="filterIndicator"
                />
              )}
            </button>
          ))}
        </div>
        <div className='flex items-center justify-center gap-3 border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-1 focus-within:ring-primary-orange/30 focus-within:border-primary-orange/50 transition-all'>
          <Icon icon='ic:baseline-search' className='text-gray-400 text-xl' />
          <input
            type='search'
            placeholder='Search websites...'
            className='px-1 py-1 w-full outline-none text-sm'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className='mt-6'>
        {filteredWebsites.length > 0 ? (
          <>
            <div className='hidden md:grid grid-cols-12 gap-4 px-4 py-4 bg-gray-100 rounded-t-lg text-sm font-medium text-gray-600'>
              <div className='col-span-5'>Website</div>
              <div className='col-span-2'>Date Created</div>
              <div className='col-span-2'>Last Updated</div>
              <div className='col-span-2'>Status</div>
              <div className='col-span-1'>Actions</div>
            </div>
            
            <div className='space-y-3 mt-2 cursor-pointer'>
              {filteredWebsites.map((website) => (
                <motion.div 
                  key={website.id}
                  className='grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-gray-100'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Mobile view - stacked layout */}
                  <div className='md:hidden space-y-3'>
                    <div className='flex items-center gap-3'>
                      <img 
                        src={website.image} 
                        alt={website.name} 
                        className='w-16 h-12 object-cover rounded'
                      />
                      <div>
                        <h3 className='font-medium'>{website.name}</h3>
                        <div className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
                          website.status === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {website.status}
                        </div>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 text-sm text-gray-600'>
                      <div>Created: {formatDate(website.dateCreated)}</div>
                      <div>Updated: {formatDate(website.lastUpdated)}</div>
                    </div>
                    <div className='flex justify-end gap-2'>
                      <button className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors'>
                        <Icon icon='mdi:pencil' className='text-lg' />
                      </button>
                      <button className='p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors'>
                        <Icon icon='mdi:delete' className='text-lg' />
                      </button>
                    </div>
                  </div>
                  
                  {/* Desktop view - table layout */}
                  <div className='hidden md:flex md:col-span-5 items-center gap-3'>
                    <img 
                      src={website.image} 
                      alt={website.name} 
                      className='w-16 h-12 object-cover rounded'
                    />
                    <span className='font-medium'>{website.name}</span>
                  </div>
                  <div className='hidden md:flex md:col-span-2 items-center text-gray-600 text-sm'>
                    {formatDate(website.dateCreated)}
                  </div>
                  <div className='hidden md:flex md:col-span-2 items-center text-gray-600 text-sm'>
                    {formatDate(website.lastUpdated)}
                  </div>
                  <div className='hidden md:flex md:col-span-2 items-center'>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      website.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {website.status}
                    </span>
                  </div>
                  <div className='hidden md:flex md:col-span-1 items-center justify-end gap-2'>
                    <button className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors'>
                      <Icon icon='mdi:pencil' className='text-lg' />
                    </button>
                    <button className='p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors'>
                      <Icon icon='mdi:delete' className='text-lg' />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <Icon icon='mdi:web-off' className='text-5xl text-gray-400 mb-4' />
            <h3 className='text-lg font-medium text-gray-700'>No websites found</h3>
            <p className='text-gray-500 mt-1'>
              {searchQuery 
                ? `No results for "${searchQuery}"`
                : `You don't have any ${activeFilter.toLowerCase() !== 'all' ? activeFilter.toLowerCase() : ''} websites yet`
              }
            </p>
            <button className='mt-4 px-4 py-2 bg-primary-orange text-white rounded-lg font-medium hover:bg-primary-orange/90 transition-colors'>
              Create New Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExistingWebsites;
