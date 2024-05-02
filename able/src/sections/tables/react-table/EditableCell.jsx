import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// third-party
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

// project-imports
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import { CSVExport, CellEditable } from 'components/third-party/react-table';

import makeData from 'data/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, setData }) {
  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      cell: CellEditable
    },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value
              };
            }
            return row;
          })
        );
      }
    },
    debugTable: true
  });

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
      content={false}
      title="Editable Cell"
      secondary={
        <CSVExport {...{ data: table.getRowModel().flatRows.map((row) => row.original), headers, filename: 'editable-cell.csv' }} />
      }
    >
      <ScrollX>
        <TableContainer>
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
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - EDITABLE CELL ||============================== //

export default function EditableCell() {
  const [data, setData] = useState(() => makeData(10));

  const columns = useMemo(
    () => [
      {
        header: 'First Name',
        accessorKey: 'firstName',
        dataType: 'text'
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        dataType: 'text'
      },
      {
        header: 'Email',
        accessorKey: 'email',
        dataType: 'text'
      },
      {
        header: 'Age',
        accessorKey: 'age',
        dataType: 'text',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Visits',
        accessorKey: 'visits',
        dataType: 'text',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        dataType: 'select'
      },
      {
        header: 'Profile Progress',
        accessorKey: 'progress',
        dataType: 'progress'
      }
    ],
    []
  );

  return <ReactTable {...{ data, columns, setData }} />;
}

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array, setData: PropTypes.any };
