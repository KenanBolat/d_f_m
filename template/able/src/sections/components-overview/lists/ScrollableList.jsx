import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

// project-imports
import MainCard from 'components/MainCard';

// third-party
import { FixedSizeList } from 'react-window';

// ==============================|| SCROLLABLE - ITEMS ||============================== //

function renderRow({ index, style }) {
  return (
    <ListItem style={style} key={index} disablePadding divider>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

// ==============================|| LIST - SCROLLABLE ||============================== //

export default function ScrollableList() {
  const scrollListCodeString = `<Box sx={{ width: '100%', height: 400, bgcolor: 'background.paper' }}>
  <FixedSizeList height={400} width="100%" itemSize={46} itemCount={200} overscanCount={5}>
    <ListItem style={style} key={index} disablePadding divider>
      <ListItemButton>
        <ListItemText primary={'Item {index + 1}'} />
      </ListItemButton>
    </ListItem>
  </FixedSizeList>
</Box>`;

  return (
    <MainCard content={false} codeString={scrollListCodeString}>
      <Box sx={{ width: '100%', height: 400, bgcolor: 'background.paper', '& .MuiListItemButton-root': { borderRadius: 0, my: 0 } }}>
        <FixedSizeList height={400} width="100%" itemSize={46} itemCount={200} overscanCount={5}>
          {renderRow}
        </FixedSizeList>
      </Box>
    </MainCard>
  );
}

renderRow.propTypes = { index: PropTypes.any, style: PropTypes.any };
