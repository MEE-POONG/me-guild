import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";

const LoginDropdown: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if the user is logged in from localStorage
        const loggedInStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loggedInStatus === "true");
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        // Clear login status and redirect to home page
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        router.push("/"); // Redirect to home page after logout
    };

    return (
        <>
            {isLoggedIn ? (
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center py-3 px-2 font-semibold hover:text-teal-600 "
                    >
                        <FaUserCircle className="mr-1" />
                        PROFILE
                    </button>
                    {isDropdownOpen && (
                        <div
                            className="absolute lg:mt-2 py-2 lg:w-48 bg-white lg:rounded-lg lg:shadow-lg shadow-inner 
                                       w-full border-l-2 border-teal-500 hover:bg-gray-300 animate-flip-down lg:animate-none
                                       "
                        >
                            {/* <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                My Profile
                            </Link> */}
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 text-gray-800 "
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Link href="/login">
                    <p
                        className={`py-3 px-2 flex items-center ${router.pathname === "/login"
                                ? "text-teal-600 border-b-4 border-teal-600 font-semibold"
                                : "font-semibold hover:text-teal-600 transition duration-300"
                            }`}
                    >
                        <FaUserCircle className="mr-1" />
                        LOGIN
                    </p>
                </Link>
            )}
        </>
    );
};

export default LoginDropdown;
