import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faCog, faMapMarkedAlt, faListAlt, faSatellite } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@mui/material/styles';

// Icon mapping
const iconMap = {
  geotiff: faMapMarkedAlt,
  netcdf: faDatabase,
  png: faListAlt,
  mission: faSatellite,
  settings: faCog,
  // Add more mappings as needed
};

const SummaryCard = ({ title, count, fileSize, fileType }) => {
  const theme = useTheme();
  const icon = iconMap[fileType] || faListAlt; // Default icon if none match

  return (
    <Card sx={{
      minWidth: 275,
      margin: 2,
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(11px)',
      borderRadius: '12px',
      color: theme.palette.common.white,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 180, // Adjust the height as necessary
    }}>
      <CardContent>
        <FontAwesomeIcon icon={icon} size="2x" style={{ marginBottom: '16px' }} />
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
          {`${title} - ${fileType}`}
        </Typography>
        <Typography variant="body2">
          {count} files
        </Typography>
        <Typography variant="body2">
          {fileSize} GB
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
