import Link from "next/link";
import React, { useState } from "react";

const IndexNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed z-50 w-full bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-7">
                        <Link href="/">
                            <p className="flex items-center">
                                <span className="font-semibold text-gray-500 text-lg border-2 border-teal-600 px-2">Me-Guild</span>
                            </p>
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-1">
                        <Link href="/">
                            <p className="py-4 px-2 text-teal-600 border-b-4 border-teal-600 font-semibold">HOME</p>
                        </Link>
                        <Link href="/about">
                            <p className="py-4 px-2 text-gray-500 font-semibold hover:text-teal-600 transition duration-300">ABOUT</p>
                        </Link>
                        <Link href="/services">
                            <p className="py-4 px-2 text-gray-500 font-semibold hover:text-teal-600 transition duration-300">SERVICES</p>
                        </Link>
                        <Link href="/gallery">
                            <p className="py-4 px-2 text-gray-500 font-semibold hover:text-teal-600 transition duration-300">GALLERY</p>
                        </Link>
                        <Link href="/news">
                            <p className="py-4 px-2 text-gray-500 font-semibold hover:text-teal-600 transition duration-300">NEWS</p>
                        </Link>
                        <Link href="/contact">
                            <p className="py-4 px-2 text-gray-500 font-semibold hover:text-teal-600 transition duration-300">CONTACT</p>
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
                            <svg
                                className=" w-6 h-6 text-gray-500 hover:text-teal-600 "
                                x-show="!showMenu"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`md:hidden h-screen ${isOpen ? "block" : "hidden"}`}>
                <Link href="/">
                    <p className="block text-sm px-2 py-4 text-teal-600 font-semibold">HOME</p>
                </Link>
                <Link href="/about">
                    <p className="block text-sm px-2 py-4 text-gray-500 hover:bg-gray-200 transition duration-300">ABOUT</p>
                </Link>
                <Link href="/services">
                    <p className="block text-sm px-2 py-4 text-gray-500 hover:bg-gray-200 transition duration-300">SERVICES</p>
                </Link>
                <Link href="/gallery">
                    <p className="block text-sm px-2 py-4 text-gray-500 hover:bg-gray-200 transition duration-300">GALLERY</p>
                </Link>
                <Link href="/news">
                    <p className="block text-sm px-2 py-4 text-gray-500 hover:bg-gray-200 transition duration-300">NEWS</p>
                </Link>
                <Link href="/contact">
                    <p className="block text-sm px-2 py-4 text-gray-500 hover:bg-gray-200 transition duration-300">CONTACT</p>
                </Link>
            </div>
        </nav>
    )
}
export default IndexNavbar; 