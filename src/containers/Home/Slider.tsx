import React from "react";
import Slider from "react-slick";

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
                                {/* Background image */}
                                <img
                                    src="/images/bg01.png" // Update with your image path
                                    alt="Fantasy Event"
                                    className="object-cover w-full h-full opacity-60"
                                />
                            </div>

                            <div className="relative z-10 text-center">
                                <h1 className="text-5xl font-bold text-white">
                                    Welcome to Me Guild
                                </h1>
                                <p className="mt-4 text-xl text-white">
                                    Join our world of fantasy and adventure!
                                </p>
                                <div className="mt-8">
                                    <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
                                        Join Discord
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide ">
                        <div className="relative h-screen flex items-center justify-center bg-black" style={{ height: 'calc(100vh - 6rem)' }}>
                            <div className="absolute inset-0 overflow-hidden">
                                {/* Background image */}
                                <img
                                    src="/images/bg04.webp" // Update with your image path
                                    alt="Fantasy Event"
                                    className="object-cover w-full h-full opacity-60"
                                />
                            </div>

                            <div className="relative z-10 text-center">
                                <h1 className="text-5xl font-bold text-white">
                                    Welcome to Me Guild
                                </h1>
                                <p className="mt-4 text-xl text-white">
                                    Join our world of fantasy and adventure!
                                </p>
                                <div className="mt-8">
                                    <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
                                        Join Discord
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide ">
                        <div className="relative h-screen flex items-center justify-center bg-black" style={{ height: 'calc(100vh - 6rem)' }}>
                            <div className="absolute inset-0 overflow-hidden">
                                {/* Background image */}
                                <img
                                    src="/images/bg05.webp" // Update with your image path
                                    alt="Fantasy Event"
                                    className="object-cover w-full h-full opacity-60"
                                />
                            </div>

                            <div className="relative z-10 text-center">
                                <h1 className="text-5xl font-bold text-white">
                                    Welcome to Me Guild
                                </h1>
                                <p className="mt-4 text-xl text-white">
                                    Join our world of fantasy and adventure!
                                </p>
                                <div className="mt-8">
                                    <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
                                        Join Discord
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
