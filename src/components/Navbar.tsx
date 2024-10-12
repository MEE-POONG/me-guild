import { useState } from 'react';
import Link from 'next/link';

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

const Dropdown: React.FC<DropdownProps> = ({ title, items, isOpen, onToggle }) => {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="text-white px-4 py-2 flex items-center space-x-2 hover:bg-gray-700 transition"
            >
                {title}
                <svg
                    className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
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

const Navbar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleToggle = (dropdownTitle: string) => {
        setOpenDropdown(openDropdown === dropdownTitle ? null : dropdownTitle);
    };

    return (
        <nav className="bg-gray-900 px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or Home Link */}
                <Link href="/" className="text-white text-lg font-semibold">
                    MyWebsite
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center space-x-6">
                    {/* Normal Links */}
                    <Link href="/about" className="text-white hover:text-gray-300">
                        About
                    </Link>
                    <Link href="/services" className="text-white hover:text-gray-300">
                        Services
                    </Link>

                    {/* Dropdown Menus */}
                    <Dropdown
                        title="Products"
                        items={[
                            { label: 'Product 1', href: '/products/1' },
                            { label: 'Product 2', href: '/products/2' },
                            { label: 'Product 3', href: '/products/3' },
                        ]}
                        isOpen={openDropdown === 'Products'}
                        onToggle={() => handleToggle('Products')}
                    />

                    <Dropdown
                        title="Categories"
                        items={[
                            { label: 'Category 1', href: '/categories/1' },
                            { label: 'Category 2', href: '/categories/2' },
                            { label: 'Category 3', href: '/categories/3' },
                        ]}
                        isOpen={openDropdown === 'Categories'}
                        onToggle={() => handleToggle('Categories')}
                    />

                    <Dropdown
                        title="More"
                        items={[
                            { label: 'Contact', href: '/contact' },
                            { label: 'FAQ', href: '/faq' },
                            { label: 'Support', href: '/support' },
                        ]}
                        isOpen={openDropdown === 'More'}
                        onToggle={() => handleToggle('More')}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
