import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { TrendDown, TrendUp } from 'iconsax-react';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

export default function AnalyticsDataCard({ color = 'primary', title, count, percentage, isLoss, children }) {
  return (
    <MainCard content={false}>
      <Box sx={{ p: 2.25 }}>
        <Stack spacing={0.5}>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
            {percentage && (
              <Chip
                variant="combined"
                color={color}
                icon={
                  <>
                    {!isLoss && <TrendUp variant="Bold" />}
                    {isLoss && <TrendDown variant="Bold" />}
                  </>
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 0.5, borderRadius: 1 }}
                size="small"
              />
            )}
          </Stack>
        </Stack>
      </Box>
      {children}
    </MainCard>
  );
}

AnalyticsDataCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  children: PropTypes.any
};
