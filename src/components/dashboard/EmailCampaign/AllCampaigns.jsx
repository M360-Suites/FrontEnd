import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { campaignsData } from "../../../utils/dummyData";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState(campaignsData);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [actionMenuId, setActionMenuId] = useState(null);

  // Filter campaigns based on selected filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesType = typeFilter === "" || campaign.type === typeFilter;
    const matchesStatus =
      statusFilter === "" || campaign.status === statusFilter;
    return matchesType && matchesStatus;
  });

  // Handle checkbox selection
  const handleSelectCampaign = (id) => {
    if (selectedCampaigns.includes(id)) {
      setSelectedCampaigns(
        selectedCampaigns.filter((campaignId) => campaignId !== id)
      );
    } else {
      setSelectedCampaigns([...selectedCampaigns, id]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedCampaigns.length === filteredCampaigns.length) {
      setSelectedCampaigns([]);
    } else {
      setSelectedCampaigns(
        filteredCampaigns.map((campaign) => campaign.id)
      );
    }
  };

  // Handle delete selected campaigns
  const handleDeleteSelected = () => {
    setCampaigns(
      campaigns.filter(
        (campaign) => !selectedCampaigns.includes(campaign.id)
      )
    );
    setSelectedCampaigns([]);
    setShowActionMenu(false);
  };

  // Handle individual campaign actions
  const toggleActionMenu = (id) => {
    if (actionMenuId === id) {
      setActionMenuId(null);
    } else {
      setActionMenuId(id);
    }
  };

  // Handle delete single campaign
  const handleDeleteCampaign = (id) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    setActionMenuId(null);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className='p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen'>
      {/* Header and Filters */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
        <h1 className='text-xl md:text-2xl font-bold text-gray-800'>
          All Campaigns
        </h1>

        <div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto'>
          {/* Type Filter */}
          <div className='relative'>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className='appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary-orange/30 focus:border-primary-orange'
            >
              <option value=''>All Types</option>
              <option value='One-Time'>One-Time</option>
              <option value='Drip Campaign'>Drip Campaign</option>
            </select>
            <Icon
              icon='mdi:chevron-down'
              className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none'
            />
          </div>

          {/* Status Filter */}
          <div className='relative'>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary-orange/30 focus:border-primary-orange'
            >
              <option value=''>All Status</option>
              <option value='Active'>Active</option>
              <option value='Failed'>Failed</option>
              <option value='Completed'>Completed</option>
            </select>
            <Icon
              icon='mdi:chevron-down'
              className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none'
            />
          </div>

          {/* Create Campaign Button */}
          <button className='bg-primary-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-orange/90 transition-colors flex items-center justify-center'>
            <Icon icon='mdi:plus' className='mr-1' />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Selected Actions Menu */}
      {selectedCampaigns.length > 0 && (
        <div className='bg-white rounded-lg shadow-sm p-3 mb-4 flex justify-between items-center'>
          <div className='flex items-center'>
            <span className='text-sm font-medium text-gray-700'>
              {selectedCampaigns.length}{" "}
              {selectedCampaigns.length === 1 ? "campaign" : "campaigns"}{" "}
              selected
            </span>
          </div>
          <div className='flex gap-2 relative'>
            <button
              className='text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-md text-sm font-medium flex items-center transition-colors'
              onClick={() => setShowActionMenu(!showActionMenu)}
            >
              Actions
              <Icon icon='mdi:chevron-down' className='ml-1' />
            </button>

            {showActionMenu && (
              <div className='absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-10 border border-gray-200'>
                <button
                  className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700'
                  onClick={() => {
                    /* Handle edit action */
                  }}
                >
                  <Icon icon='mdi:pencil' className='mr-2' />
                  Edit
                </button>
                <button
                  className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-red-600'
                  onClick={handleDeleteSelected}
                >
                  <Icon icon='mdi:delete' className='mr-2' />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Campaigns Table */}
      <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
        {/* Table Header */}
        <div className='hidden md:grid grid-cols-7 gap-4 p-4 bg-gray-50 border-b border-gray-200'>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={
                selectedCampaigns.length === filteredCampaigns.length &&
                filteredCampaigns.length > 0
              }
              onChange={handleSelectAll}
              className='w-4 h-4 text-primary-orange rounded focus:ring-primary-orange'
            />
            <span className='ml-3 text-sm font-medium text-gray-700'>
              Campaign Name
            </span>
          </div>
          <div className='text-sm font-medium text-gray-700'>Type</div>
          <div className='text-sm font-medium text-gray-700'>
            Total Sent
          </div>
          <div className='text-sm font-medium text-gray-700'>
            Total Delivered
          </div>
          <div className='text-sm font-medium text-gray-700'>
            Open Rate
          </div>
          <div className='text-sm font-medium text-gray-700'>Status</div>
          <div className='text-sm font-medium text-gray-700 text-right'>
            Actions
          </div>
        </div>

        {/* Mobile Header - Only visible on small screens */}
        <div className='md:hidden p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center'>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={
                selectedCampaigns.length === filteredCampaigns.length &&
                filteredCampaigns.length > 0
              }
              onChange={handleSelectAll}
              className='w-4 h-4 text-primary-orange rounded focus:ring-primary-orange'
            />
            <span className='ml-2 text-sm font-medium text-gray-700'>
              Select All
            </span>
          </div>
          <span className='text-sm font-medium text-gray-700'>
            {filteredCampaigns.length} Campaigns
          </span>
        </div>

        {/* Table Body */}
        <div className='divide-y divide-gray-200'>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className='hover:bg-gray-50 transition-colors'
              >
                {/* Desktop Row */}
                <div className='hidden md:grid grid-cols-7 gap-4 p-4 items-center'>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={selectedCampaigns.includes(campaign.id)}
                      onChange={() => handleSelectCampaign(campaign.id)}
                      className='w-4 h-4 text-primary-orange rounded focus:ring-primary-orange'
                    />
                    <div className='ml-3 flex items-center'>
                      <img
                        src={campaign.image}
                        alt={campaign.name}
                        className='w-8 h-8 rounded-full object-cover mr-2'
                      />
                      <span className='font-medium text-gray-800'>
                        {campaign.name}
                      </span>
                    </div>
                  </div>
                  <div className='text-sm text-gray-600'>
                    {campaign.type}
                  </div>
                  <div className='text-sm text-gray-600'>
                    {campaign.totalSent.toLocaleString()}
                  </div>
                  <div className='text-sm text-gray-600'>
                    {campaign.totalDelivered.toLocaleString()}
                  </div>
                  <div className='text-sm text-gray-600'>
                    {campaign.openRate}%
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <div className='text-right relative'>
                    <button
                      className='text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100'
                      onClick={() => toggleActionMenu(campaign.id)}
                    >
                      <Icon icon='mdi:dots-vertical' className='text-xl' />
                    </button>

                    {actionMenuId === campaign.id && (
                      <div className='absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-10 border border-gray-200'>
                        <button
                          className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700'
                          onClick={() => {
                            /* Handle edit action */
                          }}
                        >
                          <Icon icon='mdi:pencil' className='mr-2' />
                          Edit
                        </button>

                        <button
                          className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-red-600'
                          onClick={() => handleDeleteCampaign(campaign.id)}
                        >
                          <Icon icon='mdi:delete' className='mr-2' />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Row */}
                <div className='md:hidden p-4'>
                  <div className='flex items-start'>
                    <input
                      type='checkbox'
                      checked={selectedCampaigns.includes(campaign.id)}
                      onChange={() => handleSelectCampaign(campaign.id)}
                      className='w-4 h-4 text-primary-orange rounded focus:ring-primary-orange mt-1'
                    />
                    <div className='ml-3 flex-1'>
                      <div className='flex justify-between items-start'>
                        <div className='flex items-center'>
                          <img
                            src={campaign.image}
                            alt={campaign.name}
                            className='w-8 h-8 rounded-full object-cover mr-2'
                          />
                          <span className='font-medium text-gray-800'>
                            {campaign.name}
                          </span>
                        </div>
                        <div className='relative'>
                          <button
                            className='text-gray-500 p-1 rounded-full hover:bg-gray-100'
                            onClick={() => toggleActionMenu(campaign.id)}
                          >
                            <Icon
                              icon='mdi:dots-vertical'
                              className='text-xl'
                            />
                          </button>

                          {actionMenuId === campaign.id && (
                            <div className='absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-10 border border-gray-200'>
                              <button
                                className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700'
                                onClick={() => {
                                  /* Handle edit action */
                                }}
                              >
                                <Icon icon='mdi:pencil' className='mr-2' />
                                Edit
                              </button>

                              <button
                                className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-red-600'
                                onClick={() =>
                                  handleDeleteCampaign(campaign.id)
                                }
                              >
                                <Icon icon='mdi:delete' className='mr-2' />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='grid grid-cols-2 gap-3 mt-3 text-xs text-gray-500'>
                        <div>
                          <p className='font-medium text-gray-700'>
                            {campaign.type}
                          </p>
                          <p>Type</p>
                        </div>
                        <div>
                          <p className='font-medium text-gray-700'>
                            {campaign.totalSent.toLocaleString()}
                          </p>
                          <p>Total Sent</p>
                        </div>
                        <div>
                          <p className='font-medium text-gray-700'>
                            {campaign.totalDelivered.toLocaleString()}
                          </p>
                          <p>Delivered</p>
                        </div>
                        <div>
                          <p className='font-medium text-gray-700'>
                            {campaign.openRate}%
                          </p>
                          <p>Open Rate</p>
                        </div>
                      </div>

                      <div className='mt-3'>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            campaign.status
                          )}`}
                        >
                          {campaign.status}
                        </span>
                        <span className='text-xs text-gray-500 ml-2'>
                          {new Date(campaign.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='py-12 text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4'>
                <Icon
                  icon='mdi:email-outline'
                  className='text-3xl text-gray-400'
                />
              </div>
              <h3 className='text-lg font-medium text-gray-900 mb-1'>
                No campaigns found
              </h3>
              <p className='text-gray-500 max-w-md mx-auto'>
                {typeFilter || statusFilter
                  ? "Try adjusting your filters to see more results"
                  : "Get started by creating your first email campaign"}
              </p>
              {!typeFilter && !statusFilter && (
                <button className='mt-4 bg-primary-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-orange/90 transition-colors flex items-center justify-center mx-auto'>
                  <Icon icon='mdi:plus' className='mr-1' />
                  Create Campaign
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredCampaigns.length > 0 && (
          <div className='flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6'>
            <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
              <div>
                <p className='text-sm text-gray-700'>
                  Showing <span className='font-medium'>1</span> to{" "}
                  <span className='font-medium'>
                    {filteredCampaigns.length}
                  </span>{" "}
                  of{" "}
                  <span className='font-medium'>
                    {filteredCampaigns.length}
                  </span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className='isolate inline-flex -space-x-px rounded-md shadow-sm'
                  aria-label='Pagination'
                >
                  <button className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                    <span className='sr-only'>Previous</span>
                    <Icon
                      icon='mdi:chevron-left'
                      className='h-5 w-5'
                      aria-hidden='true'
                    />
                  </button>
                  <button
                    aria-current='page'
                    className='relative z-10 inline-flex items-center bg-primary-orange px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange'
                  >
                    1
                  </button>
                  <button className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                    <span className='sr-only'>Next</span>
                    <Icon
                      icon='mdi:chevron-right'
                      className='h-5 w-5'
                      aria-hidden='true'
                    />
                  </button>
                </nav>
              </div>
            </div>

            {/* Mobile pagination */}
            <div className='flex sm:hidden items-center justify-between w-full'>
              <button className='relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                Previous
              </button>
              <p className='text-sm text-gray-700'>
                Page <span className='font-medium'>1</span> of{" "}
                <span className='font-medium'>1</span>
              </p>
              <button className='relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCampaigns;
