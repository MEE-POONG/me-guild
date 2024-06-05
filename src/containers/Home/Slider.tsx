import React from "react";
import Slider from "react-slick";

function SimpleSlider() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <img src="/images/bg01.webp" alt="" />
                </div>
                <div>
                    <img src="/images/bg05.webp" alt="" />
                    <h3></h3>
                </div>
                <div>
                    <img src="/images/bg04.webp" alt="" />
                </div>
            </Slider>
        </div>
    );
}

export default SimpleSlider;
