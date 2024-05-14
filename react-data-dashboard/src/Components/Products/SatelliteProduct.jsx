import React, {useState, useEffect } from 'react';
import axios from 'axios';
import  Grid  from '@mui/material/Grid';
import Card from '../Products/Card';
import { Satellite } from '@mui/icons-material';
import { getImageUrl, fetchImageBlob } from './../Api/ImageService';

const SatelliteProduct = () => {
    const [summaries, setSummaries] = useState([]);
    const [sub_file_count, setSubFileCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        // Fetch your summary data from the endpoint and then set it in state
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/data/');
            setSummaries(response.data);
            setLoading(false);
            setError(null);

          } catch (error) {

            console.error('Error fetching summary data', error);
          }
        };
    
        fetchData();
      }, []);
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error loading data!</p>;
      debugger;
    return (
        <section className='card-container'>
            {summaries.map((summary, index) => {
                // Assuming each summary has a unique identifier for a better key. Using index as fallback.
                const key = summary.id || index;
                const filteredFiles = summary.converted_files || [];
                const hasFiles = filteredFiles.filter(file => file.file_type === 'png').length > 0 ;

                return (
                    <Card
                        key={key}
                        png={`PNG - ${filteredFiles.filter(file => file.file_type === 'png').length} files`}

                        netcdf_title={`NETCDF - ${filteredFiles.filter(file => file.file_type === 'netcdf').length} files`}
                        geotiff_title={`GEOTIFF - ${filteredFiles.filter(file => file.file_type === 'geotiff').length} files`}

                        img={hasFiles && getImageUrl(filteredFiles[2]?.id)}
                        img2={hasFiles && getImageUrl(filteredFiles[4]?.id)}
                        img3={hasFiles && getImageUrl(filteredFiles[6]?.id)}
                        img4={hasFiles && getImageUrl(filteredFiles[8]?.id)}
                        fileSize={summary.total_file_size}
                    />
                );
            })}
        </section>
    );
};

export default SatelliteProduct;