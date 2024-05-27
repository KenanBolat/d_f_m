import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

// third-party
import { sum } from 'lodash';
import currency from 'currency.js';

// project-imports
import CartDiscount from './CartDiscount';
import OrderSummary from './OrderSummery';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import Avatar from 'components/@extended/Avatar';
import ColorOptions from '../products/ColorOptions';

import { ImagePath, getImageUrl } from 'utils/getImageUrl';

// assets
import { Add, ArrowLeft2, Minus, Trash } from 'iconsax-react';

// product color select
function getColor(color) {
  return ColorOptions.filter((item) => item.value === color);
}

// ==============================|| CART - INCREMENT QUANTITY ||============================== //

function Increment({ itemId, quantity, updateQuantity }) {
  const [value, setValue] = useState(quantity);
  const theme = useTheme();

  const incrementHandler = () => {
    setValue(value - 1);
    updateQuantity(itemId, value - 1);
  };

  const decrementHandler = () => {
    setValue(value + 1);
    updateQuantity(itemId, value + 1);
  };

  return (
    <Stack direction="row">
      <Button
        key="three"
        variant="text"
        disabled={value <= 1}
        onClick={incrementHandler}
        sx={{ pr: 0.75, pl: 0.75, minWidth: '0px !important', '&:hover': { bgcolor: 'transparent' } }}
      >
        <Minus style={{ fontSize: 'inherit' }} />
      </Button>
      <Typography key="two" sx={{ p: '9px 15px', border: '1px solid', borderColor: theme.palette.secondary[200] }}>
        {value}
      </Typography>
      <Button
        key="one"
        variant="text"
        onClick={decrementHandler}
        sx={{ pl: 0.75, pr: 0.75, minWidth: '0px !important', '&:hover': { bgcolor: 'transparent' } }}
      >
        <Add style={{ fontSize: 'inherit' }} />
      </Button>
    </Stack>
  );
}

// ==============================|| CHECKOUT - CART ||============================== //

export default function Cart({ checkout, onNext, removeProduct, updateQuantity }) {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [rows, setRows] = useState(checkout.products);

  useEffect(() => {
    setRows(checkout.products);
    setTotalQuantity(sum(checkout.products.map((item) => item.quantity)));
  }, [checkout.products]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Stack spacing={2}>
          <MainCard content={false}>
            <Grid container>
              <Grid item xs={12} sx={{ py: 2.5, pl: 2.5 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle1">Cart</Typography>
                  <Avatar color="secondary" size="xs">
                    {totalQuantity}
                  </Avatar>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      {rows.map((row, index) => {
                        const colorsData = row.color ? getColor(row.color) : false;
                        return (
                          <TableRow key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                              <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                  <Avatar
                                    size="lg"
                                    variant="rounded"
                                    color="secondary"
                                    type="combined"
                                    src={row.image ? getImageUrl(`thumbs/${row.image}`, ImagePath.ECOMMERCE) : ''}
                                  />
                                </Grid>
                                <Grid item>
                                  <Stack spacing={0}>
                                    <Typography
                                      component={Link}
                                      to={`/apps/e-commerce/product-details/${row.id}`}
                                      target="_blank"
                                      variant="subtitle1"
                                      color="text.primary"
                                      sx={{ textDecoration: 'none' }}
                                    >
                                      {row.name}
                                    </Typography>
                                    <Typography color="text.secondary">{colorsData ? colorsData[0].label : 'Multicolor'}</Typography>
                                  </Stack>
                                </Grid>
                              </Grid>
                            </TableCell>
                            <TableCell align="right">
                              <Stack alignItems="center">
                                {row.offerPrice && row.quantity && (
                                  <Typography variant="subtitle1">{currency(row.offerPrice * row.quantity).format()}</Typography>
                                )}
                              </Stack>
                            </TableCell>
                            <TableCell align="right">
                              <Increment quantity={row.quantity} itemId={row.itemId} updateQuantity={updateQuantity} />
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                color="error"
                                onClick={() => removeProduct(row.itemId)}
                                size="small"
                                sx={{ opacity: 0.75, '&:hover': { bgcolor: 'transparent' } }}
                              >
                                <Trash variant="Bold" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </MainCard>
          <Grid item sx={{ textAlign: 'right' }}>
            <Button color="secondary" component={Link} to="/apps/e-commerce/products" variant="text" startIcon={<ArrowLeft2 />}>
              <Typography variant="h6" color="text.primary">
                Back to Shopping
              </Typography>
            </Button>
          </Grid>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <MainCard>
            <CartDiscount />
          </MainCard>
          <OrderSummary checkout={checkout} show />
          <Button variant="contained" sx={{ textTransform: 'none' }} fullWidth onClick={onNext}>
            Process to Checkout
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

Increment.propTypes = {
  itemId: PropTypes.oneOfType([PropTypes.any, PropTypes.number, PropTypes.string]),
  quantity: PropTypes.number,
  updateQuantity: PropTypes.func
};

Cart.propTypes = { checkout: PropTypes.any, onNext: PropTypes.func, removeProduct: PropTypes.func, updateQuantity: PropTypes.func };
