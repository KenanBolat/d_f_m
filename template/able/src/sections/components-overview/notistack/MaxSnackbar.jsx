import { useState } from 'react';

// material-ul
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// third party
import { enqueueSnackbar } from 'notistack';

// project-imports
import MainCard from 'components/MainCard';
import { handlerIncrease, useGetSnackbar } from 'api/snackbar';

// assets
import { Add, Minus } from 'iconsax-react';

// ==============================|| NOTISTACK - MAXIMUM SNACKBAR ||============================== //

export default function MaxSnackbar() {
  const width = { minWidth: 'auto' };

  const { snackbar } = useGetSnackbar();
  const [value, setValue] = useState(3);

  const handlerMaxStack = () => {
    enqueueSnackbar('Your notification here');
    handlerIncrease(value);
  };

  const NotiStackMaxSnackbarCodeString = `<Button
variant="contained"
fullWidth
sx={{ marginBlockStart: 2 }}
onClick={() => {
  enqueueSnackbar('Your notification here');
  handlerIncrease(value);
}}
>
  Show Snackbar
</Button>`;

  return (
    <MainCard title="Maximum snackbars" codeString={NotiStackMaxSnackbarCodeString}>
      <Stack justifyContent={'space-between'} flexDirection={'row'}>
        <Button
          variant="outlined"
          size="small"
          sx={width}
          disabled={snackbar.maxStack === 0 ? true : false}
          onClick={() => setValue((prev) => prev - 1)}
        >
          <Minus />
        </Button>
        <Typography variant="body1">stack up to {value}</Typography>
        <Button
          variant="outlined"
          size="small"
          sx={width}
          disabled={snackbar.maxStack === 4 ? true : false}
          onClick={() => setValue((prev) => prev + 1)}
        >
          <Add />
        </Button>
      </Stack>
      <Button variant="contained" fullWidth sx={{ marginBlockStart: 2 }} onClick={() => handlerMaxStack()}>
        Show Snackbar
      </Button>
    </MainCard>
  );
}
