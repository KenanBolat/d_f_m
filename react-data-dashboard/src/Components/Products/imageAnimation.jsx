import React, { useState, useEffect } from 'react';
import { getImageUrl } from './../Api/ImageService';

const ImageAnimation = ({ images }) => {
    const [animationIndex, setAnimationIndex] = useState(0);
    debugger;
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 500); // Change image every 500ms

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [images]);

    if (images.length === 0) {
        return <div>No images to display</div>;
    }

    return (
        <div className="image-animation">
            <img 
                src={getImageUrl(images[animationIndex]?.id)} 
                alt={images[animationIndex].file_name} 
            />
             <div className="image-label">
                <p>{images[animationIndex].file_name}</p>
            </div>
        </div>
    );
};

export default ImageAnimation;