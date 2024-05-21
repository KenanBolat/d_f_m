import React, { useState, useEffect } from 'react';
import { getImageUrl } from './../Api/ImageService';
import { set } from 'date-fns';

const ImageAnimation = ({ images }) => {
    
    const [animationIndex, setAnimationIndex] = useState(0);
    
    useEffect(() => {
        console.log("useEffect triggered with images length:", images.length);
        if (images.length > 0) {
            setAnimationIndex(0); // Reset animation index when images change
            debugger;
            const interval = setInterval(() => {
                setAnimationIndex(prevIndex => {
                    const newIndex = (prevIndex + 1) % images.length;
                    console.log(`PrevIndex: ${prevIndex}, NewIndex: ${newIndex}, Images Length: ${images.length}`);
                    return newIndex;
                });
            }, 500); // Change image every 500ms

            return () => clearInterval(interval); // Cleanup interval on unmount
        }
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