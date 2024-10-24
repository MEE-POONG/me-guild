import React, { useState, useEffect } from "react";
import {
    FaRss,
    FaTwitch,
    FaSteam,
    FaFacebook,
    FaGooglePlus,
    FaTwitter,
    FaPinterestP,
    FaUser,
    FaShoppingCart,
} from "react-icons/fa";
import Navbar from "./Nav/Navbar";

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 99) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`${isScrolled ? "fixed bg-black/50" : "absolute bg-transparent"
                } right-0 left-0 z-[99999] transition-all duration-300`}
        >
            {/* Top Contacts */}
            <div className={` text-white py-2 ${isScrolled ? 'hidden' : ''}`}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-2">
                        <a
                            href="#"
                            className="w-5 h-5 flex items-center justify-center bg-yellow-100 text-black hover:text-amber-200 hover:bg-orange-500 p-[3px] cursor-pointer rounded-xl"
                        >
                            <FaRss className="text-sm" />
                        </a>
                        <a
                            href="#"
                            className="w-5 h-5 flex items-center justify-center bg-yellow-100 text-black hover:text-amber-200 hover:bg-purple-500 p-[3px] cursor-pointer rounded-xl"
                        >
                            <FaTwitch className="text-sm" />
                        </a>
                        <a
                            href="#"
                            className="w-5 h-5 flex items-center justify-center bg-yellow-100 text-black hover:text-amber-200 hover:bg-black p-[3px] cursor-pointer rounded-xl"
                        >
                            <FaSteam className="text-sm" />
                        </a>
                        <a
                            href="#"
                            className="w-5 h-5 flex items-center justify-center bg-yellow-100 text-black hover:text-amber-200 hover:bg-blue-800 p-[3px] cursor-pointer rounded-xl"
                        >
                            <FaFacebook className="text-sm" />
                        </a>
                        <a
                            href="#"
                            className="w-5 h-5 flex items-center justify-center bg-yellow-100 text-black hover:text-amber-200 hover:bg-red-800 p-[3px] cursor-pointer rounded-xl"
                        >
                            <FaGooglePlus className="text-sm" />
                        </a>
                        <a
                            href="#"
                            className="w-5 h-5 flex items-center justify-center bg-yellow-100 text-black hover:text-amber-200 hover:bg-blue-500 p-[3px] cursor-pointer rounded-xl"
                        >
                            <FaTwitter className="text-sm" />
                        </a>
                        <a
                            href="#"
                            className="w-5 h-5 flex items-center justify-center bg-yellow-100 text-black hover:text-amber-200 hover:bg-yellow-500 p-[3px] cursor-pointer rounded-xl"
                        >
                            <FaPinterestP className="text-sm" />
                        </a>
                    </div>

                    <div className="flex space-x-4">
                        <a href="#" className="text-black hover:text-[#f2b265]">
                            <FaUser />
                        </a>
                        <div className="relative flex">
                            <FaShoppingCart className="text-black hover:text-[#f2b265]" />
                            <span className="top-0 right-0 text-xs bg-[#f2b265] text-white rounded-full px-1 ms-1">
                                27
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar />
        </header>
    );
};

export default Header;
