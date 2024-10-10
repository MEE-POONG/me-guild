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
      
            <nav className="relative bg-black bg-opacity-60 p-7 font-montserrat text-[1.07rem] text-white transition-colors duration-300 z-1000">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="/" className="text-xl font-bold">
                        <Image src="/images/logo.png" alt="GoodGames" width={100} height={100} />
                    </a>
                    <ul className="hidden lg:flex space-x-6">
                        <li className="relative group">
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
                        <li className="relative group">
                            <a href="elements.html" className="hover:text-red-500">
                                Features
                            </a>
                        </li>

                        {/* Add more menu items following the pattern */}
                    </ul>
                    <div className="lg:hidden">
                        <button className="text-white">Menu</button>
                    </div>
                </div>
            </nav>



    );
};

export default Navbar;
