import PropTypes from 'prop-types';
import { memo } from 'react';

// material-ui
import Typography from '@mui/material/Typography';

// project-import
import ControlPanelStyled from 'components/third-party/map/ControlPanelStyled';

const EVENT_LIST = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

// ==============================|| CONTROL - DRAGGABLE MARKER ||============================== //

function ControlPanel({ events = {} }) {
  return (
    <ControlPanelStyled>
      {EVENT_LIST.map((event) => {
        const lngLat = events[event];

        return (
          <div key={event}>
            <Typography variant="subtitle2">{event}:</Typography>

            {lngLat ? (
              <Typography variant="subtitle2">{`${round5(lngLat.lng)}, ${round5(lngLat.lat)}`}</Typography>
            ) : (
              <Typography variant="body2" component="em">
                -
              </Typography>
            )}
          </div>
        );
      })}
    </ControlPanelStyled>
  );
}

export default memo(ControlPanel);

ControlPanel.propTypes = { events: PropTypes.object };
