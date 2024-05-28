import React from 'react';
import { Sidebar, Tab } from 'react-leaflet-sidebarv2';
import './Sidebar.css';

const SidebarComponent = ({ layers, onToggleLayer }) => {
  return (
    <Sidebar
      id="sidebar"
      collapsed={false}
      position="left"
      selected="home"
      closeIcon={<span>&times;</span>}
      openIcon={<span>&#9776;</span>}
    >
      <Tab id="home" header="Layers" icon="fa fa-list">
        <ul>
          {layers.map((layerGroup, idx) => (
            <li key={idx}>
              <strong>{layerGroup.name}</strong>
              <ul>
                {layerGroup.layers.map((layer, layerIdx) => (
                  <li key={layerIdx}>
                    <input
                      type="checkbox"
                      checked={layer.active}
                      onChange={() => onToggleLayer(layerGroup.name, layer.name)}
                    />
                    {layer.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Tab>
    </Sidebar>
  );
};

export default SidebarComponent;
