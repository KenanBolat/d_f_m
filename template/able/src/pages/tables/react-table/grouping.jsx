import PropTypes from 'prop-types';
import { useMemo, useRef, useState } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';

// third-party
import { flexRender, useReactTable, getGroupedRowModel, getExpandedRowModel, getCoreRowModel } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { CSVExport } from 'components/third-party/react-table';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import makeData from 'data/react-table';

// assets
import { ArrowDown2, ArrowRight2, Command, TableDocument } from 'iconsax-react';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const [grouping, setGrouping] = useState(['age']);

  const table = useReactTable({
    data,
    columns,
    state: {
      grouping
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    debugTable: true
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
      title="Grouping With Seperate Column"
      secondary={<CSVExport {...{ data: table.getGroupedRowModel().rows.map((row) => row.original), headers, filename: 'grouping.csv' }} />}
    >
      <ScrollX>
        <TableContainer component={Paper} ref={tableContainerRef} sx={{ height: 544, overflow: 'auto' }}>
          <Table>
            <TableHead className="sticky-header">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : (
                        <Stack direction="row" alignItems="center">
                          {header.column.getCanGroup() && (
                            <IconButton
                              color={header.column.getIsGrouped() ? 'error' : 'primary'}
                              onClick={header.column.getToggleGroupingHandler()}
                              size="small"
                              sx={{ p: 0, width: 24, height: 24, fontSize: '1rem', mr: 0.75 }}
                            >
                              {header.column.getIsGrouped() ? (
                                <TableDocument size="32" variant="Outline" />
                              ) : (
                                <Command size="32" variant="Outline" />
                              )}
                            </IconButton>
                          )}
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </Stack>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {paddingTop > 0 && (
                <TableRow>
                  <TableCell sx={{ height: `${paddingTop}px` }} />
                </TableRow>
              )}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      let bgcolor = 'background.paper';
                      if (cell.getIsGrouped()) bgcolor = 'success.lighter';
                      if (cell.getIsAggregated()) bgcolor = 'warning.lighter';
                      if (cell.getIsPlaceholder()) bgcolor = 'error.lighter';

                      if (cell.column.columnDef.meta !== undefined && cell.column.getCanSort()) {
                        Object.assign(cell.column.columnDef.meta, {
                          style: { backgroundColor: bgcolor }
                        });
                      }

                      return (
                        <TableCell
                          key={cell.id}
                          {...cell.column.columnDef.meta}
                          sx={{ bgcolor }}
                          {...(cell.getIsGrouped() &&
                            cell.column.columnDef.meta === undefined && {
                              style: { backgroundColor: bgcolor }
                            })}
                        >
                          {cell.getIsGrouped() ? (
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <IconButton
                                color="secondary"
                                onClick={row.getToggleExpandedHandler()}
                                size="small"
                                sx={{ p: 0, width: 24, height: 24 }}
                              >
                                {row.getIsExpanded() ? (
                                  <ArrowDown2 size="32" variant="Outline" />
                                ) : (
                                  <ArrowRight2 size="32" variant="Outline" />
                                )}
                              </IconButton>
                              <Box>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Box> <Box>({row.subRows.length})</Box>
                            </Stack>
                          ) : cell.getIsAggregated() ? (
                            flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())
                          ) : cell.getIsPlaceholder() ? null : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {paddingBottom > 0 && (
                <TableRow>
                  <TableCell sx={{ height: `${paddingBottom}px` }} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - GROUPING ||============================== //

export default function Grouping() {
  const data = makeData(100);

  const columns = useMemo(
    () => [
      {
        header: 'First Name',
        accessorKey: 'firstName',
        enableGrouping: false
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        enableGrouping: false
      },
      {
        header: 'Email',
        accessorKey: 'email',
        enableGrouping: false
      },
      {
        header: 'Age',
        accessorKey: 'age',
        meta: { className: 'cell-right' }
      },
      {
        header: 'Visits',
        accessorKey: 'visits',
        enableGrouping: false,
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
        cell: (cell) => <LinearWithLabel value={cell.getValue()} sx={{ minWidth: 75 }} />,
        enableGrouping: false
      }
    ],
    []
  );

  return <ReactTable {...{ data, columns }} />;
}

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array };
