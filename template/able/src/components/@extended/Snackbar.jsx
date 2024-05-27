// material-ui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import MuiSnackbar from '@mui/material/Snackbar';

// project-imports
import IconButton from './IconButton';
import { closeSnackbar, useGetSnackbar } from 'api/snackbar';

// assets
import { Add } from 'iconsax-react';

// animation function
function TransitionSlideLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

// animation options
const animation = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade
};

// ==============================|| SNACKBAR ||============================== //

export default function Snackbar() {
  const { snackbar } = useGetSnackbar();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  return (
    <>
      {/* default snackbar */}
      {snackbar.variant === 'default' && (
        <MuiSnackbar
          anchorOrigin={snackbar.anchorOrigin}
          open={snackbar.open}
          autoHideDuration={1500}
          onClose={handleClose}
          message={snackbar.message}
          TransitionComponent={animation[snackbar.transition]}
          action={
            <>
              <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
              </Button>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <Add style={{ transform: 'rotate(45deg)' }} />
              </IconButton>
            </>
          }
        />
      )}

      {/* alert snackbar */}
      {snackbar.variant === 'alert' && (
        <MuiSnackbar
          TransitionComponent={animation[snackbar.transition]}
          anchorOrigin={snackbar.anchorOrigin}
          open={snackbar.open}
          autoHideDuration={1500}
          onClose={handleClose}
        >
          <Alert
            variant={snackbar.alert.variant}
            color={snackbar.alert.color}
            action={
              <Stack direction="row" alignItems="center">
                {snackbar.actionButton !== false && (
                  <Button color={snackbar.alert.color} size="small" onClick={handleClose}>
                    UNDO
                  </Button>
                )}
                {snackbar.close && (
                  <IconButton size="small" aria-label="close" variant="contained" color={snackbar.alert.color} onClick={handleClose}>
                    <Add style={{ transform: 'rotate(45deg)' }} />
                  </IconButton>
                )}
              </Stack>
            }
            sx={{
              ...snackbar.alert.sx,
              ...(snackbar.alert.variant === 'outlined' && {
                bgcolor: 'background.default'
              })
            }}
          >
            {snackbar.message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
}
