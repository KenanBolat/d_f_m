import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';

// project-imports
import MainCard from 'components/MainCard';
import ComponentHeader from 'components/cards/ComponentHeader';
import Avatar from 'components/@extended/Avatar';
import ComponentWrapper from 'sections/components-overview/ComponentWrapper';
import ComponentSkeleton from 'sections/components-overview/ComponentSkeleton';

// assets
import { Add, Coin, InfoCircle, Profile, Setting2, Sms, TickCircle, Trash, Warning2 } from 'iconsax-react';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';
import avatar6 from 'assets/images/users/avatar-6.png';
import avatar7 from 'assets/images/users/avatar-7.png';
import avatar8 from 'assets/images/users/avatar-8.png';
import avatar9 from 'assets/images/users/avatar-9.png';
import avatar10 from 'assets/images/users/avatar-10.png';

import vector1 from 'assets/images/users/vector-1.png';
import vector2 from 'assets/images/users/vector-2.png';
import vector3 from 'assets/images/users/vector-3.png';
import vector4 from 'assets/images/users/vector-4.png';

// ==============================|| COMPONENTS - AVATAR ||============================== //

export default function ComponentAvatar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const basicAvatarCodeString = `<Avatar alt="Basic"><Profile variant="Bold" /></Avatar>`;

  const imageAvatarCodeString = `<Avatar alt="Avatar 1" src={('/assets/images/users/avatar-1.png')} />
<Avatar alt="Avatar 2" src={('/assets/images/users/avatar-2.png')} />
<Avatar alt="Avatar 3" src={('/assets/images/users/avatar-3.png')} />
<Avatar alt="Avatar 4" src={('/assets/images/users/avatar-4.png')} />`;

  const vectorAvatarCodeString = `<Avatar><img alt="Natacha" src={('/assets/images/users/vector-1.png')} height={40} /></Avatar>
<Avatar><img alt="Natacha" src={('/assets/images/users/vector-2.png')} height={40} /></Avatar>
<Avatar><img alt="Natacha" src={('/assets/images/users/vector-3.png')} height={40} /></Avatar>
<Avatar><img alt="Natacha" src={('/assets/images/users/vector-4.png')} height={40} /></Avatar>`;

  const letterAvatarCodeString = `<Avatar alt="Natacha" size="sm">U</Avatar>
<Avatar color="error" alt="Natacha" size="sm">UI</Avatar>
<Avatar color="error" type="filled" alt="Natacha" size="sm">A</Avatar>`;

  const variantsAvatarCodeString = `<Avatar alt="Natacha"><Profile variant="Bold" /></Avatar>
<Avatar alt="Natacha" variant="rounded" type="combined" variant="Bold"><Profile /></Avatar>
<Avatar alt="Natacha" variant="square" type="filled"><Profile /></Avatar>
<Avatar alt="Natacha">U</Avatar>
<Avatar alt="Natacha" variant="rounded" type="combined">U</Avatar>
<Avatar alt="Natacha" variant="square" type="filled">U</Avatar>`;

  const outlinedAvatarCodeString = `<Avatar alt="Natacha" type="outlined"><Profile variant="Bold" /></Avatar>
<Avatar alt="Natacha" variant="rounded" type="outlined"><Profile variant="Bold" /></Avatar>
<Avatar alt="Natacha" variant="square" type="outlined"><Profile variant="Bold" /></Avatar>
<Avatar alt="Natacha" type="outlined">U</Avatar>
<Avatar alt="Natacha" variant="rounded" type="outlined">U</Avatar>
<Avatar alt="Natacha" variant="square" type="outlined">U</Avatar>`;

  const iconAvatarCodeString = `<Avatar alt="Natacha" size="sm" type="filled"><Profile /></Avatar>
<Avatar alt="Natacha" size="sm" type="filled" color="success"><SearchZoomIn /></Avatar>
<Avatar alt="Natacha" size="sm" type="filled" color="error"><SearchZoomOut1 /></Avatar>
<Avatar alt="Natacha" size="sm"><Add /></Avatar>`;

  const groupAvatarCodeString = `<AvatarGroup max={4}>
  <Avatar alt="Trevor Henderson" src={('/assets/images/users/avatar-5.png')} />
  <Avatar alt="Jone Doe" src={('/assets/images/users/avatar-6.png')} />
  <Avatar alt="Lein Ket" src={('/assets/images/users/avatar-7.png')} />
  <Avatar alt="Stebin Ben" src={('/assets/images/users/avatar-8.png')} />
  <Avatar alt="Wungh Tend" src={('/assets/images/users/avatar-9.png')} />
  <Avatar alt="Trevor Das" src={('/assets/images/users/avatar-10.png')} />
</AvatarGroup>
<Box sx={{ width: 186 }}>
  <Tooltip
    open={show}
    placement="top-end"
    title={
      <AvatarGroup max={10}>
        <Avatar alt="Trevor Henderson" src={('/assets/images/users/avatar-5.png')} />
        <Avatar alt="Jone Doe" src={('/assets/images/users/avatar-6.png')} />
        <Avatar alt="Lein Ket" src={('/assets/images/users/avatar-7.png')} />
        <Avatar alt="Stebin Ben" src={('/assets/images/users/avatar-8.png')} />
        <Avatar alt="Wungh Tend" src={('/assets/images/users/avatar-9.png')} />
        <Avatar alt="Trevor Das" src={('/assets/images/users/avatar-10.png')} />
      </AvatarGroup>
    }
  >
    <AvatarGroup
      sx={{ '& .MuiAvatarGroup-avatar': { bgcolor: 'primary.main', cursor: 'pointer' } }}
      componentsProps={{
        additionalAvatar: {
          onMouseEnter: () => {
            setShow(true);
          },
          onMouseLeave: () => {
            setShow(false);
          }
        }
      }}
    >
      <Avatar alt="Remy Sharp" src={('/assets/images/users/avatar-1.png')} />
      <Avatar alt="Travis Howard" src={('/assets/images/users/avatar-2.png')} />
      <Avatar alt="Cindy Baker" src={('/assets/images/users/avatar-3.png')} />
      <Avatar alt="Agnes Walker" src={('/assets/images/users/avatar-4.png')} />
      <Avatar alt="Trevor Henderson" src={('/assets/images/users/avatar-5.png')} />
      <Avatar alt="Jone Doe" src={('/assets/images/users/avatar-6.png')} />
      <Avatar alt="Lein Ket" src={('/assets/images/users/avatar-7.png')} />
      <Avatar alt="Stebin Ben" src={('/assets/images/users/avatar-8.png')} />
      <Avatar alt="Wungh Tend" src={('/assets/images/users/avatar-9.png')} />
      <Avatar alt="Trevor Das" src={('/assets/images/users/avatar-10.png')} />
    </AvatarGroup>
  </Tooltip>
</Box>
<Box sx={{ width: 222 }}>
  <Tooltip
    open={open}
    placement="top-end"
    title={
      <AvatarGroup max={10}>
        <Avatar alt="Jone Doe" src={('/assets/images/users/avatar-6.png')} />
        <Avatar alt="Lein Ket" src={('/assets/images/users/avatar-7.png')} />
        <Avatar alt="Stebin Ben" src={('/assets/images/users/avatar-8.png')} />
        <Avatar alt="Wungh Tend" src={('/assets/images/users/avatar-9.png')} />
        <Avatar alt="Trevor Das" src={('/assets/images/users/avatar-10.png')} />
      </AvatarGroup>
    }
  >
    <AvatarGroup
      max={6}
      sx={{ '& .MuiAvatarGroup-avatar': { bgcolor: 'primary.main', cursor: 'pointer' } }}
      componentsProps={{
        additionalAvatar: {
          onClick: () => {
            setOpen(!open);
          }
        }
      }}
    >
      <Avatar alt="Remy Sharp" src={('/assets/images/users/avatar-1.png')} />
      <Avatar alt="Travis Howard" src={('/assets/images/users/avatar-2.png')} />
      <Avatar alt="Cindy Baker" src={('/assets/images/users/avatar-3.png')} />
      <Avatar alt="Agnes Walker" src={('/assets/images/users/avatar-4.png')} />
      <Avatar alt="Trevor Henderson" src={('/assets/images/users/avatar-5.png')} />
      <Avatar alt="Jone Doe" src={('/assets/images/users/avatar-6.png')} />
      <Avatar alt="Lein Ket" src={('/assets/images/users/avatar-7.png')} />
      <Avatar alt="Stebin Ben" src={('/assets/images/users/avatar-8.png')} />
      <Avatar alt="Wungh Tend" src={('/assets/images/users/avatar-9.png')} />
      <Avatar alt="Trevor Das" src={('/assets/images/users/avatar-10.png')} />
    </AvatarGroup>
  </Tooltip>
</Box>`;

  const badgeAvatarCodeString = `<Badge badgeContent={4} color="error" overlap="circular">
  <Avatar alt="Natacha" type="filled" src={('/assets/images/users/avatar-6.png')} />
</Badge>
<Badge color="error" overlap="circular" variant="dot">
  <Avatar alt="Natacha" color="secondary" type="filled">
    <Profile />
  </Avatar>
</Badge>
<Badge color="error" overlap="circular" variant="dot">
  <Avatar alt="Natacha" type="filled" src={('/assets/images/users/avatar-2.png')} />
</Badge>
<Badge color="error" overlap="circular" variant="dot">
  <Avatar alt="Natacha" type="outlined">
    U
  </Avatar>
</Badge>
<Badge color="error" overlap="circular" variant="dot">
  <Avatar>
    <img alt="Natacha" src={('/assets/images/users/vector-2.png')} width={40} />
  </Avatar>
</Badge>
<Badge color="success" variant="dot">
  <Avatar alt="Natacha" variant="rounded" type="filled" src={('/assets/images/users/avatar-1.png')} />
</Badge>
<Badge
  overlap="circular"
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  badgeContent={<Avatar size="badge" alt="Remy Sharp" src={('/assets/images/users/avatar-6.png')} />}
>
  <Avatar alt="Travis Howard" src={('/assets/images/users/avatar-1.png')} />
</Badge>`;

  const sizesAvatarCodeString = `<Avatar size="xs" alt="Avatar 1" src={('/assets/images/users/avatar-1.png')} />
<Avatar size="xl" alt="Avatar 5" src={('/assets/images/users/avatar-5.png')} />
<Avatar size="lg" alt="Avatar 4" src={('/assets/images/users/avatar-4.png')} />
<Avatar size="md" alt="Avatar 3" src={('/assets/images/users/avatar-3.png')} />
<Avatar size="sm" alt="Avatar 2" src={('/assets/images/users/avatar-2.png')} />`;

  const colorsAvatarCodeString = `<Avatar alt="Basic" type="filled"><Profile variant="Bold" /></Avatar>
<Avatar alt="Basic" type="filled" color="error"><Trash variant="Bold" /></Avatar>
<Avatar alt="Basic" type="filled" color="info"><InfoCircle variant="Bold" /></Avatar>
<Avatar alt="Basic" type="filled" color="warning"><Warning2 variant="Bold" /></Avatar>
<Avatar alt="Basic" type="filled" color="success"><TickCircle variant="Bold" /></Avatar>
<Avatar alt="Basic" type="filled" color="secondary"><Coin variant="Bold" /></Avatar>`;

  const fallbacksAvatarCodeString = `<Avatar alt="Remy Sharp" src="/broken-image.jpg" color="error" type="filled">B</Avatar>
<Avatar src="/broken-image.jpg" color="error" />
<Avatar alt="Remy Sharp" src="/broken-image.jpg" color="error" type="outlined" />`;

  return (
    <ComponentSkeleton>
      <ComponentHeader
        title="Avatar"
        caption="Avatars are found throughout material design with uses in everything from tables to dialog menus."
        directory="src/pages/components-overview/avatars"
        link="https://mui.com/material-ui/react-avatar/"
      />
      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Stack spacing={3}>
              <MainCard title="Basic" codeHighlight codeString={basicAvatarCodeString}>
                <Avatar alt="Basic">
                  <Profile variant="Bold" />
                </Avatar>
              </MainCard>
              <MainCard title="Vector" codeString={vectorAvatarCodeString}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Avatar>
                      <img alt="Natacha" src={vector1} height={40} />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar>
                      <img alt="Natacha" src={vector2} height={40} />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar>
                      <img alt="Natacha" src={vector3} height={40} />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar>
                      <img alt="Natacha" src={vector4} height={40} />
                    </Avatar>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Variants" codeString={variantsAvatarCodeString}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Avatar alt="Natacha">
                      <Profile variant="Bold" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha" variant="rounded" type="combined">
                      <Profile variant="Bold" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha" variant="square" type="filled">
                      <Profile />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha">U</Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha" variant="rounded" type="combined">
                      U
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha" variant="square" type="filled">
                      U
                    </Avatar>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Icon" codeString={iconAvatarCodeString}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Avatar alt="Natacha" size="sm" type="filled">
                      <Profile variant="Bold" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha" size="sm" type="filled" color="success">
                      <Sms variant="Bold" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha" size="sm" type="filled" color="error">
                      <Setting2 variant="Bold" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha" size="sm">
                      <Add />
                    </Avatar>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="With Badge" codeString={badgeAvatarCodeString}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Badge badgeContent={4} color="error" overlap="circular">
                      <Avatar alt="Natacha" type="filled" src={avatar6} />
                    </Badge>
                  </Grid>
                  <Grid item>
                    <Badge color="error" overlap="circular" variant="dot">
                      <Avatar alt="Natacha" color="secondary" type="filled">
                        <Profile />
                      </Avatar>
                    </Badge>
                  </Grid>
                  <Grid item>
                    <Badge color="error" overlap="circular" variant="dot">
                      <Avatar alt="Natacha" type="filled" src={avatar2} />
                    </Badge>
                  </Grid>
                  <Grid item>
                    <Badge color="error" overlap="circular" variant="dot">
                      <Avatar alt="Natacha" type="outlined">
                        U
                      </Avatar>
                    </Badge>
                  </Grid>
                  <Grid item>
                    <Badge color="error" overlap="circular" variant="dot">
                      <Avatar>
                        <img alt="Natacha" src={vector2} width={40} />
                      </Avatar>
                    </Badge>
                  </Grid>
                  <Grid item>
                    <Badge color="success" variant="dot">
                      <Avatar alt="Natacha" variant="rounded" type="filled" src={avatar1} />
                    </Badge>
                  </Grid>
                  <Grid item>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={<Avatar size="badge" alt="Remy Sharp" src={avatar6} />}
                    >
                      <Avatar alt="Travis Howard" src={avatar1} />
                    </Badge>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Image" codeString={imageAvatarCodeString}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Avatar alt="Avatar 1" src={avatar1} />
                  </Grid>
                  <Grid item>
                    <Avatar alt="Avatar 2" src={avatar2} />
                  </Grid>
                  <Grid item>
                    <Avatar alt="Avatar 3" src={avatar3} />
                  </Grid>
                  <Grid item>
                    <Avatar alt="Avatar 4" src={avatar4} />
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Colors" codeString={colorsAvatarCodeString}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Avatar alt="Basic" type="filled">
                      <Profile />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Basic" type="filled" color="secondary">
                      <Coin />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Basic" type="filled" color="success">
                      <TickCircle />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Basic" type="filled" color="warning">
                      <Warning2 />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Basic" type="filled" color="info">
                      <InfoCircle />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Basic" type="filled" color="error">
                      <Trash />
                    </Avatar>
                  </Grid>
                </Grid>
              </MainCard>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack spacing={3}>
              <MainCard title="Letter" codeString={letterAvatarCodeString}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Avatar alt="Natacha" size="sm">
                      U
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar color="error" alt="Natacha" size="sm">
                      UI
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar color="error" type="filled" alt="Natacha" size="sm">
                      A
                    </Avatar>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Outlined" codeString={outlinedAvatarCodeString}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Avatar alt="Natacha" type="outlined">
                      <Profile variant="Bold" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha" variant="rounded" type="outlined">
                      <Profile variant="Bold" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha" variant="square" type="outlined">
                      <Profile variant="Bold" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha" type="outlined">
                      U
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha" variant="rounded" type="outlined">
                      U
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Natacha" variant="square" type="outlined">
                      U
                    </Avatar>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Avatar Group" codeString={groupAvatarCodeString}>
                <Stack spacing={2}>
                  <Typography variant="subtitle1">Default</Typography>
                  <Box sx={{ width: 148 }}>
                    <AvatarGroup max={4}>
                      <Avatar alt="Trevor Henderson" src={avatar5} />
                      <Avatar alt="Jone Doe" src={avatar6} />
                      <Avatar alt="Lein Ket" src={avatar7} />
                      <Avatar alt="Stebin Ben" src={avatar8} />
                      <Avatar alt="Wungh Tend" src={avatar9} />
                      <Avatar alt="Trevor Das" src={avatar10} />
                    </AvatarGroup>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1">On Hover</Typography>
                  <Box sx={{ width: 186 }}>
                    <Tooltip
                      open={show}
                      placement="top-end"
                      title={
                        <AvatarGroup max={10}>
                          <Avatar alt="Trevor Henderson" src={avatar5} />
                          <Avatar alt="Jone Doe" src={avatar6} />
                          <Avatar alt="Lein Ket" src={avatar7} />
                          <Avatar alt="Stebin Ben" src={avatar8} />
                          <Avatar alt="Wungh Tend" src={avatar9} />
                          <Avatar alt="Trevor Das" src={avatar10} />
                        </AvatarGroup>
                      }
                    >
                      <AvatarGroup
                        sx={{ '& .MuiAvatarGroup-avatar': { bgcolor: 'primary.main', cursor: 'pointer' } }}
                        componentsProps={{
                          additionalAvatar: {
                            onMouseEnter: () => {
                              setShow(true);
                            },
                            onMouseLeave: () => {
                              setShow(false);
                            }
                          }
                        }}
                      >
                        <Avatar alt="Remy Sharp" src={avatar1} />
                        <Avatar alt="Travis Howard" src={avatar2} />
                        <Avatar alt="Cindy Baker" src={avatar3} />
                        <Avatar alt="Agnes Walker" src={avatar4} />
                        <Avatar alt="Trevor Henderson" src={avatar5} />
                        <Avatar alt="Jone Doe" src={avatar6} />
                        <Avatar alt="Lein Ket" src={avatar7} />
                        <Avatar alt="Stebin Ben" src={avatar8} />
                        <Avatar alt="Wungh Tend" src={avatar9} />
                        <Avatar alt="Trevor Das" src={avatar10} />
                      </AvatarGroup>
                    </Tooltip>
                  </Box>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={2}>
                  <Typography variant="subtitle1">On Click</Typography>
                  <Box sx={{ width: 222 }}>
                    <Tooltip
                      open={open}
                      placement="top-end"
                      title={
                        <AvatarGroup max={10}>
                          <Avatar alt="Jone Doe" src={avatar6} />
                          <Avatar alt="Lein Ket" src={avatar7} />
                          <Avatar alt="Stebin Ben" src={avatar8} />
                          <Avatar alt="Wungh Tend" src={avatar9} />
                          <Avatar alt="Trevor Das" src={avatar10} />
                        </AvatarGroup>
                      }
                    >
                      <AvatarGroup
                        max={6}
                        sx={{ '& .MuiAvatarGroup-avatar': { bgcolor: 'primary.main', cursor: 'pointer' } }}
                        componentsProps={{
                          additionalAvatar: {
                            onClick: () => {
                              setOpen(!open);
                            }
                          }
                        }}
                      >
                        <Avatar alt="Remy Sharp" src={avatar1} />
                        <Avatar alt="Travis Howard" src={avatar2} />
                        <Avatar alt="Cindy Baker" src={avatar3} />
                        <Avatar alt="Agnes Walker" src={avatar4} />
                        <Avatar alt="Trevor Henderson" src={avatar5} />
                        <Avatar alt="Jone Doe" src={avatar6} />
                        <Avatar alt="Lein Ket" src={avatar7} />
                        <Avatar alt="Stebin Ben" src={avatar8} />
                        <Avatar alt="Wungh Tend" src={avatar9} />
                        <Avatar alt="Trevor Das" src={avatar10} />
                      </AvatarGroup>
                    </Tooltip>
                  </Box>
                </Stack>
              </MainCard>
              <MainCard title="Sizes" codeString={sizesAvatarCodeString}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Avatar size="xs" alt="Avatar 1" src={avatar1} />
                  </Grid>
                  <Grid item>
                    <Avatar size="sm" alt="Avatar 2" src={avatar2} />
                  </Grid>
                  <Grid item>
                    <Avatar size="md" alt="Avatar 3" src={avatar3} />
                  </Grid>
                  <Grid item>
                    <Avatar size="lg" alt="Avatar 4" src={avatar4} />
                  </Grid>
                  <Grid item>
                    <Avatar size="xl" alt="Avatar 5" src={avatar5} />
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Fallbacks" codeString={fallbacksAvatarCodeString}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src="/broken-image.jpg" color="error" type="filled">
                      B
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src="/broken-image.jpg" color="error" type="outlined" />
                  </Grid>
                  <Grid item>
                    <Avatar src="/broken-image.jpg" color="error" />
                  </Grid>
                </Grid>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      </ComponentWrapper>
    </ComponentSkeleton>
  );
}
