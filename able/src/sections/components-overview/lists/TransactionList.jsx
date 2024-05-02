// material-ui
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// assets
import { Gift, Message, Setting3 } from 'iconsax-react';

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| LIST - TRANSACTION ||============================== //

export default function TransactionList() {
  const transactionListCodeString = `<List
  component="nav"
  sx={{
    py: 0,
    '& .MuiListItemButton-root': {
      '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
    }
  }}
>
  <ListItemButton divider>
    <ListItemAvatar>
      <Avatar alt="Basic" type="combined" color="success">
        <Gift />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={<Typography variant="subtitle1">Payment from #002434</Typography>} secondary="Today, 2:00 AM" />
    <ListItemSecondaryAction>
      <Stack alignItems="flex-end">
        <Typography variant="subtitle1" noWrap>
          + $1,430
        </Typography>
        <Typography variant="h6" color="secondary" noWrap>
          78%
        </Typography>
      </Stack>
    </ListItemSecondaryAction>
  </ListItemButton>
  <ListItemButton divider>
    <ListItemAvatar>
      <Avatar alt="Basic" type="combined">
        <Message />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={<Typography variant="subtitle1">Payment from #984947</Typography>} secondary="5 August, 1:45 PM" />
    <ListItemSecondaryAction>
      <Stack alignItems="flex-end">
        <Typography variant="subtitle1" noWrap>
          + $302
        </Typography>
        <Typography variant="h6" color="secondary" noWrap>
          8%
        </Typography>
      </Stack>
    </ListItemSecondaryAction>
  </ListItemButton>
  <ListItemButton>
    <ListItemAvatar>
      <Avatar alt="Basic" type="combined" color="error">
        <Setting3 />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={<Typography variant="subtitle1">Payment from #988784</Typography>} secondary="7 hours ago" />
    <ListItemSecondaryAction>
      <Stack alignItems="flex-end">
        <Typography variant="subtitle1" noWrap>
          + $682
        </Typography>
        <Typography variant="h6" color="secondary" noWrap>
          16%
        </Typography>
      </Stack>
    </ListItemSecondaryAction>
  </ListItemButton>
</List>`;

  return (
    <MainCard sx={{ mt: 2 }} content={false} codeString={transactionListCodeString}>
      <List
        component="nav"
        sx={{
          py: 0,
          '& .MuiListItemButton-root': { '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' } }
        }}
      >
        <ListItemButton divider>
          <ListItemAvatar>
            <Avatar alt="Basic" type="filled" color="success">
              <Gift />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Payment from #002434</Typography>} secondary="Today, 2:00 AM" />
          <ListItemSecondaryAction>
            <Stack alignItems="flex-end">
              <Typography variant="subtitle1" noWrap>
                + $1,430
              </Typography>
              <Typography variant="h6" color="secondary" noWrap>
                78%
              </Typography>
            </Stack>
          </ListItemSecondaryAction>
        </ListItemButton>
        <ListItemButton divider>
          <ListItemAvatar>
            <Avatar alt="Basic" type="filled">
              <Message />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Payment from #984947</Typography>} secondary="5 August, 1:45 PM" />
          <ListItemSecondaryAction>
            <Stack alignItems="flex-end">
              <Typography variant="subtitle1" noWrap>
                + $302
              </Typography>
              <Typography variant="h6" color="secondary" noWrap>
                8%
              </Typography>
            </Stack>
          </ListItemSecondaryAction>
        </ListItemButton>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt="Basic" type="filled" color="error">
              <Setting3 />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Payment from #988784</Typography>} secondary="7 hours ago" />
          <ListItemSecondaryAction>
            <Stack alignItems="flex-end">
              <Typography variant="subtitle1" noWrap>
                + $682
              </Typography>
              <Typography variant="h6" color="secondary" noWrap>
                16%
              </Typography>
            </Stack>
          </ListItemSecondaryAction>
        </ListItemButton>
      </List>
    </MainCard>
  );
}
