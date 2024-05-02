import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';

// third-party
import { format } from 'date-fns';

// project-imports
import IconButton from 'components/@extended/IconButton';

// assets
import { ArrowLeft2, ArrowRight2, Calendar1, Category, Grid6, TableDocument } from 'iconsax-react';

// constant
const viewOptions = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: Category
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
    icon: Grid6
  },
  {
    label: 'Day',
    value: 'timeGridDay',
    icon: Calendar1
  },
  {
    label: 'Agenda',
    value: 'listWeek',
    icon: TableDocument
  }
];

// ==============================|| CALENDAR - TOOLBAR ||============================== //

export default function Toolbar({ date, view, onClickNext, onClickPrev, onClickToday, onChangeView }) {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [viewFilter, setViewFilter] = useState(viewOptions);

  useEffect(() => {
    if (matchDownSM) {
      const filter = viewOptions.filter((item) => item.value !== 'dayGridMonth' && item.value !== 'timeGridWeek');
      setViewFilter(filter);
    } else {
      setViewFilter(viewOptions);
    }
  }, [matchDownSM]);

  return (
    <Grid alignItems="center" container justifyContent="space-between" spacing={matchDownSM ? 1 : 3} sx={{ pb: 3 }}>
      <Grid item>
        <Button variant="outlined" onClick={onClickToday} size={matchDownSM ? 'small' : 'medium'}>
          Today
        </Button>
      </Grid>
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={matchDownSM ? 1 : 3}>
          <IconButton onClick={onClickPrev} size={matchDownSM ? 'small' : 'large'}>
            <ArrowLeft2 />
          </IconButton>
          <Typography variant={matchDownSM ? 'h5' : 'h3'} color="text.primary">
            {format(date, 'MMMM yyyy')}
          </Typography>
          <IconButton onClick={onClickNext} size={matchDownSM ? 'small' : 'large'}>
            <ArrowRight2 />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          {viewFilter.map((viewOption) => {
            const Icon = viewOption.icon;
            return (
              <Tooltip title={viewOption.label} key={viewOption.value}>
                <Button
                  size={matchDownSM ? 'small' : 'large'}
                  disableElevation
                  variant={viewOption.value === view ? 'contained' : 'outlined'}
                  onClick={() => onChangeView(viewOption.value)}
                >
                  <Icon variant={viewOption.value === view ? 'Bold' : 'Linear'} />
                </Button>
              </Tooltip>
            );
          })}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

Toolbar.propTypes = {
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.any]),
  view: PropTypes.string,
  onClickNext: PropTypes.func,
  onClickPrev: PropTypes.func,
  onClickToday: PropTypes.func,
  onChangeView: PropTypes.func
};
