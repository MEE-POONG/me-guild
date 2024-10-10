import React from "react";
import { FaRss, FaTwitch, FaSteam, FaFacebook, FaGooglePlus, FaTwitter, FaPinterestP, FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import Navbar from "./Navbar";

const Header: React.FC = () => {

    return (
        <header className="relative z-10 bg-transparent">
            {/* Top Contacts */}
            <div className="bg-dark-1 text-white py-3">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-2">
                        <a href="#" className="w-5 h-5 flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-orange-500 p-[3px] cursor-pointer rounded-xl">
                            <FaRss className=" text-sm" />
                        </a>
                        <a href="#" className="w-5 h-5 flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-purple-500 p-[3px] cursor-pointer rounded-xl">
                            <FaTwitch className=" text-sm" />
                        </a>
                        <a href="#" className="w-5 h-5 flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-black p-[3px] cursor-pointer rounded-xl">
                            <FaSteam className=" text-sm" />
                        </a>
                        <a href="#" className="w-5 h-5 flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-blue-800 p-[3px] cursor-pointer rounded-xl">
                            <FaFacebook className=" text-sm" />
                        </a>
                        <a href="#" className="w-5 h-5 flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-red-800 p-[3px] cursor-pointer rounded-xl">
                            <FaGooglePlus className=" text-sm" />
                        </a>
                        <a href="#" className="w-5 h-5 flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-blue-500 p-[3px] cursor-pointer rounded-xl">
                            <FaTwitter className=" text-sm" />
                        </a>
                        <a href="#" className="w-5 h-5 flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-red-500 p-[3px] cursor-pointer rounded-xl">
                            <FaPinterestP className=" text-sm" />
                        </a>
                    </div>

                    <div className="flex space-x-4">
                        <a href="#" className="text-white hover:text-red-500">
                            <FaUser />
                        </a>
                        <div className="relative flex">
                            <FaShoppingCart className="text-white" />
                            <span className="top-0 right-0 text-xs bg-red-600 text-white rounded-full px-1 ms-1">27</span>
                            {/* Cart dropdown */}
                            {/* <div className="absolute right-0 mt-2 bg-white  shadow-lg w-64">
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
                        {/* https://flowbite.com/docs/components/dropdowns/ */}
                    </div>
                </div>
            </div>
            <Navbar />
        </header>
    )
}
export default Header; 