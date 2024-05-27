import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import ReactApexChart from 'react-apexcharts';

// project-imports
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';

// assets
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';

function TableWidgetCard({ color, title, count, percentage, isLoss, invoice, isActive }) {
  return (
    <MainCard {...(isActive && { sx: { bgcolor: 'secondary.lighter', borderColor: 'secondary.lighter' } })}>
      <Grid container spacing={1.25}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">{title}</Typography>
            {percentage && (
              <Stack sx={{ ml: 1, pl: 0.5 }} direction="row" alignItems="center" spacing={0.5}>
                {!isLoss && <ArrowUp2 variant="Bold" size={16} style={{ color }} />}
                {isLoss && <ArrowDown2 variant="Bold" size={16} style={{ color }} />}
                <Typography color="secondary" sx={{ fontWeight: 500 }}>
                  {percentage}%
                </Typography>
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={0.25}>
            <Typography variant="h5">{count}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h5">{invoice}</Typography>
              <Typography color="secondary">invoices</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}

// ==============================|| ORDERS CARD CHART ||============================== //

export const WidgetChart = ({ color, data }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // chart options
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      height: 100,
      type: 'area',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 0
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    stroke: {
      width: 1,
      curve: 'smooth'
    },
    grid: {
      show: false
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        formatter(val) {
          return `$ ${val}`;
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
      colors: [color.main],
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme, color]);

  const [series] = useState([
    {
      name: 'Sales',
      data: data
    }
  ]);

  return <ReactApexChart options={options} series={series} type="area" height={80} />;
};

export default TableWidgetCard;

TableWidgetCard.propTypes = {
  color: PropTypes.any,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  invoice: PropTypes.string,
  isActive: PropTypes.bool
};
