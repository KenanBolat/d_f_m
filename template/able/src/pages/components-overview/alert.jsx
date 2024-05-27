// material-ui
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import ComponentHeader from 'components/cards/ComponentHeader';
import ComponentWrapper from 'sections/components-overview/ComponentWrapper';
import ComponentSkeleton from 'sections/components-overview/ComponentSkeleton';

// assets
import { Coin, Ethereum, InfoCircle, MessageQuestion, TickSquare, Warning2 } from 'iconsax-react';

// ==============================|| COMPONENTS - ALERTS ||============================== //

export default function ComponentAlert() {
  const theme = useTheme();

  const basicAlertCodeString = `<Alert color="primary" icon={<MessageQuestion variant="Bold" />}>
  Primary Text
</Alert>
<Alert color="secondary" icon={<Coin />}>
  Secondary Text
</Alert>
<Alert color="success" icon={<CheckSquareFilled />}>
  Success Text
</Alert>
<Alert color="warning" icon={<Warning2 variant="Bold" />}>
  Warning Text
</Alert>
<Alert color="info" icon={<InfoCircle variant="Bold" />}>
  Info Text
</Alert>
<Alert color="error" icon={<Ethereum variant="Bold" />}>
  Error Text
</Alert>`;

  const actionsAlertCodeString = `<Alert variant="border" color="success" onClose={() => {}}>
  Success Text
</Alert>
<Alert
  variant="border"
  color="warning"
  icon={<Warning2 />}
  action={
    <Button color="warning" size="small">
      Undo
    </Button>
  }
>
  Warning Text
</Alert>
<Alert
  variant="border"
  color="primary"
  icon={<MessageQuestion />}
  action={
    <Button variant="contained" size="small">
      Continue
    </Button>
  }
>
  Primary Text
</Alert>`;

  const filledAlertCodeString = `<Alert color="primary" variant="filled" icon={<MessageQuestion variant="Bold" />}>
  Primary Text
</Alert>
<Alert color="secondary" variant="filled" icon={<Coin />}>
  Secondary Text
</Alert>
<Alert color="success" variant="filled" icon={<CheckSquareFilled />}>
  Success Text
</Alert>
<Alert color="warning" variant="filled" icon={<Warning2 variant="Bold" />}>
  Warning Text
</Alert>
<Alert color="info" variant="filled" icon={<InfoCircle variant="Bold" />}>
  Info Text
</Alert>
<Alert color="error" variant="filled" icon={<Ethereum variant="Bold" />}>
  Error Text
</Alert>`;

  const descriptionAlertCodeString = `<Alert color="primary" variant="border" icon={<MessageQuestion variant="Bold" />}>
  <AlertTitle>Primary Text</AlertTitle>
  <Typography variant="h6"> This is an primary alert.</Typography>
</Alert>
<Alert color="secondary" variant="border" icon={<Coin />}>
  <AlertTitle>Secondary Text</AlertTitle>
  <Typography variant="h6"> This is an secondary alert.</Typography>
</Alert>
<Alert color="success" variant="border" icon={<CheckSquareFilled />}>
  <AlertTitle>Success Text</AlertTitle>
  <Typography variant="h6"> This is an success alert.</Typography>
</Alert>
<Alert color="warning" variant="border" icon={<Warning2 variant="Bold" />}>
  <AlertTitle>Warning Text</AlertTitle>
  <Typography variant="h6"> This is an warning alert.</Typography>
</Alert>
<Alert color="info" variant="border" icon={<InfoCircle variant='Bold' />}>
  <AlertTitle>Info Text</AlertTitle>
  <Typography variant="h6"> This is an info alert.</Typography>
</Alert>
<Alert color="error" variant="border" icon={<Ethereum variant="Bold" />}>
  <AlertTitle>Error Text</AlertTitle>
  <Typography variant="h6"> This is an error alert.</Typography>
</Alert>`;

  const outlinedAlertCodeString = `<Alert color="primary" variant="outlined" icon={<MessageQuestion />}>
  Primary Text
</Alert>
<Alert color="secondary" variant="outlined" icon={<Coin />}>
  Secondary Text
</Alert>
<Alert color="success" variant="outlined" icon={<TickSquare />}>
  Success Text
</Alert>
<Alert color="warning" variant="outlined" icon={<Warning2 />}>
  Warning Text
</Alert>
<Alert color="info" variant="outlined" icon={<InfoCircle />}>
  Info Text
</Alert>
<Alert color="error" variant="outlined" icon={<Ethereum />}>
  Error Text
</Alert>`;

  return (
    <ComponentSkeleton>
      <ComponentHeader
        title="Alert"
        caption="An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task."
        directory="src/pages/components-overview/alert"
        link="https://mui.com/material-ui/react-alert/"
      />
      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <MainCard title="Basic" codeHighlight codeString={basicAlertCodeString}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert color="primary" icon={<MessageQuestion variant="Bold" />}>
                    Primary Text
                  </Alert>
                  <Alert color="secondary" icon={<Coin />}>
                    Secondary Text
                  </Alert>
                  <Alert color="success" icon={<TickSquare variant="Bold" />}>
                    Success Text
                  </Alert>
                  <Alert color="warning" icon={<Warning2 variant="Bold" />}>
                    Warning Text
                  </Alert>
                  <Alert color="info" icon={<InfoCircle variant="Bold" />}>
                    Info Text
                  </Alert>
                  <Alert color="error" icon={<Ethereum variant="Bold" />}>
                    Error Text
                  </Alert>
                </Stack>
              </MainCard>
              <MainCard title="Actions" codeString={actionsAlertCodeString}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert
                    variant="border"
                    color="success"
                    onClose={() => {}}
                    sx={{
                      '& .MuiIconButton-root:focus-visible': {
                        outline: `2px solid ${theme.palette.success.dark}`,
                        outlineOffset: 2
                      }
                    }}
                  >
                    Success Text
                  </Alert>
                  <Alert
                    variant="border"
                    color="warning"
                    icon={<Warning2 />}
                    action={
                      <Button color="warning" size="small">
                        Undo
                      </Button>
                    }
                  >
                    Warning Text
                  </Alert>
                  <Alert
                    variant="border"
                    color="primary"
                    icon={<MessageQuestion />}
                    action={
                      <Button variant="contained" size="small">
                        Continue
                      </Button>
                    }
                  >
                    Primary Text
                  </Alert>
                </Stack>
              </MainCard>
              <MainCard title="Filled" codeString={filledAlertCodeString}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert color="primary" variant="filled" icon={<MessageQuestion variant="Bold" />}>
                    Primary Text
                  </Alert>
                  <Alert color="secondary" sx={{ color: 'secondary.lighter' }} variant="filled" icon={<Coin />}>
                    Secondary Text
                  </Alert>
                  <Alert color="success" variant="filled" icon={<TickSquare variant="Bold" />}>
                    Success Text
                  </Alert>
                  <Alert color="warning" variant="filled" icon={<Warning2 variant="Bold" />}>
                    Warning Text
                  </Alert>
                  <Alert color="info" variant="filled" icon={<InfoCircle variant="Bold" />}>
                    Info Text
                  </Alert>
                  <Alert color="error" variant="filled" icon={<Ethereum variant="Bold" />}>
                    Error Text
                  </Alert>
                </Stack>
              </MainCard>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <MainCard title="Description" codeString={descriptionAlertCodeString}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert color="primary" variant="border" icon={<MessageQuestion variant="Bold" />}>
                    <AlertTitle>Primary Text</AlertTitle>
                    <Typography variant="h6"> This is an primary alert.</Typography>
                  </Alert>
                  <Alert color="secondary" variant="border" icon={<Coin />}>
                    <AlertTitle>Secondary Text</AlertTitle>
                    <Typography variant="h6"> This is an secondary alert.</Typography>
                  </Alert>
                  <Alert color="success" variant="border" icon={<TickSquare variant="Bold" />}>
                    <AlertTitle>Success Text</AlertTitle>
                    <Typography variant="h6"> This is an success alert.</Typography>
                  </Alert>
                  <Alert color="warning" variant="border" icon={<Warning2 variant="Bold" />}>
                    <AlertTitle>Warning Text</AlertTitle>
                    <Typography variant="h6"> This is an warning alert.</Typography>
                  </Alert>
                  <Alert color="info" variant="border" icon={<InfoCircle variant="Bold" />}>
                    <AlertTitle>Info Text</AlertTitle>
                    <Typography variant="h6"> This is an info alert.</Typography>
                  </Alert>
                  <Alert color="error" variant="border" icon={<Ethereum variant="Bold" />}>
                    <AlertTitle>Error Text</AlertTitle>
                    <Typography variant="h6"> This is an error alert.</Typography>
                  </Alert>
                </Stack>
              </MainCard>
              <MainCard title="Outlined" codeString={outlinedAlertCodeString}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert color="primary" variant="outlined" icon={<MessageQuestion />}>
                    Primary Text
                  </Alert>
                  <Alert color="secondary" variant="outlined" icon={<Coin />}>
                    Secondary Text
                  </Alert>
                  <Alert color="success" variant="outlined" icon={<TickSquare />}>
                    Success Text
                  </Alert>
                  <Alert color="warning" variant="outlined" icon={<Warning2 />}>
                    Warning Text
                  </Alert>
                  <Alert color="info" variant="outlined" icon={<InfoCircle />}>
                    Info Text
                  </Alert>
                  <Alert color="error" variant="outlined" icon={<Ethereum />}>
                    Error Text
                  </Alert>
                </Stack>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      </ComponentWrapper>
    </ComponentSkeleton>
  );
}
