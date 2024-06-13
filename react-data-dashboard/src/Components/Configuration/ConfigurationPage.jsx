import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './ConfigurationPage.css';

const ConfigurationPage = () => {
    const [configurations, setConfigurations] = useState([]);
    const [selectedConfig, setSelectedConfig] = useState(null);
    const [areaOfInterest, setAreaOfInterest] = useState(null);
    const [satelliteOptions, setSatelliteOptions] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {
        // Fetch configurations from the API
        const fetchConfigurations = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/configuration/');
                setConfigurations(response.data);
                const options = response.data.map(config => ({
                    value: config.satellite_mission,
                    label: config.satellite_mission,
                }));
                setSatelliteOptions(options);
            } catch (error) {
                console.error('Error fetching configurations', error);
            }
        };

        fetchConfigurations();
    }, []);

    const handleConfigChange = (selectedOption) => {
        const config = configurations.find(c => c.satellite_mission === selectedOption.value);
        setSelectedConfig(config);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedConfig({ ...selectedConfig, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8000/api/configuration/${selectedConfig.satellite_mission}/`, selectedConfig);
            alert('Configuration saved successfully');
        } catch (error) {
            console.error('Error saving configuration', error);
        }
    };

    const handleFetchAreaOfInterest = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/area-of-interest/`, {
                params: {
                    satellite_mission: selectedConfig.satellite_mission,
                    user: user,
                },
            });
            setAreaOfInterest(response.data);
        } catch (error) {
            console.error('Error fetching area of interest', error);
        }
    };

    return (
        <div className="configuration-page">
            <h1>Configuration Page</h1>
            <div className="form-group">
                <label>Satellite Mission</label>
                <Select
                    options={satelliteOptions}
                    onChange={handleConfigChange}
                />
            </div>
            {selectedConfig && (
                <div className="config-details">
                    <div className="form-group">
                        <label>Folder Locations</label>
                        <textarea
                            name="folder_locations"
                            value={JSON.stringify(selectedConfig.folder_locations, null, 2)}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>FTP Server</label>
                        <input
                            type="text"
                            name="ftp_server"
                            value={selectedConfig.ftp_server}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>FTP User Name</label>
                        <input
                            type="text"
                            name="ftp_user_name"
                            value={selectedConfig.ftp_user_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>FTP Password</label>
                        <input
                            type="password"
                            name="ftp_password"
                            value={selectedConfig.ftp_password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>FTP Port</label>
                        <input
                            type="number"
                            name="ftp_port"
                            value={selectedConfig.ftp_port}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <input
                            type="text"
                            name="status"
                            value={selectedConfig.status}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Is Active</label>
                        <select
                            name="is_active"
                            value={selectedConfig.is_active}
                            onChange={handleInputChange}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
            <div className="form-group">
                <label>User</label>
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
            </div>
            <button onClick={handleFetchAreaOfInterest}>Fetch Area of Interest</button>
            {areaOfInterest && (
                <div className="area-of-interest">
                    <h3>Area of Interest</h3>
                    <pre>{JSON.stringify(areaOfInterest, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ConfigurationPage;
