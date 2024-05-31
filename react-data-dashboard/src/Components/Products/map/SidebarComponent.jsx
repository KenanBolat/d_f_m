import React, { useState } from 'react';
import { ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './Sidebar.css';

const SidebarComponent = ({ layers, onToggleLayer }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ProSidebarProvider>
      <Sidebar collapsed={collapsed}>
        <Menu iconShape="circle">
          <MenuItem onClick={handleToggleSidebar}>
            {collapsed ? <span>&#9776;</span> : <span>Toggle Sidebar</span>}
          </MenuItem>
          {layers.map((layerGroup, idx) => (
            <SubMenu key={idx} title={layerGroup.name}>
              {layerGroup.layers.map((layer, layerIdx) => (
                <MenuItem key={layerIdx}>
                  <input
                    type="checkbox"
                    checked={layer.active}
                    onChange={() => onToggleLayer(layerGroup.name, layer.name)}
                  />
                  {layer.name}
                </MenuItem>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </Sidebar>
    </ProSidebarProvider>
  );
};

export default SidebarComponent;