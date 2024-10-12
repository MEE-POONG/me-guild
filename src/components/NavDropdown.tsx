import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface NavDropdownProps {
  label: string;
  content: React.ReactNode;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ label, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [flyer, setFlyer] = useState(false);
  const [flyerTwo, setFlyerTwo] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="relative flex px-5 py-1 items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <FaChevronDown
          className={`ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200 ${isOpen ? "transform rotate-180" : "transform rotate-0"
            }`}
        />
      </button>
      {isOpen && (
        <div className="opacity-100 translate-y-0 transition ease-out duration-200 absolute z-10 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:left-1/2 lg:-translate-x-1/2">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="relative bg-white px-5 py-6 sm:p-8">{content}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
