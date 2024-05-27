// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

// project-imports
import ReportCard from 'components/cards/statistics/ReportCard';
import HoverSocialCard from 'components/cards/statistics/HoverSocialCard';
import RoundIconCard from 'components/cards/statistics/RoundIconCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import EcommerceMetrix from 'components/cards/statistics/EcommerceMetrix';

import WalletProfile from 'sections/widget/statistics/WalletProfile';
import AssignUsers from 'sections/widget/statistics/AssignUsers';
import PermissionBlock from 'sections/widget/statistics/PermissionBlock';
import DropboxStorage from 'sections/widget/statistics/DropboxStorage';
import SwitchBalanace from 'sections/widget/statistics/SwitchBalanace';
import { ThemeMode } from 'config';

// assets
import {
  Apple,
  Calendar,
  CalendarAdd,
  Chart,
  Clock,
  DocumentDownload,
  DocumentText,
  DollarCircle,
  Dribbble,
  Eye,
  Facebook,
  Gps,
  ShoppingCart,
  Youtube
} from 'iconsax-react';

// ===========================|| WIDGET - STATISTICS ||=========================== //

export default function WidgetStatistics() {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3} sm={6}>
        <ReportCard primary="$30200" secondary="All Earnings" color={theme.palette.secondary.main} iconPrimary={Chart} />
      </Grid>
      <Grid item xs={12} md={4} lg={3} sm={6}>
        <ReportCard primary="145" secondary="Task" color={theme.palette.error.main} iconPrimary={Calendar} />
      </Grid>
      <Grid item xs={12} md={4} lg={3} sm={6}>
        <ReportCard primary="290+" secondary="Page Views" color={theme.palette.success.main} iconPrimary={DocumentText} />
      </Grid>
      <Grid item xs={12} md={4} lg={3} sm={6}>
        <ReportCard primary="500" secondary="Downloads" color={theme.palette.primary.main} iconPrimary={DocumentDownload} />
      </Grid>

      <Grid item xs={12} md={4} lg={3} sm={6}>
        <HoverSocialCard primary="Facebook Users" secondary="1165 +" iconPrimary={Facebook} color={theme.palette.primary.main} />
      </Grid>
      <Grid item xs={12} md={4} lg={3} sm={6}>
        <HoverSocialCard primary="Dribbble Posts" secondary="780 +" iconPrimary={Dribbble} color={theme.palette.info.main} />
      </Grid>
      <Grid item xs={12} md={4} lg={3} sm={6}>
        <HoverSocialCard
          primary="iOS Users"
          secondary="998 +"
          iconPrimary={Apple}
          color={theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[200] : theme.palette.secondary.dark}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3} sm={6}>
        <HoverSocialCard primary="Youtube Videos" secondary="650 +" iconPrimary={Youtube} color={theme.palette.error.main} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} color="success" extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="error" extra="$20,395" />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <WalletProfile />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AssignUsers />
          </Grid>
          <Grid item xs={12}>
            <PermissionBlock />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DropboxStorage />
          </Grid>
          <Grid item xs={12}>
            <SwitchBalanace />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={4} sm={6}>
        <EcommerceMetrix
          primary="Revenue"
          secondary="$4,500"
          content="$50,032 Last Month"
          color={theme.palette.primary.main}
          iconPrimary={DollarCircle}
        />
      </Grid>
      <Grid item xs={12} lg={4} sm={6}>
        <EcommerceMetrix
          primary="Orders Received"
          secondary="486"
          content="20% Increase"
          color={theme.palette.warning.main}
          iconPrimary={CalendarAdd}
        />
      </Grid>
      <Grid item xs={12} lg={4} sm={12}>
        <EcommerceMetrix
          primary="Total Sales"
          secondary="1641"
          content="$1,055 Revenue Generated"
          color={theme.palette.success.main}
          iconPrimary={ShoppingCart}
        />
      </Grid>

      <Grid item xs={12} lg={4} sm={6}>
        <RoundIconCard
          primary="Impressions"
          secondary="1,563"
          content="May 23 - June 01 (2018)"
          iconPrimary={Eye}
          color="primary.darker"
          bgcolor="primary.lighter"
        />
      </Grid>
      <Grid item xs={12} lg={4} sm={6}>
        <RoundIconCard
          primary="Goal"
          secondary="30,564"
          content="May 28 - June 01 (2018)"
          iconPrimary={Gps}
          color="success.darker"
          bgcolor="success.lighter"
        />
      </Grid>
      <Grid item xs={12} lg={4} md={12}>
        <RoundIconCard
          primary="Impact"
          secondary="42.6%"
          content="May 30 - June 01 (2018)"
          iconPrimary={Clock}
          color="warning.darker"
          bgcolor="warning.lighter"
        />
      </Grid>
    </Grid>
  );
}
