import { useCallback, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

// project import
import IconButton from 'components/@extended/IconButton';
import { ThemeMode } from 'config';

// assets
import { Maximize1 } from 'iconsax-react';

// ==============================|| HEADER CONTENT - FULLSCREEN ||============================== //

export default function FullScreen() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
    if (document && !document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'background.paper' : 'secondary.200';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'secondary.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Tooltip title={open ? 'Exit Fullscreen' : 'Fullscreen'}>
        <IconButton
          color="secondary"
          variant="light"
          onClick={handleToggle}
          size="large"
          sx={{ color: 'secondary.main', bgcolor: open ? iconBackColorOpen : iconBackColor, p: 1 }}
        >
          <Maximize1 variant="Bulk" {...(open && { style: { transform: 'rotate(180deg)' } })} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
