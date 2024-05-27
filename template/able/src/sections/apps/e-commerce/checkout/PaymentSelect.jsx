import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| CHECKOUT - PAYMENT SELECT ||============================== //

export default function PaymentSelect({ item }) {
  const theme = useTheme();

  return (
    <MainCard content={false} sx={{ '&:hover': { boxShadow: theme.customShadows.primary } }}>
      <Box sx={{ p: 2, py: 1, pr: 0 }}>
        <FormControlLabel
          value={item.value}
          control={<Radio />}
          label={
            <Stack spacing={0.5} sx={{ width: '100%' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2.5} sx={{ width: '100%' }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Box
                  sx={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'right',
                    borderColor: 'error.light',
                    ...item.size
                  }}
                />
              </Stack>
              <Typography variant="caption" color="text.secondary">
                {item.caption}
              </Typography>
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
    </MainCard>
  );
}

PaymentSelect.propTypes = { item: PropTypes.any };
