import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';

// project-imports
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val) {
        return `$ ${val} thousands`;
      }
    }
  },
  legend: {
    show: false
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};

// ==============================|| DASHBOARD - SALES COLUMN CHART ||============================== //

export default function SalesChart() {
  const theme = useTheme();

  const [age, setAge] = useState('30');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [legend, setLegend] = useState({
    income: true,
    cos: true
  });

  const { income, cos } = legend;

  const mode = theme.palette.mode;
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const initialSeries = [
    {
      name: 'Income',
      data: [180, 90, 135, 114, 120, 145]
    },
    {
      name: 'Cost Of Sales',
      data: [120, 45, 78, 150, 168, 99]
    }
  ];

  const [series, setSeries] = useState(initialSeries);

  const handleLegendChange = (event) => {
    setLegend({ ...legend, [event.target.name]: event.target.checked });
  };

  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    if (income && cos) {
      setSeries(initialSeries);
    } else if (income) {
      setSeries([
        {
          name: 'Income',
          data: [180, 90, 135, 114, 120, 145]
        }
      ]);
    } else if (cos) {
      setSeries([
        {
          name: 'Cost Of Sales',
          data: [120, 45, 78, 150, 168, 99]
        }
      ]);
    } else {
      setSeries([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [income, cos]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: !(income && cos) && cos ? [primaryMain] : [warning, primaryMain],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
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
      plotOptions: {
        bar: {
          columnWidth: xsDown ? '60%' : '30%'
        }
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, warning, primaryMain, successDark, income, cos, xsDown]);

  return (
    <MainCard>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography variant="h5">Sales Report</Typography>
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
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1.5 }}>
        <Stack>
          <Typography variant="h6" color="secondary">
            Net Profit
          </Typography>
          <Typography variant="h4">$1560</Typography>
        </Stack>
        <FormControl component="fieldset" sx={{ width: 136 }}>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox color="warning" checked={income} onChange={handleLegendChange} name="income" />}
              label="Income"
            />
            <FormControlLabel control={<Checkbox checked={cos} onChange={handleLegendChange} name="cos" />} label="Cost of Sales" />
          </FormGroup>
        </FormControl>
      </Stack>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={360} />
      </div>
    </MainCard>
  );
}
