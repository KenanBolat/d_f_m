import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// third-party
import { getIn } from 'formik';

// project-imports
import InvoiceField from './InvoiceField';
import AlertProductDelete from './AlertProductDelete';

import { ThemeMode } from 'config';
import { useGetInvoiceMaster } from 'api/invoice';
import { openSnackbar } from 'api/snackbar';

// assets
import { Trash } from 'iconsax-react';

// ==============================|| INVOICE - ITEMS ||============================== //

export default function InvoiceItem({ id, name, description, qty, price, onDeleteItem, onEditItem, index, Blur, errors, touched }) {
  const { invoiceMaster } = useGetInvoiceMaster();
  const theme = useTheme();
  const mode = theme.palette.mode;

  const [open, setOpen] = useState(false);
  const handleModalClose = (status) => {
    setOpen(false);
    if (status) {
      onDeleteItem(index);
      openSnackbar({
        open: true,
        message: 'Product Deleted successfully',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: { color: 'success' }
      });
    }
  };

  const Name = `invoice_detail[${index}].name`;
  const touchedName = getIn(touched, Name);
  const errorName = getIn(errors, Name);

  const textFieldItem = [
    {
      placeholder: 'Item name',
      label: 'Item Name',
      name: `invoice_detail.${index}.name`,
      type: 'text',
      id: id + '_name',
      value: name,
      errors: errorName,
      touched: touchedName
    },
    {
      placeholder: 'Description',
      label: 'Description',
      name: `invoice_detail.${index}.description`,
      type: 'text',
      id: id + '_description',
      value: description
    },
    { placeholder: '', label: 'Qty', type: 'number', name: `invoice_detail.${index}.qty`, id: id + '_qty', value: qty },
    { placeholder: '', label: 'price', type: 'number', name: `invoice_detail.${index}.price`, id: id + '_price', value: price }
  ];

  return (
    <>
      {textFieldItem.map((item) => {
        return (
          <InvoiceField
            onEditItem={(event) => onEditItem(event)}
            onBlur={(event) => Blur(event)}
            cellData={{
              placeholder: item.placeholder,
              name: item.name,
              type: item.type,
              id: item.id,
              value: item.value,
              errors: item.errors,
              touched: item.touched
            }}
            key={item.label}
          />
        );
      })}
      <TableCell>
        <Stack direction="column" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
          <Box sx={{ pl: 2 }}>
            {invoiceMaster === undefined ? (
              <Skeleton width={520} height={16} />
            ) : (
              <Typography>{invoiceMaster.country?.prefix + '' + (price * qty).toFixed(2)}</Typography>
            )}
          </Box>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Tooltip
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                opacity: 0.9
              }
            }
          }}
          title="Remove Item"
        >
          <Button color="error" onClick={() => setOpen(true)}>
            <Trash />
          </Button>
        </Tooltip>
      </TableCell>
      <AlertProductDelete title={name} open={open} handleClose={handleModalClose} />
    </>
  );
}

InvoiceItem.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  description: PropTypes.any,
  qty: PropTypes.any,
  price: PropTypes.any,
  onDeleteItem: PropTypes.any,
  onEditItem: PropTypes.any,
  index: PropTypes.any,
  Blur: PropTypes.any,
  errors: PropTypes.any,
  touched: PropTypes.any
};
