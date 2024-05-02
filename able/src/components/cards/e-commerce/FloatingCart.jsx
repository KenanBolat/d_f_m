import { sum } from 'lodash';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';

// project-imports
import IconButton from 'components/@extended/IconButton';
import { useGetCart } from 'api/cart';

// assets
import { ShoppingCart } from 'iconsax-react';

// ==============================|| CART ITEMS - FLOATING BUTTON ||============================== //

export default function FloatingCart() {
  const theme = useTheme();

  const { cart } = useGetCart();

  let totalQuantity = 0;
  if (cart && cart.products && cart.products.length > 0) {
    totalQuantity = sum(cart.products.map((item) => item.quantity));
  }

  return (
    <Fab
      component={Link}
      to="/apps/e-commerce/checkout"
      size="large"
      variant="circular"
      sx={{
        borderRadius: 0,
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
        top: '65%',
        position: 'fixed',
        right: 0,
        zIndex: theme.zIndex.speedDial,
        boxShadow: theme.customShadows.z1,
        bgcolor: 'background.paper',
        border: '4px solid ',
        borderColor: 'background.paper',
        borderRight: 'none',
        '&:hover': {
          bgcolor: 'warning.lighter'
        }
      }}
    >
      <IconButton
        aria-label="settings toggler"
        size="large"
        sx={{ p: 0, '& :hover': { bgcolor: 'red' }, '& svg': { width: 26, height: 26 }, color: 'warning.dark' }}
        color="warning"
      >
        <Badge showZero badgeContent={totalQuantity} color="error">
          <ShoppingCart variant="Bulk" />
        </Badge>
      </IconButton>
    </Fab>
  );
}
