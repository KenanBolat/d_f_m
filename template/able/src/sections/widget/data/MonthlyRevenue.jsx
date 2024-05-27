import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

// third-party
import { useTable } from 'react-table';

// project-imports
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';

import makeData from 'data/react-table';

// assets
import { ArrowDown, ArrowUp, Star1, Wallet3 } from 'iconsax-react';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, index) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => (
              <TableCell {...column.getHeaderProps([{ className: column.className }])} key={index}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()} key={i}>
              {row.cells.map((cell, index) => (
                <TableCell {...cell.getCellProps([{ className: cell.column.className }])} key={index}>
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

// ==============================|| DATA - MONTHLY REVENUE ||============================== //

export default function MonthlyRevenue() {
  const data = useMemo(() => makeData(5), []);

  const icons = [Star1, ArrowDown, Wallet3, ArrowUp];

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Customer',
        accessor: 'fatherName',
        Cell: ({ value }) => {
          const Icons = icons[randomIntFromInterval(0, 3)];
          return (
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar variant="rounded" color="secondary" size="sm">
                <Icons />
              </Avatar>
              <Typography color="text.secondary">{value}</Typography>
            </Stack>
          );
        }
      },
      {
        Header: 'Plan',
        accessor: 'status',
        Cell: ({ value }) => {
          switch (value) {
            case 'Complicated':
              return <Chip color="error" label="Team" size="small" variant="light" sx={{ borderRadius: 1 }} />;
            case 'Relationship':
              return <Chip color="success" label="Premium" size="small" variant="light" sx={{ borderRadius: 1 }} />;
            case 'Single':
            default:
              return <Chip color="info" label="Free" size="small" variant="light" sx={{ borderRadius: 1 }} />;
          }
        }
      },
      {
        Header: 'MRR',
        accessor: 'progress',
        className: 'cell-right',
        Cell: ({ value }) => {
          return (
            <>
              {value > 50 ? (
                <Typography variant="subtitle1">${value}</Typography>
              ) : (
                <Typography color="error" variant="subtitle1">
                  -${value}
                </Typography>
              )}
            </>
          );
        }
      }
    ], // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard content={false}>
      <Stack sx={{ p: 3 }} spacing={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Typography variant="h5">Monthly Revenue</Typography>
          <IconButton
            color="secondary"
            id="wallet-button"
            aria-controls={open ? 'wallet-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="wallet-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'wallet-button', sx: { p: 1.25, minWidth: 150 } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <ListItemButton onClick={handleClose}>Today</ListItemButton>
            <ListItemButton onClick={handleClose}>Weekly</ListItemButton>
            <ListItemButton onClick={handleClose}>Monthly</ListItemButton>
          </Menu>
        </Stack>
        <Stack>
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <Typography variant="h5">$746.5k</Typography>
            <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              +20.6
              <ArrowUp size={12} />
            </Typography>
            <Typography></Typography>
          </Stack>
          <Typography color="text.secondary">Past 30 days</Typography>
        </Stack>
      </Stack>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
}

MonthlyRevenue.propTypes = { value: PropTypes.array };

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array };
