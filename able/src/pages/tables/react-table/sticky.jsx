// material-ui
import Grid from '@mui/material/Grid';

// project import
import StickyHeader from 'sections/tables/react-table/StickyHeader';

// ==============================|| REACT TABLE - EDITABLE ||============================== //

export default function StickyTable() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StickyHeader />
      </Grid>
    </Grid>
  );
}
