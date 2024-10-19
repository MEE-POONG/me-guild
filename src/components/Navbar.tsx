import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';  // Import useRouter
import { FaPlus } from 'react-icons/fa';
import usePathChecker from '../Function/usePathChecker';

interface NavItem {
    href: string;
    label: string;
    dropdown: boolean;
    list?: { href: string; label: string }[]; // For dropdown items
}

const Navbar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const router = useRouter();
    const { getBasePath } = usePathChecker();
    const basePath = getBasePath();

    useEffect(() => {
        console.log(basePath);
    }, [basePath]);

    const handleMouseEnter = (dropdownLabel: string) => {
        setOpenDropdown(dropdownLabel);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    // Helper function to check if any sub-item of a dropdown is active
    const isAnySubItemActive = (itemHref: string, list?: { href: string }[]) => {
        return list?.some((listPage) => basePath === (itemHref + listPage.href));
    };

    const navItems: NavItem[] = [
        { href: "/", label: "Home", dropdown: false },
        {
            href: "/blog", label: "Blog", dropdown: true, list: [
                { href: "/news", label: "News" },
                { href: "/event", label: "Event" },
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
        <nav className="bg-black/50 px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-lg font-semibold">
                    <img src="/images/logo.png" alt="GoodGames" width={60} height={60} />
                </Link>
                <div className="flex items-center font-mg05 italic">
                    {navItems.map((item) => (
                        <div
                            key={item.label} // Ensure each dropdown has a unique key
                            className="relative inline-block text-left"
                            onMouseEnter={() => handleMouseEnter(item.label)}  // Trigger open on hover
                            onMouseLeave={handleMouseLeave}  // Trigger close when mouse leaves both button and dropdown
                        >
                            <Link href={item.href} className={`px-4 py-1 flex items-center space-x-2 transition hover:text-[#f2b265] ${basePath === item.href ? `text-[#f2b265]` : 'text-white'}`}>
                                {item.label}
                                {item.dropdown &&
                                    <FaPlus className={`ms-1 transition ${basePath === item.href || isAnySubItemActive(item.href, item.list) ? `text-[#f2b265]` : ''} `} aria-hidden="true" />
                                }
                            </Link>
                            {item.dropdown && item.list && (
                                openDropdown === item.label && (
                                    <div
                                        id="dropdownHover"
                                        className="absolute left-0 pt-7 z-10"
                                    >
                                        <ul className="shadow w-44 bg-black/80 py-2 text-sm "
                                            style={{ borderBottom: '5px solid #f2b265' }}
                                        >
                                            {item?.list.map((listPage) => (
                                                <li key={listPage.label}>
                                                    <Link href={item.href + listPage.href} className={`block px-4 py-2 items-center space-x-2 transition hover:text-[#f2b265] ${basePath === item.href + listPage.href ? `text-[#f2b265]` : 'text-white'}`}>
                                                        {listPage.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
