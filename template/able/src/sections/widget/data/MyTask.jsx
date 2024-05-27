import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

// project-imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';

import { Folder, Send2, TickCircle } from 'iconsax-react';

// ===========================|| DATA WIDGET - MY TASK ||=========================== //

export default function MyTask() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard content={false}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Typography variant="h5">My Task</Typography>
          <IconButton
            color="secondary"
            id="wallet-button"
            aria-controls={open ? 'wallet-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="wallet-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'wallet-button', sx: { p: 1.25, minWidth: 150 } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <ListItemButton onClick={handleClose}>Today</ListItemButton>
            <ListItemButton onClick={handleClose}>Weekly</ListItemButton>
            <ListItemButton onClick={handleClose}>Monthly</ListItemButton>
          </Menu>
        </Stack>
      </Box>
      <List sx={{ '& .MuiListItem-root': { pl: 3 } }}>
        <ListItem
          divider
          secondaryAction={
            <IconButton aria-label="delete" color="success">
              <TickCircle />
            </IconButton>
          }
        >
          <Stack>
            <ListItemText primary={<Typography variant="subtitle1">Follow up client for feedback</Typography>} />
            <Stack spacing={0.5}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Send2 size={12} />
                <Typography>Sending report</Typography>
              </Stack>
              <Box>
                <Chip label="00 : 15" color="error" variant="filled" size="small" />
              </Box>
            </Stack>
          </Stack>
        </ListItem>
        <ListItem
          divider
          secondaryAction={
            <IconButton aria-label="delete" color="secondary">
              <TickCircle />
            </IconButton>
          }
        >
          <Stack>
            <ListItemText primary={<Typography variant="subtitle1">Follow up client for feedback</Typography>} />
            <Stack spacing={0.5}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Folder size={12} />
                <Typography>Received report</Typography>
              </Stack>
              <Box>
                <Chip label="00 : 15" color="success" variant="filled" size="small" />
              </Box>
            </Stack>
          </Stack>
        </ListItem>
        <ListItem
          secondaryAction={
            <IconButton aria-label="delete" color="secondary">
              <TickCircle />
            </IconButton>
          }
        >
          <Stack>
            <ListItemText primary={<Typography variant="subtitle1">Follow up client for feedback</Typography>} />
            <Stack spacing={0.5}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Send2 size={12} />
                <Typography>Sending report</Typography>
              </Stack>
              <Box>
                <Chip label="00 : 15" color="error" variant="filled" size="small" />
              </Box>
            </Stack>
          </Stack>
        </ListItem>
      </List>
    </MainCard>
  );
}
