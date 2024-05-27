import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';

// third-party
import { flexRender, useReactTable, getExpandedRowModel, getCoreRowModel } from '@tanstack/react-table';

// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport } from 'components/third-party/react-table';

import makeData from 'data/react-table';
import mockData from 'utils/mock-data';
import { getImageUrl, ImagePath } from 'utils/getImageUrl';

// assets
import { ArrowDown2, ArrowRight2, MinusCirlce } from 'iconsax-react';

const numRows = mockData(1);

// ==============================|| RENDER - SUB TABLE ||============================== //

function RenderSubComponent({ row }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: 'Avatar',
        accessorKey: 'avatar',
        cell: (cell) => <Avatar alt="Avatar 1" size="sm" src={getImageUrl(`avatar-${cell.getValue()}.png`, ImagePath.USERS)} />,
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'Name',
        accessorKey: 'fullName'
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Role',
        accessorKey: 'role'
      },
      {
        header: 'Contact',
        accessorKey: 'contact',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Country',
        accessorKey: 'country'
      }
    ],
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(makeData(numRows.number.status(1, 5)));
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const userData = row.original;

  let headers = [];
  columns.map(
    (columns) =>
      // @ts-ignore
      columns.accessorKey &&
      headers.push({
        label: typeof columns.header === 'string' ? columns.header : '#',
        // @ts-ignore
        key: columns.accessorKey
      })
  );

  return (
    <MainCard
      title={`${userData.fullName}'s Employee List`}
      secondary={<CSVExport {...{ data, headers, filename: 'expanding-sub-data.csv' }} />}
      content={false}
      sx={{ ml: { xs: 2.5, sm: 5, md: 6, lg: 10, xl: 12 } }}
    >
      <ReactTable {...{ columns, data, loading, isList: true }} />
    </MainCard>
  );
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, loading, isList }) {
  const theme = useTheme();

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel()
  });

  const backColor = alpha(theme.palette.primary.lighter, 0.1);

  if (loading) {
    return (
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id} {...header.column.columnDef.meta}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {[0, 1, 2].map((item) => (
            <TableRow key={item}>
              {[0, 1, 2, 3, 4, 5].map((col) => (
                <TableCell key={col}>
                  <Skeleton animation="wave" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  let headers = [];
  table.getAllColumns().map(
    (columns) =>
      // @ts-ignore
      columns.columnDef.accessorKey &&
      headers.push({
        label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
        // @ts-ignore
        key: columns.columnDef.accessorKey
      })
  );

  return (
    <MainCard
      {...(!isList && { title: 'Expanding Sub Table' })}
      content={false}
      secondary={<CSVExport {...{ data, headers, filename: 'expanding-sub.csv' }} />}
    >
      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} sx={{ '& > th:first-of-type': { width: isList ? 'auto' : 58 } }}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        <RenderSubComponent {...{ row }} />
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - EXPANDING SUB TABLE ||============================== //

export default function ExpandingSubTable() {
  const theme = useTheme();
  const data = makeData(8);

  const columns = useMemo(
    () => [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <IconButton color={row.getIsExpanded() ? 'primary' : 'secondary'} onClick={row.getToggleExpandedHandler()} size="small">
              {row.getIsExpanded() ? <ArrowDown2 size="32" variant="Outline" /> : <ArrowRight2 size="32" variant="Outline" />}
            </IconButton>
          ) : (
            <MinusCirlce style={{ color: theme.palette.text.secondary }} size="32" />
          );
        }
      },
      {
        header: 'First Name',
        accessorKey: 'firstName'
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName'
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Age',
        accessorKey: 'age',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Visits',
        accessorKey: 'visits',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (cell) => {
          switch (cell.getValue()) {
            case 'Complicated':
              return <Chip color="error" label="Complicated" size="small" variant="light" />;
            case 'Relationship':
              return <Chip color="success" label="Relationship" size="small" variant="light" />;
            case 'Single':
            default:
              return <Chip color="info" label="Single" size="small" variant="light" />;
          }
        }
      },
      {
        header: 'Profile Progress',
        accessorKey: 'progress',
        cell: (cell) => <LinearWithLabel value={cell.getValue()} sx={{ minWidth: 75 }} />
      }
    ],
    [theme.palette.text.secondary]
  );

  return <ReactTable {...{ columns, data }} />;
}

RenderSubComponent.propTypes = { row: PropTypes.object };

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array, loading: PropTypes.bool, isList: PropTypes.bool };
