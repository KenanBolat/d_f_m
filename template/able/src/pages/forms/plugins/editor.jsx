// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

// project-imports
import ReactDraft from 'sections/forms/plugins/ReactDraft';
import ReactQuill from 'sections/forms/plugins/ReactQuill';
import MainCard from 'components/MainCard';

import { ThemeDirection, ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// ==============================|| PLUGIN - EDITOR ||============================== //

export default function Editor() {
  const theme = useTheme();
  const { mode, themeDirection } = useConfig();

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        sx={{
          '& .rdw-editor-wrapper': {
            bgcolor: theme.palette.background.paper,
            border: '1px solid',
            borderColor: theme.palette.divider,
            borderRadius: '4px',
            overflow: 'visible',
            '& .rdw-editor-main': { px: 2, py: 0.5, border: 'none' },
            '& .rdw-editor-toolbar': {
              pt: 1.25,
              border: 'none',
              borderBottom: '1px solid',
              borderColor: theme.palette.divider,
              bgcolor: 'secondary.lighter',
              '& .rdw-option-wrapper': {
                bgcolor: mode === ThemeMode.DARK ? 'dark.light' : 'secondary.lighter',
                borderColor: theme.palette.divider
              },
              '& .rdw-dropdown-wrapper': {
                bgcolor: mode === ThemeMode.DARK ? 'dark.light' : 'secondary.lighter',
                borderColor: theme.palette.divider,
                '& .rdw-dropdown-selectedtext': { color: mode === ThemeMode.DARK ? 'secondary.100' : 'secondary.darker' },
                '& .rdw-dropdownoption-default': { color: mode === ThemeMode.DARK ? 'secondary.100' : 'secondary.darker' },
                '& .rdw-dropdown-carettoopen': { position: themeDirection === ThemeDirection.RTL ? 'initial' : 'absolute' }
              },
              '& .rdw-embedded-modal-link-input': { backgroundColor: 'secondary.lighter' },
              '& .rdw-embedded-modal-size-input': { backgroundColor: 'secondary.lighter', color: 'secondary.main' },
              '& .rdw-emoji-modal': { left: { xs: -140, sm: -195, md: 5 } },
              '& .rdw-embedded-modal': { left: { xs: -100, sm: -165, md: 5 } },
              '& .rdw-link-modal': { left: { xs: 0, sm: -100, md: 5 } },
              '& .rdw-image-modal': { left: { xs: -190, sm: 30, md: 5 }, top: '15px' },
              '& .rdw-colorpicker-modal': { left: { xs: -150, sm: 5 } }
            },
            ...(theme.direction === ThemeDirection.RTL && {
              '.rdw-dropdown-carettoopen': {
                position: 'absolute !important',
                right: '10%',
                left: 'inherit'
              },
              '.rdw-dropdown-carettoclose': { right: '10%', left: 'inherit' }
            }),
            ...(theme.palette.mode === ThemeMode.DARK && {
              '& .rdw-link-modal-btn': {
                color: 'common.black'
              },
              '& .rdw-image-modal-btn': {
                color: 'common.black'
              },
              '& .rdw-embedded-modal-btn': {
                color: 'common.black'
              }
            })
          }
        }}
      >
        <MainCard title="React Draft" sx={{ overflow: 'visible' }}>
          <ReactDraft />
        </MainCard>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          '& .quill': {
            bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'secondary.lighter',
            borderRadius: '4px',
            '& .ql-toolbar': {
              bgcolor: mode === ThemeMode.DARK ? 'dark.light' : 'secondary.100',
              borderColor: theme.palette.divider,
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px'
            },
            '& .ql-container': {
              borderColor: `${theme.palette.divider} !important`,
              borderBottomLeftRadius: '4px',
              borderBottomRightRadius: '4px',
              '& .ql-editor': { minHeight: 135 }
            },
            '& .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg': {
              position: themeDirection === ThemeDirection.RTL ? 'initial' : 'absolute'
            }
          }
        }}
      >
        <MainCard title="React Quill">
          <ReactQuill />
        </MainCard>
      </Grid>
    </Grid>
  );
}
