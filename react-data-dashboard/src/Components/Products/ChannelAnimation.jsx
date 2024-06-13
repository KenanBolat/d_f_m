import axios from 'axios';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import ImageAnimation from './imageAnimation';
import 'react-datepicker/dist/react-datepicker.css';
import './ChannelAnimation.css';
import React, { useState, useEffect} from 'react';


// const satelliteOptions = [
//     // Add more satellite options as needed
// // ];

// const channelOptions = [
//     { value: 'VIS006', label: 'VIS006' },
//     { value: 'IR_120', label: 'IR_120' },
//     // Add more channel options as needed
// ];



const ChannelAnimation = () => {

    const [satelliteOptions, setSatelliteOptions] = useState([]);
    const [satellite, setSatellite] = useState(null);

    const [channelOptions, setChannelOptions] = useState([]);
    const [channel, setChannel] = useState(null);

    // const [startDate, setStartDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [images, setImages] = useState([]);




useEffect(() => {
    // Fetch satellite missions from the API
    const fetchSatelliteMissions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/configuration/');
            const configurations = response.data;
            const satelliteOptions = configurations.map(configuration => ({
                value: configuration.satellite_mission,
                label: configuration.satellite_mission,
            }));
            setSatelliteOptions(satelliteOptions);
            debugger;
            setSatellite(satelliteOptions[0]); // Set default selection to the first option
            const channels = configurations.reduce((acc, configuration) => {
                Object.values(configuration.folder_locations).forEach(channel => {
                    
                    if (!acc.includes(channel.slice(0,6)) && channel.slice(0,6) !== '______') {
                        acc.push(channel.slice(0,6).replace('___', ''));
                    }
                });
                return acc;
            }, []).map(channel => ({
                value: channel,
                label: channel,
            }));
            debugger;
            setChannelOptions(channels);
            setChannel(channels[0]); 

        } catch (error) {
            console.error('Error fetching satellite missions', error);
        }
    };

    fetchSatelliteMissions();
}, []);




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
                        options={satelliteOptions}
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
