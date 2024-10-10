import React from "react";
import Slider from "react-slick";

const HomeSlider: React.FC = () => {

    return (
        <div className="relative h-screen flex items-center justify-center bg-black" style={{ height: 'calc(100vh - 6rem)' }}>
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/images/bg01.png"
                    alt="Fantasy Event"
                    className="object-cover w-full h-full opacity-100"
                />
            </div>

            <div className="relative z-10 text-center">
                <div className="relative z-10 text-center">
                    <h1 className="text-[8rem] font-bold text-gold" data-text="Welcome">
                        Welcome
                    </h1>
                </div>
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl font-bold text-gold" data-text="Join our world of fantasy and adventure!">
                        Join our world of fantasy and adventure!
                    </h1>
                </div>
                <div className="mt-8">
                    <a href="https://discord.com/invite/4eS7Bt3PZF">
                        <button className="btn-home">
                            Join To Discord
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default HomeSlider;
