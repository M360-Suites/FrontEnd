import { Icon } from "@iconify/react";
import { notifications } from "../../utils/dummyData";
import { useState } from "react";

const NotificationCard = ({ toggleNotification }) => {
  const [showAll, setShowAll] = useState(false);

  // Display all notifications if showAll is true, otherwise only show first 3
  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

  return (
    <div className='absolute top-full right-0 mt-2 w-80  bg-white shadow-lg rounded-md p-4 z-50 border border-gray-200'>
      <div className='flex gap-4 items-center justify-between'>
        <div>
          <Icon
            className='w-[20px] h-[20px] text-gray-600 cursor-pointer'
            icon='mingcute:notification-line'
          />
        </div>
        <div>
          <small className="font-bold text-[15px]">Notifications</small>
        </div>
        <div>
          <Icon
            onClick={toggleNotification}
            icon={"mdi:close"}
            className='w-[20px] h-[20px] cursor-pointer'
          />
        </div>
      </div>
      <div className='flex flex-col mt-2'>
        {displayedNotifications.map((notification, index) => (
          <div
            key={index}
            className='flex gap-4 items-center justify-between border-b border-gray-300 py-2'
          >
            <div>
              <small className='text-[15px] font-light text-gray-800'>
                {notification.body}
              </small>
            </div>
          </div>
        ))}

        {/* Show "Show All" button if there are more than 3 notifications */}
        {notifications.length > 3 && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className='mt-2 text-primary-orange text-sm font-medium hover:text-light-orange'
          >
            Show All ({notifications.length})
          </button>
        )}

        {/* Show "Show Less" button if showing all notifications */}
        {showAll && notifications.length > 3 && (
          <button
            onClick={() => setShowAll(false)}
            className='mt-2 text-primary-orange text-sm font-medium hover:text-light-orange'
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
