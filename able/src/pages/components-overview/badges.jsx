import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

// project-imports
import MainCard from 'components/MainCard';
import ComponentHeader from 'components/cards/ComponentHeader';
import AntAvatar from 'components/@extended/Avatar';
import ComponentWrapper from 'sections/components-overview/ComponentWrapper';
import ComponentSkeleton from 'sections/components-overview/ComponentSkeleton';

// assets
import { Add, Minus, Profile, Sms } from 'iconsax-react';

// ==============================|| COMPONENTS - BADGES ||============================== //

export default function ComponentBadge() {
  const [count, setCount] = useState(1);
  const [invisible, setInvisible] = useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  const basicBadgesCodeString = `<Badge badgeContent={4} color="primary"><Sms /></Badge>
<Badge badgeContent={4} color="secondary"><Sms /></Badge>
<Badge badgeContent={4} color="success"><Sms /></Badge>
<Badge badgeContent={4} color="warning"><Sms /></Badge>
<Badge badgeContent={4} color="info"><Sms /></Badge>
<Badge badgeContent={4} color="error"><Sms /></Badge>`;

  const lightBadgesCodeString = `<Badge badgeContent={4} color="primary" variant="light"><Sms /></Badge>
<Badge badgeContent={4} color="secondary" variant="light"><Sms /></Badge>
<Badge badgeContent={4} color="success" variant="light"><Sms /></Badge>
<Badge badgeContent={4} color="warning" variant="light"><Sms /></Badge>
<Badge badgeContent={4} color="info" variant="light"><Sms /></Badge>
<Badge badgeContent={4} color="error" variant="light"><Sms /></Badge>`;

  const maxBadgesCodeString = `<Badge badgeContent={99} color="primary"><Sms /></Badge>
<Badge badgeContent={100} color="secondary"><Sms /></Badge>
<Badge badgeContent={1000} max={999} color="primary" variant="light"><Sms /></Badge>
<Badge badgeContent={99} color="secondary" variant="light"><Sms /></Badge>
<Badge badgeContent={99} color="error"><Sms /></Badge>`;

  const dotBadgesCodeString = `<Badge color="primary" variant="dot"><Sms /></Badge>
<Badge color="secondary" variant="dot"><Sms /></Badge>
<Badge max={999} color="success" variant="dot"><Sms /></Badge>
<Badge color="warning" variant="dot"><Sms /></Badge>
<Badge color="info" variant="dot"><Sms /></Badge>
<Badge color="error" variant="dot"><Typography variant="h6">Typography</Typography></Badge>`;

  const alignmentBadgesCodeString = `<Badge badgeContent={9} color="primary">
  <Sms />
</Badge>
<Badge color="primary" variant="dot">
  <Sms />
</Badge>
<Badge
  badgeContent={9}
  color="primary"
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right'
  }}
>
  <Sms />
</Badge>
<Badge
  badgeContent={9}
  color="primary"
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'left'
  }}
>
  <Sms />
</Badge>
<Badge
  badgeContent={99}
  color="primary"
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left'
  }}
>
  <Sms />
</Badge>`;

  const overlapBadgesCodeString = `<Badge color="error" overlap="circular" variant="dot">
  <AntAvatar alt="Basic">
    <Profile variant="Bold" />
  </AntAvatar>
</Badge>
<Badge color="error" variant="dot">
  <AntAvatar alt="Basic" variant="rounded" type="filled">
    <Profile />
  </AntAvatar>
</Badge>
<Badge color="error" variant="dot">
  <AntAvatar alt="Basic" variant="square" type="outlined">
    <Profile variant="Bold" />
  </AntAvatar>
</Badge>
<Badge badgeContent=" " color="error" overlap="circular">
  <AntAvatar alt="Basic" type="outlined">
    U
  </AntAvatar>
</Badge>
<Badge badgeContent=" " color="error">
  <AntAvatar alt="Basic" variant="rounded" type="filled">
    U
  </AntAvatar>
</Badge>
<Badge badgeContent=" " color="error">
  <AntAvatar alt="Basic" variant="square" type="outlined">
    U
  </AntAvatar>
</Badge>`;

  const visibleBadgesCodeString = `<Badge color="primary" badgeContent={count}><Sms /></Badge>
<ButtonGroup>
  <Button
    aria-label="reduce"
    onClick={() => {
      setCount(Math.max(count - 1, 0));
    }}
  >
    <Minus />
  </Button>
  <Button
    aria-label="increase"
    onClick={() => {
      setCount(count + 1);
    }}
  >
    <Add />
  </Button>
</ButtonGroup>
<Badge color="primary" variant="dot" invisible={invisible}><Sms /></Badge>
<FormControlLabel
  sx={{ color: 'text.primary' }}
  control={<Switch checked={!invisible} onChange={handleBadgeVisibility} />}
  label="Show Badge"
  labelPlacement="start"
/>`;

  return (
    <ComponentSkeleton>
      <ComponentHeader
        title="Badge"
        caption="Badge generates a small badge to the top-right of its child(ren)."
        directory="src/pages/components-overview/badges"
        link="https://mui.com/material-ui/react-badge/"
      />
      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MainCard title="Basic" codeHighlight codeString={basicBadgesCodeString}>
              <Grid container spacing={3}>
                <Grid item>
                  <Badge badgeContent={4} color="primary">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={4} color="secondary">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={4} color="success">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={4} color="warning">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={4} color="info">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={4} color="error">
                    <Sms />
                  </Badge>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MainCard title="Light" codeString={lightBadgesCodeString}>
              <Grid container spacing={3}>
                <Grid item>
                  <Badge badgeContent={4} color="primary" variant="light">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={4} color="secondary" variant="light">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={4} color="success" variant="light">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={4} color="warning" variant="light">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={4} color="info" variant="light">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={4} color="error" variant="light">
                    <Sms />
                  </Badge>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MainCard title="Maximmum Value" codeString={maxBadgesCodeString}>
              <Grid container spacing={4}>
                <Grid item>
                  <Badge badgeContent={99} color="primary">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={100} color="secondary">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={1000} max={999} color="primary" variant="light">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={99} color="secondary" variant="light">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent={99} color="error">
                    <Sms />
                  </Badge>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MainCard title="Dot Badges" codeString={dotBadgesCodeString}>
              <Grid container spacing={3}>
                <Grid item>
                  <Badge color="primary" variant="dot">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge color="secondary" variant="dot">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge max={999} color="success" variant="dot">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge color="warning" variant="dot">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge color="info" variant="dot">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge color="error" variant="dot">
                    <Typography variant="h6">Typography</Typography>
                  </Badge>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MainCard title="Alignment" codeString={alignmentBadgesCodeString}>
              <Grid container spacing={4}>
                <Grid item>
                  <Badge badgeContent={9} color="primary">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge color="primary" variant="dot">
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge
                    badgeContent={9}
                    color="primary"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge
                    badgeContent={9}
                    color="primary"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                  >
                    <Sms />
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge
                    badgeContent={99}
                    color="primary"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                  >
                    <Sms />
                  </Badge>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MainCard title="Overlap" codeString={overlapBadgesCodeString}>
              <Grid container spacing={2}>
                <Grid item>
                  <Badge color="error" overlap="circular" variant="dot">
                    <AntAvatar alt="Basic">
                      <Profile variant="Bold" />
                    </AntAvatar>
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge color="error" variant="dot">
                    <AntAvatar alt="Basic" variant="rounded" type="filled">
                      <Profile />
                    </AntAvatar>
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge color="error" variant="dot">
                    <AntAvatar alt="Basic" variant="square" type="outlined">
                      <Profile variant="Bold" />
                    </AntAvatar>
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent=" " color="error" overlap="circular">
                    <AntAvatar alt="Basic" type="outlined">
                      U
                    </AntAvatar>
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent=" " color="error">
                    <AntAvatar alt="Basic" variant="rounded" type="filled">
                      U
                    </AntAvatar>
                  </Badge>
                </Grid>
                <Grid item>
                  <Badge badgeContent=" " color="error">
                    <AntAvatar alt="Basic" variant="square" type="outlined">
                      U
                    </AntAvatar>
                  </Badge>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MainCard title="Visibility" codeString={visibleBadgesCodeString}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Badge color="primary" badgeContent={count}>
                      <Sms />
                    </Badge>
                    <ButtonGroup>
                      <Button
                        aria-label="reduce"
                        onClick={() => {
                          setCount(Math.max(count - 1, 0));
                        }}
                      >
                        <Minus />
                      </Button>
                      <Button
                        aria-label="increase"
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      >
                        <Add />
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Badge color="primary" variant="dot" invisible={invisible}>
                      <Sms />
                    </Badge>
                    <FormControlLabel
                      sx={{ color: 'text.primary' }}
                      control={<Switch checked={!invisible} onChange={handleBadgeVisibility} />}
                      label="Show Badge"
                      labelPlacement="start"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </ComponentWrapper>
    </ComponentSkeleton>
  );
}
