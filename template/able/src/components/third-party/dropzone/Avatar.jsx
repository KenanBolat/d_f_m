import PropTypes from 'prop-types';
// material-ui
import { alpha, styled, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import { useDropzone } from 'react-dropzone';

// project-imports
import RejectionFiles from './RejectionFiles';

// assets
import { Camera } from 'iconsax-react';

const RootWrapper = styled('div')(({ theme }) => ({
  width: 124,
  height: 124,
  borderRadius: '50%',
  border: '1px dashed',
  borderColor: theme.palette.primary.main,
  background: theme.palette.primary.lighter
}));

const DropzoneWrapper = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': { cursor: 'pointer', '& .placeholder': { zIndex: 9 } }
});

const PlaceholderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: alpha(theme.palette.primary.lighter, 0.75),
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': { opacity: 0.85 }
}));

// ==============================|| UPLOAD - AVATAR ||============================== //

export default function AvatarUpload({ error, file, setFieldValue, sx }) {
  const theme = useTheme();

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFieldValue(
        'files',
        acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
      );
    }
  });

  const thumbs =
    file &&
    file.map((item) => (
      <img
        key={item.name}
        alt={item.name}
        src={item.preview}
        onLoad={() => {
          URL.revokeObjectURL(item.preview);
        }}
      />
    ));

  return (
    <>
      <RootWrapper sx={{ ...((isDragReject || error) && { borderColor: 'error.light' }), ...sx }}>
        <DropzoneWrapper {...getRootProps()} sx={{ ...(isDragActive && { opacity: 0.6 }) }}>
          <input {...getInputProps()} />
          {thumbs}
          <PlaceholderWrapper
            className="placeholder"
            sx={{
              ...(thumbs && { opacity: 0, color: 'common.white', bgcolor: 'secondary.darker' }),
              ...((isDragReject || error) && { bgcolor: 'error.lighter' })
            }}
          >
            <Stack spacing={0.5} alignItems="center">
              <Camera style={{ color: theme.palette.secondary.main, fontSize: '2rem' }} />
              <Typography color="secondary">{file ? 'Update' : 'Upload'}</Typography>
            </Stack>
          </PlaceholderWrapper>
        </DropzoneWrapper>
      </RootWrapper>
      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
    </>
  );
}

AvatarUpload.propTypes = { error: PropTypes.any, file: PropTypes.any, setFieldValue: PropTypes.any, sx: PropTypes.any };
