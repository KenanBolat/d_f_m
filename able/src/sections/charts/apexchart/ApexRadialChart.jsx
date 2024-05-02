import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// third-party
import ReactApexChart from 'react-apexcharts';

// project-imports
import { ThemeMode } from 'config';

// chart options
const redialBarChartOptions = {
  chart: {
    type: 'radialBar',
    width: 450,
    height: 450
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: '30%',
        background: 'transparent',
        image: undefined
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          show: false
        }
      }
    }
  },
  labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
  legend: {
    show: true,
    floating: true,
    fontSize: '14px',
    position: 'left',
    offsetX: -15,
    offsetY: -15,
    labels: {
      useSeriesColors: true
    },
    markers: {
      size: 4
    },
    formatter(seriesName, opts) {
      return `${seriesName}:  ${opts.w.globals.series[opts.seriesIndex]}`;
    },
    itemMargin: {
      vertical: 2
    }
  },
  responsive: [
    {
      breakpoint: 450,
      chart: {
        width: 280,
        height: 280
      },
      options: {
        legend: {
          show: true,
          floating: true,
          fontSize: '14px',
          position: 'left',
          offsetX: -20,
          offsetY: -10,
          labels: {
            useSeriesColors: true
          },
          markers: {
            size: 4
          },
          formatter(seriesName, opts) {
            return `${seriesName}:  ${opts.w.globals.series[opts.seriesIndex]}`;
          },
          itemMargin: {
            vertical: 2
          }
        }
      }
    }
  ]
};

// ==============================|| APEXCHART - RADIAL ||============================== //

export default function ApexRedialBarChart() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const { primary } = theme.palette.text;
  const line = theme.palette.divider;
  const grey200 = theme.palette.secondary[200];

  const [series] = useState([76, 67, 61, 90]);
  const [options, setOptions] = useState(redialBarChartOptions);

  const secondary = theme.palette.primary[700];
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.main;
  const error = theme.palette.error.main;

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [secondary, primaryMain, successDark, error],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      plotOptions: {
        radialBar: {
          track: {
            background: line
          }
        }
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, line, grey200, secondary, primaryMain, successDark, error]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={options} series={series} type="radialBar" />
    </Box>
  );
}
