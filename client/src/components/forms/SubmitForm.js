import React, { useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';
// react-bootstrap
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Button } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../logo';
import Iconify from '../iconify';

// ----------------------------------------------------------------------


const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledEditor = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 6
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

}));

// ----------------------------------------------------------------------

export default function SubmitForm({ type }) {
    const mdUp = useResponsive('up', 'md');
    const { quill, quillRef } = useQuill();

    return (
        <>
                <Container maxWidth="sm" align='center' sx={{mt: 5}}>
                    <Typography variant="h4">
                        Submit {type}
                    </Typography>
                    <Typography sx={{m: 2}}>
                        <Link variant="subtitle2" 
                        onClick={() => window.location.assign('/dashboard/assignments')}
                        sx={{ cursor: 'pointer' }}
                        >Cancel</Link>
                    </Typography>

                    <Typography sx={{ color: 'text.secondary'}}>
                        Submit your {type}  here:
                    </Typography>

                    <StyledEditor>
                    <div style={{ width: 600, height: 300 }}>
                        <div ref={quillRef} />
                    </div>
                    </StyledEditor>

                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
                        sx={{ mt: 10 }}
                    >
                        Submit {type}
                    </Button>

                </Container>
        </>
    );
}