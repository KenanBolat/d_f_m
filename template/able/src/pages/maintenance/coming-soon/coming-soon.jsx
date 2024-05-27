// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import IconButton from 'components/@extended/IconButton';

// assets
import { Facebook, Google, Notification } from 'iconsax-react';
import coming1 from 'assets/images/maintenance/img-soon-1-1.png';
import coming2 from 'assets/images/maintenance/img-soon-1-2.png';
import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| COMING SOON ||============================== //

export default function ComingSoon() {
  return (
    <>
      <AuthBackground />
      <Container fixed>
        <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
          <Grid item md={6}>
            {/* <Box sx={{ margin: '0 auto' }}> */}
            <Box sx={{ width: { xs: 300, md: 'auto' }, margin: '0 auto' }}>
              <Grid container spacing={3} direction="column">
                <Grid item xs={12}>
                  <Stack spacing={3}>
                    <Typography variant="h4">Coming Soon</Typography>
                    <Typography variant="h2">
                      <Box sx={{ color: 'primary.main', display: 'inline-block' }}>Able Pro</Box> - The Bootstrap Admin Template
                    </Typography>
                    <Typography color="text.secondary">
                      Presenting Material-UI based React Dashboard Template to build performance centric websites and applications.
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sx={{ width: { xs: 320, md: 380 } }}>
                  <Stack spacing={3} sx={{ mt: 2 }}>
                    <Stack direction="row" spacing={1}>
                      <TextField fullWidth placeholder="Email Address" />
                      <Button variant="contained" sx={{ width: '50%' }} startIcon={<Notification variant="Bold" />}>
                        Notify Me
                      </Button>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconButton shape="rounded" color="secondary">
                        <Facebook variant="Bulk" size={20} />
                      </IconButton>
                      <IconButton shape="rounded" color="secondary">
                        <Google variant="Bulk" size={20} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="start"
              sx={{ width: { xs: 360, sm: 'auto' }, height: '100vh', overflow: 'hidden' }}
            >
              <Box sx={{ position: 'relative', width: '280px' }}>
                <Box
                  sx={{
                    lineHeight: 0,
                    position: 'absolute',
                    animation: 'img-l1 50s infinite linear',
                    '@keyframes img-l1': { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(0%)' } }
                  }}
                >
                  <img src={coming1} alt="coming soon 1" style={{ width: '100%' }} />
                </Box>
                <Box
                  sx={{
                    lineHeight: 0,
                    position: 'absolute',
                    animation: 'img-l2 50s infinite linear',
                    '@keyframes img-l2': { '0%': { transform: 'translateY(0%)' }, '100%': { transform: 'translateY(100%)' } }
                  }}
                >
                  <img src={coming1} alt="coming soon 1" style={{ width: '100%' }} />
                </Box>
              </Box>
              <Box sx={{ position: 'relative', width: '280px' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    animation: 'img-r1 50s infinite linear',
                    '@keyframes img-r1': { '0%': { transform: 'translateY(0%)' }, '100%': { transform: 'translateY(-100%)' } }
                  }}
                >
                  <img src={coming2} alt="coming soon 1" style={{ width: '100%' }} />
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    animation: 'img-r2 50s infinite linear',
                    '@keyframes img-r2': { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0%)' } }
                  }}
                >
                  <img src={coming2} alt="coming soon 1" style={{ width: '100%' }} />
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
