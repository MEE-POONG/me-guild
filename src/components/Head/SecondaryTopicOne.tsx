import React from "react";


interface ItemProps {
    title: string;
    imgBg: string;
}

const SecondaryTopicOne: React.FC<ItemProps> = ({ title, imgBg }) => {


    return (
        <div
            className="bg-fixed h-[530px] w-full relative flex items-center justify-center border-b-2 border-yellow-500 border-double bg-cover"
            style={{
                backgroundImage: `url(${imgBg})`,
                backgroundPosition: 'center',
            }}
        >
            <div className="relative bg-black/50 h-full w-full flex items-center justify-center">
                <div className="relative z-10 text-center">
                    <h1 className="text-7xl font-bold text-white font-mg04 text-gold" data-text={title}>
                        {title}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default SecondaryTopicOne;
