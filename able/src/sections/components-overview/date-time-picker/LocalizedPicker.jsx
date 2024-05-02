import { useState } from 'react';

// material-ui
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';

// third-party
import de from 'date-fns/locale/de';
import enGB from 'date-fns/locale/en-GB';
import zhCN from 'date-fns/locale/zh-CN';

// project-imports
import MainCard from 'components/MainCard';

const locales = { 'en-us': undefined, 'en-gb': enGB, 'zh-cn': zhCN, de };

// ==============================|| DATE PICKER - LOCALIZED ||============================== //

export default function LocalizedPicker() {
  const [locale, setLocale] = useState('en-us');

  const selectLocale = (newLocale) => {
    setLocale(newLocale);
  };

  const localizeDatepickerCodeString = `<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale]}>
  <div>
    <ToggleButtonGroup value={locale} exclusive sx={{ mb: 2, display: 'block' }}>
      {Object.keys(localeMap).map((localeItem) => (
        <ToggleButton key={localeItem} value={localeItem} onClick={() => selectLocale(localeItem)}>
          {localeItem}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
    <DatePicker
      mask={maskMap[locale]}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      renderInput={(params) => <TextField {...params} />}
    />
  </div>
</LocalizationProvider>`;

  return (
    <MainCard title="Localization Picker" codeString={localizeDatepickerCodeString}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locales[locale]}>
        <Stack spacing={3} sx={{ width: 300 }}>
          <ToggleButtonGroup value={locale} exclusive fullWidth>
            {Object.keys(locales).map((localeItem) => (
              <ToggleButton key={localeItem} value={localeItem} onClick={() => selectLocale(localeItem)}>
                {localeItem}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <DateField label="Date" defaultValue={new Date('2022-04-17')} />
          <TimeField label="Time" defaultValue={new Date('2022-04-17T18:30')} />
        </Stack>
      </LocalizationProvider>
    </MainCard>
  );
}
