import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import { matchPath, useLocation, useNavigate, Link } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';

// project-imports
import NavItem from './NavItem';
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import Transitions from 'components/@extended/Transitions';

import { MenuOrientation, ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import { useGetMenuMaster } from 'api/menu';

// assets
import { ArrowDown2, ArrowUp2, ArrowRight2, Copy } from 'iconsax-react';

// mini-menu - wrapper
const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: 'visible',
  zIndex: 1202,
  minWidth: 180,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 38,
    left: -5,
    width: 10,
    height: 10,
    backgroundColor: theme.palette.background.paper,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120
  }
}));

export default function NavCollapse({ menu, level, parentId, setSelectedItems, selectedItems, setSelectedLevel, selectedLevel }) {
  const theme = useTheme();
  const navigation = useNavigate();

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const { mode, menuOrientation } = useConfig();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [anchorElCollapse, setAnchorElCollapse] = useState(null);

  const openCollapse = Boolean(anchorElCollapse);
  const handleClickCollapse = (event) => {
    setAnchorElCollapse(event.currentTarget);
  };
  const handleCloseCollapse = () => {
    setAnchorElCollapse(null);
  };

  const handleClick = (event, isRedirect) => {
    setAnchorEl(null);
    setSelectedLevel(level);
    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
      setSelectedItems(!selected ? menu.id : '');
      if (menu.url && isRedirect) navigation(`${menu.url}`);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handlerIconLink = () => {
    if (!drawerOpen) {
      if (menu.url) navigation(`${menu.url}`);
      setSelected(menu.id);
    }
  };

  const handleHover = (event) => {
    setAnchorEl(event?.currentTarget);
    if (!drawerOpen) {
      setSelected(menu.id);
    }
  };

  const miniMenuOpened = Boolean(anchorEl);

  const handleClose = () => {
    setOpen(false);
    if (!miniMenuOpened && !menu.url) {
      setSelected(null);
    }
    setAnchorEl(null);
  };

  useMemo(() => {
    if (selected === selectedItems) {
      if (level === 1) {
        setOpen(true);
      }
    } else {
      if (level === selectedLevel) {
        setOpen(false);
        if ((!miniMenuOpened && !drawerOpen && !selected) || drawerOpen) {
          setSelected(null);
        }
      }
    }
  }, [selectedItems, level, selected, miniMenuOpened, drawerOpen, selectedLevel]);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === menu.url) {
      setSelected(menu.id);
    }
    // eslint-disable-next-line
  }, [pathname]);

  const checkOpenForParent = (child, id) => {
    child.forEach((item) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  // menu collapse for sub-levels
  useEffect(() => {
    setOpen(false);
    if (!miniMenuOpened) {
      setSelected(null);
    }
    if (miniMenuOpened) setAnchorEl(null);
    if (menu.children) {
      menu.children.forEach((item) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id);
        }

        if (item.link && !!matchPath({ path: item?.link, end: false }, pathname)) {
          setSelected(menu.id);
          setOpen(true);
        }

        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menu.children]);

  useEffect(() => {
    if (menu.url === pathname) {
      setSelected(menu.id);
      setAnchorEl(null);
      setOpen(true);
    }
  }, [pathname, menu]);

  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            menu={item}
            level={level + 1}
            parentId={parentId}
          />
        );
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Collapse or Item
          </Typography>
        );
    }
  });

  const isSelected = selected === menu.id;
  const borderIcon = level === 1 ? <Copy variant="Bulk" size={drawerOpen ? 22 : 24} /> : false;
  const Icon = menu.icon;
  const menuIcon = menu.icon ? <Icon variant="Bulk" size={drawerOpen ? 22 : 24} /> : borderIcon;
  const textColor = mode === ThemeMode.DARK ? theme.palette.secondary[400] : theme.palette.secondary.main;
  const iconSelectedColor = mode === ThemeMode.DARK && drawerOpen ? theme.palette.text.primary : theme.palette.primary.main;
  const popperId = miniMenuOpened ? `collapse-pop-${menu.id}` : undefined;
  const FlexBox = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' };

  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        <>
          <ListItemButton
            id={`${menu.id}-button`}
            selected={isSelected}
            {...(!drawerOpen && { onMouseEnter: (e) => handleClick(e, true), onMouseLeave: handleClose })}
            onClick={(e) => handleClick(e, true)}
            sx={{
              pl: drawerOpen ? `${level === 1 ? 20 : level * 20 - 10}px` : 1.5,
              py: !drawerOpen && level === 1 ? 1.25 : 1,
              ...(drawerOpen && {
                mx: 1.25,
                my: 0.5,
                borderRadius: 1,
                '&:hover': { bgcolor: mode === ThemeMode.DARK ? 'divider' : 'secondary.200' },
                '&.Mui-selected': { color: iconSelectedColor }
              }),
              ...(!drawerOpen && {
                px: 2.75,
                justifyContent: 'center',
                '&:hover': { bgcolor: 'transparent' },
                '&.Mui-selected': {
                  '&:hover': { bgcolor: 'transparent' },
                  bgcolor: 'transparent'
                }
              })
            }}
            {...(drawerOpen &&
              menu.isDropdown && {
                'aria-controls': openCollapse ? `${menu.id}-menu` : undefined,
                'aria-haspopup': true,
                'aria-expanded': openCollapse ? 'true' : undefined,
                onClick: handleClickCollapse
              })}
          >
            {menuIcon && (
              <ListItemIcon
                onClick={handlerIconLink}
                sx={{
                  minWidth: 38,
                  color: isSelected ? 'primary.main' : textColor,
                  ...(!drawerOpen && {
                    borderRadius: 1,
                    width: 46,
                    height: 46,
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': { bgcolor: mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.200' }
                  }),
                  ...(!drawerOpen &&
                    isSelected && {
                      bgcolor: mode === ThemeMode.DARK ? 'secondary.100' : 'primary.lighter',
                      '&:hover': { bgcolor: mode === ThemeMode.DARK ? 'secondary.200' : 'primary.lighter' }
                    })
                }}
              >
                {menuIcon}
              </ListItemIcon>
            )}

            {!menuIcon && drawerOpen && (
              <ListItemIcon sx={{ minWidth: 30 }}>
                <Dot size={isSelected ? 6 : 5} color={isSelected ? 'primary' : 'secondary'} />
              </ListItemIcon>
            )}

            {(drawerOpen || (!drawerOpen && level !== 1)) && (
              <ListItemText
                primary={
                  <Typography variant="h6" color={isSelected ? 'primary' : textColor} sx={{ fontWeight: isSelected ? 500 : 400 }}>
                    {menu.title}
                  </Typography>
                }
                secondary={
                  menu.caption && (
                    <Typography variant="caption" color="secondary">
                      {menu.caption}
                    </Typography>
                  )
                }
              />
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) &&
              (menu?.url ? (
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClick(event, false);
                  }}
                  color="secondary"
                  variant="outlined"
                  sx={{
                    width: 20,
                    height: 20,
                    mr: '-5px !important',
                    p: 0.25,
                    color: 'secondary.dark',
                    borderColor: open ? 'primary.light' : 'secondary.light',
                    '&:hover': { borderColor: open ? 'primary.main' : 'secondary.main' }
                  }}
                >
                  {miniMenuOpened || open ? (
                    <>
                      {miniMenuOpened ? (
                        <ArrowRight2 size={12} color={textColor} style={{ marginLeft: 1 }} />
                      ) : (
                        <ArrowUp2 size={12} color={textColor} style={{ marginLeft: 1 }} />
                      )}
                    </>
                  ) : (
                    <ArrowDown2 size={12} color={textColor} style={{ marginLeft: 1 }} />
                  )}
                </IconButton>
              ) : (
                <>
                  {miniMenuOpened || open ? (
                    <>
                      {miniMenuOpened ? (
                        <ArrowRight2 size={12} color={textColor} style={{ marginLeft: 1 }} />
                      ) : (
                        <ArrowUp2 size={12} color={textColor} style={{ marginLeft: 1 }} />
                      )}
                    </>
                  ) : (
                    <ArrowDown2 size={12} color={textColor} style={{ marginLeft: 1 }} />
                  )}
                </>
              ))}

            {!drawerOpen && (
              <PopperStyled
                open={miniMenuOpened}
                anchorEl={anchorEl}
                placement="right-start"
                style={{ zIndex: 2001 }}
                popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [-12, 1] } }] }}
              >
                {({ TransitionProps }) => (
                  <Transitions in={miniMenuOpened} {...TransitionProps}>
                    <Paper
                      sx={{
                        overflow: 'hidden',
                        mt: 1.5,
                        boxShadow: theme.customShadows.z1,
                        backgroundImage: 'none',
                        border: '1px solid ',
                        borderColor: 'divider'
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <>
                          <SimpleBar
                            sx={{
                              overflowX: 'hidden',
                              overflowY: 'auto',
                              maxHeight: 'calc(100vh - 170px)'
                            }}
                          >
                            {navCollapse}
                          </SimpleBar>
                        </>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </PopperStyled>
            )}
          </ListItemButton>
          {drawerOpen && !menu?.isDropdown && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List sx={{ p: 0 }}>{navCollapse}</List>
            </Collapse>
          )}
          {drawerOpen && menu?.isDropdown && (
            <Menu
              id={`${menu.id}-menu`}
              aria-labelledby={`${menu.id}-button`}
              anchorEl={anchorElCollapse}
              open={openCollapse}
              onClose={handleCloseCollapse}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{ '& .MuiPaper-root': { boxShadow: theme.shadows[2] } }}
            >
              {navCollapse}
            </Menu>
          )}
        </>
      ) : (
        <>
          <ListItemButton
            {...(menu?.url && { component: Link, to: menu.url })}
            id={`boundary-${popperId}`}
            selected={isSelected}
            onMouseEnter={handleHover}
            onMouseLeave={handleClose}
            onClick={handleHover}
            aria-describedby={popperId}
            sx={{
              '&:hover': {
                bgcolor: 'transparent'
              },
              '&.Mui-selected': {
                '&:hover': {
                  bgcolor: 'transparent'
                },
                bgcolor: 'transparent'
              }
            }}
          >
            <Box onClick={handlerIconLink} sx={FlexBox}>
              {menuIcon && (
                <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36, color: 'secondary.dark' }}>{menuIcon}</ListItemIcon>
              )}
              <ListItemText
                primary={
                  <Typography variant="h6" color={textColor} sx={{ fontWeight: isSelected ? 500 : 400 }}>
                    {menu.title}
                  </Typography>
                }
              />
              {miniMenuOpened ? <ArrowRight2 size={12} color={textColor} /> : <ArrowDown2 size={12} color={textColor} />}
            </Box>

            {anchorEl && (
              <PopperStyled
                id={popperId}
                open={miniMenuOpened}
                anchorEl={anchorEl}
                placement="right-start"
                style={{ zIndex: 2001 }}
                modifiers={[{ name: 'offset', options: { offset: [-10, 0] } }]}
              >
                {({ TransitionProps }) => (
                  <Transitions in={miniMenuOpened} {...TransitionProps}>
                    <Paper
                      sx={{
                        overflow: 'hidden',
                        mt: 1.5,
                        py: 0.5,
                        boxShadow: theme.customShadows.z1,
                        border: '1px solid ',
                        borderColor: 'divider',
                        backgroundImage: 'none'
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <>
                          <SimpleBar
                            sx={{
                              overflowX: 'hidden',
                              overflowY: 'auto',
                              maxHeight: 'calc(100vh - 170px)'
                            }}
                          >
                            {navCollapse}
                          </SimpleBar>
                        </>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </PopperStyled>
            )}
          </ListItemButton>
        </>
      )}
    </>
  );
}

NavCollapse.propTypes = {
  menu: PropTypes.any,
  level: PropTypes.number,
  parentId: PropTypes.string,
  setSelectedItems: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  selectedItems: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  setSelectedLevel: PropTypes.func,
  selectedLevel: PropTypes.number
};
