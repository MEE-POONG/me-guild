import React, { useState } from "react";
import { useRouter } from "next/router";
import {
    FaRss,
    FaTwitch,
    FaSteam,
    FaFacebook,
    FaGooglePlusG,
    FaTwitter,
    FaPinterestP,
    FaBehance,
    FaBitbucket,
    FaDropbox,
    FaDribbble,
    FaDeviantart,
    FaFlickr,
    FaFoursquare,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaMedium,
    FaOdnoklassniki,
    FaPaypal,
    FaReddit,
    FaSkype,
    FaSoundcloud,
    FaSlack,
    FaTumblr,
    FaVimeo,
    FaVk,
    FaWordpress,
    FaYoutube,
    FaGooglePlus,
    FaSearch,
    FaUser,
    FaShoppingCart,
    FaTimes,
} from 'react-icons/fa';
import useScroll from "./useScroll";
import LoginDropdown from "./LoginDropdown";
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
        <header className="nk-header nk-header-opaque">
            {/* START: Top Contacts */}
            <div className="nk-contacts-top">
                <div className="container">
                    <div className="nk-contacts-left">
                        <ul className="nk-social-links">
                            <li>
                                <a className="nk-social-rss" href="#">
                                    <FaRss />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-twitch" href="#">
                                    <FaTwitch />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-steam" href="#">
                                    <FaSteam />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-facebook" href="#">
                                    <FaFacebook />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-google-plus" href="#">
                                    <FaGooglePlus />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-twitter" href="#" target="_blank">
                                    <FaTwitter />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-pinterest" href="#">
                                    <FaPinterestP />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="nk-contacts-right">
                        <ul className="nk-contacts-icons">
                            <li>
                                <a href="#" data-toggle="modal" data-target="#modalSearch">
                                    <FaSearch />
                                </a>
                            </li>
                            <li>
                                <a href="#" data-toggle="modal" data-target="#modalLogin">
                                    <FaUser />
                                </a>
                            </li>
                            <li>
                                <span className="nk-cart-toggle">
                                    <FaShoppingCart />
                                    <span className="nk-badge">27</span>
                                </span>
                                {/* <div className="nk-cart-dropdown">
                                    <div className="nk-widget-post">
                                        <Link href="store-product.html" className="nk-post-image">
                                            <img
                                                src="assets/images/product-5-xs.jpg"
                                                alt="In all revolutions of"
                                            />
                                        </Link>
                                        <h3 className="nk-post-title">
                                            <a href="#" className="nk-cart-remove-item">
                                                <FaTimes name="close" />
                                            </a>
                                            <Link href="store-product.html">In all revolutions of</Link>
                                        </h3>
                                        <div className="nk-gap-1"></div>
                                        <div className="nk-product-price">€ 23.00</div>
                                    </div>
                                    <div className="nk-widget-post">
                                        <Link href="store-product.html" className="nk-post-image">
                                            <img
                                                src="assets/images/product-7-xs.jpg"
                                                alt="With what mingled joy"
                                            />
                                        </Link>
                                        <h3 className="nk-post-title">
                                            <a href="#" className="nk-cart-remove-item">
                                                <FaTimes name="close" />
                                            </a>
                                            <Link href="store-product.html">
                                                With what mingled joy
                                            </Link>
                                        </h3>
                                        <div className="nk-gap-1"></div>
                                        <div className="nk-product-price">€ 14.00</div>
                                    </div>
                                    <div className="nk-gap-2"></div>
                                    <div className="text-center">
                                        <Link
                                            href="store-checkout.html"
                                            className="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white"
                                        >
                                            Proceed to Checkout
                                        </Link>
                                    </div>
                                </div> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* END: Top Contacts */}

            {/* START: Navbar */}
            <nav className="nk-navbar nk-navbar-top nk-navbar-sticky nk-navbar-autohide">
                <div className="container">
                    <div className="nk-nav-table">
                        <Link href="index.html" className="nk-nav-logo">
                            <img src="assets/images/logo.png" alt="GoodGames" width="199" />
                        </Link>
                        <ul
                            className="nk-nav nk-nav-right d-none d-lg-table-cell"
                            data-nav-mobile="#nk-nav-mobile"
                        >
                            <li className="active nk-drop-item">
                                <Link href="elements.html">Features</Link>
                                <ul className="dropdown">
                                    <li>
                                        <Link href="elements.html">Elements (Shortcodes)</Link>
                                    </li>
                                    <li className="active nk-drop-item">
                                        <Link href="forum.html">Forum</Link>
                                        <ul className="dropdown">
                                            <li>
                                                <Link href="forum.html">Forum</Link>
                                            </li>
                                            <li className="active">
                                                <Link href="forum-topics.html">Topics</Link>
                                            </li>
                                            <li>
                                                <Link href="forum-single-topic.html">Single Topic</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link href="widgets.html">Widgets</Link>
                                    </li>
                                    <li>
                                        <Link href="coming-soon.html">Coming Soon</Link>
                                    </li>
                                    <li>
                                        <Link href="offline.html">Offline</Link>
                                    </li>
                                    <li>
                                        <Link href="404.html">404</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nk-drop-item">
                                <Link href="blog-list.html">Blog</Link>
                                <ul className="dropdown">
                                    <li>
                                        <Link href="news.html">News</Link>
                                    </li>
                                    <li className="nk-drop-item">
                                        <Link href="blog-grid.html">Blog With Sidebar</Link>
                                        <ul className="dropdown">
                                            <li>
                                                <Link href="blog-grid.html">Blog Grid</Link>
                                            </li>
                                            <li>
                                                <Link href="blog-list.html">Blog List</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link href="blog-fullwidth.html">Blog Fullwidth</Link>
                                    </li>
                                    <li>
                                        <Link href="blog-article.html">Blog Article</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link href="gallery.html">Gallery</Link>
                            </li>
                            <li className="nk-drop-item">
                                <Link href="tournaments.html">Tournaments</Link>
                                <ul className="dropdown">
                                    <li>
                                        <Link href="tournaments.html">Tournament</Link>
                                    </li>
                                    <li>
                                        <Link href="tournaments-teams.html">Teams</Link>
                                    </li>
                                    <li>
                                        <Link href="tournaments-teammate.html">Teammate</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nk-drop-item">
                                <Link href="store.html">Store</Link>
                                <ul className="dropdown">
                                    <li>
                                        <Link href="store.html">Store</Link>
                                    </li>
                                    <li>
                                        <Link href="store-product.html">Product</Link>
                                    </li>
                                    <li>
                                        <Link href="store-catalog.html">Catalog</Link>
                                    </li>
                                    <li>
                                        <Link href="store-catalog-alt.html">Catalog Alt</Link>
                                    </li>
                                    <li>
                                        <Link href="store-checkout.html">Checkout</Link>
                                    </li>
                                    <li>
                                        <Link href="store-cart.html">Cart</Link>
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
            {/* END: Navbar */}
        </header>


    );
};

export default Navbar;
