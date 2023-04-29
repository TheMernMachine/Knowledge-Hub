import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import { GET_ME } from '../../../utils/queries';
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import Words from '../../../_mock/Words';
import { navConfigStudent, navConfigTeacher } from './config';
import bulb from '../../../assets/images/icons/innovation.png';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};


export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const [wordDefinition, setWordDefinition] = useState('');
  const isDesktop = useResponsive('up', 'lg');
  const { loading, error, data } = useQuery(GET_ME);
  const user = data?.me || {};
  const fullName = `${user.firstName} ${user.lastName}`;
  const [word, setWord] = useState(Words[Math.floor(Math.random() * Words.length)]);


  const definitionFetch = async () => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    return data[0].meanings[0].definitions[0].definition;
  }

  useEffect(() => {
    const fetchDefinition = async () => {
      const definition = await definitionFetch();
      setWordDefinition(definition);
    };

    fetchDefinition();
  }, []);


  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  if (!loading) {
    const navConfig = user.role.name === 'teacher' ? navConfigTeacher : navConfigStudent;
    const renderContent = (
      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        }}
      >
        <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
          <Logo />
        </Box>

        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none">
            <StyledAccount>
              <Avatar src={'/assets/images/avatars/avatar_default.jpg'} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {fullName}
                </Typography>
              </Box>
            </StyledAccount>
          </Link>
        </Box>

        <NavSection data={navConfig} />

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ px: 2.5, pb: 3 }}>
          <Stack alignItems="center" spacing={3} sx={{ mb: 15, pt: 3, position: 'relative' }}>
            <Box
              component="img"
              src={bulb}
              alt="bulb"
              sx={{ height: 55 }}
            />
            <Typography variant="h5" sx={{ color: 'text.secondary' }}>
              Word Of The Day
            </Typography>

            <Typography variant="h5" sx={{ color: 'darkblue' }} textTransform={'capitalize'}>
              {word}
            </Typography>
            <Typography gutterBottom variant="body1" fontStyle={'italic'}>
              {wordDefinition}
            </Typography>
          </Stack>
        </Box>
      </Scrollbar>
    );

    return (
      <Box
        component="nav"
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: NAV_WIDTH },
        }}
      >
        {isDesktop ? (
          <Drawer
            open
            variant="permanent"
            PaperProps={{
              sx: {
                width: NAV_WIDTH,
                bgcolor: 'background.default',
                borderRightStyle: 'dashed',
              },
            }}
          >
            {renderContent}
          </Drawer>
        ) : (
          <Drawer
            open={openNav}
            onClose={onCloseNav}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              sx: { width: NAV_WIDTH },
            }}
          >
            {renderContent}
          </Drawer>
        )}
      </Box>
    );
  }
}
