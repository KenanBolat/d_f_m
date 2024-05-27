// material-ui
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

// project-imports
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';

// assets
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';

// ===========================|| DATA WIDGET - TOTAL REVENUE ||=========================== //

export default function TotalRevenue() {
  const theme = useTheme();

  const successSX = { color: theme.palette.success.main };
  const errorSX = { color: theme.palette.error.main };

  return (
    <MainCard title="Total Revenue" content={false}>
      <SimpleBar sx={{ height: 334 }}>
        <List
          disablePadding
          component="nav"
          aria-label="main mailbox folders"
          sx={{
            '& .MuiListItemButton-root': { borderRadius: 0, my: 0, py: 1.5 },
            '& .MuiListItemText-root': { color: 'text.primary' },
            '& svg': { mr: { xs: 1, sm: 4, md: 8, lg: 12 } }
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ArrowUp2 variant="Bold" size={20} style={successSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Bitcoin</span>
                  <Typography variant="subtitle1" sx={successSX}>
                    + $145.85
                  </Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDown2 variant="Bold" size={20} style={errorSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Ethereum</span>
                  <Typography variant="subtitle1" sx={errorSX}>
                    - $6.368
                  </Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowUp2 variant="Bold" size={20} style={successSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Ripple</span>
                  <Typography variant="subtitle1" sx={successSX}>
                    + $458.63
                  </Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDown2 variant="Bold" size={20} style={errorSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Neo</span>
                  <Typography variant="subtitle1" sx={errorSX}>
                    - $5.631
                  </Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDown2 variant="Bold" size={20} style={errorSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Ethereum</span>
                  <Typography variant="subtitle1" sx={errorSX}>
                    - $6.368
                  </Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowUp2 variant="Bold" size={20} style={successSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Ripple</span>
                  <Typography variant="subtitle1" sx={successSX}>
                    + $458.63
                  </Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDown2 variant="Bold" size={20} style={errorSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Neo</span>
                  <Typography variant="subtitle1" sx={errorSX}>
                    - $5.631
                  </Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDown2 variant="Bold" size={20} style={errorSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Ethereum</span>
                  <Typography variant="subtitle1" sx={errorSX}>
                    - $6.368
                  </Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowUp2 variant="Bold" size={20} style={successSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Ripple</span>
                  <Typography variant="subtitle1" sx={successSX}>
                    + $458.63
                  </Typography>
                </Stack>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <ArrowDown2 variant="Bold" size={20} style={errorSX} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <span>Neo</span>
                  <Typography variant="subtitle1" sx={errorSX}>
                    - $5.631
                  </Typography>
                </Stack>
              }
            />
          </ListItemButton>
        </List>
      </SimpleBar>
    </MainCard>
  );
}
