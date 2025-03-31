import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { onboardingHeaderLinks } from "../utils/data";
import { Icon } from "@iconify/react";

const DropdownMenu = ({ items, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className='absolute mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10'>
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-orange'
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

const MobileMenuItem = ({ link, isOpen, toggleOpen }) => {
  return (
    <div className='border-b border-gray-300 py-3'>
      <div
        className='flex justify-between items-center px-4 py-2 cursor-pointer'
        onClick={toggleOpen}
      >
        <span className='font-medium text-gray-800'>{link.name}</span>
        <Icon
          icon={isOpen ? "mingcute:up-line" : "mingcute:down-line"}
          className='h-5 w-5 text-gray-500'
        />
      </div>

      {isOpen && link.dropdownItems && (
        <div className='mt-2 pl-6 space-y-2'>
          {link.dropdownItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className='block py-2 text-gray-600 hover:text-primary-orange'
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const OnBoardingHeader = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        openMenu
      ) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openMenu]);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleDropdownToggle = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  const toggleMobileDropdown = (index) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className='sticky top-0 z-50 bg-white shadow-md'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link to='/' className='flex items-center'>
              <span className='font-bold text-2xl text-primary-orange'>
                M360
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className='hidden md:flex space-x-8'>
            {onboardingHeaderLinks.map((link, index) => (
              <div key={index} className='relative'>
                <button
                  className='flex items-center text-gray-700 hover:text-primary-orange px-3 py-2 rounded-md text-sm font-medium'
                  onClick={() => handleDropdownToggle(index)}
                >
                  {link.name}
                  {openDropdown === index ? (
                    <Icon
                      icon={"mingcute:up-line"}
                      className='ml-1 h-4 w-4'
                    />
                  ) : (
                    <Icon
                      icon={"mingcute:down-line"}
                      className='ml-1 h-4 w-4'
                    />
                  )}
                </button>
                <DropdownMenu
                  items={link.dropdownItems}
                  isOpen={openDropdown === index}
                />
              </div>
            ))}
          </nav>

          {/* Right side - Login and Language */}
          <div className='flex items-center space-x-4'>
            <div className='relative md:block hidden'>
              <select
                name='language'
                className='appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent'
              >
                <option value='en'>EN</option>
                <option value='fr'>FR</option>
                <option value='es'>ES</option>
              </select>
              <Icon
                icon={"mingcute:down-line"}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500'
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button className='text-gray-700' onClick={handleOpenMenu}>
              <Icon icon={"mingcute:menu-line"} className='h-6 w-6' />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {openMenu && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity'>
          <div
            ref={menuRef}
            className='fixed right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform ease-in-out duration-300'
          >
            <div className='flex justify-between items-center p-4 border-b border-gray-200'>
              <span className='font-bold text-xl text-primary-orange'>
                M360
              </span>
              <button
                className='text-gray-700 hover:text-gray-900 focus:outline-none'
                onClick={handleCloseMenu}
              >
                <Icon icon={"mingcute:close-line"} className='h-6 w-6' />
              </button>
            </div>

            <div className='overflow-y-auto h-[calc(100%-60px)]'>
              <div className='py-2'>
                {onboardingHeaderLinks.map((link, index) => (
                  <MobileMenuItem
                    key={index}
                    link={link}
                    isOpen={mobileDropdowns[index]}
                    toggleOpen={() => toggleMobileDropdown(index)}
                  />
                ))}
              </div>

              <div className='p-4 border-t border-gray-200'>
                <div className='relative'>
                  <select
                    name='language'
                    className='w-full appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent'
                  >
                    <option value='en'>English</option>
                    <option value='fr'>French</option>
                    <option value='es'>Spanish</option>
                  </select>
                  <Icon
                    icon={"mingcute:down-line"}
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnBoardingHeader;
