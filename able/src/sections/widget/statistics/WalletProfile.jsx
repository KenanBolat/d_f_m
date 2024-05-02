import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';

// assets
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import avatar from 'assets/images/users/avatar-6.png';

// ===========================|| STATISTICS - WALLET PROFILE ||=========================== //

export default function WalletProfile() {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElProfile, setAnchorElProfile] = useState(null);

  const openProfile = Boolean(anchorElProfile);

  const handleClickProfile = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h5">Add Fund</Typography>
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
        </Grid>
        <Grid item xs={12}>
          <Stack alignItems="center">
            <Typography>Amount</Typography>
            <Typography variant="h3">$100</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1.25}
            sx={{ '& .MuiChip-root': { borderColor: theme.palette.divider, borderRadius: 1 } }}
          >
            <Chip color="primary" label="$100" variant="light" size="small" />
            <Chip label="$150" variant="outlined" size="small" />
            <Chip label="$200" variant="outlined" size="small" />
            <Chip label="$250" variant="outlined" size="small" />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <MainCard content={false}>
            <Box sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar alt="Jone Doe" src={avatar} size="lg" />
                  <Stack>
                    <Typography variant="subtitle1">Able pro</Typography>
                    <Typography variant="caption">@ableprodevelop</Typography>
                  </Stack>
                </Stack>

                <IconButton
                  color="secondary"
                  id="profile-button"
                  aria-controls={openProfile ? 'profile-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openProfile ? 'true' : undefined}
                  onClick={handleClickProfile}
                >
                  {openProfile ? <ArrowDown2 /> : <ArrowUp2 />}
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorElProfile}
                  open={openProfile}
                  onClose={handleCloseProfile}
                  MenuListProps={{ 'aria-labelledby': 'profile-button', sx: { p: 1.25, minWidth: 150 } }}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <ListItemButton onClick={handleCloseProfile}>Active</ListItemButton>
                  <ListItemButton onClick={handleCloseProfile}>Disable</ListItemButton>
                  <ListItemButton onClick={handleCloseProfile}>Remove</ListItemButton>
                </Menu>
              </Stack>
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained">
            Confirm
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}
