import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// third-party
import { Draggable } from '@hello-pangea/dnd';

// project-imports
import EditStory from '../Backlogs/EditStory';
import AlertItemDelete from './AlertItemDelete';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';

import { openSnackbar } from 'api/snackbar';
import { deleteItem, handlerKanbanDialog, useGetBacklogs } from 'api/kanban';
import { ImagePath, getImageUrl } from 'utils/getImageUrl';

// assets
import { Hierarchy } from 'iconsax-react';

// item drag wrapper
function getDragWrapper(isDragging, draggableStyle, theme, radius) {
  const bgcolor = alpha(theme.palette.background.paper, 0.99);
  return {
    userSelect: 'none',
    margin: `0 0 ${8}px 0`,
    padding: 16,
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: isDragging ? bgcolor : theme.palette.background.paper,
    borderRadius: radius,
    ...draggableStyle
  };
}

// ==============================|| KANBAN BOARD - ITEMS ||============================== //

export default function Items({ item, index }) {
  const theme = useTheme();
  const { backlogs } = useGetBacklogs();

  const backProfile = !!item.image;
  const itemStory = backlogs?.userStory.filter((story) => story?.itemIds?.filter((itemId) => itemId === item.id)[0])[0];

  const handlerDetails = (id) => {
    handlerKanbanDialog(id);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);
  const handleModalClose = (status) => {
    setOpen(false);
    if (status) {
      deleteItem(item.id);
      openSnackbar({
        open: true,
        message: 'Task Deleted successfully',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',

        alert: {
          color: 'success'
        }
      });
    }
  };

  const [openStoryDrawer, setOpenStoryDrawer] = useState(false);
  const handleStoryDrawerOpen = () => {
    setOpenStoryDrawer((prevState) => !prevState);
  };

  const editStory = () => {
    setOpenStoryDrawer((prevState) => !prevState);
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getDragWrapper(snapshot.isDragging, provided.draggableProps.style, theme, `12px`)}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: itemStory ? -0.75 : 0 }}>
            <Typography
              onClick={() => handlerDetails(item.id)}
              variant="subtitle1"
              sx={{
                display: 'inline-block',
                width: 'calc(100% - 34px)',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                verticalAlign: 'middle',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {item.title}
            </Typography>

            <IconButton size="small" color="secondary" onClick={handleClick} aria-controls="menu-comment" aria-haspopup="true">
              <MoreIcon />
            </IconButton>
            <Menu
              id="menu-comment"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              variant="selectedMenu"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  handlerDetails(item.id);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setOpen(true);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
            <AlertItemDelete title={item.title} open={open} handleClose={handleModalClose} />
          </Stack>
          {itemStory && (
            <>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Tooltip title="User Story">
                  <Hierarchy size={16} style={{ color: theme.palette.primary.dark }} />
                </Tooltip>
                <Tooltip title={itemStory.title}>
                  <Link variant="caption" color="primary.dark" underline="hover" onClick={editStory} sx={{ cursor: 'pointer', pt: 0.5 }}>
                    User Story #{itemStory.id}
                  </Link>
                </Tooltip>
              </Stack>
              <EditStory story={itemStory} open={openStoryDrawer} handleDrawerOpen={handleStoryDrawerOpen} />
            </>
          )}
          {backProfile && (
            <CardMedia
              component="img"
              image={getImageUrl(`${item.image}`, ImagePath.PROFILE)}
              sx={{ width: '100%', borderRadius: 1, mt: 1.5 }}
              title="Slider5 image"
            />
          )}
        </div>
      )}
    </Draggable>
  );
}

Items.propTypes = { item: PropTypes.any, index: PropTypes.number };
