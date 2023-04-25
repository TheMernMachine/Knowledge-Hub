import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';
// react-bootstrap
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
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

export default function NewAssignmentForm() {
    const mdUp = useResponsive('up', 'md');
    const { quill, quillRef } = useQuill();

    return (
        <>
            <Helmet>
                <title> Create New Assignment </title>
            </Helmet>

            <StyledRoot>

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4">
                            Create New Assignment
                        </Typography>
                        <Typography>
                            <Link variant="subtitle2">Cancel</Link>
                        </Typography>

                        <Typography sx={{ color: 'text.secondary' }}>
                            Enter the details of your new assignment below:
                        </Typography>

                      
                        <div style={{ width: 600, height: 300 }}>
                            <div ref={quillRef} />
                        </div>
                        
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
                        sx={{ mt: 10 }}
                        >
                            Create Assignment
                        </Button>
                    </StyledContent>

                </Container>

            </StyledRoot>


        </>
    );
}