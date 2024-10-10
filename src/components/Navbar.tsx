import React, { useState } from "react";
import { useRouter } from "next/router";
import useScroll from "./useScroll";
import { FaRss, FaTwitch, FaSteam, FaFacebook, FaGooglePlus, FaTwitter, FaPinterestP, FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';
import Link from "next/link";

const navItems = [
    { href: "/", label: "HOME" },
    { href: "/guild", label: "GUILD" },
    { href: "/activity", label: "ACTIVITY" },
    { href: "/news", label: "NEWS" },
    { href: "/contact", label: "CONTACT" },
];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scrollY = useScroll();
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="relative z-10 bg-transparent">
            {/* Top Contacts */}
            <div className="bg-dark-1 text-white py-2">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-4">
                        <a href="#" className="text-white"><FaRss /></a>
                        <a href="#" className="text-white"><FaTwitch /></a>
                        <a href="#" className="text-white"><FaSteam /></a>
                        <a href="#" className="text-white"><FaFacebook /></a>
                        <a href="#" className="text-white"><FaGooglePlus /></a>
                        <a href="#" className="text-white" target="_blank"><FaTwitter /></a>
                        <a href="#" className="text-white"><FaPinterestP /></a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-white"><FaSearch /></a>
                        <a href="#" className="text-white"><FaUser /></a>
                        <div className="relative">
                            <FaShoppingCart className="text-white" />
                            <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-1">27</span>
                            {/* Cart dropdown */}
                            {/* <div className="absolute right-0 mt-2 bg-white text-black shadow-lg w-64">
                                <div className="p-4 flex items-center">
                                    <Image src="/assets/images/product-5-xs.jpg" alt="In all revolutions of" width={40} height={40} />
                                    <div className="ml-3">
                                        <h3 className="text-sm">In all revolutions of</h3>
                                        <span className="text-sm text-gray-500">€ 23.00</span>
                                    </div>
                                </div>
                                <div className="text-center p-2">
                                    <a href="/store-checkout.html" className="bg-red-500 text-white py-2 px-4 rounded-full">Proceed to Checkout</a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <nav className="bg-dark-2 text-white sticky top-0 z-20">
                <div className="container mx-auto flex justify-between items-center py-4">
                    <a href="/" className="text-xl font-bold">
                        <Image src="/images/logo.png" alt="GoodGames" width={199} height={50} />
                    </a>
                    <ul className="hidden lg:flex space-x-6">
                        <li className="relative group">
                            <a href="elements.html" className="hover:text-red-500">Features</a>
                            <a href="elements.html" className="hover:text-red-500">Features</a>
                            <a href="elements.html" className="hover:text-red-500">Features</a>
                            <a href="elements.html" className="hover:text-red-500">Features</a>
                            <a href="elements.html" className="hover:text-red-500">Features</a>
                            {/* <ul className="absolute hidden group-hover:block bg-dark-2 mt-2 space-y-2 p-4">
                                <li><a href="elements.html" className="hover:text-red-500">Elements (Shortcodes)</a></li>
                                <li>
                                    <a href="forum.html" className="hover:text-red-500">Forum</a>
                                    <ul className="mt-2 space-y-2 pl-4">
                                        <li><a href="forum.html" className="hover:text-red-500">Forum</a></li>
                                        <li><a href="forum-topics.html" className="hover:text-red-500">Topics</a></li>
                                        <li><a href="forum-single-topic.html" className="hover:text-red-500">Single Topic</a></li>
                                    </ul>
                                </li>
                                <li><a href="widgets.html" className="hover:text-red-500">Widgets</a></li>
                                <li><a href="coming-soon.html" className="hover:text-red-500">Coming Soon</a></li>
                                <li><a href="offline.html" className="hover:text-red-500">Offline</a></li>
                                <li><a href="404.html" className="hover:text-red-500">404</a></li>
                            </ul> */}
                            
                        </li>
                        {/* Add more menu items following the pattern */}
                    </ul>
                    <div className="lg:hidden">
                        <button className="text-white">Menu</button>
                    </div>
                </div>
            </nav>
        </header>


    );
};

export default Navbar;
