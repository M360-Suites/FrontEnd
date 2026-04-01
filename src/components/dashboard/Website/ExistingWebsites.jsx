import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { vector, veeTwo } from "../../../assets";
import { motion } from "framer-motion";
import {
	deleteWebsite,
	updateWebsite,
} from "../../../functions/websiteFunctions";

const ExistingWebsites = ({ websites = [], onWebsiteUpdate, onWebsiteDelete }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingWebsite, setEditingWebsite] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Filter websites based on active filter and search query
  const filteredWebsites = websites.filter(website => {
    const matchesFilter = activeFilter === "All" || 
      (activeFilter === "Published" && website.status === "published") ||
      (activeFilter === "Drafts" && website.status === "draft");
    const matchesSearch = website.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Format date to more readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get placeholder image based on website name or use default
  const getWebsiteImage = (website) => {
    const images = [veeTwo, vector];
    return images[Math.abs(website.name.length) % images.length];
  };

  // Get status counts for filter labels
  const getStatusCounts = () => {
    const published = websites.filter(w => w.status === "published").length;
    const drafts = websites.filter(w => w.status === "draft").length;
    return {
      all: websites.length,
      published,
      drafts
    };
  };

  const counts = getStatusCounts();

  const handleEdit = (website) => {
    setEditingWebsite(website);
  };

  const handleSaveEdit = async (websiteId, updatedData) => {
    try {
      const response = await updateWebsite(websiteId, { newData: updatedData });
      if (onWebsiteUpdate) {
        onWebsiteUpdate(websiteId, updatedData);
      }
      setEditingWebsite(null);
      console.log("Website updated successfully:", response);
    } catch (error) {
      console.error("Failed to update website:", error);
      // You might want to show an error toast here
    }
  };

  const handleCancelEdit = () => {
    setEditingWebsite(null);
  };

  const handleDelete = (website) => {
    setShowDeleteConfirm(website);
  };

  const confirmDelete = async (websiteId) => {
    try {
      setIsDeleting(websiteId);
      await deleteWebsite(websiteId);
      if (onWebsiteDelete) {
        onWebsiteDelete(websiteId);
      }
      setShowDeleteConfirm(null);
      console.log("Website deleted successfully");
    } catch (error) {
      console.error("Failed to delete website:", error);
      // You might want to show an error toast here
    } finally {
      setIsDeleting(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const handleCreateNew = () => {
    // This could trigger the create website modal
    console.log("Create new website");
  };

  return (
    <div className='p-4 md:p-6 bg-gray-50 rounded-lg'>
      <div className='flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4 gap-4'>
        <div className='flex gap-6'>
          {[
            { key: "All", label: `All (${counts.all})` },
            { key: "Published", label: `Published (${counts.published})` },
            { key: "Drafts", label: `Drafts (${counts.drafts})` }
          ].map((filter) => (
            <button
              key={filter.key}
              className={`px-2 py-1 font-medium text-sm transition-colors relative ${
                activeFilter === filter.key 
                  ? 'text-primary-orange' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
              {activeFilter === filter.key && (
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
              <div className='col-span-4'>Website</div>
              <div className='col-span-2'>URL</div>
              <div className='col-span-2'>Date Created</div>
              <div className='col-span-2'>Last Updated</div>
              <div className='col-span-1'>Status</div>
              <div className='col-span-1'>Actions</div>
            </div>
            
            <div className='space-y-3 mt-2'>
              {filteredWebsites.map((website) => (
                <motion.div 
                  key={website._id}
                  className='grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-gray-100 cursor-pointer'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Mobile view - stacked layout */}
                  <div className='md:hidden space-y-3'>
                    <div className='flex items-center gap-3'>
                      <img 
                        src={getWebsiteImage(website)} 
                        alt={website.name} 
                        className='w-16 h-12 object-cover rounded'
                      />
                      <div className='flex-1'>
                        <h3 className='font-medium text-gray-900'>{website.name}</h3>
                        <p className='text-sm text-gray-500 truncate'>{website.url}</p>
                        {website.description && (
                          <p className='text-xs text-gray-400 truncate mt-1'>{website.description}</p>
                        )}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full capitalize ${
                        website.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {website.status}
                      </div>
                    </div>
                    <div className='grid grid-cols-2 text-sm text-gray-600'>
                      <div>Created: {formatDate(website.createdAt)}</div>
                      <div>Updated: {formatDate(website.updatedAt)}</div>
                    </div>
                    <div className='flex justify-end gap-2'>
                      <button 
                        onClick={() => handleEdit(website)}
                        className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors'
                        title="Edit website"
                      >
                        <Icon icon='mdi:pencil' className='text-lg' />
                      </button>
                      <button 
                        onClick={() => handleDelete(website)}
                        className='p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors'
                        title="Delete website"
                      >
                        <Icon icon='mdi:delete' className='text-lg' />
                      </button>
                    </div>
                  </div>
                  
                  {/* Desktop view - table layout */}
                  <div className='hidden md:flex md:col-span-4 items-center gap-3'>
                    <img 
                      src={getWebsiteImage(website)} 
                      alt={website.name} 
                      className='w-16 h-12 object-cover rounded flex-shrink-0'
                    />
                    <div className='min-w-0 flex-1'>
                      <div className='font-medium text-gray-900 truncate'>{website.name}</div>
                      {website.description && (
                        <div className='text-sm text-gray-500 truncate'>{website.description}</div>
                      )}
                    </div>
                  </div>
                  <div className='hidden md:flex md:col-span-2 items-center text-gray-600 text-sm'>
                    <a 
                      href={website.url.startsWith('http') ? website.url : `https://${website.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-blue-600 hover:underline truncate'
                      onClick={(e) => e.stopPropagation()}
                    >
                      {website.url}
                    </a>
                  </div>
                  <div className='hidden md:flex md:col-span-2 items-center text-gray-600 text-sm'>
                    {formatDate(website.createdAt)}
                  </div>
                  <div className='hidden md:flex md:col-span-2 items-center text-gray-600 text-sm'>
                    {formatDate(website.updatedAt)}
                  </div>
                  <div className='hidden md:flex md:col-span-1 items-center'>
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                      website.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {website.status}
                    </span>
                  </div>
                  <div className='hidden md:flex md:col-span-1 items-center justify-end gap-1'>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(website);
                      }}
                      className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors'
                      title="Edit website"
                    >
                      <Icon icon='mdi:pencil' className='text-lg' />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(website);
                      }}
                      className='p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors'
                      title="Delete website"
                    >
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
            <button 
              onClick={handleCreateNew}
              className='mt-4 px-4 py-2 bg-primary-orange text-white rounded-lg font-medium hover:bg-primary-orange/90 transition-colors'
            >
              Create New Website
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingWebsite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Edit Website</h3>
            <EditWebsiteForm
              website={editingWebsite}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              <Icon icon="mdi:alert-circle" className="text-red-500 text-2xl mr-3" />
              <h3 className="text-lg font-semibold">Delete Website</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{showDeleteConfirm.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isDeleting === showDeleteConfirm._id}
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(showDeleteConfirm._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                disabled={isDeleting === showDeleteConfirm._id}
              >
                {isDeleting === showDeleteConfirm._id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Edit Website Form Component
const EditWebsiteForm = ({ website, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: website.name,
    url: website.url,
    description: website.description || ""
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(website._id, formData);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Website Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-orange focus:border-primary-orange"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL
        </label>
        <input
          type="text"
          value={formData.url}
          onChange={(e) => handleChange('url', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-orange focus:border-primary-orange"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-orange focus:border-primary-orange"
          rows="3"
        />
      </div>
      
      <div className="flex gap-3 justify-end pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={isSaving}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-primary-orange/90 transition-colors flex items-center gap-2"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  );
};

export default ExistingWebsites;