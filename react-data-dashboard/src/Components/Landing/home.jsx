import React from "react";
import { FaChartBar, FaCog, FaWrench, FaMapMarkedAlt, FaListUl } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import './home.css'; // Make sure to create this CSS file to style your components

const BarChartIcon = () => <FaChartBar className="icon" />;
const GearIcon = () => <FaCog className="icon" />;
const SingleGearIcon = () => <FaWrench className="icon" />;
const MapIcon = () => <FaMapMarkedAlt className="icon" />;
const ListIcon = () => <FaListUl className="icon" />;

const Home = () => {
    return (
      <div className="home-page">
        <div className="icon-row">
          <Link to="/analytics" className="icon-container">
            <BarChartIcon />
            <span>Dashboard</span>
          </Link>
          <Link to="/settings" className="icon-container">
            <GearIcon />
            <span>Settings</span>
          </Link>
          <Link to="/single-setting" className="icon-container">
            <SingleGearIcon />
            <span>Settings</span>
          </Link>
        </div>
        <div className="icon-row">
          <Link to="/maps" className="icon-container">
            <MapIcon />
            <span>Maps</span>
          </Link>
          <Link to="/list" className="icon-container">
            <ListIcon />
            <span>Lists</span>
          </Link>
        </div>
      </div>
    );
  };
  
  export default Home;