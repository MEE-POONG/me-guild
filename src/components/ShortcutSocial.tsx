import Link from 'next/link';
import React, { useState } from 'react';
import { BsDiscord } from "react-icons/bs";

const ShortcutSocial: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // ฟังก์ชันเปิด/ปิดลิ้นชัก
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="z-50 fixed right-0 top-1/2 transform -translate-y-1/2">
            {/* ลิ้นชัก */}
            <div className={`bg-gradient-to-l from-green-300 via-blue-500 to-purple-600 text-white p-3 rounded-l-full shadow-lg transition-transform duration-300 
                ${isOpen
                    ? 'translate-x-0'
                    : 'translate-x-full'
                } 
                md:translate-x-0`
            }
            >
                <Link
                    href="https://thpsd.com/hZKV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                >
                    <BsDiscord className="w-6 h-6 hover:animate-jump" />
                </Link>
            </div>

            {/* ปุ่มเปิด/ปิดลิ้นชัก */}
            <button
                onClick={toggleDrawer}
                className={`absolute 
                    ${isOpen
                        ? 'left-[-30px] transform'
                        : 'right-0 '
                    } 
                    top-1/2 -translate-y-1/2 bg-blue-500 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-2 rounded-full shadow-lg md:hidden`
                }
            >
                {isOpen ? '>' : '<'}
            </button>
        </div>
    );
};

export default ShortcutSocial;
