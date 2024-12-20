import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import './ProductPage.css'; // Ensure you create this CSS file for styling
import { getImageUrl } from './../Api/ImageService';
import { formatFileSize } from "./formatFileSize";
import ImageAnimation from './imageAnimation';

const ProductPage = ({ data }) => {
    const { fileName } = useParams();
    const [fileData, setFileData] = useState(null);
    const [error, setError] = useState(null);
    const [currentLayer, setCurrentLayer] = useState(null);
    const [pngFiles, setpngFiles] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/data/');
                const data = response.data;

                const filteredProducts = data.filter(data => data.id === parseInt(fileName));
              
                if (filteredProducts.length > 0) {
                    setCurrentLayer(filteredProducts[0].converted_files.filter(data => data.file_type === 'png')[0]);
                    setpngFiles(filteredProducts[0].converted_files.filter(data => data.file_type === 'png'));
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
    }, [fileName]);

    if (error) return <p>Error loading data!</p>;
    if (!fileData) return <p>Loading...</p>;

    const filteredProducts = fileData.filter(data => data.id === parseInt(fileName));

    const handleDownload = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/file/${currentLayer.id}/download/`, {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], { type: response.data.type });
            saveAs(blob, currentLayer.file_name);
        } catch (error) {
            console.error('Error downloading file', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/file/${currentLayer.id}/`);
            alert('File deleted successfully');
            // Optionally, update the state to remove the deleted file from the list
        } catch (error) {
            console.error('Error deleting file', error);
        }
    };

    const handleLayerClick = (layer) => {
        const selectedLayer = filteredProducts[0].converted_files.find(data => data.id === parseInt(layer));
        setCurrentLayer(selectedLayer);
    };

    const handleImageClick = () => {
        // Implement a modal or larger image view here
    };

    return (
        <div className="product-page">
            <h1>{fileData.file_name}</h1>
            <div className="main-content">
                <div className="card-container">
                    {currentLayer?.file_type === 'png' ? (
                        <div className="image-card">
                            <img src={getImageUrl(currentLayer?.id)} alt={filteredProducts[0]?.file_name} onClick={handleImageClick} />
                            <div className="icons">
                                <a href={filteredProducts[0]?.file_path} download>
                                    <i className="pi pi-download" onClick={handleDownload}></i>
                                </a>
                                <Link to={`/geoserver/${filteredProducts[0]?.file_name}`}>
                                    <i className="pi pi-map"></i>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="image-card placeholder">
                            <div className="file-type-info">
                                <span>{currentLayer?.file_type.toUpperCase()}</span>
                            </div>
                        </div>
                    )}
                    <div className="image-card">
                        <ImageAnimation images={pngFiles} />
                        <div className="icons">
                            <i className="pi pi-download" onClick={handleDownload}></i>
                            <Link to={`/geoserver/${currentLayer.file_name}`}>
                                <i className="pi pi-layer"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="metadata-card">
                    <h3>Metadata Information</h3>
                    <p><strong>Date:</strong> {filteredProducts[0]?.date_tag}</p>
                    <p><strong>Channel Name:</strong> {currentLayer?.file_name}</p>
                    <p><strong>File Created:</strong> {currentLayer?.downloaded_at}</p>
                    <p><strong>Satellite Mission:</strong> {filteredProducts[0]?.satellite_mission}</p>
                    <p><strong>Status:</strong> {filteredProducts[0]?.status}</p>
                    <p><strong>File Size:</strong> {formatFileSize(currentLayer?.file_size)}</p>
                    <div className="layers-dropdown">
                        <label htmlFor="layers">Other Layers:</label>
                        <select id="layers" onChange={(e) => handleLayerClick(e.target.value)}>
                            {filteredProducts[0]?.converted_files.map(layer => (
                                <option key={layer.id} value={layer.id}>{layer.file_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="action-buttons">
                        <button onClick={handleDownload} className="download-button">Download</button>
                        <button onClick={handleDelete} className="delete-button">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
