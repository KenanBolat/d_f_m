// components/DataTable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { format, parse } from 'date-fns';


const DataTableComponent = () => {
    const [data, setData] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    useEffect(() => {
        // Fetch your summary data from the endpoint and then set it in state
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/data/');
            setData(response.data);
            
          } catch (error) {

            console.error('Error fetching summary data', error);
          }
        };
    
        fetchData();
      }, []);

      const statusBodyTemplate = (rowData) => {
        return (
            <span className={`product-badge status-${rowData.status.toLowerCase()}`}>
                {rowData.status === 'done' ? '✔️' : '❌'}
            </span>
        );
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Converted Files for {data.date_tag}</h5>
                <DataTable value={data.converted_files}>
                    <Column field="file_name" header="File Name" />
                    <Column field="file_path" header="File Path" />
                    <Column field="file_date" header="File Date" />
                    <Column field="file_size" header="File Size" />
                    <Column field="file_type" header="File Type" />
                    <Column field="file_status" header="File Status" />
                </DataTable>
            </div>
        );
    };

    const formatDate = (dateString) => {
        try {
            const year = dateString.slice(0, 4);
            const month = dateString.slice(4, 6);
            const day = dateString.slice(6, 8);
            const hour = dateString.slice(8, 10);
            const minute = dateString.slice(10, 12);
            const second = '00';
            const parsedDate = parse(
                `${year}-${month}-${day} ${hour}:${minute}:${second}`,
                'yyyy-MM-dd HH:mm:ss',
                new Date()
            );

            return format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
        } catch (error) {
            console.error('Error parsing date:', error);
            return 'Invalid Date';
        }
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date_tag);
    };

    return (
        <div>
            <h1>Data Table</h1>
            <DataTable value={data} expandedRows={expandedRows}
                       onRowToggle={(e) => setExpandedRows(e.data)}
                       rowExpansionTemplate={rowExpansionTemplate}
                       dataKey="id" paginator rows={10}
                       sortField={sortField} sortOrder={sortOrder}
                       onSort={(e) => { setSortField(e.sortField); setSortOrder(e.sortOrder); }}>
                <Column expander={(rowData) => rowData.converted_files.length > 0} style={{ width: '3em' }} />
                <Column field="id" header="ID" sortable />
                <Column field="date_tag" header="Date" body={dateBodyTemplate} sortable />
                <Column field="satellite_mission" header="Satellite Mission" sortable />
                <Column field="converted_files" header="Converted Files" body={(rowData) => rowData.converted_files.length} sortable />
                <Column field="status" header="Status" body={statusBodyTemplate} sortable />
            </DataTable>
        </div>
    );
};

export default DataTableComponent;
