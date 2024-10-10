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
} from 'react-icons/fa';
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
        <header className="nk-header nk-header-opaque">
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
                                    <FaGooglePlusG />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-twitter" href="#" target="_blank"><FaTwitter />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-pinterest" href="#">
                                    <FaPinterestP />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-behance" href="#">
                                    <FaBehance />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-bitbucket" href="#">
                                    <FaBitbucket />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-dropbox" href="#">
                                    <FaDropbox />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-dribbble" href="#">
                                    <FaDribbble />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-deviantart" href="#">
                                    <FaDeviantart />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-flickr" href="#">
                                    <FaFlickr />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-foursquare" href="#">
                                    <FaFoursquare />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-github" href="#">
                                    <FaGithub />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-instagram" href="#">
                                    <FaInstagram />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-linkedin" href="#">
                                    <FaLinkedin />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-medium" href="#">
                                    <FaMedium />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-odnoklassniki" href="#">
                                    <FaOdnoklassniki />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-paypal" href="#">
                                    <FaPaypal />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-reddit" href="#">
                                    <FaReddit />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-skype" href="#">
                                    <FaSkype />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-soundcloud" href="#">
                                    <FaSoundcloud />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-slack" href="#">
                                    <FaSlack />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-tumblr" href="#">
                                    <FaTumblr />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-vimeo" href="#">
                                    <FaVimeo />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-vk" href="#">
                                    <FaVk />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-wordpress" href="#">
                                    <FaWordpress />
                                </a>
                            </li>
                            <li>
                                <a className="nk-social-youtube" href="#">
                                    <FaYoutube />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="nk-contacts-right">
                        <ul className="nk-contacts-icons">

                            <li>
                                <a href="#" data-toggle="modal" data-target="#modalSearch">
                                    <span className="fa fa-search"></span>
                                </a>
                            </li>


                            <li>
                                <a href="#" data-toggle="modal" data-target="#modalLogin">
                                    <span className="fa fa-user"></span>
                                </a>
                            </li>


                            <li>
                                <span className="nk-cart-toggle">
                                    <span className="fa fa-shopping-cart"></span>
                                    <span className="nk-badge">27</span>
                                </span>
                                <div className="nk-cart-dropdown">

                                    <div className="nk-widget-post">
                                        <a href="store-product.html" className="nk-post-image">
                                            <img src="assets/images/product-5-xs.jpg" alt="In all revolutions of" />
                                        </a>
                                        <h3 className="nk-post-title">
                                            <a href="#" className="nk-cart-remove-item"><span
                                                className="ion-android-close"></span></a>
                                            <a href="store-product.html">In all revolutions of</a>
                                        </h3>
                                        <div className="nk-gap-1"></div>
                                        <div className="nk-product-price">€ 23.00</div>
                                    </div>

                                    <div className="nk-widget-post">
                                        <a href="store-product.html" className="nk-post-image">
                                            <img src="assets/images/product-7-xs.jpg" alt="With what mingled joy" />
                                        </a>
                                        <h3 className="nk-post-title">
                                            <a href="#" className="nk-cart-remove-item"><span
                                                className="ion-android-close"></span></a>
                                            <a href="store-product.html">With what mingled joy</a>
                                        </h3>
                                        <div className="nk-gap-1"></div>
                                        <div className="nk-product-price">€ 14.00</div>
                                    </div>

                                    <div className="nk-gap-2"></div>
                                    <div className="text-center">
                                        <a href="store-checkout.html"
                                            className="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white">Proceed
                                            to Checkout</a>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

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

                                </a>
                                <ul className="dropdown">

                                    <li>
                                        <a href="elements.html">
                                            Elements (Shortcodes)

                                        </a>
                                    </li>
                                    <li className=" nk-drop-item">
                                        <a href="forum.html">
                                            Forum

                                        </a>
                                        <ul className="dropdown">

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

                                </a>
                                <ul className="dropdown">

                                    <li>
                                        <a href="news.html">
                                            News

                                        </a>
                                    </li>
                                    <li className=" nk-drop-item">
                                        <a href="blog-grid.html">
                                            Blog With Sidebar

                                        </a>
                                        <ul className="dropdown">

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
                                    <li className="active">
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

                                </a>
                                <ul className="dropdown">

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

                                </a>
                                <ul className="dropdown">

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

        </header>

    );
};

export default Navbar;
