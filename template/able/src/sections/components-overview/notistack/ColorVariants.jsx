// material-ul
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// third party
import { enqueueSnackbar } from 'notistack';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| NOTISTACK - COLOR VARIANTS ||============================== //

export default function ColorVariants() {
  const NotiStackSnackbarCodeString = `<Button variant="contained" onClick={() => enqueueSnackbar('This is default message.')}>
  Default
</Button>
<Button variant="contained" onClick={() => enqueueSnackbar('This is success message', { variant: 'success' })}>
  success
</Button>
<Button variant="contained" onClick={() => enqueueSnackbar('This is warning message', { variant: 'warning' })}>
  Warning
</Button>
<Button variant="contained" onClick={() => enqueueSnackbar('This is info message', { variant: 'info' })}>
  Info
</Button>
<Button variant="contained" onClick={() => enqueueSnackbar('This is error message', { variant: 'error' })}>
  Error
</Button>
`;

  return (
    <MainCard title="Color Variants" codeString={NotiStackSnackbarCodeString}>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" onClick={() => enqueueSnackbar('This is default message.')}>
            Default
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" onClick={() => enqueueSnackbar('This is success message', { variant: 'success' })}>
            Success
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="warning" onClick={() => enqueueSnackbar('This is warning message', { variant: 'warning' })}>
            Warning
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="info" onClick={() => enqueueSnackbar('This is info message', { variant: 'info' })}>
            Info
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="error" onClick={() => enqueueSnackbar('This is info message', { variant: 'error' })}>
            Error
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}
