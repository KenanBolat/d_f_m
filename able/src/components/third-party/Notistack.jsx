import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';

// third-party
import { SnackbarProvider } from 'notistack';

// project-imports
import Loader from 'components/Loader';
import { useGetSnackbar } from 'api/snackbar';

// assets
import { CloseCircle, InfoCircle, TickCircle, Warning2 } from 'iconsax-react';

// custom styles
const StyledSnackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
  '&.notistack-MuiContent-default': { backgroundColor: theme.palette.primary.main },
  '&.notistack-MuiContent-error': { backgroundColor: theme.palette.error.main },
  '&.notistack-MuiContent-success': { backgroundColor: theme.palette.success.main },
  '&.notistack-MuiContent-info': { backgroundColor: theme.palette.info.main },
  '&.notistack-MuiContent-warning': { backgroundColor: theme.palette.warning.main }
}));

// ===========================|| SNACKBAR - NOTISTACK ||=========================== //

export default function Notistack({ children }) {
  const { snackbar } = useGetSnackbar();
  const iconSX = { marginRight: 8, fontSize: '1.15rem' };

  if (snackbar === undefined) return <Loader />;

  return (
    <StyledSnackbarProvider
      maxSnack={snackbar.maxStack}
      dense={snackbar.dense}
      iconVariant={
        snackbar.iconVariant === 'useemojis'
          ? {
              success: <TickCircle style={iconSX} />,
              error: <CloseCircle style={iconSX} />,
              warning: <Warning2 style={iconSX} />,
              info: <InfoCircle style={iconSX} />
            }
          : undefined
      }
      hideIconVariant={snackbar.iconVariant === 'hide' ? true : false}
    >
      {children}
    </StyledSnackbarProvider>
  );
}

Notistack.propTypes = { children: PropTypes.node };
