import React from "react";


interface ItemProps {
    title: string;
    detailOne: string;
    detailTwo: string;
    detailThree: string;
    imgBg: string;
}

const TitleTopicOne: React.FC<ItemProps> = ({ title, detailOne, detailTwo, detailThree, imgBg }) => {


    return (
        <div className="relative h-screen flex items-center justify-center bg-black" >
            <img className="nk-page-background-top" src="assets/images/bg-top.png" alt=""></img>
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/images/bg02.webp"
                    alt="Fantasy Event"
                    className="object-cover w-full h-full opacity-100"
                />
            </div>

            <div className="relative z-10 text-center font-mg05 italic">
                <div className="relative z-10 text-center">
                    <h1 className="text-[8rem] font-bold text-gold" data-text={title}>
                        {title}
                    </h1>
                </div>
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl font-bold text-gold" data-text={detailOne}>
                        {detailOne}
                    </h1>
                </div>
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl font-bold text-gold" data-text={detailTwo}>
                        {detailTwo}
                    </h1>
                </div>
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl font-bold text-gold" data-text={detailThree}>
                        {detailThree}
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
};

export default TitleTopicOne;
