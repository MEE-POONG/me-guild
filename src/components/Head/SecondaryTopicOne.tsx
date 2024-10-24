import React from "react";


interface ItemProps {
    title: string;
    imgBg: string;
}

const SecondaryTopicOne: React.FC<ItemProps> = ({ title, imgBg }) => {


    return (
        <div
            className="bg-fixed h-[530px] w-full relative flex items-center justify-center border-b-2 border-yellow-500 border-double "
            style={{
                backgroundImage: `url(${imgBg})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <div className="relative bg-black/50 h-full w-full flex items-center justify-center">
                <h2 className="text-7xl font-bold text-white font-mg04">
                    {title}
                </h2>
            </div>
        </div>
    );
};

export default SecondaryTopicOne;
