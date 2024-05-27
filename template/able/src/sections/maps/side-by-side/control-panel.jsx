import PropTypes from 'prop-types';
import { memo } from 'react';

// material-ui
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// project-import
import ControlPanelStyled from 'components/third-party/map/ControlPanelStyled';

// ==============================|| SIDE BY SIDE - CONTROL ||============================== //

function ControlPanel({ mode, onModeChange }) {
  return (
    <ControlPanelStyled>
      <ToggleButtonGroup value={mode} exclusive onChange={onModeChange}>
        <ToggleButton value="side-by-side">Side by side</ToggleButton>
        <ToggleButton value="split-screen">Split screen</ToggleButton>
      </ToggleButtonGroup>
    </ControlPanelStyled>
  );
}

export default memo(ControlPanel);

ControlPanel.propTypes = { mode: PropTypes.any, onModeChange: PropTypes.any };
