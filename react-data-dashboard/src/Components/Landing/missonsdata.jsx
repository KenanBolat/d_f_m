import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {SimpleTreeView} from '@mui/x-tree-view/SimpleTreeView';
import {TreeItem} from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const MissionDataList = () => {

  const [dataList, setDataList] = useState([]); 
  const [expanded, setExpanded] = useState([]);



  const getCredentials = () => {
    return { 
      // email:process.env.REACT_APP_API_EMAIL,
      email:'kenan23@gmail.com',
      password:'kalman',
    };
  };

  
  const fetchDataList = async () => {
    console.log('fetchDataList started');
    try {
      let token = localStorage.getItem('token');
      console.log('Initial token from storage:', token);
      if (!token || token === 'undefined') {
        const credentials = getCredentials();
        console.log('Fetching new token with credentials:', credentials);
        const tokenResponse = await axios.post('http://localhost:8000/api/user/token/', credentials);
        
        token = tokenResponse.data.token;
        localStorage.setItem('token', token);
        console.log('New token set:', token);
      }
      console.log('Using token for data fetch:', token);
      const response = await axios.get('http://localhost:8000/api/data/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      }).then((res) => {
        debugger;
        console.log('Data fetched:', res.data);
        console.log(res.data);
        // setDataList(res.data);
        console.log('Data list Before 0 :', dataList);
        setDataList(res.data, () => console.log(dataList));
        console.log('Data list After 0:', dataList);

      });
    } catch (error) {
      console.error('Error fetching data list', error);
    }
  };

  useEffect(() => {
    debugger;
    fetchDataList();
  }  , []);

  useEffect(() => {
    console.log('Data list has updated:', dataList);
  }, [dataList]);
  
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };
  const renderTree = (nodes) => (
    
    <TreeItem
      key={nodes.id}
      nodeId={String(nodes.id)}
      // label={`${nodes.satellite_mission} - ${nodes.date_tag} - ${nodes.status}`}
    />
  );
  
  return (
    <SimpleTreeView
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
    expanded={expanded}
    onNodeToggle={handleToggle}
  >
    {dataList.length > 0 
      ? dataList.map((data) => renderTree(data))
      : <div>Loading data...</div>
      
    }
  </SimpleTreeView>
  );
}
export default MissionDataList;