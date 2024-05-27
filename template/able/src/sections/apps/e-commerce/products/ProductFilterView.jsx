import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// project-imports
import ColorOptions from './ColorOptions';
import IconButton from 'components/@extended/IconButton';

// assets
import { Add } from 'iconsax-react';

function getColor(color) {
  return ColorOptions.filter((item) => item.value === color);
}

// ==============================|| PRODUCT - FILTER VIEW ||============================== //

export default function ProductFilterView({ filter, filterIsEqual, handelFilter, initialState }) {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {!filterIsEqual(initialState, filter) && (
        <Stack spacing={2}>
          <Typography variant="h5">Active Filters</Typography>
          {!(initialState.search === filter.search) && (
            <Grid item>
              <Stack direction="row" alignItems="center" sx={{ ml: '-10px' }}>
                <Chip
                  size={matchDownMD ? 'small' : undefined}
                  label={filter.search}
                  sx={{
                    borderRadius: '4px',
                    textTransform: 'capitalize',
                    color: 'secondary.main',
                    bgcolor: 'inherit',
                    '& .MuiSvgIcon-root': { color: `grey` }
                  }}
                />
                <IconButton
                  color="secondary"
                  size="small"
                  sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                  onClick={() => handelFilter('search', '')}
                >
                  <Add style={{ transform: 'rotate(45deg)' }} />
                </IconButton>
              </Stack>
            </Grid>
          )}
          {!(initialState.sort === filter.sort) && (
            <Grid item>
              <Stack>
                <Typography variant="subtitle1">Sort</Typography>
                <Stack direction="row" alignItems="center" sx={{ ml: '-10px' }}>
                  <Chip
                    size={matchDownMD ? 'small' : undefined}
                    label={filter.sort}
                    sx={{
                      borderRadius: '4px',
                      textTransform: 'capitalize',
                      color: 'secondary.main',
                      bgcolor: 'inherit',
                      '& .MuiSvgIcon-root': { color: `grey` }
                    }}
                  />
                  <IconButton
                    color="secondary"
                    size="small"
                    sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                    onClick={() => handelFilter('sort', initialState.sort)}
                  >
                    <Add style={{ transform: 'rotate(45deg)' }} />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
          )}
          {!(JSON.stringify(initialState.gender) === JSON.stringify(filter.gender)) && (
            <Grid item>
              <Stack>
                <Typography variant="subtitle1">Gender</Typography>
                <Grid container item sx={{ ml: '-10px' }}>
                  {filter.gender.map((item, index) => (
                    <Stack direction="row" alignItems="center" key={index}>
                      <Chip
                        size={matchDownMD ? 'small' : undefined}
                        label={item}
                        sx={{
                          borderRadius: '4px',
                          textTransform: 'capitalize',
                          color: 'secondary.main',
                          bgcolor: 'inherit',
                          '& .MuiSvgIcon-root': { color: `grey` }
                        }}
                      />
                      <IconButton
                        color="secondary"
                        size="small"
                        sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                        onClick={() => handelFilter('gender', item)}
                      >
                        <Add style={{ transform: 'rotate(45deg)' }} />
                      </IconButton>
                    </Stack>
                  ))}
                </Grid>
              </Stack>
            </Grid>
          )}
          {!(JSON.stringify(initialState.categories) === JSON.stringify(filter.categories)) && filter.categories.length > 0 && (
            <Grid item>
              <Stack>
                <Typography variant="subtitle1">Categories</Typography>
                <Grid container item sx={{ ml: '-10px' }}>
                  {filter.categories.map((item, index) => (
                    <Stack direction="row" alignItems="center" key={index}>
                      <Chip
                        size={matchDownMD ? 'small' : undefined}
                        label={item}
                        sx={{
                          borderRadius: '4px',
                          textTransform: 'capitalize',
                          color: 'secondary.main',
                          bgcolor: 'inherit',
                          '& .MuiSvgIcon-root': { color: `grey` }
                        }}
                      />
                      <IconButton
                        color="secondary"
                        size="small"
                        sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                        onClick={() => handelFilter('categories', item)}
                      >
                        <Add style={{ transform: 'rotate(45deg)' }} />
                      </IconButton>
                    </Stack>
                  ))}
                </Grid>
              </Stack>
            </Grid>
          )}
          {!(JSON.stringify(initialState.colors) === JSON.stringify(filter.colors)) && (
            <Grid item>
              <Stack>
                <Typography variant="subtitle1">Colors</Typography>
                <Grid container item sx={{ ml: '-10px' }}>
                  {filter.colors.map((item, index) => {
                    const colorsData = getColor(item);
                    return (
                      <Stack direction="row" alignItems="center" key={index}>
                        <Chip
                          size={matchDownMD ? 'small' : undefined}
                          label={colorsData[0].label}
                          sx={{
                            borderRadius: '4px',
                            textTransform: 'capitalize',
                            color: 'secondary.main',
                            bgcolor: 'inherit',
                            '& .MuiSvgIcon-root': { color: `grey` }
                          }}
                        />
                        <IconButton
                          color="secondary"
                          size="small"
                          sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                          onClick={() => handelFilter('colors', item)}
                        >
                          <Add style={{ transform: 'rotate(45deg)' }} />
                        </IconButton>
                      </Stack>
                    );
                  })}
                </Grid>
              </Stack>
            </Grid>
          )}
          {!(initialState.price === filter.price) && (
            <Grid item>
              <Stack>
                <Typography variant="subtitle1">Price</Typography>
                <Grid item sx={{ ml: '-10px' }}>
                  <Chip
                    size={matchDownMD ? 'small' : undefined}
                    label={filter.price}
                    sx={{
                      borderRadius: '4px',
                      textTransform: 'capitalize',
                      color: 'secondary.main',
                      bgcolor: 'inherit',
                      '& .MuiSvgIcon-root': { color: `grey` }
                    }}
                  />
                </Grid>
              </Stack>
            </Grid>
          )}
          {!(initialState.rating === filter.rating) && (
            <Grid item>
              <Stack>
                <Typography variant="subtitle1">Rating</Typography>
                <Grid item sx={{ ml: '-10px' }}>
                  <Stack direction="row" alignItems="center">
                    <Chip
                      size={matchDownMD ? 'small' : undefined}
                      label={String(filter.rating)}
                      sx={{
                        borderRadius: '4px',
                        textTransform: 'capitalize',
                        color: 'secondary.main',
                        bgcolor: 'inherit',
                        '& .MuiSvgIcon-root': { color: `grey` }
                      }}
                    />
                    <IconButton
                      color="secondary"
                      size="small"
                      sx={{ '&:hover': { bgcolor: 'transparent' }, ml: -1.5 }}
                      onClick={() => handelFilter('rating', '', 0)}
                    >
                      <Add style={{ transform: 'rotate(45deg)' }} />
                    </IconButton>
                  </Stack>
                </Grid>
              </Stack>
            </Grid>
          )}
          <Grid item>
            <Button variant="text" color="primary" sx={{ ml: '-10px' }} onClick={() => handelFilter('reset', '')}>
              Reset all filters
            </Button>
          </Grid>
          <Grid item>
            <Divider sx={{ ml: '-8%', mr: '-8%' }} />
          </Grid>
        </Stack>
      )}
    </>
  );
}

ProductFilterView.propTypes = {
  filter: PropTypes.any,
  filterIsEqual: PropTypes.func,
  handelFilter: PropTypes.func,
  initialState: PropTypes.any
};
