import React from "react";


interface ItemProps {
    title: string;
    detailOne: string;
    detailTwo: string;
    detailThree: string;
    imgBg: string;
    textBtn: string;
}

const TitleTopicOne: React.FC<ItemProps> = ({ title, detailOne, detailTwo, detailThree, imgBg, textBtn }) => {


    return (
        <div
            className="relative h-screen flex items-center justify-center bg-black/0 border-b-2 border-yellow-500 border-double bg-fixed bg-cover bg-center"
            style={{ backgroundImage: `url(${imgBg})` }}
        >
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
                            {textBtn}
                        </button>
                    </a>
                </div>
            </div>
        </div>

    );
};

export default TitleTopicOne;
