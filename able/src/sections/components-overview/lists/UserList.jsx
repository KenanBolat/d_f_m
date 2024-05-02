// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

// project-imports
import MainCard from 'components/MainCard';
import AntAvatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';

// assets
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

// ==============================|| LIST - USER ||============================== //

export default function UserList() {
  const userListCodeString = `<List sx={{ p: 0 }}>
  <ListItem
    divider
    secondaryAction={
      <IconButton edge="end" aria-label="delete">
        <More />
      </IconButton>
    }
  >
    <ListItemAvatar>
      <AntAvatar alt="Avatar" src={'/assets/images/users/avatar-4.png'} />
    </ListItemAvatar>
    <ListItemText primary="Jone Doe" secondary="Developer" />
  </ListItem>
  <ListItem
    secondaryAction={
      <IconButton edge="end" aria-label="delete">
        <More />
      </IconButton>
    }
  >
    <ListItemAvatar>
      <AntAvatar alt="Avatar" src={'/assets/images/users/avatar-5.png'} />
    </ListItemAvatar>
    <ListItemText primary="Aidal Danny" secondary="Project Leader" />
  </ListItem>
</List>`;

  return (
    <MainCard content={false} codeString={userListCodeString}>
      <List sx={{ p: 0 }}>
        <ListItem
          divider
          secondaryAction={
            <IconButton edge="end" sx={{ transform: 'rotate(90deg)' }} aria-label="delete" color="secondary">
              <MoreIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <AntAvatar alt="Avatar" src={avatar4} />
          </ListItemAvatar>
          <ListItemText primary="Jone Doe" secondary="Developer" />
        </ListItem>
        <ListItem
          secondaryAction={
            <IconButton edge="end" sx={{ transform: 'rotate(90deg)' }} aria-label="delete" color="secondary">
              <MoreIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <AntAvatar alt="Avatar" src={avatar5} />
          </ListItemAvatar>
          <ListItemText primary="Aidal Danny" secondary="Project Leader" />
        </ListItem>
      </List>
    </MainCard>
  );
}
