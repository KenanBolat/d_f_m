import React from 'react';
import ToolCard from '../components/ToolCard';
import './Dashboard.css';

const tools = [
    { name: 'pgAdmin', url: 'http://localhost:5050', checkUrl: 'http://localhost:5050/status' },
    { name: 'MongoExpress', url: 'http://localhost:8081', checkUrl: 'http://localhost:8081/status' },
    { name: 'Elasticsearch', url: 'http://localhost:9200', checkUrl: 'http://localhost:9200/_cluster/health' },
    { name: 'GeoServer', url: 'http://localhost:8080/geoserver', checkUrl: 'http://localhost:8080/geoserver/rest/about/status' },
    { name: 'RabbitMQ', url: 'http://localhost:15672', checkUrl: 'http://localhost:15672/api/overview' },
];

const Dashboard = () => (
    <div className="dashboard">
        {tools.map(tool => (
            <ToolCard 
                key={tool.name} 
                toolName={tool.name} 
                toolUrl={tool.url} 
                checkUrl={tool.checkUrl} 
            />
        ))}
    </div>
);

export default Dashboard;
