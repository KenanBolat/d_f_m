import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project-imports
import AuthSlider from './AuthSlider';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper3({ children }) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.paper'
        }}
      >
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
          >
            <Grid
              item
              md={7}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flex: 1,
                padding: 4,
                minHeight: '100vh',
                '& > .MuiPaper-root > .MuiBox-root': { minHeight: '100%', display: 'flex' }
              }}
            >
              {children}
            </Grid>
            <Grid
              item
              md={5}
              sx={{
                display: { xs: 'none', lg: 'flex' },
                width: 580,
                overflow: 'hidden',
                alignSelf: 'stretch',
                position: 'relative',
                bgcolor: 'primary.main'
              }}
            >
              <AuthSlider />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

AuthWrapper3.propTypes = { children: PropTypes.node };
