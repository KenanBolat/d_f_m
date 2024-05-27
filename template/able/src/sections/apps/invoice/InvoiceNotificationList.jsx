import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import MoreIcon from 'components/@extended/MoreIcon';

// assets
import { DocumentDownload, DocumentText, Link1, Setting3 } from 'iconsax-react';

// ==============================|| INVOICE - NOTIFICATIONS ||============================== //

export default function InvoiceNotificationList() {
  const theme = useTheme();
  const iconSX = {
    color: theme.palette.text.secondary
  };

  return (
    <MainCard
      title="Notification"
      secondary={
        <IconButton edge="end" aria-label="comments" color="secondary" sx={{ transform: 'rotate(90deg)' }}>
          <MoreIcon />
        </IconButton>
      }
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 1" color="success">
                <DocumentDownload />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography variant="subtitle1">
                Johnny sent you an invoice billed{' '}
                <Link component={RouterLink} to="#" underline="hover">
                  $1,000.
                </Link>
              </Typography>
              <Typography variant="caption" color="secondary">
                2 August
              </Typography>
            </Grid>
            <Grid item>
              <Link1 size={18} style={iconSX} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 2">
                <DocumentText />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography variant="subtitle1">
                Sent an invoice to Aida Bugg amount of{' '}
                <Link component={RouterLink} to="#" underline="hover">
                  $200.
                </Link>
              </Typography>
              <Typography variant="caption" color="secondary">
                7 hours ago
              </Typography>
            </Grid>
            <Grid item>
              <Link1 size={18} style={iconSX} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 2" color="error">
                <Setting3 />
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography variant="subtitle1">There was a failure to your setup</Typography>
              <Typography variant="caption" color="secondary">
                7 hours ago
              </Typography>
            </Grid>
            <Grid item>
              <Link1 size={18} style={iconSX} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 2">C</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography variant="subtitle1">Cristina danny invited to you join Meeting</Typography>
              <Typography variant="caption" color="secondary">
                7 hours ago
              </Typography>
            </Grid>
            <Grid item>
              <Link1 size={18} style={iconSX} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 2">C</Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography variant="subtitle1">Cristina danny invited to you join Meeting</Typography>
              <Typography variant="caption" color="secondary">
                7 hours ago
              </Typography>
            </Grid>
            <Grid item>
              <Link1 size={18} style={iconSX} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="outlined" color="secondary">
            View All
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}
