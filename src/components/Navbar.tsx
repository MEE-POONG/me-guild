import { useState } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

interface NavItem {
  href: string;
  label: string;
  dropdown: boolean;
  list?: { href: string; label: string }[]; // For dropdown items
}

const Navbar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleMouseEnter = (dropdownLabel: string) => {
    setOpenDropdown(dropdownLabel);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const classNameSetBtnNav = "text-white px-4 py-1 flex items-center space-x-2 transition hover:text-[#f2b265]";
  const navItems: NavItem[] = [
    { href: "/", label: "HOME", dropdown: false },
    { href: "/news", label: "NEWS", dropdown: false },
    {
      href: "/guild", label: "GUILD", dropdown: true, list: [
        { href: "/guild-list", label: "Guild List" },
        { href: "/guild-register", label: "Guild Register" }
      ]
    },
    {
      href: "/adventurer", label: "Adventurer", dropdown: true, list: [
        { href: "/adventurer-list", label: "Adventurer List" },
        { href: "/adventurer-register", label: "Adventurer Register" }
      ]
    },
    { href: "/activity", label: "ACTIVITY", dropdown: false },
    { href: "/contact", label: "CONTACT", dropdown: false },
  ];

  return (
    <nav className="bg-black/50 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-semibold">
          <img src="/images/logo.png" alt="GoodGames" width={60} height={60} />
        </Link>
        <div className="flex items-center">
          {navItems.map((item) => item.dropdown && item.list ? (
            <div
              key={item.label} // Ensure each dropdown has a unique key
              className="relative inline-block text-left"
              onMouseEnter={() => handleMouseEnter(item.label)}  // Trigger open on hover
              onMouseLeave={handleMouseLeave}  // Trigger close when mouse leaves both button and dropdown
            >
              <a
                id="dropdownHoverButton"
                className="text-white px-4 py-2 flex items-center space-x-2 transition hover:text-[#f2b265]"
                type="button"
              >
                {item.label}
                <FaPlus className="ms-1" aria-hidden="true" />
              </a>

              {/* Dropdown menu */}
              {openDropdown === item.label && (
                <div
                  id="dropdownHover"
                  className="absolute left-0 pt-7 z-10"
                >
                  <ul className="shadow w-44 bg-black/80 py-2 text-sm"
                    style={{ borderBottom: '5px solid #f2b265' }}
                  >
                    {item.list.map((listPage) => (
                      <li key={listPage.label}>
                        <Link href={listPage.href} className={`block text-white px-4 py-2 items-center space-x-2 transition hover:text-[#f2b265]`}>
                          {listPage.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link key={item.label} href={item.href} className={classNameSetBtnNav}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
