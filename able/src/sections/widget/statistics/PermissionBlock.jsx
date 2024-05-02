// material-ui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// assets
import { Lock1 } from 'iconsax-react';

// ===========================|| STATISTICS - PERMISSION BLOCK ||=========================== //

export default function PermissionBlock() {
  return (
    <MainCard sx={{ bgcolor: 'primary.lighter' }}>
      <Stack spacing={1.5} alignItems="center">
        <Avatar type="filled" variant="rounded">
          <Lock1 />
        </Avatar>
        <Stack alignItems="center" spacing={0.5}>
          <Typography variant="h5">Unlock All Features</Typography>
          <Typography>Unlock All Features</Typography>
        </Stack>
        <Button fullWidth variant="contained">
          Upgrade to premium
        </Button>
      </Stack>
    </MainCard>
  );
}
