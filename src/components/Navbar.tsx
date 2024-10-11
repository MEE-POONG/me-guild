import React, { useState } from "react";
import { useRouter } from "next/router";
// import useScroll from "./useScroll";
import Image from 'next/image';
import Link from "next/link";
import { FaPlus } from "react-icons/fa";



const Navbar: React.FC = () => {
    const navItems = [
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
    const [isOpen, setIsOpen] = useState(false);
    // const scrollY = useScroll();
    // const router = useRouter();

    // const toggleMenu = () => {
    //     setIsOpen(!isOpen);
    // };

    return (
        <nav className="relative bg-black bg-opacity-60 p-6 font-montserrat text-[1.07rem] text-white transition-colors duration-300 z-1000">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    <Image src="/images/logo.png" alt="GoodGames" width={60} height={60} fetchPriority="high" />
                </Link>
                <ul className="hidden list-none p-0 m-0 align-middle lg:flex lg:m-0 before:box-border after:box-border">
                    {navItems.map((item, index) => (
                        <li key={index} className="relative group inline-block align-middle">
                            <Link href={item.href} className="relative flex px-5 py-1 items-center">
                                {item.label} {item.dropdown && <FaPlus className="ml-1 text-sm" />}
                            </Link>

                            {item.dropdown && (
                                <ul className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-black bg-opacity-75 text-white py-2 mt-1 rounded shadow-lg w-60">
                                    {item.list?.map((subItem, subIndex) => (
                                        <li key={subIndex} className="px-4 py-2 hover:bg-gray-800">
                                            <Link href={subItem.href} className="block">
                                                {subItem.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                {/* <div className="lg:hidden">
                    <button className="text-white">Menu</button>
                </div> */}
            </div>
        </nav>
    );
};

export default Navbar;
