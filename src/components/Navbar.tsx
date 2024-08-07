import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import useScroll from "./useScroll";
import { FaUserCircle } from "react-icons/fa";

const navItems = [
    { href: "/", label: "HOME" },
    { href: "/guild", label: "GUILD & PEOPLE" },
    { href: "/activity", label: "ACTIVITY" },
    { href: "/news", label: "NEWS" },
    // { href: "/marketplace", label: "MARKET" },
    { href: "/contact", label: "CONTACT" },
    { href: "/login", label: "LOGIN"},
];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scrollY = useScroll();
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`z-50 fixed w-full transition-all duration-150 ${scrollY > 50 ? 'bg-white shadow-lg text-gray-500' : 'bg-white/75 text-gray-500 '}`}>
            <div className="max-w-4xl mx-auto px-5 md:px-10">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-7">
                        <Link href="/">
                            <p className="flex items-center">
                                <span className="font-semibold text-gray-500 text-lg border-2 border-teal-600 px-2">Me-Guild</span>
                            </p>
                        </Link>
                    </div>
                    <div className="hidden lg:flex space-x-1">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <p className={`py-3 px-2 ${router.pathname === item.href ? 'text-teal-600 border-b-4 border-teal-600 font-semibold' : 'font-semibold hover:text-teal-600 transition duration-300'}`}>
                                    {item.label}
                                </p>
                            </Link>
                        ))}
                    </div>
                    <div className="lg:hidden flex items-center">
                        <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
                            {isOpen ? (
                                <svg
                                    className="w-6 h-6 text-gray-500 hover:text-teal-600"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6 text-gray-500 hover:text-teal-600"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className={`lg:hidden h-screen pl-9 ${isOpen ? "block bg-white " : "hidden "}`}>
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <p className={`block text-sm px-2 py-4 ${router.pathname === item.href ? 'text-teal-600 font-semibold' : 'text-gray-500 hover:bg-gray-200 transition duration-300'}`}>
                            {item.label}
                        </p>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;
