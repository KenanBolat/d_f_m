// material-ui
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// project-imports
import MainCard from 'components/MainCard';
import data from 'data/movies';

// ==============================|| AUTOCOMPLETE - CHECKBOXES ||============================== //

export default function CheckboxesAutocomplete() {
  const checkboxAutocompleteCodeString = `<Autocomplete
  multiple
  id="checkboxes-tags-demo"
  options={data}
  disableCloseOnSelect
  getOptionLabel={(option) => option.label}
  renderOption={(props, option, { selected }) => (
    <li {...props}>
      <Checkbox style={{ marginRight: 8 }} checked={selected} />
      {option.label}
    </li>
  )}
  renderInput={(params) => <TextField {...params} placeholder="Checkboxes" />}
  sx={{
    '& .MuiOutlinedInput-root': {
      p: 1
    },
    '& .MuiAutocomplete-tag': {
      bgcolor: 'primary.lighter',
      border: '1px solid',
      borderColor: 'primary.light',
      '& .MuiSvgIcon-root': {
        color: 'primary.main',
        '&:hover': {
          color: 'primary.dark'
        }
      }
    }
  }}
/>`;

  return (
    <MainCard title="Checkboxes" codeString={checkboxAutocompleteCodeString}>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={data}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option.label}
          </li>
        )}
        renderInput={(params) => <TextField {...params} placeholder="Checkboxes" />}
        sx={{
          '& .MuiOutlinedInput-root': { p: 1 },
          '& .MuiAutocomplete-tag': {
            bgcolor: 'primary.lighter',
            border: '1px solid',
            borderColor: 'primary.light',
            '& .MuiSvgIcon-root': { color: 'primary.main', '&:hover': { color: 'primary.dark' } }
          }
        }}
      />
    </MainCard>
  );
}
