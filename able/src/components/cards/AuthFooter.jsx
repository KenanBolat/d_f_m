import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

export default function AuthFooter() {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        spacing={2}
        textAlign={matchDownSM ? 'center' : 'inherit'}
      >
        <Typography variant="subtitle2" color="secondary">
          Able Pro ♥ crafted by Team{' '}
          <Typography
            component={Link}
            variant="subtitle2"
            href="https://themeforest.net/user/phoenixcoded/portfolio"
            target="_blank"
            underline="hover"
          >
            Phoenixcoded
          </Typography>
        </Typography>

        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={matchDownSM ? 1 : 3} textAlign={matchDownSM ? 'center' : 'inherit'}>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://phoenixcoded.gitbook.io/able-pro/v/react/"
            target="_blank"
            underline="hover"
          >
            Documentation
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://phoenixcoded.authordesk.app/"
            target="_blank"
            underline="hover"
          >
            Support
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://themeforest.net/user/phoenixcoded#contact"
            target="_blank"
            underline="hover"
          >
            Contact
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
