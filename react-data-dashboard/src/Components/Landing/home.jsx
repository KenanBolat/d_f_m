import React from "react";
import { FaChartBar, FaCog, FaWrench, FaMapMarkedAlt, FaListUl } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import './home.css'; // Make sure to create this CSS file to style your components
import { List } from "@material-ui/core";

const BarChartIcon = () => <FaChartBar className="icon" />;
const GearIcon = () => <FaCog className="icon" />;
const SingleGearIcon = () => <FaWrench className="icon" />;
const MapIcon = () => <FaMapMarkedAlt className="icon" />;
const ListIcon = () => <FaListUl className="icon" />;

const Home = () => {
    return (
      <div className="card-container">
        <Card 
            imgSrc="  "
            title="Statistics"
            description="Statistics of the latest produced products."
            IconComponent={BarChartIcon}
          />
          
           <Card 
            imgSrc="  "
            IconComponent={GearIcon}
            title="Settings"
            description="Settings of the."
          />
           <Card 
            IconComponent={SingleGearIcon}
            title="Single Gear Icon"
            description="SingleGearIcon."
          />
           <Card 
            IconComponent={MapIcon}            
            title="Maps "
            description="Map of the data ."
            link="/products/maps"
          />
           <Card 
            link="/ws"
            IconComponent={ListIcon}            
            title="Product List "
            description="Lisf of the Products ."
          />
        <div className="icon-row">
          
{/* 
          <Link to="/ws" className="icon-container">
            <ListIcon />
            <span>ws</span>
            <BarChartIcon />
          </Link> */}
        </div>
      </div>
    );
  }
  
  const Card = ({  title, description, IconComponent, link }) => (
    <div className="card-small">
      <Link to={link} className="icon-container"></Link>
      {IconComponent && <IconComponent />}
      <div className="card-small-title">{title}</div>
      <div className="card-small-text">{description}</div>
    </div>
  );
  ;
  
  export default Home;