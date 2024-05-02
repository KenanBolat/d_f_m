import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// project-imports
import EcommerceDataChart from './EcommerceDataChart';
import MainCard from 'components/MainCard';

// assets
import { ArrowUp } from 'iconsax-react';

// ==============================|| CHART WIDGETS - NEW ORDER ||============================== //

export default function NewOrders() {
  const theme = useTheme();

  const [age, setAge] = useState('30');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h5">New Orders</Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <Select id="demo-simple-select" value={age} onChange={handleChange}>
                  <MenuItem value={10}>Today</MenuItem>
                  <MenuItem value={20}>Weekly</MenuItem>
                  <MenuItem value={30}>Monthly</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <EcommerceDataChart color={theme.palette.primary.main} height={80} />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography variant="subtitle1">$30,200</Typography>
            <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
              <ArrowUp size={14} style={{ transform: 'rotate(45deg)' }} />
              30.6%
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined" color="secondary">
            View more
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}
