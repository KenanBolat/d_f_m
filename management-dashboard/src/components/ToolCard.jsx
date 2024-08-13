import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faDatabase, faServer, faRocket, faCogs, faClipboardList, faCode } from '@fortawesome/free-solid-svg-icons'; // Add more icons as needed

import './ToolCard.css';

const iconMapping = {
    "GeoServer": faMap,
    "mongo-express": faDatabase,
    "db_admin": faServer,
    "Elasticsearch": faClipboardList,
    "RabbitMQ": faRocket,
    "Portainer": faCogs,
    "app": faCode,
};


const ToolCard = ({ toolName, toolUrl, status}) => (

    <Card className="tool-card">
        <div className="status-indicator">
            <div className={status==='Online' ? 'status-online' : 'status-offline'}></div>
            <span>{status==='Online' ? 'Online' : 'Offline'}</span>
        </div>
        <Card.Body>
            <div className="icon-wrapper">
                <FontAwesomeIcon icon={iconMapping[toolName]} size="6x" />
            </div>
            <Card.Title>{toolName}</Card.Title>
            <Button variant="outline-primary" href={toolUrl} target="_blank">Open</Button>
        </Card.Body>
    </Card>
);

export default ToolCard;
