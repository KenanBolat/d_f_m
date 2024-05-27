import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project-imports
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';

import { ThemeDirection } from 'config';
import useConfig from 'hooks/useConfig';

// assets
import { Back, Copy, Next, Trash } from 'iconsax-react';

// ==============================|| CHAT - ACTION ||============================== //

export default function ChatMessageAction({ index }) {
  const { themeDirection } = useConfig();
  const [anchorEl, setAnchorEl] = useState();

  const handleClickSort = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        id={`chat-action-button-${index}`}
        aria-controls={open ? `chat-action-menu-${index}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickSort}
        size="small"
        color="secondary"
        sx={{ transform: 'rotate(90deg)' }}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id={`chat-action-menu-${index}`}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleCloseSort}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        MenuListProps={{ 'aria-labelledby': `chat-action-button-${index}` }}
        sx={{ p: 0, '& .MuiMenu-list': { p: 0 } }}
      >
        <MenuItem>
          <Back style={themeDirection === ThemeDirection.RTL ? { paddingLeft: 8 } : { paddingRight: 8 }} />
          <Typography>Reply</Typography>
        </MenuItem>
        <MenuItem>
          <Next style={themeDirection === ThemeDirection.RTL ? { paddingLeft: 8 } : { paddingRight: 8 }} />
          <Typography>Forward</Typography>
        </MenuItem>
        <MenuItem>
          <Copy style={themeDirection === ThemeDirection.RTL ? { paddingLeft: 8 } : { paddingRight: 8 }} />
          <Typography>Copy</Typography>
        </MenuItem>
        <MenuItem>
          <Trash style={themeDirection === ThemeDirection.RTL ? { paddingLeft: 8 } : { paddingRight: 8 }} />
          <Typography>Delete</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

ChatMessageAction.propTypes = { index: PropTypes.number };
