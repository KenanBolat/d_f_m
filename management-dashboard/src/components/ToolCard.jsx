import React, { useEffect, useState } from 'react';
import ToolCard from '../components/ToolCard';

const tools = [
    { name: 'pgAdmin', url: 'http://localhost:5050' },
    { name: 'MongoExpress', url: 'http://localhost:8081' },
    { name: 'Elasticsearch', url: 'http://localhost:9200' },
    { name: 'GeoServer', url: 'http://localhost:8080/geoserver' },
    { name: 'RabbitMQ', url: 'http://localhost:15672' },
];

const Dashboard = () => {
    const [statuses, setStatuses] = useState({});

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4000');
        
        ws.onmessage = event => {
            const updatedStatuses = JSON.parse(event.data);
            setStatuses(updatedStatuses);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className="dashboard">
            {tools.map(tool => (
                <ToolCard 
                    key={tool.name} 
                    toolName={tool.name} 
                    toolUrl={tool.url} 
                    status={statuses[tool.name]} 
                />
            ))}
        </div>
    );
};

export default Dashboard;
