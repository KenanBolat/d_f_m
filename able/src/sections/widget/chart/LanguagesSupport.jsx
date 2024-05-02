import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

// third-party
import ReactApexChart from 'react-apexcharts';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';
import { ThemeMode } from 'config';

// assets
import { ArrowRight } from 'iconsax-react';

// ==============================|| CHART ||============================== //

function DataChart() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // chart options
  const areaChartOptions = {
    chart: {
      id: 'new-users-chart',
      type: 'area',
      sparkline: { enabled: true }
    },
    stroke: {
      width: 1.5
    },
    plotOptions: { bar: { columnWidth: '80%' } },
    xaxis: { crosshairs: { width: 1 } },
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: {
        title: {
          formatter: () => ''
        }
      }
    }
  };
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main],
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme]);

  const [series] = useState([
    {
      data: [100, 140, 100, 250, 115, 125, 90, 100, 140, 100, 230, 115, 215, 90, 190, 100, 120, 180]
    }
  ]);

  return <ReactApexChart options={options} series={series} type="area" height={130} />;
}

// ==============================|| CHART WIDGETS - LANGUAGE SUPPORT ||============================== //

export default function LanguagesSupport() {
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h5">Languages support</Typography>
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
              <ListItemButton onClick={handleClose}>Name</ListItemButton>
              <ListItemButton onClick={handleClose}>Date</ListItemButton>
              <ListItemButton onClick={handleClose}>Rating</ListItemButton>
              <ListItemButton onClick={handleClose}>Unread</ListItemButton>
            </Menu>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar size="sm" color="secondary" variant="rounded" sx={{ color: 'text.secondary' }}>
              <ArrowRight />
            </Avatar>
            <Typography variant="subtitle1">Update version</Typography>
            <Chip color="success" size="small" label="v1.1.0" sx={{ borderRadius: 1, bgcolor: 'success.main' }} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <DataChart />
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="outlined" color="secondary">
            React
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="outlined" color="secondary">
            Angular
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="outlined" color="secondary">
            Bootstrap
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="outlined" color="secondary">
            MUI
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}
