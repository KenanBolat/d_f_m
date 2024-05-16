import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import './ProductPage.css'; // Ensure you create this CSS file for styling
import { getImageUrl } from './../Api/ImageService';

const ProductPage = ({ data }) => {
    console.log(data);
    const { fileName } = useParams();
    const [fileData, setFileData] = useState(null);
    const [error, setError] = useState(null);
    const [currentLayer, setCurrentLayer] = useState(null);
    
    
    useEffect(() => {
        // Fetch your summary data from the endpoint and then set it in state
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/data/');
                const data = response.data;

                const filteredProducts = data.filter(data => data.id === parseInt(fileName));
                if (filteredProducts.length > 0) {
                    setCurrentLayer(filteredProducts[0]);
                } else {
                    setError('File not found');
                }
                setFileData(response.data);
                setError(null);
                
            } catch (error) {
                
                console.error('Error fetching summary data', error);
            }
        };
        
        fetchData();
    }, []);
    
    if (error) return <p>Error loading data!</p>;
    if (!fileData) return <p>Loading...</p>;

    const filteredProducts = fileData.filter(data => data.id === parseInt(fileName));
    
    debugger;

    // if (!fileData) {
    //     return <div>File not found</div>;
    // } else {
    //     setCurrentLayer(filteredProducts[0]);
    // }
    
    const handleDownload = () => {
        saveAs(currentLayer.file_path, currentLayer.file_name);
    };

    const handleLayerClick = (layer) => {
        setCurrentLayer(layer);
        console.log(layer);
    };

    const handleImageClick = () => {
        // Implement a modal or larger image view here
    };
    debugger;
    return (
        <div className="product-page">
            <h1>{fileData.file_name}</h1>
            <div className="image-section">
                <img src={getImageUrl(419)} alt={currentLayer?.file_name} onClick={handleImageClick} />
                <div className="icons">
                    <a href={currentLayer?.file_path} download>
                        <i className="pi pi-download" onClick={handleDownload}></i>
                    </a>
                    <Link to={`/geoserver/${currentLayer?.file_name}`}>
                        <i className="pi pi-layer"></i>
                    </Link>
                </div>
            </div>
            <div className="metadata">
                <h3>Metadata Information</h3>
                <p><strong>Date:</strong> {currentLayer?.file_date}</p>
                <p><strong>Channel:</strong> {currentLayer?.channel}</p>
                <p><strong>Satellite Mission:</strong> {currentLayer?.satellite_mission}</p>
                <p><strong>Created Time:</strong> {currentLayer?.created_time}</p>
                <p><strong>File Size:</strong> {currentLayer?.file_size}</p>
            </div>
            <div className="layers">
                <h3>Other Layers</h3>
                {currentLayer.converted_files.map(layer => (
                    <div key={layer.id} onClick={() => handleLayerClick(layer)}>
                        {layer.file_name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;