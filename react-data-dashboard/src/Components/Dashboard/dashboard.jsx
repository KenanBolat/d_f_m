import React, {useState, useEffect } from 'react';
import axios from 'axios';
import  Grid  from '@mui/material/Grid';
import SummaryCard from './summarycard';
import { BrowserRouter } from 'react-router-dom';
import DataList from './datalist';

const Dashboard = () => {
    const [summaries, setSummaries] = useState([]);

    useEffect(() => {
        // Fetch your summary data from the endpoint and then set it in state
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/file/summary/');
            setSummaries(response.data);
          } catch (error) {
            console.error('Error fetching summary data', error);
          }
        };
    
        fetchData();
      }, []);
    return (
        <Grid container spacing={2}>
        {summaries.map((summary) => (
          <Grid item xs={6} sm={6} md={3} key={`${summary.satellite_mission}_${summary.file_type}`}>
            <SummaryCard
              title={`${summary.satellite_mission} - ${summary.file_type}`}
              count={summary.total_count}
              fileSize={summary.total_file_size}
            />
          </Grid>
        ))}
      </Grid>
    );
};

export default Dashboard;