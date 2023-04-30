// hooks
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Button } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import { LoginForm } from '../sections/auth/login';

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

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/register', { replace: true });
  }

  return (
    <>
      <Helmet>
        <title> Knowledge-Hub </title>
      </Helmet>

      <StyledRoot>
      
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back to Knowledge-Hub
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

          <Container maxWidth="sm">
            <StyledContent>
              <Typography variant="h4" gutterBottom>
                Sign in to Knowledge-Hub
              </Typography>

              <Typography variant="body2" sx={{ mb: 5 }}>
                Don’t have an account? {''}
                <Link variant='subtitle2' sx={{cursor: 'pointer'}} onClick={handleLoginRedirect}> Get Started </Link>
              </Typography>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  OR
                </Typography>
              </Divider>

              <LoginForm />
            </StyledContent>
          </Container>
      </StyledRoot>
    </>
  );
}
