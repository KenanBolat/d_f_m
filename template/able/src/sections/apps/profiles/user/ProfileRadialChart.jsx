import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

import { ThemeMode } from 'config';

// chart options
const redialBarChartOptions = {
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: '75%'
      },
      track: {
        margin: 0
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          offsetY: 5
        }
      }
    }
  },
  labels: ['Vimeo']
};

// ==============================|| TOP CARD - RADIAL BAR CHART ||============================== //

export default function ProfileRadialChart() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const textPrimary = theme.palette.text.primary;
  const primary = theme.palette.primary.main;
  const grey0 = theme.palette.common.white;
  const grey500 = theme.palette.secondary.main;
  const grey200 = theme.palette.secondary[200];

  const [series] = useState([30]);
  const [options, setOptions] = useState(redialBarChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [primary],
      plotOptions: {
        radialBar: {
          track: {
            background: mode === ThemeMode.DARK ? grey200 : grey0
          },
          dataLabels: {
            value: {
              fontSize: '1rem',
              fontWeight: 600,
              offsetY: 5,
              color: textPrimary
            }
          }
        }
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, grey200, grey0, grey500, textPrimary, primary]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" width={136} height={136} />
    </div>
  );
}
