import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // ฟังก์ชันเพื่อเลื่อนหน้าจอกลับไปด้านบน
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // ใช้ smooth scroll
        });
    };

    // ฟังก์ชันตรวจสอบการเลื่อนหน้าเว็บ
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg 
                                bg-gradient-to-r from-violet-500 to-fuchsia-500 transition duration-300
                                hover:animate-jump
                                "
                >
                    <FaArrowUp/>
                </button>
            )}
        </div>
    );
};

export default BackToTopButton;
