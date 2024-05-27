import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

// third-party
import { flexRender, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table';

// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { TablePagination, HeaderSort, DebouncedInput } from 'components/third-party/react-table';

import makeData from 'data/react-table';
import { ImagePath, getImageUrl } from 'utils/getImageUrl';

// assets
import { ArrowDown, ArrowUp, Star1 } from 'iconsax-react';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, title }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      rowSelection,
      globalFilter
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true
  });

  let headers = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  const [age, setAge] = useState('10');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <MainCard content={false} title={title}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Typography variant="h5">Products</Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select id="demo-simple-select" value={age} onChange={handleChange}>
                <MenuItem value={10}>Today</MenuItem>
                <MenuItem value={20}>Weekly</MenuItem>
                <MenuItem value={30}>Monthly</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Box>
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: 2.5 }}
      >
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} records...`}
        />

        <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={2}>
          {/* <SelectColumnSorting {...{ getState: table.getState, getAllColumns: table.getAllColumns }} /> */}
        </Stack>
      </Stack>
      <ScrollX>
        <Stack>
          <TableContainer>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                        Object.assign(header.column.columnDef.meta, {
                          className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                        });
                      }

                      return (
                        <TableCell
                          key={header.id}
                          {...header.column.columnDef.meta}
                          onClick={header.column.getToggleSortingHandler()}
                          {...(header.column.getCanSort() &&
                            header.column.columnDef.meta === undefined && {
                              className: 'cursor-pointer prevent-select'
                            })}
                        >
                          {header.isPlaceholder ? null : (
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                              {header.column.getCanSort() && <HeaderSort column={header.column} />}
                            </Stack>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
                  <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                    <TablePagination
                      {...{
                        setPageSize: table.setPageSize,
                        setPageIndex: table.setPageIndex,
                        getState: table.getState,
                        getPageCount: table.getPageCount,
                        initialPageSize: 4
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - BASIC ||============================== //

export default function Products() {
  const data = makeData(10);
  const theme = useTheme();

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const columns = useMemo(
    () => [
      {
        header: 'Products',
        accessorKey: 'fatherName',
        cell: ({ row }) => {
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                alt="Avatar 1"
                size="lg"
                variant="rounded"
                src={getImageUrl(`img-prod-${randomIntFromInterval(1, 4)}.jpg`, ImagePath.WIDGET)}
              />
              <Stack spacing={0}>
                <Typography variant="subtitle1">{row.original.fatherName}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', lg: 'inherit' } }}>
                  Leather panels. Laces. Rounded toe.
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (cell) => {
          switch (cell.getValue()) {
            case 'Complicated':
              return <Chip color="error" label="Close" size="small" sx={{ borderRadius: 1 }} />;
            case 'Relationship':
              return <Chip color="success" label="Active" size="small" sx={{ borderRadius: 1 }} />;
            case 'Single':
            default:
              return <Chip color="warning" label="Pending" size="small" sx={{ borderRadius: 1 }} />;
          }
        }
      },
      {
        header: 'Price',
        accessorKey: 'age',
        cell: ({ row }) => <Typography variant="subtitle1">${row.original.age}</Typography>
      },
      {
        header: 'Sales',
        accessorKey: 'visits',
        cell: ({ row }) => {
          return (
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <Typography variant="subtitle1">{row.original.visits}</Typography>
              <>
                {row.original?.age > 30 ? (
                  <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                    +{(row.original.age * 3) / 10}
                    <ArrowUp size={12} />
                  </Typography>
                ) : (
                  <Typography variant="caption" color="error.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                    -{(row.original.age * 3) / 10}
                    <ArrowDown size={12} />
                  </Typography>
                )}
              </>
              <Typography></Typography>
            </Stack>
          );
        }
      },
      {
        header: 'Rating',
        accessorKey: 'progress',
        cell: ({ row }) => {
          return (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Star1 variant="Bold" color={theme.palette.warning.main} size={18} />
              <Typography variant="subtitle1">{randomIntFromInterval(1, 10) / 2}</Typography>
              <Typography color="text.secondary">({row.original.progress})</Typography>
            </Stack>
          );
        }
      }
    ], // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
}

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array, title: PropTypes.string };
