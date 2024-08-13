import React from 'react';
import ToolCard from '../components/ToolCard';
import { useState, useEffect } from 'react';
import './Dashboard.css';

const tools = [
    { name: 'db_admin', url: `http://${window.location.hostname}:5050`, checkUrl: 'http://db_admin:5050/status' },
    { name: 'mongo-express', url: `http://${window.location.hostname}:8081`, checkUrl: 'http://mongo-express:8081/status' },
    { name: 'Elasticsearch', url: `http://${window.location.hostname}:5601`, checkUrl: 'http://elasticsearch:9200/_cluster/health' },
    {
        name: 'GeoServer',
        url: `http://${window.location.hostname}:8080/geoserver`,
        checkUrl: 'http://geoserver:8080/geoserver/rest/about/status'
    },
    { name: 'RabbitMQ', url: `http://${window.location.hostname}:15672`, checkUrl: 'http://rabbitmq:15672/api/overview' },
    { name: 'app', url: `http://${window.location.hostname}:8000/admin/`, checkUrl: 'http://app:8000/api/health-check' },
];

const Dashboard = () => {
    const [statuses, setStatuses] = useState({}); 

    useEffect(() => {
        const ws = new WebSocket(`ws://${window.location.hostname}:4000`);
        
        ws.onmessage = function (event) {
            try {
                if (event.data) {
                    const updatedStatuses = JSON.parse(event.data);
                    setStatuses(updatedStatuses);
                    console.log("Updated statuses received:", updatedStatuses);
                }
            } catch (err) {
                console.error("Error parsing WebSocket message:", err);
            }
        };

        // Clean up function to close WebSocket connection
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []);

    // Log statuses whenever they are updated
    useEffect(() => {
        console.log("Statuses updated:", statuses);
    }, [statuses]);

    return (
        <div className="dashboard">
            {tools.map(tool => (
                <ToolCard
                    key={tool.name}
                    toolName={tool.name}
                    toolUrl={tool.url}
                    status={statuses[tool.name]} // Default to "Offline" if no status is available
                />
            ))}
        </div>
    );
};

export default Dashboard;
