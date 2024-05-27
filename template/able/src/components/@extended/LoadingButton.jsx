import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { alpha, styled, useTheme } from '@mui/material/styles';
import MuiLoadingButton from '@mui/lab/LoadingButton';

// project-imports
import getColors from 'utils/getColors';
import getShadow from 'utils/getShadow';

function getColorStyle({ variant, theme, color, loadingPosition }) {
  const colors = getColors(theme, color);
  const { lighter, main, dark, contrastText } = colors;

  const buttonShadow = `${color}Button`;
  const shadows = getShadow(theme, buttonShadow);

  const loadingIndicator = {
    '& .MuiLoadingButton-loadingIndicator': {
      color: main
    }
  };

  const loadingColor = {
    ...(loadingPosition &&
      loadingPosition !== 'center' && {
        color: main
      })
  };

  const commonShadow = {
    '&::after': {
      boxShadow: `0 0 6px 6px ${alpha(main, 0.9)}`
    },
    '&:active::after': {
      boxShadow: `0 0 0 0 ${alpha(main, 0.9)}`
    },
    '&:focus-visible': {
      outline: `2px solid ${dark}`,
      outlineOffset: 2
    }
  };

  switch (variant) {
    case 'contained':
      return {
        backgroundColor: main,
        ...(loadingPosition &&
          loadingPosition !== 'center' && {
            color: contrastText
          }),
        '& .MuiLoadingButton-loadingIndicator': {
          color: contrastText
        },
        '&:hover': {
          backgroundColor: dark,
          color: contrastText
        },
        ...commonShadow
      };
    case 'light':
      return {
        backgroundColor: main,
        ...(loadingPosition &&
          loadingPosition !== 'center' && {
            color: contrastText
          }),
        '& .MuiLoadingButton-loadingIndicator': {
          color: contrastText
        },
        '&:hover': {
          backgroundColor: dark,
          color: contrastText
        },
        ...commonShadow
      };
    case 'shadow':
      return {
        boxShadow: shadows,
        backgroundColor: main,
        ...(loadingPosition &&
          loadingPosition !== 'center' && {
            color: contrastText
          }),
        '& .MuiLoadingButton-loadingIndicator': {
          color: contrastText
        },
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: dark,
          color: contrastText
        },
        ...commonShadow
      };
    case 'outlined':
      return {
        backgroundColor: 'transparent',
        borderColor: main,
        ...loadingColor,
        ...loadingIndicator
      };
    case 'dashed':
      return {
        backgroundColor: lighter,
        borderColor: main,
        ...loadingColor,
        ...loadingIndicator,
        ...commonShadow
      };
    case 'text':
    default:
      return {
        color: main,
        ...loadingIndicator,
        ...commonShadow
      };
  }
}

const LoadingButtonStyle = styled(MuiLoadingButton, { shouldForwardProp: (prop) => prop !== 'shape' && prop !== 'variant' })(
  ({ theme, variant, shape, color, loading, loadingPosition }) => ({
    '::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      borderRadius: shape === 'rounded' ? '50%' : 8,
      opacity: 0,
      transition: 'all 0.5s'
    },

    ':active::after': {
      position: 'absolute',
      borderRadius: shape === 'rounded' ? '50%' : 8,
      left: 0,
      top: 0,
      opacity: 1,
      transition: '0s'
    },
    ...(variant === 'text' && {
      ...getColorStyle({ variant, theme, color, loadingPosition }),
      '&.MuiButton-sizeMedium': {
        height: 36
      },
      '&.MuiButton-sizeSmall': {
        height: 30
      },
      '&.MuiButton-sizeLarge': {
        height: 44
      }
    }),
    ...(shape && {
      padding: 0,
      minWidth: 0,
      '&.MuiButton-sizeMedium': {
        width: 36,
        height: 36
      },
      '&.MuiButton-sizeSmall': {
        width: 30,
        height: 30
      },
      '&.MuiButton-sizeLarge': {
        width: 44,
        height: 44
      },
      ...(shape === 'rounded' && {
        borderRadius: '50%'
      })
    }),

    ...(variant === 'outlined' && {
      border: '1px solid'
    }),
    ...(variant === 'dashed' && {
      border: '1px dashed'
    }),
    ...((variant === 'contained' || variant === 'shadow') &&
      !loading && {
        color: '#fff'
      }),
    ...(variant !== 'text' && {
      ...getColorStyle({ variant, theme, color, loadingPosition })
    }),

    '&.Mui-disabled': {
      ...(variant !== 'text' && {
        ...getColorStyle({ variant, theme, color, loadingPosition })
      })
    }
  })
);

// ==============================|| LOADING BUTTON - EXTENDED ||============================== //

function LoadingButton({ variant = 'text', shape, children, color = 'primary', ...others }, ref) {
  const theme = useTheme();

  return (
    <LoadingButtonStyle
      ref={ref}
      variant={variant}
      shape={shape}
      theme={theme}
      loadingPosition={others.loadingPosition}
      loading={others.loading}
      color={color}
      {...others}
    >
      {children}
    </LoadingButtonStyle>
  );
}

LoadingButton.displayName = 'LoadingButton';

export default forwardRef(LoadingButton);

getColorStyle.propTypes = { variant: PropTypes.any, theme: PropTypes.any, color: PropTypes.any, loadingPosition: PropTypes.any };

LoadingButton.propTypes = {
  variant: PropTypes.string,
  shape: PropTypes.any,
  children: PropTypes.node,
  color: PropTypes.string,
  others: PropTypes.any
};
