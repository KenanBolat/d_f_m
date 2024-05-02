import { useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import IconButton from 'components/@extended/IconButton';
import LoadingButton from 'components/@extended/LoadingButton';
import ComponentHeader from 'components/cards/ComponentHeader';
import ComponentWrapper from 'sections/components-overview/ComponentWrapper';
import ComponentSkeleton from 'sections/components-overview/ComponentSkeleton';
import ToggleButtons from 'sections/components-overview/buttons/ToggleButtons';
import ButtonGroups from 'sections/components-overview/buttons/ButtonGroups';

// assets
import { Add, AddCircle, Camera, Edit, EmojiHappy, Home3, Location, MicrophoneSlash, Send, Setting2 } from 'iconsax-react';

// styles
const Input = styled('input')({ display: 'none' });
Input.displayName = 'Input';

// ==============================|| COMPOENETS - BUTTON ||============================== //

export default function Buttons() {
  const [loading, setLoading] = useState({
    home: false,
    edit: false,
    address: false,
    add: false,
    submit: false,
    cancel: false
  });

  const loadingHandler = (state) => {
    setLoading({ ...loading, [state]: true });
    setTimeout(() => {
      setLoading({ ...loading, [state]: false });
    }, 1000);
  };

  const basicButtonCodeString = `<Button variant="contained">Primary</Button>
<Button variant="contained" color="secondary">Secondary</Button>
<Button variant="contained" color="info">Info</Button>
<Button variant="contained" color="success">Success</Button>
<Button variant="contained" color="warning">Warning</Button>
<Button variant="contained" color="error">Error</Button>`;

  const outlinedButtonCodeString = `<Button variant="outlined">Primary</Button>
<Button variant="outlined" color="secondary">Secondary</Button>
<Button variant="outlined" color="info">Info</Button>
<Button variant="outlined" color="success">Success</Button>
<Button variant="outlined" color="warning">Warning</Button>
<Button variant="outlined" color="error">Error</Button>`;

  const dashButtonCodeString = `<Button variant="dashed">Primary</Button>
<Button variant="dashed" color="secondary">Secondary</Button>
<Button variant="dashed" color="info">Info</Button>
<Button variant="dashed" color="success">Success</Button>
<Button variant="dashed" color="warning">Warning</Button>
<Button variant="dashed" color="error">Error</Button>`;

  const textButtonCodeString = `<Button>Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="info">Info</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="error">Error</Button>`;

  const shadowButtonCodeString = `<Button variant="shadow">Primary</Button>
<Button variant="shadow" color="secondary">Secondary</Button>
<Button variant="shadow" color="info">Info</Button>
<Button variant="shadow" color="success">Success</Button>
<Button variant="shadow" color="warning">Warning</Button>
<Button variant="shadow" color="error">Error</Button>`;

  const withIconButtonCodeString = `<Button variant="contained" startIcon={<Home3 />}>Home</Button>
<Button variant="contained" color="secondary" endIcon={<EmojiHappy variant="Bold" />}>Profile</Button>
<Button variant="outlined" color="info" startIcon={<Location />}>Address</Button>
<Button variant="outlined" color="success" startIcon={<AddCircle />}>Add</Button>
<Button variant="outlined" color="warning" endIcon={<Send />}>Send</Button>
<Button color="error" endIcon={<Add style={{ transform: 'rotate(45deg)' }} />}>Cancel</Button>`;

  const sizeButtonCodeString = `<Button variant="contained" size="extraSmall">Extra Small</Button>
<Button variant="contained" size="small">small</Button>
<Button variant="contained">Default</Button>
<Button variant="contained" size="large">Large</Button>`;

  const uploadButtonCodeString = `<label htmlFor="contained-button-file">
  <Input accept="image/*" id="contained-button-file" multiple type="file" />
  <Button variant="contained">
    Upload
  </Button>
</label>
<label htmlFor="icon-button-file">
  <Input accept="image/*" id="icon-button-file" type="file" />
  <IconButton variant="contained" shape="rounded" aria-label="upload picture">
    <Camera />
  </IconButton>
</label>`;

  const disabledButtonCodeString = `<Button disabled>Default</Button>
<Button variant="contained" disabled>Contained</Button>
<Button variant="outlined" disabled>Outlined</Button>
<Button variant="dashed" color="success" disabled>Dashed</Button>
<IconButton variant="contained" disabled><Home3 /></IconButton>
<IconButton variant="outlined" color="success" disabled><AddCircle /></IconButton>
<IconButton variant="dashed" color="warning" disabled><Send /></IconButton>
<LoadingButton loading color="secondary"><Add style={{ transform: 'rotate(45deg)' }} /></LoadingButton>`;

  const blockButtonCodeString = `<Button variant="contained" fullWidth>Primary</Button>
<Button variant="outlined" color="secondary" fullWidth>Secondary</Button>`;

  const fabButtonCodeString = `<Fab color="primary" aria-label="add">
  <Add style={{ fontSize: '1.3rem' }} />
</Fab>
<Fab color="info" aria-label="edit">
  <Edit style={{ fontSize: '1.3rem' }} />
</Fab>
<Fab disabled aria-label="like">
  <MicrophoneSlash style={{ fontSize: '1.3rem' }} />
</Fab>
<Fab color="error" variant="extended">
  Extended
</Fab>`;

  const iconButtonCodeString = `<IconButton variant="contained">
  <Home3 />
</IconButton>
<IconButton variant="contained" color="secondary">
<EmojiHappy variant="Bold" />
</IconButton>
<IconButton variant="outlined" color="info">
  <Location />
</IconButton>
<IconButton variant="outlined" color="success">
  <AddCircle />
</IconButton>
<IconButton variant="dashed" color="warning">
  <Send />
</IconButton>
<IconButton color="error">
  <Add style={{ transform: 'rotate(45deg)' }} />
</IconButton>
<IconButton shape="rounded" variant="contained">
  <Home3 />
</IconButton>
<IconButton shape="rounded" variant="contained" color="secondary">
<EmojiHappy variant="Bold" />
</IconButton>
<IconButton shape="rounded" variant="outlined" color="info">
  <Location />
</IconButton>
<IconButton shape="rounded" variant="outlined" color="success">
  <AddCircle />
</IconButton>
<IconButton shape="rounded" variant="dashed" color="warning">
  <Send />
</IconButton>
<IconButton shape="rounded" color="error">
  <Add style={{ transform: 'rotate(45deg)' }} />
</IconButton>`;

  const loadingButtonCodeString = `<LoadingButton loading variant="contained" loadingPosition="start" startIcon={<Home3 />}>
  Home
</LoadingButton>
<LoadingButton loading color="secondary" variant="outlined" loadingPosition="end" endIcon={<EmojiHappy variant="Bold" />}>
  Edit
</LoadingButton>
<LoadingButton loading color="info" variant="dashed" loadingIndicator="Loading...">
  Address
</LoadingButton>
<LoadingButton loading color="success" variant="contained" shape="square">
  <AddCircle />
</LoadingButton>
<LoadingButton loading color="warning" variant="dashed" shape="rounded">
  <Send />
</LoadingButton>
<LoadingButton loading color="error">
<Add style={{ transform: 'rotate(45deg)' }} />
</LoadingButton>
<LoadingButton loading={loading.home} variant="contained" loadingPosition="start" startIcon={<Home3 />} onClick={() => loadingHandler('home')}>
  Home
</LoadingButton>
<LoadingButton loading={loading.edit} color="secondary" variant="outlined" loadingPosition="end" endIcon={<EmojiHappy variant="Bold" />} onClick={() => loadingHandler('edit')}>
  Edit
</LoadingButton>
<LoadingButton loading={loading.address} color="info" variant="dashed" loadingIndicator="Loading..." onClick={() => loadingHandler('address')}>
  Address
</LoadingButton>
<LoadingButton loading={loading.add} color="success" variant="contained" shape="square" onClick={() => loadingHandler('add')}>
    <AddCircle />
</LoadingButton>
<LoadingButton loading={loading.submit} color="warning" variant="dashed" shape="rounded" onClick={() => loadingHandler('submit')}>
  <Send />
</LoadingButton>
<LoadingButton loading={loading.cancel} color="error" onClick={() => loadingHandler('cancel')}>
<Add style={{ transform: 'rotate(45deg)' }} />
</LoadingButton>`;

  const animationButtonCodeString = `<AnimateButton>
  <Button variant="contained">Default</Button>
</AnimateButton>
<AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
  <Button variant="contained" color="info">Scale</Button>
</AnimateButton>
<AnimateButton type="slide">
  <Button variant="contained" color="success">Slide</Button>
</AnimateButton>
<AnimateButton type="rotate">
  <Tooltip title="Rotate">
    <IconButton color="warning" variant="dashed" shape="rounded">
      <Setting2 />
    </IconButton>
  </Tooltip>
</AnimateButton>`;

  return (
    <ComponentSkeleton>
      <ComponentHeader
        title="Buttons"
        caption="Buttons allow users to take actions, and make choices, with a single tap."
        directory="src/pages/components-overview/buttons"
        link="https://mui.com/material-ui/react-button/"
      />
      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <MainCard title="Basic Button" codeHighlight codeString={basicButtonCodeString}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained">Default</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary">
                      Secondary
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="info">
                      Info
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="success">
                      Success
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="warning">
                      Warning
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="error">
                      Error
                    </Button>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Outlined Button" codeString={outlinedButtonCodeString}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="outlined">Default</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="secondary">
                      Secondary
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="info">
                      Info
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="success">
                      Success
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="warning">
                      Warning
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="error">
                      Error
                    </Button>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Dashed Button" codeString={dashButtonCodeString}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="dashed">Default</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="dashed" color="secondary">
                      Secondary
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="dashed" color="info">
                      Info
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="dashed" color="success">
                      Success
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="dashed" color="warning">
                      Warning
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="dashed" color="error">
                      Error
                    </Button>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Text Button" codeString={textButtonCodeString}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button>Default</Button>
                  </Grid>
                  <Grid item>
                    <Button color="secondary">Secondary</Button>
                  </Grid>
                  <Grid item>
                    <Button color="info">Info</Button>
                  </Grid>
                  <Grid item>
                    <Button color="success">Success</Button>
                  </Grid>
                  <Grid item>
                    <Button color="warning">Warning</Button>
                  </Grid>
                  <Grid item>
                    <Button color="error">Error</Button>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Shadow Button" codeString={shadowButtonCodeString}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="shadow">Default</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="shadow" color="secondary">
                      Secondary
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="shadow" color="info">
                      Info
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="shadow" color="success">
                      Success
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="shadow" color="warning">
                      Warning
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="shadow" color="error">
                      Error
                    </Button>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="With Icon" codeString={withIconButtonCodeString}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" startIcon={<Home3 />}>
                      Home
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" endIcon={<EmojiHappy variant="Bold" />}>
                      Profile
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="info" startIcon={<Location />}>
                      Address
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="success" startIcon={<AddCircle />}>
                      Add
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="warning" endIcon={<Send />}>
                      Send
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button color="error" endIcon={<Add style={{ transform: 'rotate(45deg)' }} />}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Button Size" codeString={sizeButtonCodeString}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" size="extraSmall">
                      Extra Small
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" size="small">
                      small
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained">Default</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" size="large">
                      Large
                    </Button>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Upload Button" codeString={uploadButtonCodeString}>
                <Grid container spacing={2}>
                  <Grid item>
                    <label htmlFor="contained-button-file">
                      <Input accept="image/*" id="contained-button-file" multiple type="file" />
                      <Button variant="contained">Upload</Button>
                    </label>
                  </Grid>
                  <Grid item>
                    <label htmlFor="icon-button-file">
                      <Input accept="image/*" id="icon-button-file" type="file" />
                      <IconButton
                        variant="contained"
                        shape="rounded"
                        aria-label="upload picture"
                        sx={{ '& svg': { width: 18, height: 18 } }}
                      >
                        <Camera />
                      </IconButton>
                    </label>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Diabled Button" codeString={disabledButtonCodeString}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button disabled>Default</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" disabled>
                      Contained
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" disabled>
                      Outlined
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="dashed" color="success" disabled>
                      Dashed
                    </Button>
                  </Grid>
                  <Grid item>
                    <IconButton variant="contained" disabled>
                      <Home3 />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton variant="outlined" color="success" disabled>
                      <AddCircle />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton variant="dashed" color="warning" disabled>
                      <Send />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <LoadingButton loading color="secondary">
                      <Add style={{ transform: 'rotate(45deg)' }} />
                    </LoadingButton>
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Block Level" codeString={blockButtonCodeString}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button variant="contained" fullWidth>
                      Primary
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="outlined" color="secondary" fullWidth>
                      Secondary
                    </Button>
                  </Grid>
                </Grid>
              </MainCard>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <ToggleButtons />
              <ButtonGroups />
              <MainCard title="Fab " codeString={fabButtonCodeString}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Fab color="primary" aria-label="add">
                      <Add style={{ fontSize: '1.3rem' }} />
                    </Fab>
                  </Grid>
                  <Grid item>
                    <Fab color="info" aria-label="edit">
                      <Edit style={{ fontSize: '1.3rem' }} />
                    </Fab>
                  </Grid>
                  <Grid item>
                    <Fab disabled aria-label="like">
                      <MicrophoneSlash style={{ fontSize: '1.3rem' }} />
                    </Fab>
                  </Grid>
                  <Grid item>
                    <Fab color="error" variant="extended">
                      Extended
                    </Fab>
                  </Grid>
                </Grid>
              </MainCard>

              <Typography variant="h5" sx={{ mt: 2 }}>
                Extended Button
              </Typography>
              <MainCard title="Icon Button" codeString={iconButtonCodeString}>
                <>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Tooltip title="Home">
                        <IconButton variant="contained">
                          <Home3 />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Profile">
                        <IconButton variant="contained" color="secondary">
                          <EmojiHappy variant="Bold" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Address">
                        <IconButton variant="outlined" color="info">
                          <Location />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Add">
                        <IconButton variant="outlined" color="success">
                          <AddCircle />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Send">
                        <IconButton variant="dashed" color="warning">
                          <Send />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Delete">
                        <IconButton color="error">
                          <Add style={{ transform: 'rotate(45deg)' }} />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item>
                      <Tooltip title="Home">
                        <IconButton shape="rounded" variant="contained">
                          <Home3 />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Profile">
                        <IconButton shape="rounded" variant="contained" color="secondary">
                          <EmojiHappy variant="Bold" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Address">
                        <IconButton shape="rounded" variant="outlined" color="info">
                          <Location />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Add">
                        <IconButton shape="rounded" variant="outlined" color="success">
                          <AddCircle />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Send">
                        <IconButton shape="rounded" variant="dashed" color="warning">
                          <Send />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Delete">
                        <IconButton shape="rounded" color="error">
                          <Add style={{ transform: 'rotate(45deg)' }} />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </>
              </MainCard>
              <MainCard title="Loading Button" codeString={loadingButtonCodeString}>
                <>
                  <Grid container spacing={2}>
                    <Grid item>
                      <LoadingButton loading variant="contained" loadingPosition="start" startIcon={<Home3 />}>
                        Home
                      </LoadingButton>
                    </Grid>
                    <Grid item>
                      <LoadingButton
                        loading
                        color="secondary"
                        variant="outlined"
                        loadingPosition="end"
                        endIcon={<EmojiHappy variant="Bold" />}
                      >
                        Edit
                      </LoadingButton>
                    </Grid>
                    <Grid item>
                      <LoadingButton loading color="info" variant="dashed" loadingIndicator="Loading...">
                        Address
                      </LoadingButton>
                    </Grid>
                    <Grid item>
                      <LoadingButton loading color="success" variant="contained" shape="square">
                        <AddCircle />
                      </LoadingButton>
                    </Grid>
                    <Grid item>
                      <LoadingButton loading color="warning" variant="dashed" shape="rounded">
                        <Send />
                      </LoadingButton>
                    </Grid>
                    <Grid item>
                      <LoadingButton loading color="error" shape="square">
                        <Add style={{ transform: 'rotate(45deg)' }} />
                      </LoadingButton>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item>
                      <LoadingButton
                        loading={loading.home}
                        variant="contained"
                        loadingPosition="start"
                        startIcon={<Home3 />}
                        onClick={() => loadingHandler('home')}
                      >
                        Home
                      </LoadingButton>
                    </Grid>
                    <Grid item>
                      <LoadingButton
                        loading={loading.edit}
                        color="secondary"
                        variant="outlined"
                        loadingPosition="end"
                        endIcon={<EmojiHappy variant="Bold" />}
                        onClick={() => loadingHandler('edit')}
                      >
                        Edit
                      </LoadingButton>
                    </Grid>
                    <Grid item>
                      <LoadingButton
                        loading={loading.address}
                        color="info"
                        variant="dashed"
                        loadingIndicator="Loading..."
                        onClick={() => loadingHandler('address')}
                      >
                        Address
                      </LoadingButton>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Add">
                        <LoadingButton
                          loading={loading.add}
                          color="success"
                          variant="contained"
                          shape="square"
                          onClick={() => loadingHandler('add')}
                        >
                          <AddCircle />
                        </LoadingButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Send">
                        <LoadingButton
                          loading={loading.submit}
                          color="warning"
                          variant="dashed"
                          shape="rounded"
                          onClick={() => loadingHandler('submit')}
                        >
                          <Send />
                        </LoadingButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Cancel">
                        <LoadingButton loading={loading.cancel} color="error" onClick={() => loadingHandler('cancel')} shape="square">
                          <Add style={{ transform: 'rotate(45deg)' }} />
                        </LoadingButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </>
              </MainCard>
              <MainCard title="Animation" codeString={animationButtonCodeString}>
                <Grid container spacing={2}>
                  <Grid item>
                    <AnimateButton>
                      <Button variant="contained">Default</Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <AnimateButton
                      scale={{
                        hover: 1.1,
                        tap: 0.9
                      }}
                    >
                      <Button variant="contained" color="info">
                        Scale
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <AnimateButton type="slide">
                      <Button variant="contained" color="success">
                        Slide
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <AnimateButton type="rotate">
                      <Tooltip title="Rotate">
                        <IconButton color="warning" variant="dashed" shape="rounded">
                          <Setting2 />
                        </IconButton>
                      </Tooltip>
                    </AnimateButton>
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
