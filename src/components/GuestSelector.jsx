import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineDown } from 'react-icons/ai';

const GuestSelector = ({adults, setAdults, children, setChildren, rooms, setRooms}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => {
    if (value > 0) setter(value - 1);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left mt-1" ref={dropdownRef}>
      {/* Input Field with Dropdown Button */}
      <div className="flex items-center justify-start border-none rounded-md  px-4 py-2 bg-white text-md">
        <span className="flex-grow">
          {adults} Adults, {children} Children, {rooms} Room{rooms > 1 ? 's' : ''}
        </span>
        <button
          onClick={toggleDropdown}
          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <AiOutlineDown size={15} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {/* Adults Selector */}
            <div className="flex justify-between items-center px-4 py-2">
              <span>Adults</span>
              <div className="flex items-center">
                <button
                  onClick={() => decrement(setAdults, adults)}
                  className="px-2 py-1 border rounded-l-md"
                >
                  -
                </button>
                <span className="px-4">{adults}</span>
                <button
                  onClick={() => increment(setAdults, adults)}
                  className="px-2 py-1 border rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children Selector */}
            <div className="flex justify-between items-center px-4 py-2">
              <span>Children</span>
              <div className="flex items-center">
                <button
                  onClick={() => decrement(setChildren, children)}
                  className="px-2 py-1 border rounded-l-md"
                >
                  -
                </button>
                <span className="px-4">{children}</span>
                <button
                  onClick={() => increment(setChildren, children)}
                  className="px-2 py-1 border rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Rooms Selector */}
            <div className="flex justify-between items-center px-4 py-2">
              <span>Rooms</span>
              <div className="flex items-center">
                <button
                  onClick={() => decrement(setRooms, rooms)}
                  className="px-2 py-1 border rounded-l-md"
                >
                  -
                </button>
                <span className="px-4">{rooms}</span>
                <button
                  onClick={() => increment(setRooms, rooms)}
                  className="px-2 py-1 border rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Done Button */}
            <div className="flex justify-end px-4 py-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestSelector;
