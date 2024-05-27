import { useState, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// assets
import { InfoCircle, TickSquare } from 'iconsax-react';

// project-imports
import MainCard from 'components/MainCard';

// plan list
const plans = [
  {
    active: false,
    title: 'Basic',
    description: '03 Services',
    price: 69,
    permission: [0, 1, 2]
  },
  {
    active: true,
    title: 'Standard',
    description: '05 Services',
    price: 129,
    permission: [0, 1, 2, 3, 4]
  },
  {
    active: false,
    title: 'Premium',
    description: '08 Services',
    price: 599,
    permission: [0, 1, 2, 3, 4, 5, 6, 7]
  }
];

const planList = [
  'One End Product', // 0
  'No attribution required', // 1
  'TypeScript', // 2
  'Figma Design Resources', // 3
  'Create Multiple Products', // 4
  'Create a SaaS Project', // 5
  'Resale Product', // 6
  'Separate sale of our UI Elements?' // 7
];

// ==============================|| PRICING ||============================== //

export default function Pricing() {
  const theme = useTheme();
  const [timePeriod, setTimePeriod] = useState(true);

  const priceListDisable = {
    opacity: 0.4,
    textDecoration: 'line-through'
  };

  const priceSelectedPlan = {
    padding: 3,
    borderRadius: 1,
    border: '1px solid',
    borderColor: theme.palette.divider,
    bgcolor: theme.palette.primary.lighter
  };

  const priceUnselectedPlan = {
    padding: 3,
    borderRadius: 1,
    border: '1px solid',
    borderColor: theme.palette.divider,
    bgcolor: theme.palette.background.paper
  };

  const [price, setPrice] = useState('Standard');
  const handlePriceMethod = (value) => {
    setPrice(value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Alert
          color="warning"
          variant="border"
          icon={<InfoCircle variant="Bold" />}
          sx={{ '&.MuiAlert-colorWarning': { backgroundColor: alpha(theme.palette.warning.lighter, 0.15) } }}
        >
          <AlertTitle sx={{ fontWeight: 500, color: 'warning.dark' }}>Note</AlertTitle>
          <Typography variant="h6">
            The pricing provided is for demonstration purposes only. For actual product pricing, please refer to the official
            <Link
              color="warning.dark"
              sx={{ textDecoration: 'none', ml: 0.5 }}
              variant="subtitle1"
              target="_blank"
              href="https://themeforest.net/item/able-pro-react-mui-admin-dashboard-template/50427053?s_rank=4"
            >
              pricing page
            </Link>
          </Typography>
        </Alert>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
          <Stack spacing={0}>
            <Typography variant="h5">Quality is never an accident. It is always the result of interlligent effort</Typography>
            <Typography color="text.secondary">It makes no difference what the price is, it all makes senses to us.</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography variant="subtitle1" color={timePeriod ? 'text.secondary' : 'text.primary'}>
              Billed Yearly
            </Typography>
            <Switch checked={timePeriod} onChange={() => setTimePeriod(!timePeriod)} inputProps={{ 'aria-label': 'container' }} />
            <Typography variant="subtitle1" color={timePeriod ? 'text.primary' : 'text.secondary'}>
              Billed Monthly
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={7}>
            <MainCard>
              {plans.map((plan, index) => (
                <Box key={index} sx={{ display: price === plan.title ? 'block' : 'none' }}>
                  <List
                    sx={{
                      m: 0,
                      p: 0,
                      '&> li': {
                        px: 0,
                        py: 0.625
                      }
                    }}
                    component="ul"
                  >
                    {planList.map((list, i) => (
                      <Fragment key={i}>
                        <ListItem sx={!plan.permission.includes(i) ? priceListDisable : {}} divider>
                          <ListItemIcon>
                            <TickSquare
                              size="16"
                              color={plan.permission.includes(i) ? theme.palette.success.main : theme.palette.secondary.main}
                            />
                          </ListItemIcon>
                          <ListItemText primary={list} />
                        </ListItem>
                      </Fragment>
                    ))}
                  </List>
                </Box>
              ))}
            </MainCard>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <MainCard>
              <RadioGroup
                aria-label="delivery-options"
                value={price}
                onChange={(e) => handlePriceMethod(e.target.value)}
                name="Price-options"
              >
                <Stack spacing={2}>
                  {plans.map((plan, index) => (
                    <Box key={index} sx={price === plan.title ? priceSelectedPlan : priceUnselectedPlan}>
                      <FormControlLabel
                        value={plan.title}
                        control={<Radio />}
                        label={
                          <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
                            <Stack spacing={0}>
                              <Stack spacing={1} direction="row">
                                <Typography variant="h5">{plan.title}</Typography>
                                {plan.active && <Chip label="Popular" size="small" color="success" />}
                              </Stack>
                              <Typography>{plan.description}</Typography>
                            </Stack>
                            <Stack spacing={0} alignItems="flex-end" direction={{ sm: 'row', xs: 'column' }}>
                              {timePeriod && <Typography variant="h4">${plan.price}</Typography>}
                              {!timePeriod && <Typography variant="h4">${plan.price * 12 - 99}</Typography>}
                              <Typography variant="h6" color="text.secondary">
                                /Lifetime
                              </Typography>
                            </Stack>
                          </Stack>
                        }
                        sx={{
                          width: '100%',
                          alignItems: 'flex-start',
                          '& .MuiSvgIcon-root': { fontSize: 32 },
                          '& .MuiFormControlLabel-label': { width: '100%' },
                          '& .MuiRadio-root': { p: 0, pl: 1, pr: 1, pt: 0.5 }
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </RadioGroup>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
