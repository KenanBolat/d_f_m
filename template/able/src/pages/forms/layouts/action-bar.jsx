// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// assets
import { Link2, Trash } from 'iconsax-react';

// ==============================|| LAYOUTS- ACTION BAR ||============================== //

export default function ActionBar() {
  const theme = useTheme();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Simple Action Bar" content={false}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Name</InputLabel>
                      <TextField fullWidth placeholder="Enter full name" />
                    </Stack>
                    <FormHelperText>Please enter your full name</FormHelperText>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ width: 1, px: 1.5, py: 0.75 }}>
                  <Button color="error" size="small">
                    Cancel
                  </Button>
                  <Button variant="contained" size="small">
                    Submit
                  </Button>
                </Stack>
              </CardActions>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Action Button with Link" content={false}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Name</InputLabel>
                      <TextField fullWidth placeholder="Enter full name" />
                    </Stack>
                    <FormHelperText>Please enter your full name</FormHelperText>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end" sx={{ width: 1, px: 1.5, py: 0.75 }}>
                  <Button color="error" size="small">
                    Cancel
                  </Button>
                  <Typography variant="body2" sx={{ mr: '8px !important' }}>
                    or
                  </Typography>
                  <Button variant="contained" size="small">
                    Submit
                  </Button>
                </Stack>
              </CardActions>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="With side action button" content={false}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Name</InputLabel>
                      <TextField fullWidth placeholder="Enter full name" />
                    </Stack>
                    <FormHelperText>Please enter your full name</FormHelperText>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
                  <Tooltip title="Delete Event" placement="top">
                    <IconButton size="large" color="error">
                      <Trash variant="Bold" />
                    </IconButton>
                  </Tooltip>
                  <Stack direction="row" spacing={1} sx={{ px: 1.5, py: 0.75 }}>
                    <Button color="error" size="small">
                      Cancel
                    </Button>
                    <Button variant="contained" size="small">
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </CardActions>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Left Align Action Bar" content={false}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Name</InputLabel>
                      <TextField fullWidth placeholder="Enter full name" />
                    </Stack>
                    <FormHelperText>Please enter your full name</FormHelperText>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Stack direction="row" spacing={1} sx={{ px: 1.5, py: 0.75 }}>
                  <Button color="error" size="small">
                    Cancel
                  </Button>
                  <Button variant="contained" size="small">
                    Submit
                  </Button>
                </Stack>
              </CardActions>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Horizontal Form" content={false}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                    <InputLabel sx={{ textAlign: { xs: 'left', sm: 'right' } }}>Name :</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={9} lg={8}>
                    <TextField fullWidth placeholder="Enter full name" />
                    <FormHelperText>Please enter your full name</FormHelperText>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ width: 1, px: 1.5, py: 0.75 }}>
                  <Button color="error" size="small">
                    Cancel
                  </Button>
                  <Button variant="contained" size="small">
                    Submit
                  </Button>
                </Stack>
              </CardActions>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard
              title="Top & Bottom Actions Bars"
              content={false}
              secondary={
                <IconButton>
                  <Link2 style={{ color: theme.palette.primary.main }} />
                </IconButton>
              }
            >
              <CardContent>
                <Stack spacing={1}>
                  <InputLabel>Name</InputLabel>
                  <TextField fullWidth placeholder="Enter full name" />
                </Stack>
                <FormHelperText>Please enter your full name</FormHelperText>
              </CardContent>
              <Divider />
              <CardActions>
                <Stack direction="row" spacing={1} sx={{ width: 1, px: 1.5, py: 0.75 }}>
                  <Button color="error" size="small">
                    Cancel
                  </Button>
                  <Button variant="contained" size="small">
                    Submit
                  </Button>
                </Stack>
              </CardActions>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
