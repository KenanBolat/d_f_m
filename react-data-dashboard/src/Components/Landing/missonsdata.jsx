import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {SimpleTreeView} from '@mui/x-tree-view/SimpleTreeView';
import {TreeItem} from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const MissionDataList = () => {
  const [dataList, setDataList] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const fetchDataList = async () => {

    const credentials = getCredentials();
    
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        const tokenResponse = await axios.post('http://localhost:8000/api/token/', credentials);
        token = response.data.access;
        localStorage.setItem('token', token);
      }
      const response = await axios.get('http://localhost:8000/api/data/', {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
          Authorization: `Bearer ${token}`,
        },
      });
      setDataList(response.data);
    } catch (error) {
      console.error('Error fetching data list', error);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const renderTree = (nodes) => (

    
    <TreeItem key={nodes.id} nodeId={String(nodes.id)} label={nodes.satellite_mission + ' - ' + nodes.date_tag}>
      {Array.isArray(nodes.files) ? nodes.files.map((file, index) => (
        <TreeItem key={`${nodes.id}_${index}`} nodeId={`${nodes.id}_${index}`} label={file} />
      )) : null}
    </TreeItem>
  );

  return (
    <SimpleTreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeToggle={handleToggle}
    >
      {dataList.map((data) => renderTree(data))}
    </SimpleTreeView>
  );
};

export default MissionDataList;