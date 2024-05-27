// material-ui
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// project-imports
import MainCard from 'components/MainCard';
import data from 'data/movies';

// ==============================|| AUTOCOMPLETE - BASIC ||============================== //

export default function BasicAutocomplete() {
  const basicAutocompleteCodeString = `<Autocomplete
  fullWidth
  disablePortal
  id="basic-autocomplete-label"
  options={data}
  renderInput={(params) => <TextField {...params} label="Label" />}
/>
<Autocomplete
  fullWidth
  disablePortal
  id="basic-autocomplete"
  options={data}
  renderInput={(params) => <TextField {...params} placeholder="Placeholder" />}
/>`;

  return (
    <MainCard title="Basic" sx={{ overflow: 'visible' }} codeHighlight codeString={basicAutocompleteCodeString}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Autocomplete
            fullWidth
            disablePortal
            id="basic-autocomplete-label"
            options={data}
            renderInput={(params) => <TextField {...params} label="Label" />}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Autocomplete
            fullWidth
            disablePortal
            id="basic-autocomplete"
            options={data}
            renderInput={(params) => <TextField {...params} placeholder="Placeholder" />}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
}
