import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemButton from '@mui/material/ListItemButton';

// project-imports
import UserAvatar from './UserAvatar';
import UserList from './UserList';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';

import useAuth from 'hooks/useAuth';
import { ThemeMode } from 'config';

// assets
import { ArrowRight2, Clock, Logout, MinusCirlce, SearchNormal1, Setting3, TickCircle } from 'iconsax-react';

// ==============================|| CHAT - DRAWER ||============================== //

export default function ChatDrawer({ handleDrawerOpen, openChatDrawer, setUser, selectedUser }) {
  const theme = useTheme();
  const { user } = useAuth();

  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const drawerBG = theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'white';

  // show menu to set current user status
  const [anchorEl, setAnchorEl] = useState();
  const handleClickRightMenu = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleCloseRightMenu = () => {
    setAnchorEl(null);
  };

  // set user status on status menu click
  const [status, setStatus] = useState('available');
  const handleRightMenuItemClick = (userStatus) => () => {
    setStatus(userStatus);
    handleCloseRightMenu();
  };

  const [search, setSearch] = useState('');
  const handleSearch = async (event) => {
    const newString = event?.target.value;
    setSearch(newString);
  };

  return (
    <Drawer
      sx={{
        width: 320,
        flexShrink: 0,
        zIndex: { xs: openChatDrawer ? 1200 : -1, lg: 0 },
        '& .MuiDrawer-paper': {
          height: matchDownLG ? '100%' : 'auto',
          width: 320,
          boxSizing: 'border-box',
          position: 'relative',
          border: 'none',
          ...(!matchDownLG && { borderRadius: '12px 0 0 12px' })
        }
      }}
      variant={matchDownLG ? 'temporary' : 'persistent'}
      anchor="left"
      open={openChatDrawer}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerOpen}
    >
      <MainCard
        sx={{ bgcolor: matchDownLG ? 'transparent' : drawerBG, borderRadius: '12px 0 0 12px', borderRight: 'none' }}
        border={!matchDownLG}
        content={false}
      >
        <Box sx={{ p: 3, pb: 1 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="h5" color="inherit">
                Messages
              </Typography>
              <Chip
                label="9"
                color={theme.palette.mode === ThemeMode.DARK ? 'default' : 'secondary'}
                sx={{ width: 20, height: 20, borderRadius: '50%', '& .MuiChip-label': { px: 0.5 } }}
              />
            </Stack>

            <OutlinedInput
              fullWidth
              id="input-search-header"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              sx={{ '& .MuiOutlinedInput-input': { p: '10.5px 0px 12px' } }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchNormal1 style={{ fontSize: 'small' }} />
                </InputAdornment>
              }
            />
          </Stack>
        </Box>

        <SimpleBar
          sx={{
            overflowX: 'hidden',
            height: matchDownLG ? 'calc(100vh - 120px)' : 'calc(100vh - 428px)',
            minHeight: matchDownLG ? 0 : 420
          }}
        >
          <Box sx={{ p: 3, pt: 0 }}>
            <UserList setUser={setUser} search={search} selectedUser={selectedUser} />
          </Box>
        </SimpleBar>
        <Box sx={{ px: 3 }}>
          <List sx={{ '& .MuiListItemIcon-root': { minWidth: 32 } }}>
            <ListItemButton>
              <ListItemIcon>
                <Logout variant="Bulk" />
              </ListItemIcon>
              <ListItemText primary="LogOut" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Setting3 variant="Bulk" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </List>
        </Box>

        <Box sx={{ p: 3, pt: 1, pl: 5 }}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                <Grid item>
                  <UserAvatar user={{ online_status: status, avatar: 'avatar-1.png', name: 'User 1' }} />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Stack sx={{ cursor: 'pointer', textDecoration: 'none' }} component={Link} to="/apps/profiles/user/personal">
                    <Typography variant="h5" color="text.primary">
                      {user ? user?.name : ''}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user ? user?.role : ''}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item>
                  <IconButton onClick={handleClickRightMenu} size="small" color="secondary">
                    <ArrowRight2 />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseRightMenu}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    sx={{ '& .MuiMenu-list': { p: 0 }, '& .MuiMenuItem-root': { pl: '6px', py: '3px' } }}
                  >
                    <MenuItem onClick={handleRightMenuItemClick('available')}>
                      <IconButton
                        size="small"
                        sx={{
                          color: 'success.main',
                          '&:hover': { color: 'success.main', bgcolor: 'transparent', transition: 'none', padding: 0 }
                        }}
                      >
                        <TickCircle variant="Bold" />
                      </IconButton>
                      <Typography>Active</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleRightMenuItemClick('offline')}>
                      <IconButton
                        size="small"
                        sx={{
                          color: 'warning.main',
                          '&:hover': { color: 'warning.main', bgcolor: 'transparent', transition: 'none', padding: 0 }
                        }}
                      >
                        <Clock />
                      </IconButton>
                      <Typography>Away</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleRightMenuItemClick('do_not_disturb')}>
                      <IconButton
                        size="small"
                        sx={{
                          color: 'secondary.400',
                          '&:hover': { color: 'secondary.400', bgcolor: 'transparent', transition: 'none', padding: 0 }
                        }}
                      >
                        <MinusCirlce />
                      </IconButton>
                      <Typography>Do not disturb</Typography>
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </Drawer>
  );
}

ChatDrawer.propTypes = {
  handleDrawerOpen: PropTypes.func,
  openChatDrawer: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  setUser: PropTypes.func,
  selectedUser: PropTypes.oneOfType([PropTypes.any, PropTypes.string])
};
