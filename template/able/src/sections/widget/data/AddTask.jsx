import { useState } from 'react';

// material-ui
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import LinearProgress from '@mui/material/LinearProgress';

// project-imports
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';

// assets
import { Add, Link1, Task } from 'iconsax-react';

// =========================|| DATA WIDGET - ADD NEW TASK ||========================= //

export default function AddTask() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h5">Add new task</Typography>
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
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar color="success" variant="rounded">
              <Task />
            </Avatar>
            <Typography variant="h5">New Task</Typography>
            <Chip label="20" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography>Tasks done</Typography>
              <Typography>42%</Typography>
            </Stack>
            <LinearProgress variant="determinate" value={42} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <Dot color="warning" />
              </ListItemIcon>
              <ListItemText primary="Introduction for client" />
              <Chip
                label={
                  <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.5, '& svg': { width: 12, height: 12 } }}>
                    <Link1 />2
                  </Typography>
                }
                size="small"
                sx={{ borderRadius: 1 }}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Dot />
              </ListItemIcon>
              <ListItemText primary="Creating wireframes" />
              <Chip
                label={
                  <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.5, '& svg': { width: 12, height: 12 } }}>
                    <Link1 />8
                  </Typography>
                }
                size="small"
                sx={{ borderRadius: 1 }}
              />
            </ListItemButton>
          </List>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" startIcon={<Add />}>
            Add task
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}
