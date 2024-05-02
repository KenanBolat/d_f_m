import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

import SalesChart from 'sections/dashboard/SalesChart';
import AcquisitionChannels from 'sections/dashboard/analytics/AcquisitionChannels';

import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from 'sections/widget/chart/EcommerceDataChart';

import RepeatCustomerRate from 'sections/widget/chart/RepeatCustomerRate';
import ProjectOverview from 'sections/widget/chart/ProjectOverview';
import EcommerceIncome from 'sections/widget/chart/EcommerceIncome';
import EcommerceRadial from 'sections/widget/chart/EcommerceRadial';

import NewOrders from 'sections/widget/chart/NewOrders';
import NewUsers from 'sections/widget/chart/NewUsers';
import Visitors from 'sections/widget/chart/Visitors';

import ProjectAnalytics from 'sections/widget/chart/ProjectAnalytics';

import ProductOverview from 'sections/widget/chart/ProductOverview';
import TotalIncome from 'sections/widget/chart/TotalIncome';

import LanguagesSupport from 'sections/widget/chart/LanguagesSupport';
import MonthlyReport from 'sections/widget/chart/MonthlyReport';

import IncomeChart from 'sections/dashboard/analytics/IncomeChart';

// assets
import { ArrowDown, ArrowDown2, ArrowUp, Book, Calendar, CloudChange, DocumentDownload, Wallet3 } from 'iconsax-react';

// ==============================|| WIDGET - CHARTS ||============================== //

export default function WidgetChart() {
  const theme = useTheme();
  const [slot, setSlot] = useState('week');
  const [quantity, setQuantity] = useState('By volume');

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment) setSlot(newAlignment);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={3}>
      {/* row 1 */}
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="All Earnings"
          count="$3200"
          iconPrimary={<Wallet3 />}
          percentage={
            <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.primary.main} />
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Page Views"
          count="290+"
          color="warning"
          iconPrimary={<Book color={theme.palette.warning.main} />}
          percentage={
            <Typography color="warning.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowDown size={16} style={{ transform: 'rotate(-45deg)' }} /> 30.6%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.warning.main} />
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Total task"
          count="1468"
          color="success"
          iconPrimary={<Calendar color={theme.palette.success.main} />}
          percentage={
            <Typography color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.success.main} />
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Download"
          count="$300"
          color="error"
          iconPrimary={<CloudChange color={theme.palette.error.dark} />}
          percentage={
            <Typography color="error.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowDown size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.error.dark} />
        </EcommerceDataCard>
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} md={8} lg={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RepeatCustomerRate />
          </Grid>
          <Grid item xs={12}>
            <ProjectOverview />
          </Grid>
          <Grid item xs={12} md={6}>
            <EcommerceIncome />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <EcommerceRadial color={theme.palette.primary.main} />
              <EcommerceRadial color={theme.palette.error.dark} />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={3}>
          <NewOrders />
          <NewUsers />
          <Visitors />
        </Stack>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12}>
        <ProjectAnalytics />
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={6}>
        <ProductOverview />
      </Grid>
      <Grid item xs={12} md={6}>
        <TotalIncome />
      </Grid>

      {/* row 5 */}
      <Grid item xs={12} md={4}>
        <LanguagesSupport />
      </Grid>
      <Grid item xs={12} md={8}>
        <MonthlyReport />
      </Grid>

      {/* row 6 */}
      <Grid item xs={12} md={7} lg={8}>
        <SalesChart />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <AcquisitionChannels />
      </Grid>

      {/* row 7 */}
      <Grid item xs={12} md={7} lg={8}>
        <MainCard>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Stack alignItems={{ xs: 'center', sm: 'flex-start' }}>
                <Typography variant="h5">Income Overview</Typography>
                <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
                  <ArrowDown2 variant="Bold" style={{ color: theme.palette.error.main, paddingRight: '4px' }} />
                  <Typography color={theme.palette.error.main}>$1,12,900 (45.67%)</Typography>
                </Stack>
                <Typography color="text.secondary" sx={{ display: 'block' }}>
                  Compare to : 01 Dec 2021-08 Jan 2022
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-end' }} sx={{ mr: 2 }}>
                <ToggleButtonGroup exclusive onChange={handleChange} value={slot}>
                  <ToggleButton disabled={slot === 'week'} value="week" sx={{ px: 2, py: 0.5 }}>
                    Week
                  </ToggleButton>
                  <ToggleButton disabled={slot === 'month'} value="month" sx={{ px: 2, py: 0.5 }}>
                    Month
                  </ToggleButton>
                </ToggleButtonGroup>
                <Select value={quantity} onChange={handleQuantity} size="small">
                  <MenuItem value="By volume">By Volume</MenuItem>
                  <MenuItem value="By margin">By Margin</MenuItem>
                  <MenuItem value="By sales">By Sales</MenuItem>
                </Select>
                <IconButton
                  sx={{
                    border: '1px solid',
                    borderColor: theme.palette.secondary[400],
                    '&:hover': { backgroundColor: 'transparent' }
                  }}
                >
                  <DocumentDownload style={{ color: theme.palette.secondary.darker }} />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ pt: 1 }}>
            <IncomeChart slot={slot} quantity={quantity} />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
}
