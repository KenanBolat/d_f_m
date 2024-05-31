import React, { useState } from 'react';
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet';
import SidebarComponent from './SidebarComponent';
import 'leaflet/dist/leaflet.css';
import './Sidebar.css';


const MapComponent = () => {
  const [layers, setLayers] = useState([
    {
      name: 'IODC',
      layers: [
        { name: 'IODC_202308140845_WV_073_aoi', active: true },
        { name: 'IODC_202308140845_WV_062_aoi', active: false },
        { name: 'IODC_202308140845_VIS008_aoi', active: false },
        { name: 'IODC_202308140845_VIS006_aoi', active: false },
        { name: 'IODC_202308140845_IR_134_aoi', active: false },
        { name: 'IODC_202308140845_IR_120_aoi', active: false },
        { name: 'IODC_202308140845_IR_108_aoi', active: false },
        { name: 'IODC_202308140845_IR_097_aoi', active: false },
        { name: 'IODC_202308140845_IR_087_aoi', active: false },
        { name: 'IODC_202308140845_IR_039_aoi', active: false },
        { name: 'IODC_202308140845_IR_016_aoi', active: false },
        { name: 'IODC_202308140845_HRV_aoi', active: false },
      ],
    },
  ]);

  const handleToggleLayer = (groupName, layerName) => {
    setLayers((prevLayers) =>
      prevLayers.map((group) =>
        group.name === groupName
          ? {
              ...group,
              layers: group.layers.map((layer) =>
                layer.name === layerName ? { ...layer, active: !layer.active } : layer
              ),
            }
          : group
      )
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidebarComponent layers={layers} onToggleLayer={handleToggleLayer} />
      <Map center={[0, 0]} zoom={2} style={{ flex: 1 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {layers.flatMap((group) =>
          group.layers
            .filter((layer) => layer.active)
            .map((layer, idx) => (
              <WMSTileLayer
                key={idx}
                url="http://localhost:8080/geoserver/IODC/wms"
                layers={layer.name}
                format="image/png"
                transparent={true}
              />
            ))
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
