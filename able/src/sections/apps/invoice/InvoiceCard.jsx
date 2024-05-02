// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// assets
import { ArchiveBook, CloseCircle, DocumentText, DollarCircle, FilterSquare, ShoppingBag } from 'iconsax-react';

// ==============================|| INVOICE - CARD ||============================== //

export default function InvoiceCard() {
  return (
    <MainCard sx={{ height: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={2} lg={6}>
          <MainCard content={false} sx={{ py: 2.5 }}>
            <Stack alignItems="center" spacing={2}>
              <Avatar size="md" type="filled">
                <DocumentText variant="Bold" />
              </Avatar>
              <Typography variant="subtitle1" color="text.secondary">
                All Invoices
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={4} sm={2} lg={6}>
          <MainCard>
            <Stack alignItems="center" spacing={2}>
              <Avatar size="md" type="filled" color="info">
                <ArchiveBook variant="Bold" />
              </Avatar>
              <Typography variant="subtitle1" color="text.secondary">
                Reports
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={4} sm={2} lg={6}>
          <MainCard>
            <Stack alignItems="center" spacing={2}>
              <Avatar size="md" type="filled" color="success">
                <DollarCircle variant="Bold" />
              </Avatar>
              <Typography variant="subtitle1" color="text.secondary">
                Paid
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={4} sm={2} lg={6}>
          <MainCard>
            <Stack alignItems="center" spacing={2}>
              <Avatar size="md" type="filled" color="warning">
                <FilterSquare variant="Bold" />
              </Avatar>
              <Typography variant="subtitle1" color="text.secondary">
                Pending
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={4} sm={2} lg={6}>
          <MainCard>
            <Stack alignItems="center" spacing={2}>
              <Avatar size="md" type="filled" color="error">
                <CloseCircle variant="Bold" />
              </Avatar>
              <Typography variant="subtitle1" color="text.secondary">
                Cancelled
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={4} sm={2} lg={6}>
          <MainCard>
            <Stack alignItems="center" spacing={2}>
              <Avatar size="md" type="filled">
                <ShoppingBag variant="Bold" />
              </Avatar>
              <Typography variant="subtitle1" color="text.secondary">
                Draft
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </MainCard>
  );
}
