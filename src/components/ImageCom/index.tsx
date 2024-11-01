import Image from "next/image";
import React from "react";

interface CardProps {
    name?: string;
    imageValue?: string;
    classValue?: string;
    widthValue?: number;
    heightValue?: number;
}

const ImageIndex: React.FC<CardProps> = ({
    name = '',
    imageValue = '',
    classValue = '',
    widthValue = 0,
    heightValue = 0
}) => {
    const imageName = imageValue || 'xafkdfldsofasfa'; // Set default value for name if empty

    return (
        <img
            src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${imageName}/wmd`}
            width={widthValue}
            height={heightValue}
            className={classValue}
            alt={name}
        />
    );
};

export default ImageIndex;
