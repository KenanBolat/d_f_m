import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// assets
import { ArrowDown3, ArrowUp3 } from 'iconsax-react';

// ==============================|| INVOICE - CARD  ||============================== //

export default function TableWidgetCard({ color, title, count, percentage, isLoss, children, invoice }) {
  return (
    <Grid container direction="row" spacing={2} justifyContent="space-between">
      <Grid item xs={12} md={5}>
        <Stack direction="column" spacing={2}>
          <Typography variant="subtitle1">{title}</Typography>
          <Stack direction="column" spacing={1}>
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle1">{invoice}</Typography>
              <Typography color="secondary">invoices</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box>
          <Stack direction="column" alignItems="flex-end" justifyContent="space-evenly">
            {percentage && (
              <Stack sx={{ ml: 1.25, pl: 1 }} direction="row" alignItems="center" spacing={1}>
                {!isLoss && <ArrowUp3 variant="Bold" style={{ fontSize: '0.75rem', color: `${color}` }} />}
                {isLoss && <ArrowDown3 variant="Bold" style={{ fontSize: '0.75rem', color: `${color}` }} />}
                <Typography color="secondary">{percentage}%</Typography>
              </Stack>
            )}
            {children}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

TableWidgetCard.propTypes = {
  color: PropTypes.any,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  children: PropTypes.any,
  invoice: PropTypes.string
};
