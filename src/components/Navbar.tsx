import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import useScroll from "./useScroll";
import LoginDropdown from "./LoginDropdown";

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
<<<<<<< HEAD
        <nav className="nk-navbar nk-navbar-top nk-navbar-sticky nk-navbar-autohide">
            <div className="container">
                <div className="nk-nav-table">

                    <a href="index.html" className="nk-nav-logo">
                        <img src="assets/images/logo.png" alt="GoodGames" width="199" />
                    </a>

                    <ul className="nk-nav nk-nav-right d-none d-lg-table-cell" data-nav-mobile="#nk-nav-mobile">

                        <li className=" nk-drop-item">
                            <a href="elements.html">
                                Features

                            </a><ul className="dropdown">

                                <li>
                                    <a href="elements.html">
                                        Elements (Shortcodes)

                                    </a>
                                </li>
                                <li className=" nk-drop-item">
                                    <a href="forum.html">
                                        Forum

                                    </a><ul className="dropdown">

                                        <li>
                                            <a href="forum.html">
                                                Forum

                                            </a>
                                        </li>
                                        <li>
                                            <a href="forum-topics.html">
                                                Topics

                                            </a>
                                        </li>
                                        <li>
                                            <a href="forum-single-topic.html">
                                                Single Topic

                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="widgets.html">
                                        Widgets

                                    </a>
                                </li>
                                <li>
                                    <a href="coming-soon.html">
                                        Coming Soon

                                    </a>
                                </li>
                                <li>
                                    <a href="offline.html">
                                        Offline

                                    </a>
                                </li>
                                <li>
                                    <a href="404.html">
                                        404

                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="active nk-drop-item">
                            <a href="blog-list.html">
                                Blog

                            </a><ul className="dropdown">

                                <li className="active">
                                    <a href="news.html">
                                        News

                                    </a>
                                </li>
                                <li className=" nk-drop-item">
                                    <a href="blog-grid.html">
                                        Blog With Sidebar

                                    </a><ul className="dropdown">

                                        <li>
                                            <a href="blog-grid.html">
                                                Blog Grid

                                            </a>
                                        </li>
                                        <li>
                                            <a href="blog-list.html">
                                                Blog List

                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="blog-fullwidth.html">
                                        Blog Fullwidth

                                    </a>
                                </li>
                                <li>
                                    <a href="blog-article.html">
                                        Blog Article

                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="gallery.html">
                                Gallery

                            </a>
                        </li>
                        <li className=" nk-drop-item">
                            <a href="tournaments.html">
                                Tournaments

                            </a><ul className="dropdown">

                                <li>
                                    <a href="tournaments.html">
                                        Tournament

                                    </a>
                                </li>
                                <li>
                                    <a href="tournaments-teams.html">
                                        Teams

                                    </a>
                                </li>
                                <li>
                                    <a href="tournaments-teammate.html">
                                        Teammate

                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className=" nk-drop-item">
                            <a href="store.html">
                                Store

                            </a><ul className="dropdown">

                                <li>
                                    <a href="store.html">
                                        Store

                                    </a>
                                </li>
                                <li>
                                    <a href="store-product.html">
                                        Product

                                    </a>
                                </li>
                                <li>
                                    <a href="store-catalog.html">
                                        Catalog

                                    </a>
                                </li>
                                <li>
                                    <a href="store-catalog-alt.html">
                                        Catalog Alt

                                    </a>
                                </li>
                                <li>
                                    <a href="store-checkout.html">
                                        Checkout

                                    </a>
                                </li>
                                <li>
                                    <a href="store-cart.html">
                                        Cart

                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="nk-nav nk-nav-right nk-nav-icons">

                        <li className="single-icon d-lg-none">
                            <a href="#" className="no-link-effect" data-nav-toggle="#nk-nav-mobile">
                                <span className="nk-icon-burger">
                                    <span className="nk-t-1"></span>
                                    <span className="nk-t-2"></span>
                                    <span className="nk-t-3"></span>
                                </span>
                            </a>
                        </li>


                    </ul>
=======
        <nav className={`z-50 fixed w-full transition-all duration-150 bg-[#1f1f1c] 
                    ${scrollY > 50 
                    ? "text-gray-100 shadow-violet-300/50 shadow-2xl" 
                    : "text-gray-100"}`}
        >
            <div className="max-w-4xl mx-auto px-4 bg-transparent md:px-10">
                <div className="flex justify-between items-center py-5 md:py-3 h-16 md:h-24">
                    <div className="flex items-center space-x-7">
                        <Link href="/">
                            <img src="/images/logo-mg.webp" className="w-10 md:w-16 rounded-full" alt="Logo" />
                        </Link>
                    </div>
                    <div className="hidden lg:flex space-x-1">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <p
                                    className={`px-2 flex items-center ${router.pathname === item.href
                                        ? "text-teal-600 border-b-4 border-teal-600 shadow-lg shadow-cyan-500/50 font-bold"
                                        : "hover:text-teal-600  transition duration-300 "
                                        }`}
                                >
                                    {item.label}
                                </p>
                            </Link>
                        ))}
                        {/* Use the LoginDropdown component */}
                        {/* <LoginDropdown /> */}
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
            <div className={`lg:hidden h-screen pl-9 ${isOpen ? "block bg-white animate-flip-down" : "hidden "}`}>
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <p
                            className={`block text-sm px-2 py-3 ${router.pathname === item.href
                                ? "text-teal-600 font-semibold bg-gray-100 border-l-2 border-teal-500"
                                : "text-gray-500 transition duration-300"
                                }`}
                        >
                            {item.label}
                        </p>
                    </Link>
                ))}
                {/* Mobile version of LoginDropdown */}
                <div>
                    {/* <LoginDropdown /> */}
>>>>>>> 12dbeb17a3f021ddf85728257ead94b1cea4c919
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
