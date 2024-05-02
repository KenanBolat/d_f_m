import PropTypes from 'prop-types';
import { useState, forwardRef, useCallback } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';

// third-party
import { enqueueSnackbar, useSnackbar, SnackbarContent } from 'notistack';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Add, ArrowDown2, TickCircle } from 'iconsax-react';

const SnackbarBox = styled(SnackbarContent)({
  '@media (min-width:600px)': {
    minWidth: '344px !important'
  }
});

// ==============================|| NOTISTACK - CUSTOM ||============================== //

function CustomNotistackExtended({ id, message }, ref) {
  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((prevState) => !prevState);
  }, []);

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarBox ref={ref}>
      <Card sx={{ bgcolor: 'warning.light', width: '100%' }}>
        <CardActions sx={{ padding: '8px 8px 8px 16px', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">{message}</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton
              aria-label="Show more"
              sx={{ p: 1, transition: 'all .2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              onClick={handleExpandClick}
            >
              <ArrowDown2 />
            </IconButton>
            <IconButton sx={{ p: 1, transition: 'all .2s' }} onClick={handleDismiss}>
              <Add style={{ transform: 'rotate(45deg)' }} />
            </IconButton>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Paper sx={{ padding: 2, borderTopLeftRadius: 0, borderTopRightRadius: 0, bgcolor: 'warning.lighter' }}>
            <Typography gutterBottom>PDF ready</Typography>
            <Button
              size="small"
              startIcon={<TickCircle variant="Bold" style={{ fontSize: 16, marginTop: -2 }} />}
              sx={{ '&:hover': { bgcolor: 'transparent' } }}
            >
              Download now
            </Button>
          </Paper>
        </Collapse>
      </Card>
    </SnackbarBox>
  );
}

const CustomNotistack = forwardRef(CustomNotistackExtended);

// ==============================|| NOTISTACK - CUSTOM STYLE ||============================== //

export default function CustomComponent() {
  const NotistackCustomCodeString = `<Button
  variant="outlined"
  fullWidth
  sx={{ marginBlockStart: 2 }}
  onClick={() => {
    // third party
    enqueueSnackbar("You're report is ready", {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      },
      content: (key: SnackbarKey, message: SnackbarMessage) => <CustomNotistack id={key} message={message} />
    });
  }}
>
  Show snackbar
</Button>`;

  return (
    <MainCard title="Custom Component" codeString={NotistackCustomCodeString}>
      <Button
        variant="outlined"
        fullWidth
        sx={{ marginBlockStart: 2 }}
        onClick={() => {
          enqueueSnackbar("You're report is ready", {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right'
            },
            content: (key, message) => <CustomNotistack id={key} message={message} />
          });
        }}
      >
        Show snackbar
      </Button>
    </MainCard>
  );
}

CustomNotistackExtended.propTypes = { id: PropTypes.any, message: PropTypes.any };
