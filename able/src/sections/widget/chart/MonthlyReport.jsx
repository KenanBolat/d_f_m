import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// third-party
import ReactApexChart from 'react-apexcharts';

// project-imports
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';

// ==============================|| CHART ||============================== //

function EcommerceDataChart() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // chart options
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    fill: {
      opacity: [1, 0.7, 0.4, 0.3]
    },
    grid: {
      strokeDashArray: 4
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        columnWidth: '80%'
      }
    },
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      }
    },
    legend: {
      show: false
    }
  };

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary.light, theme.palette.primary[200], theme.palette.warning.light],
      xaxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: false,
          color: line
        },
        axisTicks: {
          show: false
        },
        tickAmount: 11
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme]);

  const [series] = useState([
    {
      name: 'Deals',
      data: [44, 55, 41, 67, 52, 53, 13, 23, 20, 8, 13, 27]
    },
    {
      name: 'Income Report',
      data: [13, 23, 20, 8, 13, 27, 21, 7, 25, 13, 22, 8]
    },
    {
      name: 'Customer',
      data: [11, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14]
    },
    {
      name: 'Profits',
      data: [21, 7, 25, 13, 22, 3, 44, 55, 41, 67, 22, 12]
    }
  ]);

  return <ReactApexChart options={options} series={series} type="bar" height={350} />;
}

// ==============================|| CHART WIDGETS - MONTHLY REPORT ||============================== //

export default function MonthlyReport() {
  const [age, setAge] = useState('30');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <MainCard>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h5">Monthly Report</Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select id="demo-simple-select" value={age} onChange={handleChange}>
                  <MenuItem value={10}>Today</MenuItem>
                  <MenuItem value={20}>Weekly</MenuItem>
                  <MenuItem value={30}>Monthly</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <EcommerceDataChart />
        </Grid>
      </Grid>
    </MainCard>
  );
}
