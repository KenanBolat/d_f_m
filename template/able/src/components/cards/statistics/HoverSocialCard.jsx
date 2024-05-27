import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ===========================|| STATISTICS - HOVER SOCIAL CARD ||=========================== //

export default function HoverSocialCard({ primary, secondary, iconPrimary, color }) {
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary variant="Bold" size={52} /> : null;

  return (
    <Card
      elevation={0}
      sx={{
        background: color,
        position: 'relative',
        color: '#fff',
        '&:hover svg': {
          opacity: 1,
          transform: 'scale(1.1)'
        }
      }}
    >
      <CardContent>
        <Box
          sx={{
            position: 'absolute',
            right: 15,
            top: 25,
            color: '#fff',
            '& svg': {
              opacity: 0.4,
              transition: 'all .3s ease-in-out'
            }
          }}
        >
          {primaryIcon}
        </Box>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="h3" color="inherit">
              {secondary}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="inherit">{primary}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

HoverSocialCard.propTypes = { primary: PropTypes.any, secondary: PropTypes.any, iconPrimary: PropTypes.any, color: PropTypes.any };
