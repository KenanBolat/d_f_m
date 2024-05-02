// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// project-imports
import FadeInWhenVisible from './Animation';
// assets
import { ExportSquare } from 'iconsax-react';

// ==============================|| LANDING - FreePage ||============================== //

export default function FreePage() {
  const theme = useTheme();
  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 10, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12} md={8}>
          <FadeInWhenVisible>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="h2">
                  <Box
                    component="span"
                    sx={{
                      color: theme.palette.primary.main
                    }}
                  >
                    TRY{' '}
                  </Box>
                  BEFORE BUY
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Download the Free MIT Able Pro Dashboard Template before make your purchase decision.</Typography>
              </Grid>
            </Grid>
          </FadeInWhenVisible>
        </Grid>
        <Grid item xs={12} md={4}>
          <FadeInWhenVisible>
            <Grid container spacing={2} justifyContent="end" alignItems="center">
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  component={Link}
                  href="https://ableproadmin.com/dashboard/index.html"
                  target="_blank"
                >
                  Check out Pro Version
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ExportSquare />}
                  component={Link}
                  href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template"
                  target="_blank"
                >
                  Free (Soon)
                </Button>
              </Grid>
            </Grid>
          </FadeInWhenVisible>
        </Grid>
      </Grid>
    </Container>
  );
}
