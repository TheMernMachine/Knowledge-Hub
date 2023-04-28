import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';
import { styled } from '@mui/material/styles';
import { Grid, Link, Container, Typography, TextField, Button } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import { GET_COURSES } from '../../utils/queries';
import { ADD_ASSIGNMENT } from '../../utils/mutations';
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
    const { loading, data } = useQuery(GET_COURSES);
    const courses = data?.getCourses || [];

    const [formState, setFormState] = useState({
        title: '',
        question: '',
        dueDate: '',
        courseId: '',
    });

    const [addAssignment, { error }] = useMutation(ADD_ASSIGNMENT);

    const mdUp = useResponsive('up', 'md');
    const { quill, quillRef } = useQuill();
    const [quillState, setQuillState] = useState('');

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                const question = quill.getText();
                setQuillState(question);
            });
        }
    }, [quill]);


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("title: ", formState.title)
            console.log("question: ", quillState)
            console.log("dueDate: ", formState.dueDate)
            console.log("courseId: ", formState.courseId)
            const mutationResponse = await addAssignment({
                variables: {
                    title: formState.title,
                    question: quillState,
                    dueDate: formState.dueDate,
                    courseId: formState.courseId,
                },
            });
            if (mutationResponse) {
                const token = mutationResponse.data.addAssignment.token;
                localStorage.setItem('token', token);
                window.location.assign('/dashboard');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleInputChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <Helmet>
                <title>Create New Assignment</title>
            </Helmet>

            <Container maxWidth="sm">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Create New Assignment</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography>
                            <Link
                                onClick={() => window.location.assign('/dashboard/assignments')}
                                variant="subtitle2"
                                sx={{ cursor: 'pointer' }}>Cancel</Link>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Enter the details of your new assignment below:
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Title"
                            name="title"
                            value={formState.title}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <div style={{ width: 600, height: 300 }}>
                            <div ref={quillRef} />
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Due Date"
                            name="dueDate"
                            value={formState.dueDate}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            sx={{ mt: 10 }}
                            onClick={handleFormSubmit}
                        >
                            Create Assignment
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}