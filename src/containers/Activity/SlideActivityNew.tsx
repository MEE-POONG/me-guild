import React from "react";
import Slider from "react-slick";

const SliderActivity: React.FC = () => {
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
        <div className="container mx-auto max-w-4xl md:h-[360px] overflow-hidden shadow-xl border rounded-lg">
            <div className="">
                <Slider {...settings} className="w-full h-full object-cover">
                    <div className="slide ">
                        <img src="/images/bg01.webp" alt="" className="" />
                    </div>
                    <div className="slide">
                        <img src="/images/bg05.webp" alt="" className="" />
                    </div>
                    <div className="slide">
                        <img src="/images/bg04.webp" alt="" className="" />
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default SliderActivity;
