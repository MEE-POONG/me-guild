import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';  // Import useRouter
import { FaPlus } from 'react-icons/fa';
import usePathChecker from './check/usePathChecker';

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

    // Function to check if any link in the dropdown list is active
    // const isDropdownItemActive = (href: string, list?: { href: string; label: string }[]) => {
    //     if (list) {
    //         return list.some(listPage => router.asPath === href + listPage.href);
    //     }
    //     return false;
    // };

    const navItems: NavItem[] = [
        { href: "/", label: "HOME", dropdown: false },
        {
            href: "/blog", label: "Blog", dropdown: true, list: [
                { href: "/news", label: "NEWS" },
                { href: "/event", label: "event" },
            ]
        },
        {
            href: "/guild", label: "GUILD", dropdown: true, list: [
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
                            <Link href={item.href} className={`text-white px-4 py-1 flex items-center space-x-2 transition`}>
                                {item.label}
                                <FaPlus className={`ms-1 transition ${openDropdown === item.label ? `text-[#f2b265]` : ''} `} aria-hidden="true" />
                            </Link>

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
                                                <Link href={item.href + listPage.href} className={`block text-white px-4 py-2 items-center space-x-2 transition ${openDropdown === item.label ? `text-[#f2b265]` : ''}`}>
                                                    {listPage.label} {openDropdown === item.label ? `true` : `false`}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link key={item.label} href={item.href} className={`text-white px-4 py-1 flex items-center space-x-2 transition hover:text-[#f2b265] ${openDropdown === item.label ? `text-[#f2b265]` : ''}`}>
                            {item.label}
                            {/* {basePath} */}
                            {/* {openDropdown === item.label ? `true` : `false`} {openDropdown} */}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
