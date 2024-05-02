import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// material-ui
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { useAsyncDebounce } from 'react-table';
import { matchSorter } from 'match-sorter';
import { format } from 'date-fns';

// project-imports
import IconButton from 'components/@extended/IconButton';

// assets
import { Add, Minus, SearchNormal1 } from 'iconsax-react';

// ==============================|| CUSTOM FUNCTION - REACT TABLE ||============================== //

export function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter, ...other }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <OutlinedInput
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`Search ${count} records...`}
      id="start-adornment-email"
      startAdornment={<SearchNormal1 size={18} />}
      {...other}
    />
  );
}

export function DefaultColumnFilter({ column: { filterValue, Header, setFilter } }) {
  return (
    <TextField
      fullWidth
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={Header}
      size="small"
    />
  );
}

export function DateColumnFilter({ column: { filterValue, Header, setFilter } }) {
  return (
    <FormControl sx={{ width: '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          format="dd/MM/yyyy"
          value={filterValue && new Date(filterValue)}
          onChange={(newValue) => {
            let formatDateFn = undefined;
            try {
              formatDateFn = format(newValue, 'M/d/yyyy');
            } catch (error) {
              console.log('error - ', error);
            }
            setFilter(formatDateFn || undefined);
          }}
          slotProps={{ textField: { placeholder: `Select ${Header}` } }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

export function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      displayEmpty
      size="small"
    >
      <MenuItem value="">All</MenuItem>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}

export function SliderColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 1, minWidth: 120 }}>
      <Slider
        value={filterValue || min}
        min={min}
        max={max}
        step={1}
        onChange={(event, newValue) => {
          setFilter(newValue);
        }}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <Tooltip title="Reset">
        <IconButton size="small" color="error" onClick={() => setFilter(undefined)}>
          <Add style={{ transform: 'rotate(45deg)' }} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export function NumberRangeColumnFilter({ column: { filterValue = [], preFilteredRows, setFilter, id } }) {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 168, maxWidth: 250 }}>
      <TextField
        fullWidth
        value={filterValue[0] || ''}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]]);
        }}
        placeholder={`Min (${min})`}
        size="small"
      />
      <Minus />
      <TextField
        fullWidth
        value={filterValue[1] || ''}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined]);
        }}
        placeholder={`Max (${max})`}
        size="small"
      />
    </Stack>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

export const renderFilterTypes = () => ({
  fuzzyText: fuzzyTextFilterFn,
  text: (rows, id, filterValue) => {
    rows.filter((row) => {
      const rowValue = row.values[id];
      return rowValue !== undefined ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase()) : true;
    });
  }
});

export function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

export function useControlledState(state) {
  return useMemo(() => {
    if (state.groupBy.length) {
      return {
        ...state,
        hiddenColumns: [...state.hiddenColumns, ...state.groupBy].filter((d, i, all) => all.indexOf(d) === i)
      };
    }
    return state;
  }, [state]);
}

export function roundedMedian(leafValues) {
  let min = leafValues[0] || 0;
  let max = leafValues[0] || 0;

  leafValues.forEach((value) => {
    min = Math.min(min, value);
    max = Math.max(max, value);
  });

  return Math.round((min + max) / 2);
}

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.object,
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func,
  other: PropTypes.any
};

DefaultColumnFilter.propTypes = { column: PropTypes.object };

DateColumnFilter.propTypes = { column: PropTypes.object };

SelectColumnFilter.propTypes = { column: PropTypes.any };

SliderColumnFilter.propTypes = { column: PropTypes.any };

NumberRangeColumnFilter.propTypes = { column: PropTypes.any };
