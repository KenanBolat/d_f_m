import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| STATISTICS - REPORT CARD ||============================== //

export default function EcommerceMetrix({ primary, secondary, content, iconPrimary, color }) {
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary size={52} variant="Bulk" /> : null;

  return (
    <MainCard
      content={false}
      sx={{
        bgcolor: color,
        position: 'relative',
        '&:before, &:after': {
          content: '""',
          width: 1,
          height: 1,
          position: 'absolute',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.0001) 22.07%, rgba(255, 255, 255, 0.15) 83.21%)',
          transform: 'matrix(0.9, 0.44, -0.44, 0.9, 0, 0)'
        },
        '&:after': { top: '50%', right: '-20px' },
        '&:before': { right: '-70px', bottom: '80%' }
      }}
    >
      <Box sx={{ px: 4.5, py: 4 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box sx={{ color: 'common.white', opacity: 0.5 }}>{primaryIcon}</Box>
          </Grid>
          <Grid item>
            <Stack spacing={1} alignItems="flex-end">
              <Typography variant="h5" color="common.white" sx={{ fontWeight: 500 }}>
                {primary}
              </Typography>
              <Typography variant="h3" color="common.white">
                {secondary}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Stack spacing={1} direction="row" justifyContent="flex-end" sx={{ pt: 1.25 }}>
          <Typography variant="h5" color="common.white" sx={{ fontWeight: 400 }}>
            {content}
          </Typography>
        </Stack>
      </Box>
    </MainCard>
  );
}

EcommerceMetrix.propTypes = {
  primary: PropTypes.any,
  secondary: PropTypes.any,
  content: PropTypes.any,
  iconPrimary: PropTypes.any,
  color: PropTypes.any
};
