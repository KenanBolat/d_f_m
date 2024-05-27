import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { AddCircle } from 'iconsax-react';
import IconButton from 'components/@extended/IconButton';

// ===========================|| DATA WIDGET - TODO LIST ||=========================== //

export default function ToDoList() {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: false,
    checkedE: false,
    checkedF: false,
    checkedG: false
  });

  const handleChangeState = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <MainCard
      title="To Do List"
      content={false}
      secondary={
        <Tooltip title="Add Task">
          <IconButton>
            <AddCircle />
          </IconButton>
        </Tooltip>
      }
      sx={{ '& .MuiCardHeader-root': { p: 1.75 } }}
    >
      <CardContent>
        <Grid container spacing={0} sx={{ '& .Mui-checked + span': { textDecoration: 'line-through' } }}>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checkedA} onChange={handleChangeState} name="checkedA" color="primary" />}
              label="Check your Email"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checkedB} onChange={handleChangeState} name="checkedB" color="primary" />}
              label="Make YouTube Video"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checkedC} onChange={handleChangeState} name="checkedC" color="primary" />}
              label="Create Banner"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checkedD} onChange={handleChangeState} name="checkedD" color="primary" />}
              label="Upload Project"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checkedE} onChange={handleChangeState} name="checkedE" color="primary" />}
              label="Update Task"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checkedF} onChange={handleChangeState} name="checkedF" color="primary" />}
              label="Task Issue"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checkedG} onChange={handleChangeState} name="checkedG" color="primary" />}
              label="Deploy Project"
            />
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
}
