import { FC } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownProps {
  title: string;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
}

const NavDropdown: FC<DropdownProps> = ({ title, items, isOpen, onToggle }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700 transition"
      >
        {title}
        <FaPlus className='ms-1'/>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10">
          {items.map((item) => (
            <Link key={item.label} href={item.href} className="block px-4 py-2 text-white hover:bg-gray-700">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
