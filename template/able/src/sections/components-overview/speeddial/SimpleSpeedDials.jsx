import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import FormLabel from '@mui/material/FormLabel';
import SpeedDial from '@mui/material/SpeedDial';
import RadioGroup from '@mui/material/RadioGroup';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FormControlLabel from '@mui/material/FormControlLabel';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Heart, Printer, Save2, Share } from 'iconsax-react';

export default function SimpleSpeedDials() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  // fab action options
  const actions = [
    { icon: <Save2 />, name: 'Save' },
    { icon: <Printer />, name: 'Print' },
    { icon: <Share />, name: 'Share' },
    { icon: <Heart />, name: 'Like' }
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [direction, setDirection] = useState('up');
  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const [hidden, setHidden] = useState(false);
  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  const basicSpeeddialCodeString = `<FormControlLabel control={<Switch checked={hidden} onChange={handleHiddenChange} color="primary" />} label="Hidden" />
<FormLabel component="legend">Direction</FormLabel>
<RadioGroup sx={{ mt: 1 }} aria-label="direction" name="direction" value={direction} onChange={handleDirectionChange} row>
  <FormControlLabel value="up" control={<Radio />} label="Up" />
  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
    <FormControlLabel value="right" control={<Radio />} label="Right" />
  </Box>
  <FormControlLabel value="down" control={<Radio />} label="Down" />
  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
    <FormControlLabel value="left" control={<Radio />} label="Left" />
  </Box>
</RadioGroup>
<Box sx={{ position: 'relative', marginTop: theme.spacing(3), height: 300 }}>
  <SpeedDial
    sx={{
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2)
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2)
      }
    }}
    ariaLabel="SpeedDial example"
    hidden={hidden}
    icon={<SpeedDialIcon />}
    onClose={handleClose}
    onOpen={handleOpen}
    open={open}
    direction={direction}
  >
    {actions.map((action) => (
      <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
    ))}
  </SpeedDial>
</Box>`;

  return (
    <MainCard title="Basic" codeString={basicSpeeddialCodeString}>
      <>
        <FormControlLabel control={<Switch checked={hidden} onChange={handleHiddenChange} color="primary" />} label="Hidden" />
        <FormLabel component="legend">Direction</FormLabel>
        <RadioGroup sx={{ mt: 1 }} aria-label="direction" name="direction" value={direction} onChange={handleDirectionChange} row>
          <FormControlLabel value="up" control={<Radio />} label="Up" />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <FormControlLabel value="right" control={<Radio />} label="Right" />
          </Box>
          <FormControlLabel value="down" control={<Radio />} label="Down" />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <FormControlLabel value="left" control={<Radio />} label="Left" />
          </Box>
        </RadioGroup>
        <Box sx={{ position: 'relative', marginTop: theme.spacing(3), height: 300 }}>
          <SpeedDial
            sx={{
              position: 'absolute',
              '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': { bottom: theme.spacing(2), right: theme.spacing(2) },
              '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': { top: theme.spacing(2), left: theme.spacing(2) },
              '& .MuiSpeedDialAction-fab': { bgcolor: 'secondary.200' }
            }}
            ariaLabel="SpeedDial example"
            hidden={hidden}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={direction}
          >
            {actions.map((action) => (
              <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
            ))}
          </SpeedDial>
        </Box>
      </>
    </MainCard>
  );
}
