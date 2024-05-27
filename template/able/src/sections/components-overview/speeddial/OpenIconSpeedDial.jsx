import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Copy, Edit, Heart, Printer, Save2, Share } from 'iconsax-react';

// =============================|| SPEEDDIAL - CUSTOM CLOSE ICON ||============================= //

export default function OpenIconSpeedDial() {
  // fab action options
  const actions = [
    { icon: <Copy />, name: 'Copy' },
    { icon: <Save2 />, name: 'Save' },
    { icon: <Printer />, name: 'Print' },
    { icon: <Share />, name: 'Share' },
    { icon: <Heart />, name: 'Like' }
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [hidden, setHidden] = useState(false);
  const handleVisibility = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const customSpeeddialCodeString = `<Box sx={{ height: 430, transform: 'translateZ(0px)', flexGrow: 1 }}>
  <Button onClick={handleVisibility}>Toggle Speed Dial</Button>
  <SpeedDial
    ariaLabel="SpeedDial openIcon example"
    hidden={hidden}
    icon={<SpeedDialIcon openIcon={<Edit style={{ fontSize: '1.3rem' }} />} />}
    onClose={handleClose}
    onOpen={handleOpen}
    open={open}
    sx={{ position: 'absolute', bottom: 16, right: 16 }}
  >
    {actions.map((action) => (
      <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
    ))}
  </SpeedDial>
</Box>`;

  return (
    <MainCard title="Custom Close Icon" codeString={customSpeeddialCodeString}>
      <Box sx={{ height: 430, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <Button onClick={handleVisibility}>Toggle Speed Dial</Button>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          hidden={hidden}
          icon={<SpeedDialIcon openIcon={<Edit style={{ fontSize: '1.3rem' }} />} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          sx={{ position: 'absolute', bottom: 16, right: 16, '& .MuiSpeedDialAction-fab': { bgcolor: 'secondary.200' } }}
        >
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
          ))}
        </SpeedDial>
      </Box>
    </MainCard>
  );
}
