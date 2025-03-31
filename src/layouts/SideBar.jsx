import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { sideBarData } from "../utils/data";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleOpenDropDown = (index) => {
    // Toggle dropdown - close if already open, open if closed
    setOpenDropdown(openDropdown === index ? null : index);
  };
 
  // Check if on mobile screen
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Mobile overlay sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile toggle button */}
        <button
          onClick={toggleMobileMenu}
          className='fixed left-4 bottom-4 z-50 bg-primary-orange text-white rounded-full p-3 shadow-lg'
        >
          <Icon
            icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"}
            className='text-xl'
          />
        </button>

        {/* Mobile sidebar overlay */}
        <div
          className={`
          fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300
          ${
            mobileMenuOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }
        `}
          onClick={toggleMobileMenu}
        ></div>

        <div
          className={`
          fixed left-0 top-0 h-full w-[250px] bg-white z-40 transition-transform duration-300 shadow-xl
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className='flex justify-between items-center p-4 border-b border-gray-200'>
            <h2 className='font-bold text-lg'>M360 Suites</h2>
            <button onClick={toggleMobileMenu}>
              <Icon icon='mdi:close' className='text-xl' />
            </button>
          </div>

          <ul className='space-y-2 px-2 mt-4'>
            {sideBarData.map((item, index) => {
              const isActive = location.pathname === item.path;
              const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;
              // Check if any dropdown item is active
              const isDropdownActive = hasDropdown && 
                item.dropdownItems.some(dropItem => location.pathname === dropItem.path);

              return (
                <li key={index}>
                  {hasDropdown ? (
                    <div>
                      <div
                        className={`
                          flex items-center py-3 px-4 rounded-lg cursor-pointer
                          ${
                            isActive || isDropdownActive
                              ? "bg-primary-orange bg-opacity-10 text-primary-orange font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }
                        `}
                        onClick={() => handleOpenDropDown(index)}
                      >
                        <Icon
                          icon={item.icon || "carbon:dashboard"}
                          className={`text-xl ${
                            isActive || isDropdownActive ? "text-primary-orange" : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`ml-3 ${
                            isActive || isDropdownActive ? "text-primary-orange" : ""
                          }`}
                        >
                          {item.name}
                        </span>
                        <Icon
                          icon={openDropdown === index ? "mdi:chevron-up" : "mdi:chevron-down"}
                          className={`ml-auto ${isActive || isDropdownActive ? "text-primary-orange" : "text-gray-400"}`}
                        />
                      </div>
                     
                      {/* Dropdown items */}
                      {openDropdown === index && (
                        <div className="ml-8 mt-2 space-y-2">
                          {item.dropdownItems.map((dropdownItem, dropIndex) => {
                            const isDropdownItemActive = location.pathname === dropdownItem.path;
                            
                            return (
                              <Link
                                key={dropIndex}
                                to={dropdownItem.path}
                                className={`block py-2 px-3 rounded ${
                                  isDropdownItemActive 
                                    ? "text-primary-orange font-medium bg-primary-orange bg-opacity-10" 
                                    : "text-gray-600 hover:text-primary-orange"
                                }`}
                                onClick={toggleMobileMenu}
                              >
                                {dropdownItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    // For non-dropdown items, use Link directly
                    <Link
                      to={item.path}
                      className={`
                        flex items-center py-3 px-4 rounded-lg
                        ${
                          isActive
                            ? "bg-primary-orange bg-opacity-10 text-primary-orange font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                      onClick={toggleMobileMenu}
                    >
                      <Icon
                        icon={item.icon || "carbon:dashboard"}
                        className={`text-xl ${
                          isActive ? "text-primary-orange" : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`ml-3 ${
                          isActive ? "text-primary-orange" : ""
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Logout positioned closer to the menu items */}
          <div className='px-2 mt-8 border-t border-gray-200 pt-4'>
            <Link
              to='/logout'
              className='flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-100'
              onClick={toggleMobileMenu}
            >
              <Icon
                icon='carbon:logout'
                className='text-xl text-gray-500'
              />
              <span className='ml-3'>Logout</span>
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div
      className={`
        ${collapsed ? "w-[70px]" : "w-[250px]"}
        transition-all duration-300 min-h-screen border-r border-gray-200 bg-white relative
        hidden md:block
      `}
    >
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className='absolute -right-3 top-10 bg-white border border-gray-200 rounded-full p-1 shadow-md z-10'
      >
        <Icon
          icon={collapsed ? "mdi:chevron-right" : "mdi:chevron-left"}
          className='text-gray-600 text-lg'
        />
      </button>

      <ul className={`space-y-3 px-2 mt-6 ${collapsed ? "px-1" : "px-3"}`}>
        {sideBarData.map((item, index) => {
          const isActive = location.pathname === item.path;
          const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;
          // Check if any dropdown item is active
          const isDropdownActive = hasDropdown && 
            item.dropdownItems.some(dropItem => location.pathname === dropItem.path);

          return (
            <li key={index} className="relative">
              {hasDropdown ? (
                <div>
                  <div
                    className={`
                      flex items-center py-3 px-4 rounded-lg cursor-pointer
                      ${
                        isActive || isDropdownActive
                          ? "bg-primary-orange bg-opacity-10 text-primary-orange font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                      ${collapsed ? "justify-center" : "justify-start"}
                      transition-all duration-200
                    `}
                    onClick={() => handleOpenDropDown(index)}
                  >
                    <Icon
                      icon={item.icon || "carbon:dashboard"}
                      className={`text-xl ${
                        isActive || isDropdownActive ? "text-primary-orange" : "text-gray-400"
                      }`}
                    />
                    {!collapsed && (
                      <>
                        <span
                          className={`ml-3 ${
                            isActive || isDropdownActive ? "text-primary-orange" : ""
                          }`}
                        >
                          {item.name}
                        </span>
                        <Icon
                          icon={openDropdown === index ? "mdi:chevron-up" : "mdi:chevron-down"}
                          className={`ml-auto ${isActive || isDropdownActive ? "text-primary-orange" : "text-gray-400"}`}
                        />
                      </>
                    )}
                  </div>
                 
                  {/* Dropdown for desktop */}
                  {openDropdown === index && !collapsed && (
                    <div className="ml-8 mt-2 space-y-2">
                      {item.dropdownItems.map((dropdownItem, dropIndex) => {
                        const isDropdownItemActive = location.pathname === dropdownItem.path;
                        
                        return (
                          <Link
                            key={dropIndex}
                            to={dropdownItem.path}
                            className={`block py-2 px-3 rounded ${
                              isDropdownItemActive 
                                ? "text-primary-orange font-medium bg-primary-orange bg-opacity-10" 
                                : "text-gray-600 hover:text-primary-orange"
                            }`}
                          >
                            {dropdownItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                 
                  {/* Dropdown for collapsed sidebar */}
                  {openDropdown === index && collapsed && (
                    <div className="absolute left-full top-0 mt-0 ml-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      {item.dropdownItems.map((dropdownItem, dropIndex) => {
                        const isDropdownItemActive = location.pathname === dropdownItem.path;
                        
                        return (
                          <Link
                            key={dropIndex}
                            to={dropdownItem.path}
                            className={`block px-4 py-2 ${
                              isDropdownItemActive 
                                ? "text-primary-orange font-medium bg-primary-orange bg-opacity-10" 
                                : "text-gray-700 hover:bg-gray-100 hover:text-primary-orange"
                            }`}
                          >
                            {dropdownItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                // For non-dropdown items, use Link directly
                <Link
                  to={item.path}
                  className={`
                    flex items-center py-3 px-4 rounded-lg
                    ${
                      isActive
                        ? "bg-primary-orange bg-opacity-10 text-primary-orange font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                    ${collapsed ? "justify-center" : "justify-start"}
                    transition-all duration-200
                  `}
                >
                  <Icon
                    icon={item.icon || "carbon:dashboard"}
                    className={`text-xl ${
                      isActive ? "text-primary-orange" : "text-gray-400"
                    }`}
                  />
                  {!collapsed && (
                    <span
                      className={`ml-3 ${
                        isActive ? "text-primary-orange" : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              )}
            </li>
          );
        })}

        {/* Logout positioned closer to the menu items */}
        <li className='mt-8 pt-4 border-t border-gray-200'>
          <Link
            to='/logout'
            className={`
              flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-100
              ${collapsed ? "justify-center" : "justify-start"}
            `}
          >
            <Icon icon='carbon:logout' className='text-xl text-gray-500' />
            {!collapsed && <span className='ml-3'>Logout</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
