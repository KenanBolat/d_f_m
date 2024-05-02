import PropTypes from 'prop-types';
import { matchPath, useLocation, Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// project-imports
import { ThemeMode } from 'config';
import { handlerComponentDrawer } from 'api/menu';

// ==============================|| NAVIGATION - ITEM ||============================== //

export default function NavItem({ item }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  const itemHandler = () => {
    matchesMD && handlerComponentDrawer(false);
  };

  const textColor = theme.palette.mode === ThemeMode.DARK ? 'secondary.400' : 'secondary.main';
  const iconSelectedColor = theme.palette.mode === ThemeMode.DARK ? 'text.primary' : 'primary.main';

  const isSelectedItem = !!matchPath({ path: item.url, end: false }, pathname);

  return (
    <ListItemButton
      component={Link}
      to={item.url}
      target={itemTarget}
      disabled={item.disabled}
      onClick={() => itemHandler()}
      selected={isSelectedItem}
      sx={{ pl: 2.5, py: 1, mb: 0.5 }}
    >
      <ListItemText
        primary={
          <Typography variant="h6" sx={{ color: isSelectedItem ? iconSelectedColor : textColor, fontWeight: 500 }}>
            {item.title}
          </Typography>
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
}

NavItem.propTypes = { item: PropTypes.any };
