import { useState } from 'react';
import { FaChevronDown, FaPlus } from 'react-icons/fa';

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownProps {
  title: string;
  items: DropdownItem[];
  navClass: string;

}

const NavHoverDropdown: React.FC<DropdownProps> = ({ title, items, navClass }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}  // Trigger open on hover
      onMouseLeave={handleMouseLeave}  // Trigger close when mouse leaves both button and dropdown
    >
      <button
        id="dropdownHoverButton"
        className="text-white px-4 py-2 flex items-center space-x-2 transition hover:text-[#f2b265]"
        type="button"
      >
        Dropdown hover
        <FaPlus className="ms-1" aria-hidden="true" />
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="dropdownHover"
          className="absolute left-0 pt-7 z-10 "
        >
          <ul className="shadow w-44 bg-black/80 py-2 text-sm "
            style={{ borderBottom: '5px solid #f2b265' }}
          >
            <li>
              <a href="#" className="block text-white px-4 py-2 items-center space-x-2 transition hover:text-[#f2b265]">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block text-white px-4 py-2 items-center space-x-2 transition hover:text-[#f2b265]">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block text-white px-4 py-2 items-center space-x-2 transition hover:text-[#f2b265]">
                Earnings
              </a>
            </li>
            <li>
              <a href="#" className="block text-white px-4 py-2 items-center space-x-2 transition hover:text-[#f2b265]">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavHoverDropdown;
