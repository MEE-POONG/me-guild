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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
