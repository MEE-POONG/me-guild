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
  navClass: string;
  onToggle: () => void;
  onClose: () => void;

}

const NavClickDropdown: FC<DropdownProps> = ({ title, items, navClass, isOpen, onToggle, onClose }) => {
  return (
    <div
      className="relative"
      onMouseEnter={onToggle} // Trigger open on hover
      onMouseLeave={onClose}  // Trigger close when mouse leaves
    >
      <button
        className={navClass}
        style={{ color: isOpen ? '#f2b265' : undefined }}
      >
        {title}
        <FaPlus className="ms-1" />
      </button>
      {isOpen && (
        <div
          className="absolute left-0 mt-8 w-48 bg-black/80 shadow-lg z-10"
          style={{ borderBottom: '5px solid #f2b265' }}
        >
          {items.map((item) => (
            <Link key={item.label} href={item.href} className={navClass}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};


export default NavClickDropdown;
