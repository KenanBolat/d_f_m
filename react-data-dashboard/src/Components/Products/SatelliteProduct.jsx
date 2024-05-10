import React, {useState, useEffect } from 'react';
import axios from 'axios';
import  Grid  from '@mui/material/Grid';
import Card from '../Products/Card';
import { Satellite } from '@mui/icons-material';
import { getImageUrl, fetchImageBlob } from './../Api/ImageService';

const SatelliteProduct = () => {
    const [summaries, setSummaries] = useState([]);

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
        debugger;
      }, []);
    return (
      //   <Grid container spacing={2}>
      //   {summaries.map((summary) => (
      //     <Grid item xs={6} sm={6} md={3} key={`${summary.satellite_mission}_${summary.file_type}`}>
      //       <SummaryCard
      //         title={`${summary.satellite_mission} - ${summary.file_type}`}
      //         count={summary.total_count}
      //         fileSize={summary.total_file_size}
      //       />
      //     </Grid>
      //   ))}
      // </Grid>
      <section className='card-container'>{summaries.map((summary) => (
          
              <Card
                key={Math.random()}
                title={`${summary.satellite_mission} - ${summary.converted_files[2]?.file_type}`}
                img={getImageUrl(`${summary.converted_files[2]?.mongo_id}`)}
                count={summary.total_count}
                fileSize={summary.total_file_size}
              />
            
          ))}
      </section>

      
    );
};

export default SatelliteProduct;