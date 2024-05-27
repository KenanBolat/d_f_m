import { useState, useEffect } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// project-imports
import EmptyUserCard from 'components/cards/skeleton/EmptyUserCard';
import { DebouncedInput } from 'components/third-party/react-table';
import CustomerCard from 'sections/apps/customer/CustomerCard';
import CustomerModal from 'sections/apps/customer/CustomerModal';

import usePagination from 'hooks/usePagination';
import { useGetCustomer } from 'api/customer';

// assets
import { Add, SearchNormal1 } from 'iconsax-react';

// constant
const allColumns = [
  {
    id: 1,
    header: 'Default'
  },
  {
    id: 2,
    header: 'Customer Name'
  },
  {
    id: 3,
    header: 'Email'
  },
  {
    id: 4,
    header: 'Contact'
  },
  {
    id: 5,
    header: 'Age'
  },
  {
    id: 6,
    header: 'Country'
  },
  {
    id: 7,
    header: 'Status'
  }
];

function dataSort(data, sortBy) {
  return data.sort(function (a, b) {
    if (sortBy === 'Customer Name') return a.name.localeCompare(b.name);
    if (sortBy === 'Email') return a.email.localeCompare(b.email);
    if (sortBy === 'Contact') return a.contact.localeCompare(b.contact);
    if (sortBy === 'Age') return b.age < a.age ? 1 : -1;
    if (sortBy === 'Country') return a.country.localeCompare(b.country);
    if (sortBy === 'Status') return a.status.localeCompare(b.status);
    return a;
  });
}

// ==============================|| CUSTOMER - CARD ||============================== //

export default function CustomerCardPage() {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { customers: lists } = useGetCustomer();

  const [sortBy, setSortBy] = useState('Default');
  const [globalFilter, setGlobalFilter] = useState('');
  const [userCard, setUserCard] = useState([]);
  const [page, setPage] = useState(1);
  const [customerLoading, setCustomerLoading] = useState(true);
  const [customerModal, setCustomerModal] = useState(false);

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  // search
  useEffect(() => {
    setCustomerLoading(true);
    if (lists && lists.length > 0) {
      const newData = lists.filter((value) => {
        if (globalFilter) {
          return value.name.toLowerCase().includes(globalFilter.toLowerCase());
        } else {
          return value;
        }
      });
      setUserCard(dataSort(newData, sortBy).reverse());
      setCustomerLoading(false);
    }
    // eslint-disable-next-line
  }, [globalFilter, lists, sortBy]);

  const PER_PAGE = 6;

  const count = Math.ceil(userCard.length / PER_PAGE);
  const _DATA = usePagination(userCard, PER_PAGE);

  const handleChangePage = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <>
      <Box sx={{ position: 'relative', marginBottom: 3 }}>
        <Stack direction="row" alignItems="center">
          <Stack
            direction={matchDownSM ? 'column' : 'row'}
            sx={{ width: '100%' }}
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <DebouncedInput
              value={globalFilter ?? ''}
              onFilterChange={(value) => setGlobalFilter(String(value))}
              placeholder={`Search ${userCard.length} records...`}
              startAdornment={<SearchNormal1 size={18} />}
            />
            <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
              <FormControl sx={{ m: '8px !important', minWidth: 120 }}>
                <Select
                  value={sortBy}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <Typography variant="subtitle1">Sort By</Typography>;
                    }

                    return <Typography variant="subtitle2">Sort by ({sortBy})</Typography>;
                  }}
                >
                  {allColumns.map((column) => {
                    return (
                      <MenuItem key={column.id} value={column.header}>
                        {column.header}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button variant="contained" onClick={() => setCustomerModal(true)} size="large" startIcon={<Add />}>
                Add Customer
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Grid container spacing={3}>
        {!customerLoading && userCard.length > 0 ? (
          _DATA.currentData().map((user, index) => (
            <Slide key={index} direction="up" in={true} timeout={50}>
              <Grid item xs={12} sm={6} lg={4}>
                <CustomerCard customer={user} />
              </Grid>
            </Slide>
          ))
        ) : (
          <EmptyUserCard title={customerLoading ? 'Loading...' : 'You have not created any customer yet.'} />
        )}
      </Grid>
      <Stack spacing={2} sx={{ p: 2.5 }} alignItems="flex-end">
        <Pagination
          sx={{ '& .MuiPaginationItem-root': { my: 0.5 } }}
          count={count}
          size="medium"
          page={page}
          showFirstButton
          showLastButton
          variant="combined"
          color="primary"
          onChange={handleChangePage}
        />
      </Stack>
      <CustomerModal open={customerModal} modalToggler={setCustomerModal} />
    </>
  );
}
