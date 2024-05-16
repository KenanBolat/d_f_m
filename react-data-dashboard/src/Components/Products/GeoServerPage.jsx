import React from 'react';
import { useParams } from 'react-router-dom';

const GeoServerPage = () => {
    const { fileName } = useParams();
    debugger;

    return (
        <div>
            <h1>GeoServer Page</h1>
            <p>Displaying map for file: {fileName}</p>
            {/* Integrate your GeoServer and Leaflet component here */}
        </div>
    );
};

export default GeoServerPage;