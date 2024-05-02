import { useState } from 'react';

// material-ui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| DATE PICKER - DISABLED ||============================== //

export default function DisabledPickers() {
  const [value, setValue] = useState(null);

  const disabledDatepickerCodeString = `<MainCard title="Disabled Pickers" codeString={disabledDatepickerCodeString}>
  <Stack spacing={3}>
    <Typography variant="h6">Date Picker</Typography>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="disabled"
        disabled
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
        }}
        renderInput={(params: any) => <TextField {...params} />}
      />
      <DatePicker
        label="read-only"
        readOnly
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
        }}
        renderInput={(params: any) => <TextField {...params} />}
      />
    </LocalizationProvider>

    <Typography variant="h6">Date Time Picker</Typography>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="disabled"
        disabled
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
        }}
        renderInput={(params: any) => <TextField {...params} />}
      />
      <DateTimePicker
        label="read-only"
        readOnly
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
        }}
        renderInput={(params: any) => <TextField {...params} />}
      />

      <Typography variant="h6">Time Picker</Typography>
      <TimePicker
        label="disabled"
        disabled
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
        }}
        renderInput={(params: any) => <TextField {...params} />}
      />
      <TimePicker
        label="read-only"
        readOnly
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
        }}
        renderInput={(params: any) => <TextField {...params} />}
      />
    </LocalizationProvider>
  </Stack>
</MainCard>`;

  return (
    <MainCard title="Disabled Pickers" codeString={disabledDatepickerCodeString}>
      <Stack spacing={3} sx={{ '& .MuiInputLabel-root': { overflow: 'visible' } }}>
        <Typography variant="h6">Date Picker</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disabled
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            slotProps={{ textField: { placeholder: 'disabled' } }}
          />
          <DatePicker
            readOnly
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            slotProps={{ textField: { placeholder: 'disabled' } }}
          />
        </LocalizationProvider>

        <Typography variant="h6">Date Time Picker</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            disabled
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            slotProps={{ textField: { placeholder: 'disabled' } }}
          />
          <DateTimePicker
            readOnly
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            slotProps={{ textField: { placeholder: 'read-only' } }}
          />

          <Typography variant="h6">Time Picker</Typography>
          <TimePicker
            disabled
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            slotProps={{ textField: { placeholder: 'disabled' } }}
          />
          <TimePicker
            readOnly
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            slotProps={{ textField: { placeholder: 'read-only' } }}
          />
        </LocalizationProvider>
      </Stack>
    </MainCard>
  );
}
