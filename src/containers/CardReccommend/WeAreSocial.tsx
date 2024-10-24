import Link from 'next/link';
import { FC, useState } from 'react';
import { BsDiscord } from 'react-icons/bs';
import { FaFacebookF, FaGoogle, FaInstagram, FaTwitch } from 'react-icons/fa';

const WeAreSocial: FC = () => {

    return (
        <div className="mt-6">
            <div className="flex items-center bg-gray-900/50 pl-4 py-5">
                <h3 className="text-xl font-bold text-gray-100">
                    <span className="text-yellow-500">WE</span> ARE SOCIAL
                </h3>
                <div className="flex-1 border-t-4 border-gray-100 ml-4"></div>
            </div>
            <div className="grid grid-cols-4">
                {/* Discord */}
                <Link
                    href="https://discord.com/invite/4eS7Bt3PZF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-600 p-5 flex items-center justify-center text-white hover:bg-violet-500 transition-colors"
                >
                    <BsDiscord size={18} />
                </Link>

                {/* Facebook */}
                <Link
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-4 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                >
                    <FaFacebookF size={18} />
                </Link>

                {/* Instagram */}
                <Link
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-600 p-4 flex items-center justify-center text-white hover:bg-gray-500 transition-colors"
                >
                    <FaInstagram size={18} />
                </Link>
                
                {/* Twitch */}
                <Link
                    href="https://www.twitch.tv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 p-4 flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
                >
                    <FaTwitch size={18} />
                </Link>

            </div>
        </div>
    );
};

export default WeAreSocial;
