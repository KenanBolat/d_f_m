// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// project-imports

import NewOrders from 'sections/widget/chart/NewOrders';
import NewUsers from 'sections/widget/chart/NewUsers';
import Visitors from 'sections/widget/chart/Visitors';

import DropboxStorage from 'sections/widget/statistics/DropboxStorage';
import SwitchBalanace from 'sections/widget/statistics/SwitchBalanace';

import ProjectAnalytics from 'sections/widget/chart/ProjectAnalytics';

import EcommerceIncome from 'sections/widget/chart/EcommerceIncome';
import LanguagesSupport from 'sections/widget/chart/LanguagesSupport';

import ProductOverview from 'sections/widget/chart/ProductOverview';

import PaymentHistory from 'sections/widget/data/PaymentHistory';
import EcommerceRadial from 'sections/widget/chart/EcommerceRadial';

// ==============================|| DASHBOARD - ANALYTICS ||============================== //

export default function DashboardAnalytics() {
  const theme = useTheme();

  return (
    <Grid container rowSpacing={4.5} columnSpacing={3}>
      {/* row 1 */}
      <Grid item xs={12} md={4} lg={3}>
        <NewOrders />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <NewUsers />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Visitors />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DropboxStorage />
          </Grid>
          <Grid item xs={12}>
            <SwitchBalanace />
          </Grid>
        </Grid>
      </Grid>

      {/* row 2 */}
      <Grid item xs={12}>
        <ProjectAnalytics />
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} lg={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <EcommerceIncome />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <LanguagesSupport />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <ProductOverview />
      </Grid>
      <Grid item xs={12} lg={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <PaymentHistory />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <Stack spacing={3}>
              <EcommerceRadial color={theme.palette.primary.main} />
              <EcommerceRadial color={theme.palette.error.dark} />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
