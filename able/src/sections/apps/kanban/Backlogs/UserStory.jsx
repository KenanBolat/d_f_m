import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

// third-party
import { format } from 'date-fns';
import { Droppable, Draggable } from '@hello-pangea/dnd';

// project-imports
import Items from './Items';
import AddItem from './AddItem';
import EditStory from './EditStory';
import AlertStoryDelete from './AlertStoryDelete';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';

import { ThemeMode } from 'config';
import { deleteStory, useGetBacklogs } from 'api/kanban';
import { openSnackbar } from 'api/snackbar';

// assets
import { AddSquare, ArrowDown2, ArrowRight2, Hierarchy } from 'iconsax-react';

// drag wrapper
const getDragWrapper = (isDragging, theme, open) => {
  let bgcolor = 'transparent';
  if (open) {
    bgcolor = theme.palette.mode === ThemeMode.DARK ? theme.palette.background.default : theme.palette.secondary.lighter;
  }

  if (isDragging) {
    bgcolor = theme.palette.mode === ThemeMode.DARK ? theme.palette.background.default : theme.palette.primary.lighter;
  }

  return { backgroundColor: bgcolor, userSelect: 'none' };
};

// drop wrapper
const getDropWrapper = () => {
  return { background: 'transparent' };
};

// ==============================|| KANBAN BACKLOGS - USER STORY ||============================== //

export default function UserStory({ story, index }) {
  const theme = useTheme();
  const { backlogs } = useGetBacklogs();

  const [open, setOpen] = useState(index === 0);

  const storyColumn = backlogs?.columns.filter((column) => column.id === story.columnId)[0];
  const storyProfile = backlogs?.profiles.filter((profile) => profile.id === story.assign)[0];

  // drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const addItem = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const [openStoryDrawer, setOpenStoryDrawer] = useState(false);
  const handleStoryDrawerOpen = () => {
    setOpenStoryDrawer((prevState) => !prevState);
  };

  const editStory = () => {
    setOpenStoryDrawer((prevState) => !prevState);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleModalClose = (status) => {
    setOpenModal(false);
    if (status) {
      deleteStory(story.id);
      openSnackbar({
        open: true,
        message: 'Task Deleted successfully',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: { color: 'success' }
      });
    }
  };

  return (
    <>
      <Draggable draggableId={story.id} index={index}>
        {(provided, snapshot) => (
          <>
            <TableRow
              hover
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              sx={{
                ...getDragWrapper(snapshot.isDragging, theme, open),
                ...(!open && { '& .MuiTableCell-root': { border: 'none' } })
              }}
            >
              <TableCell sx={{ pl: 3, minWidth: 120, width: 120, height: 46 }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Tooltip title="Add Task">
                    <IconButton aria-label="expand row" onClick={addItem} size="small" sx={{ fontSize: '1.15rem' }}>
                      <AddSquare color={theme.palette.primary.main} />
                    </IconButton>
                  </Tooltip>
                  <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} color="secondary">
                    {open ? <ArrowDown2 /> : <ArrowRight2 />}
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell sx={{ width: 110, minWidth: 110 }}>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <Hierarchy size={16} style={{ color: theme.palette.primary.main, marginTop: -2 }} />
                  <Typography variant="subtitle2">{story.id}</Typography>
                </Stack>
              </TableCell>
              <TableCell sx={{ maxWidth: 'calc(100vw - 850px)', minWidth: 140 }} component="th" scope="row">
                <Link
                  underline="hover"
                  color="default"
                  onClick={editStory}
                  sx={{
                    overflow: 'hidden',
                    display: 'block',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    ':hover': { color: 'primary.main' },
                    cursor: 'pointer'
                  }}
                >
                  {story.title}
                </Link>
              </TableCell>
              <TableCell sx={{ width: 60, minWidth: 60 }}>
                <IconButton
                  size="small"
                  aria-controls="menu-comment"
                  onClick={handleClick}
                  aria-haspopup="true"
                  color="secondary"
                  sx={{ color: 'text.secondary' }}
                >
                  <MoreIcon />
                </IconButton>
                <Menu
                  id="menu-comment"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  variant="selectedMenu"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      editStory();
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setOpenModal(true);
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
                <AlertStoryDelete title={story.title} open={openModal} handleClose={handleModalClose} />
              </TableCell>
              <TableCell sx={{ width: 90, minWidth: 90 }}>{storyColumn ? storyColumn.title : ''}</TableCell>
              <TableCell sx={{ width: 140, minWidth: 140 }}>{storyProfile ? storyProfile.name : ''}</TableCell>
              <TableCell sx={{ width: 85, minWidth: 85, textTransform: 'capitalize' }}>{story.priority}</TableCell>
              <TableCell sx={{ width: 120, minWidth: 120 }}>{story.dueDate ? format(new Date(story.dueDate), 'd MMM yyyy') : ''}</TableCell>
            </TableRow>

            <Droppable droppableId={story.id} type="item">
              {(providedDrop) => (
                <TableRow ref={providedDrop.innerRef} {...providedDrop.droppableProps} sx={getDropWrapper()}>
                  <TableCell sx={{ padding: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      {open && (
                        <Box sx={{ margin: 0 }}>
                          <TableContainer>
                            <Table size="small" aria-label="purchases">
                              <TableBody>
                                {story.itemIds?.map((itemId, i) => (
                                  <Items key={itemId} itemId={itemId} index={i} />
                                ))}
                                {providedDrop.placeholder}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      )}
                    </Collapse>
                  </TableCell>
                </TableRow>
              )}
            </Droppable>
          </>
        )}
      </Draggable>
      <EditStory story={story} open={openStoryDrawer} handleDrawerOpen={handleStoryDrawerOpen} />
      <AddItem open={openDrawer} handleDrawerOpen={handleDrawerOpen} storyId={story.id} />
    </>
  );
}

UserStory.propTypes = { story: PropTypes.any, index: PropTypes.number };
