import React, {useState, useEffect } from 'react';
import axios from 'axios';
import  Grid  from '@mui/material/Grid';
import SummaryCard from './summarycard';
import { BrowserRouter } from 'react-router-dom';
import DataList from './datalist';
import BasicCard from './BasicCard';

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
      <div>
        <BasicCard />
       
      </div>
      
    );
};

export default Dashboard;