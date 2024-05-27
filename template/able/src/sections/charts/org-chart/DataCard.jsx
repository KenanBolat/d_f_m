import PropTypes from 'prop-types';
// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';

// assets
import { Apple, Facebook, Google } from 'iconsax-react';

// ==============================|| ORGANIZATION CHART - DATACARD ||============================== //

export default function DataCard({ name, role, avatar, linkedin, facebook, skype, root }) {
  const linkHandler = (link) => {
    window.open(link);
  };
  const theme = useTheme();

  const subTree = alpha(theme.palette.secondary.lighter, 0.4);
  const rootTree = alpha(theme.palette.primary.lighter, 0.6);

  return (
    <MainCard
      sx={{
        bgcolor: root ? rootTree : subTree,
        border: root ? `1px solid ${theme.palette.primary.light} !important` : `1px solid ${theme.palette.divider} !important`,
        width: 'max-content',
        m: '0px auto',
        p: 1.5,
        direction: 'ltr'
      }}
      border={false}
      content={false}
    >
      <Stack direction="row" spacing={2}>
        <Avatar sx={{ mt: 0.3 }} src={avatar} size="sm" />
        <Stack spacing={1.5}>
          <Stack alignItems="flex-start">
            <Typography variant="subtitle1" sx={{ color: root ? 'primary.main' : 'text.primary' }}>
              {name}
            </Typography>
            {!root && (
              <Chip
                label={role}
                sx={{ '& .MuiChip-label': { px: 0.75 }, width: 'max-content' }}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
            {root && (
              <Typography sx={{ color: 'primary.darker' }} variant="caption">
                {role}
              </Typography>
            )}
          </Stack>
          <Stack spacing={0} direction="row">
            <IconButton color="secondary" onClick={() => linkHandler(linkedin)} size="small">
              <Apple variant="Bold" />
            </IconButton>
            <IconButton color="primary" onClick={() => linkHandler(facebook)} size="small">
              <Facebook variant="Bold" />
            </IconButton>
            <IconButton color="error" onClick={() => linkHandler(skype)} size="small">
              <Google variant="Bold" />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </MainCard>
  );
}

DataCard.propTypes = {
  name: PropTypes.any,
  role: PropTypes.any,
  avatar: PropTypes.any,
  linkedin: PropTypes.any,
  facebook: PropTypes.any,
  skype: PropTypes.any,
  root: PropTypes.any
};
