import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';
import { Grid, Link, Container, Typography, TextField, Button, MenuItem, Select } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import { GET_COURSES, GET_ME, GET_QUIZ } from '../../utils/queries';
import { ADD_QUIZ, ADD_QUIZ_QUESTION } from '../../utils/mutations';
import Iconify from '../iconify';

// ----------------------------------------------------------------------
export default function NewQuizForm() {
    const { loading, data } = useQuery(GET_COURSES);
    const { loading: loading2, data: data2 } = useQuery(GET_ME);
    const user = data2?.me || {};
    const courses = data?.courses || [];

    const availableCourses = courses.filter(course => course.teacher._id === user._id);

    // state for quiz Id
    const [quizId, setQuizId] = useState('false');
    // Create for quiz details
    const [quizState, setQuizState] = useState({
        title: '',
        dueDate: '',
        courseId: '',
    });

    // state for quiz questions
    const [quizQuestionState, setQuizQuestionState] = useState({
        title: '',
        options: [],
        answer: '',
    });

    const [addQuiz, { error }] = useMutation(ADD_QUIZ);
    const [addQuizQuestion, { error2 }] = useMutation(ADD_QUIZ_QUESTION);

    const mdUp = useResponsive('up', 'md');

    const handleAddQuestion = async () => {
        let tempKey = quizId;
        if (quizId === 'false') {
            if (!quizState.title || !quizState.dueDate || !quizState.courseId) {
                return false;
            }

            try {
                const { data } = await addQuiz({ variables: quizState });
                setQuizId(data.addQuiz._id);
                // State variable isn't always available immediately after setting it
                tempKey = data.addQuiz._id;
            } catch (e) {
                console.error(e);
            }

        }


        if (quizQuestionState.title && quizQuestionState.options && quizQuestionState.answer) {
            try {
                await addQuizQuestion({ variables: { ...quizQuestionState, quizId: tempKey } });
                setQuizQuestionState({ title: '', options: [], answer: '' });
                return true;
            } catch (e) {
                console.error(e);
            }
        }

        return false;
    };

    const handleAddQuiz = async () => {
        try {
            // Add last question if any
            const success = await handleAddQuestion();
            if (success) {
                setQuizState({ title: '', dueDate: '', courseId: '' });
            }
        } catch (e) {
            console.error(e);
        }
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
                        {availableCourses.map((course) => (
                            <Button
                                fullWidth
                                variant="contained"
                                value={quizState.courseId}
                                onClick={(event) =>
                                    setQuizState({ ...quizState, courseId: course._id})
                                }
                            >
                                <MenuItem key={course.id} value={course.id}>
                                    {course.title}
                                </MenuItem>
                            </Button>

                        ))}

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
                            onClick={handleAddQuestion}
                        >

                            Add Another Question
                        </Button>

                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            onClick={handleAddQuiz}
                        >
                            Create Quiz
                        </Button>
                    </Grid>
                </Grid>
            </Container >
        </>

    );
}