import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

// third-party
import OtpInput from 'react18-input-otp';

// project-imports
import Logo from 'components/logo';
import AuthCard from 'sections/auth/AuthCard';
import AuthSocButton from 'sections/auth/AuthSocButton';
import AuthWrapper3 from 'sections/auth/AuthWrapper3';

import useAuth from 'hooks/useAuth';
import { ThemeMode } from 'config';

// assets
import { User, Home3 } from 'iconsax-react';
import imgSms from 'assets/images/auth/sms.svg';
import imgFacebook from 'assets/images/auth/facebook.svg';
import imgTwitter from 'assets/images/auth/twitter.svg';
import imgGoogle from 'assets/images/auth/google.svg';

const steps = ['1', '2', '3', '4', '5'];

function StepWrapper({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// ================================|| LOGIN ||================================ //

export default function Login3() {
  const theme = useTheme();
  const { isLoggedIn } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [selectedValue, setSelectedValue] = useState('Personal');
  const [otp, setOtp] = useState();

  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[200] : theme.palette.secondary.light;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <AuthWrapper3>
      <Grid container spacing={3} sx={{ minHeight: '100%', alignContent: 'space-between' }}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Logo />
            <Typography color="secondary">
              Step
              <Typography variant="subtitle1" sx={{ display: 'inline-block', margin: '0 5px' }}>
                {activeStep + 1}
              </Typography>
              to {steps.length}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ '& > div': { margin: '24px auto' } }}>
          <AuthCard border={false}>
            {activeStep === steps.length ? (
              <>
                <Alert sx={{ my: 3 }}>All steps completed - you can now Login</Alert>
                <Button component={Link} to={isLoggedIn ? '/auth/login' : '/login'} color="primary" variant="contained" fullWidth>
                  Login
                </Button>
              </>
            ) : (
              <>
                <StepWrapper value={activeStep} index={0}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography variant="h3">Welcome to the Able Pro</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>Sign up or login with your work email.</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <AuthSocButton onClick={handleNext}>
                            <img src={imgSms} alt="Facebook" style={{ margin: '0 10px' }} /> Continue with work email
                          </AuthSocButton>
                        </Grid>
                        <Grid item xs={12}>
                          <AuthSocButton>
                            <img src={imgFacebook} alt="Facebook" style={{ margin: '0 10px' }} /> Sign In with Facebook
                          </AuthSocButton>
                        </Grid>
                        <Grid item xs={12}>
                          <AuthSocButton>
                            <img src={imgTwitter} alt="Facebook" style={{ margin: '0 10px' }} /> Sign In with Twitter
                          </AuthSocButton>
                        </Grid>
                        <Grid item xs={12}>
                          <AuthSocButton>
                            <img src={imgGoogle} alt="Facebook" style={{ margin: '0 10px' }} /> Sign In with Google
                          </AuthSocButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </StepWrapper>
                <StepWrapper value={activeStep} index={1}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Stack spacing={1}>
                        <Typography variant="h3">Welcome to the Able Pro</Typography>
                        <Typography>Sign up or login with your work email.</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="email-login">Enter your work email to continue</InputLabel>
                          <OutlinedInput id="email-login" type="email" name="email" placeholder="Enter email address" fullWidth />
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Button color="secondary" variant="outlined" onClick={handleBack} fullWidth>
                            Back
                          </Button>
                          <Button onClick={handleNext} variant="contained" color="primary" fullWidth>
                            Continue
                          </Button>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </StepWrapper>
                <StepWrapper value={activeStep} index={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Stack spacing={1}>
                        <Typography variant="h3">What’s your purpose for use Able</Typography>
                        <Typography>Your setup experience will be streamlined accordingly</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          '& .MuiFormLabel-root': {
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 180,
                            width: '100%',
                            border: '1px solid',
                            bporderColor: 'divider',
                            borderRadius: 1
                          },
                          '& .MuiRadio-root.Mui-checked + .MuiFormLabel-root': {
                            boxShadow: `0 0 0 1px ${theme.palette.primary.main}, 0px 8px 24px rgba(27, 46, 94, 0.12)`,
                            borderColor: theme.palette.primary.main,
                            color: 'primary.main',
                            bgcolor: 'primary.lighter'
                          }
                        }}
                      >
                        <Grid item sm={6}>
                          <Radio
                            id="radioPersonal"
                            checked={selectedValue === 'Personal'}
                            onChange={handleChange}
                            value="Personal"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                            sx={{ display: 'none' }}
                          />
                          <InputLabel htmlFor="radioPersonal" sx={{ ml: '0 !im' }}>
                            <User variant="Bulk" size={48} />
                            <Typography variant="h5" sx={{ mt: 1 }}>
                              Personal
                            </Typography>
                          </InputLabel>
                        </Grid>
                        <Grid item sm={6}>
                          <Radio
                            id="radioBusiness"
                            checked={selectedValue === 'Business'}
                            onChange={handleChange}
                            value="Business"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'B' }}
                            sx={{ display: 'none' }}
                          />
                          <InputLabel htmlFor="radioBusiness">
                            <Home3 variant="Bulk" size={48} />
                            <Typography variant="h5" sx={{ mt: 1 }}>
                              Business
                            </Typography>
                          </InputLabel>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={1}>
                        <Button color="secondary" variant="outlined" onClick={handleBack} fullWidth>
                          Back
                        </Button>
                        <Button onClick={handleNext} variant="contained" color="primary" fullWidth>
                          Continue
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </StepWrapper>
                <StepWrapper value={activeStep} index={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Stack spacing={1}>
                        <Typography variant="h3">Tell us About Yourself</Typography>
                        <Typography>Tell us a bit about yourself</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item sm={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="First-name">First name</InputLabel>
                            <OutlinedInput id="First-name" type="text" placeholder="First name" fullWidth />
                          </Stack>
                        </Grid>
                        <Grid item sm={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Last-name">Last name</InputLabel>
                            <OutlinedInput id="Last-name" type="text" placeholder="Last name" fullWidth />
                          </Stack>
                        </Grid>
                        <Grid item sm={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="email-login1">Email id</InputLabel>
                            <OutlinedInput id="email-login1" type="email" name="email" placeholder="Email id" fullWidth />
                          </Stack>
                        </Grid>
                        <Grid item sm={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Password">Password</InputLabel>
                            <OutlinedInput id="Password" type="password" placeholder="Password" fullWidth />
                          </Stack>
                        </Grid>
                        <Grid item sm={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Confirm-Password">Confirm Password</InputLabel>
                            <OutlinedInput id="Confirm-Password" type="password" placeholder="Confirm Password" fullWidth />
                          </Stack>
                        </Grid>
                        <Grid item sm={12}>
                          <Stack direction="row" spacing={1}>
                            <Button color="secondary" variant="outlined" onClick={handleBack} fullWidth>
                              Back
                            </Button>
                            <Button onClick={handleNext} variant="contained" color="primary" fullWidth>
                              Continue
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </StepWrapper>
                <StepWrapper value={activeStep} index={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Stack spacing={1}>
                        <Typography variant="h3">Please confirm your email id</Typography>
                        <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry of Lorem Ipsum.</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={3}>
                        <OtpInput
                          value={otp}
                          onChange={(otp) => setOtp(otp)}
                          numInputs={4}
                          containerStyle={{ justifyContent: 'space-between' }}
                          inputStyle={{
                            width: '100%',
                            margin: '8px',
                            padding: '10px',
                            border: '1px solid',
                            borderColor: { borderColor },
                            borderRadius: 4,
                            ':hover': {
                              borderColor: theme.palette.primary.main
                            }
                          }}
                          focusStyle={{
                            outline: 'none',
                            boxShadow: theme.customShadows.primary,
                            border: '1px solid ',
                            borderColor: theme.palette.primary.main
                          }}
                        />
                        <Stack direction="row" spacing={1}>
                          <Button color="secondary" variant="outlined" onClick={handleBack} fullWidth>
                            Back
                          </Button>
                          <Button onClick={handleNext} variant="contained" color="primary" fullWidth>
                            Continue
                          </Button>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </StepWrapper>
              </>
            )}
          </AuthCard>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography align="center">
              By signing up, you confirm to have read Able pro
              <Typography component={Link} to={'#'} sx={{ textDecoration: 'none', px: 0.5 }} color="primary">
                Privacy Policy
              </Typography>
              and agree to the
              <Typography component={Link} to={'#'} sx={{ textDecoration: 'none', pl: 0.5 }} color="primary">
                Terms of Service
              </Typography>
              .
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </AuthWrapper3>
  );
}

StepWrapper.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };
