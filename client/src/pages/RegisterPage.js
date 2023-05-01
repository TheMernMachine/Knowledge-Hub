import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { SignUpForm } from '../sections/auth/signUp';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  backgroundColor: theme.palette.grey[400],
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/', { replace: true });
  }
  return (
    <>
      <Helmet>
        <title> Register | Knowledge-Hub </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome To Knowledge-Hub
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="register" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Get started absolutely free.
            </Typography>

            <Typography variant='body2' sx={{ mb: 5 }}>
              Have an account already? {''}
              <Link variant='subtitle2' sx={{cursor: 'pointer'}} onClick={handleLoginRedirect}>Get Back To Learning</Link>
            </Typography>

            <Divider sx={{ my: 3 }}>
              <Typography variant='body2' sx={{ color: 'text.secondary'}}>
                OR
              </Typography>
            </Divider>

            <SignUpForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}