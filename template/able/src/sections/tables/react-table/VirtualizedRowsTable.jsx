import PropTypes from 'prop-types';
import { useMemo, useRef } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// third-party
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import { CSVExport } from 'components/third-party/react-table';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import makeData from 'data/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const tableContainerRef = useRef(null);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 34,
    overscan: 10
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  let headers = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  return (
    <MainCard
      content={false}
      title="Virtualized Rows"
      secondary={
        <CSVExport
          {...{ data: virtualRows.map((virtualRow) => rows[virtualRow.index].original), headers, filename: 'virtualized-row.csv' }}
        />
      }
    >
      <ScrollX>
        <TableContainer component={Paper} ref={tableContainerRef} sx={{ height: 544, overflow: 'auto' }}>
          <Table>
            <TableHead className="sticky-header">
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
              {paddingTop > 0 && (
                <TableRow>
                  <TableCell sx={{ height: `${paddingTop}px`, whiteSpace: 'nowrap' }} />
                </TableRow>
              )}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} sx={{ whiteSpace: 'nowrap' }} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {paddingBottom > 0 && (
                <TableRow>
                  <TableCell sx={{ height: `${paddingBottom}px`, whiteSpace: 'nowrap' }} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - VIRTUALIZED ROW ||============================== //

export default function VirtualizedRowTable() {
  const data = makeData(100);

  const columns = useMemo(
    () => [
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
        meta: { className: 'cell-right' }
      },
      {
        header: 'Role',
        accessorKey: 'role'
      },
      {
        header: 'Visits',
        accessorKey: 'visits',
        meta: { className: 'cell-right' }
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
    []
  );

  return <ReactTable {...{ columns, data }} />;
}

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array };
