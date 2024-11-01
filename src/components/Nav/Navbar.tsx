import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaPlus} from 'react-icons/fa';
import usePathChecker from '../../Function/usePathChecker';
import { FiAlignJustify, FiX } from 'react-icons/fi';
import Image from 'next/image';

interface NavItem {
    href: string;
    label: string;
    dropdown: boolean;
    list?: { href: string; label: string }[];
}

const Navbar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State สำหรับเมนูมือถือ
    const router = useRouter();
    const { getBasePath } = usePathChecker();
    const basePath = getBasePath();

    const handleMouseEnter = (dropdownLabel: string) => {
        setOpenDropdown(dropdownLabel);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    const isAnySubItemActive = (itemHref: string, list?: { href: string }[]) => {
        return list?.some((listPage) => basePath === (itemHref + listPage.href));
    };

    const navItems: NavItem[] = [
        { href: "/", label: "Home", dropdown: false },
        {
            href: "/news", label: "News", dropdown: true, list: [
                { href: "/blog", label: "Blog" },
            ]
        },
        {
            href: "/guild", label: "Guild", dropdown: true, list: [
                { href: "/list", label: "Guild List" },
                { href: "/register", label: "Guild Register" }
            ]
        },
        {
            href: "/adventurer", label: "Adventurer", dropdown: true, list: [
                { href: "/list", label: "Adventurer List" },
                { href: "/register", label: "Adventurer Register" }
            ]
        },
        { href: "/activity", label: "Activity", dropdown: false },
        { href: "/contact", label: "Contact", dropdown: false },
    ];

    return (
        <nav className="bg-black/50 py-4">
            <div className="container mx-auto flex justify-between items-center px-3">
                <Link href="/" className="text-white text-lg font-semibold">
                    <img src="/images/logo.png" alt="GoodGames" width={60} height={60} />
                </Link>

                {/* Toggle Button for Mobile Menu */}
                <button
                    className="text-white md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FiX size={24} /> : <FiAlignJustify size={24} />}
                </button>

                {/* Main Navigation for Desktop */}
                <div className="hidden md:flex items-center font-mg05 font-bold italic">
                    {navItems.map((item) => (
                        <div
                            key={item.label}
                            className="relative inline-block text-left"
                            onMouseEnter={() => handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link href={item.href} className={`px-4 py-1 flex items-center space-x-2 transition hover:text-[#f2b265] ${basePath === item.href ? `text-[#f2b265]` : 'text-white'}`}>
                                {item.label}
                                {item.dropdown &&
                                    <FaPlus className={`ms-1 transition ${basePath === item.href || isAnySubItemActive(item.href, item.list) ? `text-[#f2b265]` : ''}`} aria-hidden="true" />
                                }
                            </Link>
                            {item.dropdown && item.list && (
                                openDropdown === item.label && (
                                    <div
                                        id="dropdownHover"
                                        className="absolute left-0 pt-7 z-10"
                                    >
                                        <ul className="shadow w-44 bg-black/80 py-2 text-sm" style={{ borderBottom: '5px solid #f2b265' }}>
                                            {item?.list.map((listPage) => (
                                                <li key={listPage.label}>
                                                    <Link href={item.href + listPage.href} className={`block px-4 py-2 transition hover:text-[#f2b265] ${basePath === item.href + listPage.href ? `text-[#f2b265]` : 'text-white'}`}>
                                                        {listPage.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </div>

            </div>


            {/* Mobile Navigation */}
            <div
                className={`md:hidden w-full overflow-hidden transition-max-height duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}
            >
                <div className="bg-black/70 mt-4 px-6 py-4 text-sm h-screen">
                    {navItems.map((item) => (
                        <div key={item.label} className="">
                            <Link href={item.href} className={`block text-white py-2 transition hover:text-[#f2b265]  ${basePath === item.href ? `text-[#f2b265]` : ''}`}>
                                {item.label}
                            </Link>
                            {item.dropdown && item.list && (
                                <ul className="ml-2">
                                    {item.list.map((listPage) => (
                                        <li key={listPage.label}>
                                            <Link href={item.href + listPage.href} className={`block py-1 transition hover:text-[#f2b265] ml-2 ${basePath === item.href + listPage.href ? `text-[#f2b265]` : 'text-white'}`}>
                                               + {listPage.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
