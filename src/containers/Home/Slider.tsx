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
        <div className="slidestyle">
            <div className="slider-container h-[420px] overflow-hidden">
                <Slider {...settings}>
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

export default HomeSlider;
