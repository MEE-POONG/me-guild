import React, { useState } from "react";

const DropdownButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Dropdown
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded w-48">
          <li className="px-4 py-2 hover:bg-gray-100">
            <a href="#">Option 1</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <a href="#">Option 2</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <a href="#">Option 3</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;