import { useState } from 'react';
import Link from 'next/link';
import NavDropdown from './NavDropdown';

interface NavItem {
    href: string;
    label: string;
    dropdown: boolean;
    list?: { href: string; label: string }[]; // For dropdown items
}

const Navbar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleToggle = (dropdownTitle: string) => {
        setOpenDropdown(openDropdown === dropdownTitle ? null : dropdownTitle);
    };
    const classNameSetBtnNav = "text-white px-4 py-2 flex items-center space-x-2 transition hover:text-[#f2b265]";
    const navItems: NavItem[] = [
        { href: "/", label: "HOME", dropdown: false },
        {
            href: "/guild", label: "GUILD", dropdown: true, list: [
                { href: "/guild-list", label: "Guild List" },
                { href: "/guild-register", label: "Guild Register" }
            ]
        },
        { href: "/activity", label: "ACTIVITY", dropdown: false },
        { href: "/news", label: "NEWS", dropdown: false },
        { href: "/contact", label: "CONTACT", dropdown: false },
    ];

    return (
        <nav className="bg-black/50 px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or Home Link */}
                <Link href="/" className="text-white text-lg font-semibold">
                <img src="/images/logo.png" alt="GoodGames" width={60} height={60}  />
                </Link>
                {/* Navigation Links */}
                <div className="flex items-center">
                    {navItems.map((item) =>
                        item.dropdown && item.list ? (
                            <NavDropdown
                                key={item.label}
                                title={item.label}
                                items={item.list}
                                isOpen={openDropdown === item.label}
                                onToggle={() => handleToggle(item.label)}
                                navClass={classNameSetBtnNav}
                            />
                        ) : (
                            <Link key={item.label} href={item.href} className={classNameSetBtnNav}>
                                {item.label}
                            </Link>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
