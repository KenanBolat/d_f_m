import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

// project-imports
import { ThemeMode } from 'config';
import { editColumn } from 'api/kanban';

// ==============================|| KANBAN BOARD - COLUMN EDIT ||============================== //

export default function EditColumn({ column }) {
  const theme = useTheme();

  const handleColumnRename = (event) => {
    editColumn({ id: column.id, title: event.target.value, itemIds: column.itemIds });
  };

  return (
    <OutlinedInput
      fullWidth
      value={column.title}
      onChange={handleColumnRename}
      sx={{
        mb: 1.5,
        fontWeight: 500,
        '& input:focus': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.100' : 'secondary.lighter'
        },
        '& input:hover': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.100' : 'secondary.lighter'
        },
        '& input:hover + fieldset': { display: 'block' },
        '&, & input': { bgcolor: 'transparent' },
        '& fieldset': { display: 'none' },
        '& input:focus + fieldset': { display: 'block' }
      }}
    />
  );
}

EditColumn.propTypes = { column: PropTypes.any };
