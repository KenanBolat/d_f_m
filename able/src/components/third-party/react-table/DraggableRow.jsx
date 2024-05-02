import PropTypes from 'prop-types';

// material-ui
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// third-party
import { useDrag, useDrop } from 'react-dnd';

// project-import
import IconButton from 'components/@extended/IconButton';

// assets
import { HambergerMenu } from 'iconsax-react';

// ==============================|| DRAGGABLE ROW ||============================== //

export default function DraggableRow({ row, reorderRow, children }) {
  const [{ isOverCurrent }, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow) => reorderRow(draggedRow.index, row.index),
    collect: (monitor) => ({ isOver: monitor.isOver(), isOverCurrent: monitor.isOver({ shallow: true }) })
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    item: () => row,
    type: 'row'
  });

  return (
    <TableRow
      //previewRef could go here
      ref={previewRef}
      sx={{ opacity: isDragging ? 0.5 : 1, bgcolor: isOverCurrent ? 'primary.lighter' : 'inherit' }}
    >
      <TableCell ref={dropRef}>
        <IconButton
          ref={dragRef}
          size="small"
          sx={{ p: 0, width: 24, height: 24, fontSize: '1rem', mr: 0.75 }}
          color="secondary"
          disabled={row.getIsGrouped()}
        >
          <HambergerMenu size="32" variant="Outline" />
        </IconButton>
      </TableCell>
      {children}
    </TableRow>
  );
}

DraggableRow.propTypes = { row: PropTypes.object, reorderRow: PropTypes.func, children: PropTypes.node };
