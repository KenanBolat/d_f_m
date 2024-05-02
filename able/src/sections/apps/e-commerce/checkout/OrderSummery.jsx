import PropTypes from 'prop-types';
// material-ui
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

// third-party
import currency from 'currency.js';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| CHECKOUT - ORDER SUMMARY ||============================== //

export default function OrderSummary({ checkout, show }) {
  return (
    <Stack spacing={3}>
      <MainCard content={false} sx={{ borderRadius: show ? '12px' : '0 0 12px 12px', borderTop: show ? '1px inherit' : 'none' }}>
        <TableContainer>
          <Table sx={{ minWidth: 'auto' }} size="small" aria-label="simple table">
            <TableBody>
              {show && (
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Order Summary</Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
              )}
              <TableRow>
                <TableCell sx={{ borderBottom: 'none' }}>Sub Total</TableCell>
                <TableCell align="right" sx={{ borderBottom: 'none' }}>
                  {checkout.subtotal && <Typography variant="subtitle1">{currency(checkout.subtotal).format()}</Typography>}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: 'none' }}>Estimated Delivery</TableCell>
                <TableCell align="right" sx={{ borderBottom: 'none' }}>
                  {checkout.shipping && (
                    <Typography variant="subtitle1">{checkout.shipping <= 0 ? '-' : currency(checkout.shipping).format()}</Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: 'none' }}>Voucher</TableCell>
                <TableCell align="right" sx={{ borderBottom: 'none' }}>
                  {checkout.discount && (
                    <Typography variant="subtitle1" sx={{ color: 'success.main' }}>
                      {checkout.discount <= 0 ? '-' : currency(checkout.discount).format()}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
      <MainCard>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">Total</Typography>
          {checkout.total && (
            <Typography variant="subtitle1" align="right">
              {currency(checkout.total).format()}
            </Typography>
          )}
        </Stack>
      </MainCard>
    </Stack>
  );
}

OrderSummary.propTypes = { checkout: PropTypes.any, show: PropTypes.bool };
