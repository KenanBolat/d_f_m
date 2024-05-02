import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import Avatar from 'components/@extended/Avatar';
import { ImagePath, getImageUrl } from 'utils/getImageUrl';

// ==============================|| PRODUCT DETAILS - REVIEW ||============================== //

export default function ProductReview({ avatar, date, name, rating, review }) {
  return (
    <Grid item xs={12}>
      <Stack direction="row" spacing={1}>
        <Avatar alt={name} src={avatar && getImageUrl(`${avatar}`, ImagePath.USERS)} />
        <Stack spacing={2}>
          <Stack spacing={0.25}>
            <Typography variant="subtitle1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
              {name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>
            <Rating size="small" name="simple-controlled" value={rating < 4 ? rating + 1 : rating} precision={0.1} readOnly />
          </Stack>
          <Typography variant="body2">{review}</Typography>
        </Stack>
      </Stack>
    </Grid>
  );
}

ProductReview.propTypes = {
  avatar: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  name: PropTypes.string,
  rating: PropTypes.number,
  review: PropTypes.string
};
