// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardMedia from '@mui/material/CardMedia';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';

import { MenuOrientation } from 'config';
import { handlerDrawerOpen } from 'api/menu';

// assets
import defaultLayout from 'assets/images/customization/vertical.svg';
import horizontalLayout from 'assets/images/customization/horizontal.svg';

// ==============================|| CUSTOMIZATION - CONTAINER ||============================== //

export default function ThemeMenuLayout() {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation, onChangeMenuOrientation, onChangeMiniDrawer } = useConfig();
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const handleContainerChange = (e) => {
    onChangeMiniDrawer(true);
    onChangeMenuOrientation(e.target.value);
    handlerDrawerOpen(e.target.value !== MenuOrientation.HORIZONTAL);
  };

  return (
    <RadioGroup row aria-label="payment-card" name="payment-card" value={menuOrientation} onChange={handleContainerChange}>
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value={MenuOrientation.VERTICAL} sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Stack alignItems="center" spacing={0.5}>
              <MainCard content={false} sx={{ borderWidth: 2, p: 1, ...(!isHorizontal && { borderColor: theme.palette.primary.main }) }}>
                <CardMedia component="img" src={defaultLayout} alt="defaultLayout" />
              </MainCard>
              <Typography variant="caption">Vertical</Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={<Radio value={MenuOrientation.HORIZONTAL} sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Stack alignItems="center" spacing={0.5}>
              <MainCard content={false} sx={{ borderWidth: 2, p: 1, ...(isHorizontal && { borderColor: theme.palette.primary.main }) }}>
                <CardMedia component="img" src={horizontalLayout} alt="horizontalLayout" />
              </MainCard>
              <Typography variant="caption">Horizontal</Typography>
            </Stack>
          }
        />
      </Stack>
    </RadioGroup>
  );
}
