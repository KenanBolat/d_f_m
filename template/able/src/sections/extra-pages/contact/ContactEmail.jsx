// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ==============================|| CONTACT US - EMAIL SECTION ||============================== //

export default function ContactUsPage() {
  return (
    <Box sx={{ bgcolor: 'secondary.200', pb: { md: 10, xs: 7 }, pt: { md: 0.25, xs: 2.5 }, mb: -12 }}>
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 10, xs: 2.5 } }}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="h2">Be the first to know</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  SLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2} justifyContent={{ md: 'end', xs: 'center' }} alignItems="center">
              <Grid item>
                <TextField id="firstNameBasic" name="firstName" placeholder="Enter your email" fullWidth />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" size="large">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
