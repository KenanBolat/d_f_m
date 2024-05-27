import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

// project-imports
import IconButton from 'components/@extended/IconButton';
import { ImagePath, getImageUrl } from 'utils/getImageUrl';

// assets
import { Add } from 'iconsax-react';

const emails = ['username@gmail.com', 'user02@gmail.com'];

// ==============================|| DIALOG - SIMPLE ||============================== //

function SimpleDialog({ onClose, selectedValue, open }) {
  const theme = useTheme();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        <Grid item>
          <DialogTitle>Set backup account</DialogTitle>
        </Grid>
        <Grid item sx={{ mr: 1.5 }}>
          <IconButton color="secondary" onClick={handleClose}>
            <Add style={{ transform: 'rotate(45deg)' }} />
          </IconButton>
        </Grid>
      </Grid>

      <List sx={{ p: 2.5 }}>
        {emails.map((email, index) => (
          <ListItemButton onClick={() => handleListItemClick(email)} key={email} selected={selectedValue === email} sx={{ p: 1.25 }}>
            <ListItemAvatar>
              <Avatar src={getImageUrl(`avatar-${index + 1}.png`, ImagePath.USERS)} />
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItemButton>
        ))}
        <ListItemButton autoFocus onClick={() => handleListItemClick('addAccount')} sx={{ p: 1.25 }}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.main', width: 32, height: 32 }}>
              <Add style={{ fontSize: '0.625rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add Account" />
        </ListItemButton>
      </List>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </>
  );
}

SimpleDialog.propTypes = { onClose: PropTypes.func, selectedValue: PropTypes.string, open: PropTypes.bool };
