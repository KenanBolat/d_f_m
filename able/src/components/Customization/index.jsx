import { useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import ThemeLayout from './ThemeLayout';
import ThemeMode from './ThemeMode';
import ThemeContrast from './ThemeContrast';
import ColorScheme from './ColorScheme';
import ThemeWidth from './ThemeWidth';
import ThemeMenuLayout from './ThemeMenuLayout';
import ThemeFont from './ThemeFont';
import MenuCaption from './MenuCaption';

import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';

import { HEADER_HEIGHT } from 'config';
import useConfig from 'hooks/useConfig';

// assets
import { Add, Setting2 } from 'iconsax-react';

// ==============================|| HEADER CONTENT - CUSTOMIZATION ||============================== //

export default function Customization() {
  const theme = useTheme();
  const { container, mode, presetColor, miniDrawer, themeDirection, menuOrientation, menuCaption, themeContrast, fontFamily } = useConfig();

  // eslint-disable-next-line
  const themeLayout = useMemo(() => <ThemeLayout />, [miniDrawer, themeDirection]);
  // eslint-disable-next-line
  const themeMenuLayout = useMemo(() => <ThemeMenuLayout />, [menuOrientation]);
  // eslint-disable-next-line
  const themeMode = useMemo(() => <ThemeMode />, [mode]);
  // eslint-disable-next-line
  const themeContrastView = useMemo(() => <ThemeContrast />, [themeContrast]);
  // eslint-disable-next-line
  const menuCaptionView = useMemo(() => <MenuCaption />, [menuCaption]);
  // eslint-disable-next-line
  const themeColor = useMemo(() => <ColorScheme />, [presetColor]);
  // eslint-disable-next-line
  const themeWidth = useMemo(() => <ThemeWidth />, [container]);
  // eslint-disable-next-line
  const themeFont = useMemo(() => <ThemeFont />, [fontFamily]);

  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Fab
        component="div"
        onClick={handleToggle}
        size="large"
        variant="circular"
        sx={{
          borderRadius: 0,
          borderTopLeftRadius: '50%',
          borderBottomLeftRadius: '50%',
          borderTopRightRadius: '4px',
          borderBottomRightRadius: '4px',
          top: '14%',
          position: 'fixed',
          right: 0,
          zIndex: 1200,
          boxShadow: theme.customShadows.z1,
          bgcolor: 'background.paper',
          border: '4px solid ',
          borderColor: 'background.paper',
          borderRight: 'none',
          '&:hover': { bgcolor: 'primary.lighter' }
        }}
      >
        <IconButton
          onClick={handleToggle}
          aria-label="settings toggler"
          size="large"
          sx={{ p: 0, '& :hover': { bgcolor: 'red' }, '& svg': { width: 28, height: 28 } }}
        >
          <Setting2 variant="Bulk" />
        </IconButton>
      </Fab>
      <Drawer
        sx={{
          zIndex: 2001
        }}
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 350
          }
        }}
      >
        {open && (
          <MainCard content={false} border={false}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5} sx={{ p: 2.5 }}>
              <Typography variant="h5">Settings</Typography>
              <IconButton color="error" sx={{ p: 0 }} onClick={handleToggle}>
                <Add size={28} style={{ transform: 'rotate(45deg)' }} />
              </IconButton>
            </Stack>
            <SimpleBar
              sx={{
                '& .simplebar-content': {
                  display: 'flex',
                  flexDirection: 'column'
                }
              }}
            >
              <Box sx={{ p: 3, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
                <Grid container spacing={2.5}>
                  {/* theme-mode */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        Theme Mode
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Choose light or dark mode
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {themeMode}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* theme-contrast */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        Theme Contrast
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Choose theme contrast/shadow
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {themeContrastView}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* custom-theme */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        Custom Theme
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Choose your primary theme color
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {themeColor}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* menu-caption */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        Sidebar Caption
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Hide your sidebar caption
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {menuCaptionView}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* theme-layout */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        Theme Layout
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Choose your layout
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {themeLayout}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* theme-orientation */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        Menu Orientation
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Choose Vertical or Horizontal Menu Orientation
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {themeMenuLayout}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* theme-container */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        Layout Width
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Choose fluid or container layout
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {themeWidth}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* theme-font-family */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        Font Family
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Choose your font family.
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {themeFont}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </Box>
            </SimpleBar>
          </MainCard>
        )}
      </Drawer>
    </>
  );
}
