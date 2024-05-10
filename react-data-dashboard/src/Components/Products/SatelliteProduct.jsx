import React, {useState, useEffect } from 'react';
import axios from 'axios';
import  Grid  from '@mui/material/Grid';
import Card from '../Products/Card';
import { Satellite } from '@mui/icons-material';
import { getImageUrl, fetchImageBlob } from './../Api/ImageService';

const SatelliteProduct = () => {
    const [summaries, setSummaries] = useState([]);
    const [sub_file_count, setSubFileCount] = useState(0);
    
    useEffect(() => {
        // Fetch your summary data from the endpoint and then set it in state
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/data/');
            setSummaries(response.data);
          } catch (error) {
            console.error('Error fetching summary data', error);
          }
        };
    
        fetchData();
      }, []);
    
 
    return (

      <section className='card-container'>{summaries.map((summary) => (
            
              <Card
                key={Math.random()}
                
                
                // title={`${summary.satellite_mission} - ${sub_file_count} files`}
                png={`PNG - ${summary.converted_files.filter(file=>file.file_type === 'png').length} files`}
                netcdf_title={`NETCDF - ${summary.converted_files.filter(file=>file.file_type === 'netcdf').length} files`}
                geotiff_title={`GEOTIFF - ${summary.converted_files.filter(file=>file.file_type === 'geotiff').length} files`}
                
                img={getImageUrl(`${summary.converted_files[2]?.id}`)}
                img2={getImageUrl(`${summary.converted_files[4]?.id}`)}
                img3={getImageUrl(`${summary.converted_files[6]?.id}`)}
                img4={getImageUrl(`${summary.converted_files[8]?.id}`)}
                
                count={summary.total_count}
                fileSize={summary.total_file_size}
              />
            
          ))}
      </section>

      
    );
};

export default SatelliteProduct;