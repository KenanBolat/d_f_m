import PropTypes from 'prop-types';
// material-ui
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import { DropzopType } from 'config';

// assets
import { Camera } from 'iconsax-react';
import UploadCover from 'assets/images/upload/upload.svg';

// ==============================|| UPLOAD - PLACEHOLDER ||============================== //

export default function PlaceholderContent({ type }) {
  return (
    <>
      {type !== DropzopType.STANDARD && (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
        >
          <CardMedia component="img" image={UploadCover} sx={{ width: 150 }} />
          <Stack sx={{ p: 3 }} spacing={1}>
            <Typography variant="h5">Drag & Drop or Select file</Typography>

            <Typography color="secondary">
              Drop files here or click&nbsp;
              <Typography component="span" color="primary" sx={{ textDecoration: 'underline' }}>
                browse
              </Typography>
              &nbsp;thorough your machine
            </Typography>
          </Stack>
        </Stack>
      )}
      {type === DropzopType.STANDARD && (
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Camera style={{ fontSize: '32px' }} />
        </Stack>
      )}
    </>
  );
}

PlaceholderContent.propTypes = { type: PropTypes.any };
