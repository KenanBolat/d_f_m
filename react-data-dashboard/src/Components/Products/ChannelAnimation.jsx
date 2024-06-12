import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import ImageAnimation from './imageAnimation';
import 'react-datepicker/dist/react-datepicker.css';
import './ChannelAnimation.css';

const SatelliteOptions = [
    { value: 'MSG', label: 'MSG' },
    { value: 'IODC', label: 'IODC' },
    // Add more satellite options as needed
];

const channelOptions = [
    { value: 'VIS006', label: 'VIS006' },
    { value: 'IR_120', label: 'IR_120' },
    // Add more channel options as needed
];


useEffect(() => {
    // Fetch satellite missions from the API
    const fetchSatelliteMissions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/missions/');
            const options = response.data.map(mission => ({
                value: mission.satellite_mission,
                label: mission.satellite_mission,
            }));
            setSatelliteOptions(options);
            setSatellite(options[0]); // Set default selection to the first option
        } catch (error) {
            console.error('Error fetching satellite missions', error);
        }
    };

    fetchSatelliteMissions();
}, []);

const ChannelAnimation = () => {
    const [satelliteOptions, setSatelliteOptions] = useState([]);
    const [channel, setChannel] = useState(channelOptions[0]);
    // const [startDate, setStartDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [images, setImages] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/file/special-query/', {
                params: {
                    satellite_mission: satellite.value,
                    channel: channel.value,
                    file_type: 'png',
                    start_date: startDate ? startDate.toISOString() : null,
                    end_date: endDate ? endDate.toISOString() : null,
                }
            });
            debugger;
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images', error);
        }
    };

    return (
        <div className="image-animation-page">
            <div className="controls">
                <div className="control-group">
                    <label>Satellite Missions</label>
                    <Select
                        options={SatelliteOptions}
                        value={satellite}
                        onChange={setSatellite}
                    />
                </div>
                <div className="control-group">
                    <label>Channels</label>
                    <Select
                        options={channelOptions}
                        value={channel}
                        onChange={setChannel}
                    />
                </div>
                <div className="control-group">
                    <label>Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                        isClearable
                    />
                </div>
                <div className="control-group">
                    <label>End Date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                        isClearable
                    />
                </div>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="image-animation-section">
                <ImageAnimation images={images} />
            </div>
        </div>
    );
};

export default ChannelAnimation;
