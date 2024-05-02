// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';

// assets
import { Clock, Google, Location, Notepad } from 'iconsax-react';

// ===========================|| DATA WIDGET - USER PERSONAL DATA ||=========================== //

export default function UserPersonalData() {
  return (
    <MainCard
      title={
        <List disablePadding>
          <ListItem
            sx={{ p: 0 }}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" color="secondary">
                <Notepad />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar color="error" variant="rounded">
                <Google variant="Bold" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ my: 0 }}
              primary={<Typography>Google LLC</Typography>}
              secondary={<Typography variant="subtitle1">Sr. UI designer</Typography>}
            />
          </ListItem>
        </List>
      }
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Description</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard
            dummy text ever since the 1500s, when an unknown printer took a galley.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Chip label="Fulltime" variant="combined" sx={{ color: 'text.primary' }} />
            <Chip label="Remote" variant="combined" sx={{ color: 'text.primary' }} />
            <Chip label="Hourly" variant="combined" sx={{ color: 'text.primary' }} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mt: 1.5 }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Location size={14} /> NY, USA <Clock size={14} style={{ marginLeft: 8 }} /> 2 days ago
            </Typography>
            <Button variant="contained">Apply</Button>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}
