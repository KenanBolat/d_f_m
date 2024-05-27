// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';

const validationSchema = yup.object({
  color: yup.array().min(1, 'At least one color is required')
});

// ==============================|| FORM VALIDATION - CHECKBOX  ||============================== //

export default function CheckboxForms() {
  const formik = useFormik({
    initialValues: { color: [] },
    validationSchema,
    onSubmit: () => {
      openSnackbar({
        open: true,
        message: 'Checkbox - Submit Success',
        variant: 'alert',
        alert: { color: 'success' }
      });
    }
  });

  return (
    <MainCard title="Checkbox">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item>
            <Checkbox value="primary" name="color" color="primary" onChange={formik.handleChange} />
          </Grid>
          <Grid item>
            <Checkbox value="secondary" name="color" color="secondary" onChange={formik.handleChange} />
          </Grid>
          <Grid item>
            <Checkbox value="error" name="color" color="error" onChange={formik.handleChange} />
          </Grid>
          <Grid item xs={12} sx={{ pt: '0 !important' }}>
            {formik.errors.color && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {' '}
                {formik.errors.color}{' '}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
}
