import React from "react";
import Slider from "react-slick";
import Image from 'next/image';

const HomeSlider: React.FC = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };
    return (
        <div className="slide-style ">
            <div className="slider-container overflow-hidden">
                <Slider {...settings}>
                    <div className="slide ">
                        <div className="relative h-screen flex items-center justify-center bg-black" style={{ height: 'calc(100vh - 6rem)' }}>
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src="/images/bg01.png"
                                    alt="Fantasy Event"
                                    className="object-cover w-full h-full opacity-60"
                                />
                            </div>

                            <div className="relative z-10 text-center">
                                <h1 className="text-5xl font-bold title-gold">
                                    Welcome to Me Guild
                                </h1>
                                <p className="mt-4 text-xl title-gold">
                                    Join our world of fantasy and adventure!
                                </p>
                                <div className="mt-8">
                                    <button
                                        className="relative text-white py-2 px-6 rounded-lg bg-cover bg-center bg-[url('/images/btnBlue.png')] hover:bg-[url('/images/btnRed.png')] hover:opacity-90 w-[125px]"
                                    // style={{ backgroundImage: "url('/images/btnBlue.png')" }}
                                    >
                                        <span className="relative z-10">Join Discord</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide ">
                        <div className="relative h-screen flex items-center justify-center bg-black" style={{ height: 'calc(100vh - 6rem)' }}>
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src="/images/bg01.png"
                                    alt="Fantasy Event"
                                    className="object-cover w-full h-full opacity-60"
                                />
                            </div>

                            <div className="relative z-10 text-center">
                                <h1 className="text-5xl font-bold title-gold">
                                    Welcome to Me Guild
                                </h1>
                                <p className="mt-4 text-xl title-gold">
                                    Join our world of fantasy and adventure!
                                </p>
                                <div className="mt-8">
                                    <button
                                        className="relative text-white py-2 px-6 rounded-lg bg-cover bg-center bg-[url('/images/btnBlue.png')] hover:bg-[url('/images/btnRed.png')] hover:opacity-90 w-[125px]"
                                    // style={{ backgroundImage: "url('/images/btnBlue.png')" }}
                                    >
                                        <span className="relative z-10">Join Discord</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide ">
                        <div className="relative h-screen flex items-center justify-center bg-black" style={{ height: 'calc(100vh - 6rem)' }}>
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src="/images/bg01.png"
                                    alt="Fantasy Event"
                                    className="object-cover w-full h-full opacity-60"
                                />
                            </div>

                            <div className="relative z-10 text-center">
                                <h1 className="text-5xl font-bold title-gold">
                                    Welcome to Me Guild
                                </h1>
                                <p className="mt-4 text-xl title-gold">
                                    Join our world of fantasy and adventure!
                                </p>
                                <div className="mt-8">
                                    <button
                                        className="relative text-white py-2 px-6 rounded-lg bg-cover bg-center bg-[url('/images/btnBlue.png')] hover:bg-[url('/images/btnRed.png')] hover:opacity-90 w-[125px]"
                                    // style={{ backgroundImage: "url('/images/btnBlue.png')" }}
                                    >
                                        <span className="relative z-10">Join Discord</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Slider>
            </div>
        </div>
    );
}

export default HomeSlider;
