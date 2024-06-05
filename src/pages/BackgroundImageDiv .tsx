import React from "react";

interface BackgroundImageProps {
    imageUrl: string; // URL for the background image
    heightClass?: string; // Tailwind CSS class for height
}

const BackgroundImageDiv: React.FC<BackgroundImageProps> = ({ imageUrl, heightClass = 'h-64' }) => {
    const divStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    return (
        <div className={heightClass + " bg-cover bg-center"} style={divStyle}>
            {/* Content of the div */}
        </div>
    );
};

export default BackgroundImageDiv;
