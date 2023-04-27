import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';
import { styled } from '@mui/material/styles';
import { Grid, Link, Container, Typography, TextField, Button, MenuItem, Select } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import { GET_COURSES } from '../../utils/queries';
import { ADD_QUIZ, ADD_QUIZ_QUESTION } from '../../utils/mutations';
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
export default function NewQuizForm() {
    const { loading, data } = useQuery(GET_COURSES);
    const courses = data?.getCourses || [];

    const [quizState, setQuizState] = useState({
        title: '',
        question: '',
        dueDate: '',
        courseId: '',
    });

    const [quizQuestionState, setQuizQuestionState] = useState({
        id: '',
        title: '',
        options: [],
        answer: '',

    });


    const [addQuiz, { error }] = useMutation(ADD_QUIZ);
    const [addQuizQuestion, { error2 }] = useMutation(ADD_QUIZ_QUESTION);

    const mdUp = useResponsive('up', 'md');

    const handleInputChange = (event) => {
        console.log("clicked");
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('quizState: ', quizState);
        console.log('quizQuestionState: ', quizQuestionState);
    };

    const handleAddQuestion = async (event) => {
        event.preventDefault();
        console.log('quizQuestionState: ', quizQuestionState);
    };


    return (
        <>
            <Helmet>
                <title>Create New Quiz</title>
            </Helmet>
            <Container maxWidth="sm">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Create New Quiz</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            <Link
                                onClick={() => window.location.assign('/dashboard/quizzes')}
                                variant="subtitle2"
                                sx={{ cursor: 'pointer' }}
                            >
                                Cancel
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Enter the details of your new quiz below:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Quiz Title"
                            name="title"
                            value={quizState.title}
                            onChange={(event) =>
                                setQuizState({ ...quizState, title: event.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Due Date"
                            name="dueDate"
                            type="date"
                            value={quizState.dueDate}
                            onChange={(event) =>
                                setQuizState({ ...quizState, dueDate: event.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Select Course:</Typography>
                        <Select
                            fullWidth
                            value={quizState.courseId}
                            onChange={(event) =>
                                setQuizState({ ...quizState, courseId: event.target.value })
                            }
                        >
                            {courses.map((course) => (
                                <MenuItem key={course.id} value={course.id}>
                                    {course.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Question Title"
                            name="questionTitle"
                            value={quizQuestionState.title}
                            onChange={(event) =>
                                setQuizQuestionState({
                                    ...quizQuestionState,
                                    title: event.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Options:</Typography>
                        {quizQuestionState.options.map((option, index) => (
                            <div key={index}>
                                <TextField
                                    required
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    label={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(event) => {
                                        const newOptions = [...quizQuestionState.options];
                                        newOptions[index] = event.target.value;
                                        setQuizQuestionState({
                                            ...quizQuestionState,
                                            options: newOptions,
                                        });
                                    }}
                                />
                                {quizQuestionState.options.length > 1 && (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                            const newOptions = [...quizQuestionState.options];
                                            newOptions.splice(index, 1);
                                            setQuizQuestionState({
                                                ...quizQuestionState,
                                                options: newOptions,
                                            });
                                        }}
                                    >
                                        Remove Option
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            sx={{ mt: 2 }}
                            onClick={() =>
                                setQuizQuestionState({
                                    ...quizQuestionState,
                                    options: [...quizQuestionState.options, ''],
                                })
                            }
                        >
                            Add Option
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Select Correct Answer:</Typography>
                        <Select
                            fullWidth
                            value={quizQuestionState.answer}
                            onChange={(event) =>
                                setQuizQuestionState({ ...quizQuestionState, answer: event.target.value })
                            }
                        >
                            {quizQuestionState.options.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            sx={{ mt: 2 }}
                            onClick={async () => {
                                await handleAddQuestion();
                                setQuizQuestionState({
                                    id: '',
                                    title: '',
                                    options: [],
                                    answer: '',
                                });
                            }}
                        >
                            Add Another Question
                        </Button>

                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            onClick={handleFormSubmit}
                        >
                            Create Quiz
                        </Button>
                    </Grid>
                </Grid>

            </Container >
        </>

    );
}