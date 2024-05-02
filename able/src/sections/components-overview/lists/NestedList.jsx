import { useState } from 'react';

// material-ui
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { ArrowDown2, ArrowUp2, Element, Grid5, Setting3 } from 'iconsax-react';

// ==============================|| LIST - NESTED ||============================== //

export default function NestedList() {
  const [open, setOpen] = useState('sample');
  const [openChild, setOpenChild] = useState('');

  const handleClick = (page) => {
    setOpen(open !== page ? page : '');
    setOpenChild('');
  };

  const handleChildClick = (page) => {
    setOpenChild(openChild !== page ? page : '');
  };

  const nestedListCodeString = `<List sx={{ p: 0 }}>
  <ListItem disablePadding divider>
    <ListItemButton onClick={() => handleClick('sample')}>
      <ListItemIcon>
        <Grid5 />
      </ListItemIcon>
      <ListItemText primary="Sample" />
      {open === 'sample' ? <ArrowDown2 style={{ fontSize: '0.75rem' }} /> : <ArrowUp2 style={{ fontSize: '0.75rem' }} />}
    </ListItemButton>
  </ListItem>
  <Collapse in={open === 'sample'} timeout="auto" unmountOnExit>
    <List disablePadding sx={{ bgcolor: 'secondary.100' }}>
      <ListItemButton sx={{ pl: 5 }}>
        <ListItemText primary="List item 01" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 5 }} onClick={() => handleChildClick('list1')}>
        <ListItemText primary="List item 02" />
        {openChild === 'list1' ? <ArrowDown2 style={{ fontSize: '0.75rem' }} /> : <ArrowUp2 style={{ fontSize: '0.75rem' }} />}
      </ListItemButton>
      <Collapse in={openChild === 'list1'} timeout="auto" unmountOnExit>
        <List disablePadding sx={{ bgcolor: 'secondary.lighter' }}>
          <ListItemButton sx={{ pl: 7 }}>
            <ListItemText primary="List item 05" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 7 }}>
            <ListItemText primary="List item 06" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  </Collapse>
  <ListItem disablePadding divider>
    <ListItemButton onClick={() => handleClick('settings')}>
      <ListItemIcon>
        <Setting3 />
      </ListItemIcon>
      <ListItemText primary="Settings" />
      {open === 'settings' ? <ArrowDown2 style={{ fontSize: '0.75rem' }} /> : <ArrowUp2 style={{ fontSize: '0.75rem' }} />}
    </ListItemButton>
  </ListItem>
  <Collapse in={open === 'settings'} timeout="auto" unmountOnExit>
    <List disablePadding sx={{ bgcolor: 'secondary.100' }}>
      <ListItemButton sx={{ pl: 5 }}>
        <ListItemText primary="List item 03" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 5 }}>
        <ListItemText primary="List item 04" />
      </ListItemButton>
    </List>
  </Collapse>
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemIcon>
        <Element />
      </ListItemIcon>
      <ListItemText primary="UI Elements" />
    </ListItemButton>
  </ListItem>
</List>`;

  return (
    <MainCard content={false} codeString={nestedListCodeString}>
      <List sx={{ p: 0, '& .MuiListItemButton-root': { borderRadius: 0, my: 0 } }}>
        <ListItem disablePadding divider>
          <ListItemButton onClick={() => handleClick('sample')}>
            <ListItemIcon>
              <Grid5 size={18} />
            </ListItemIcon>
            <ListItemText primary="Sample" />
            {open === 'sample' ? <ArrowDown2 size={14} /> : <ArrowUp2 size={14} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open === 'sample'} timeout="auto" unmountOnExit>
          <List disablePadding sx={{ bgcolor: 'secondary.100' }}>
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemText primary="List item 01" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 5 }} onClick={() => handleChildClick('list1')}>
              <ListItemText primary="List item 02" />
              {openChild === 'list1' ? <ArrowDown2 size={14} /> : <ArrowUp2 size={14} />}
            </ListItemButton>
            <Collapse in={openChild === 'list1'} timeout="auto" unmountOnExit>
              <List disablePadding sx={{ bgcolor: 'secondary.lighter' }}>
                <ListItemButton sx={{ pl: 7 }}>
                  <ListItemText primary="List item 05" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 7 }}>
                  <ListItemText primary="List item 06" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Collapse>
        <ListItem disablePadding divider>
          <ListItemButton onClick={() => handleClick('settings')}>
            <ListItemIcon>
              <Setting3 size={18} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {open === 'settings' ? <ArrowDown2 size={14} /> : <ArrowUp2 size={14} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open === 'settings'} timeout="auto" unmountOnExit>
          <List disablePadding sx={{ bgcolor: 'secondary.100' }}>
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemText primary="List item 03" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 5 }}>
              <ListItemText primary="List item 04" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Element size={18} />
            </ListItemIcon>
            <ListItemText primary="UI Elements" />
          </ListItemButton>
        </ListItem>
      </List>
    </MainCard>
  );
}
