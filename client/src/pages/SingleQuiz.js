import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Grid, Container, Typography, Button, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GET_QUIZ, GET_ME } from '../utils/queries';
import { ADD_QUIZ_RESPONSE } from '../utils/mutations';
import Iconify from '../components/iconify';
import { AppWidgetSummary } from '../sections/@dashboard/app';

const theme = createTheme();

export default function SinglequizPage() {
    const { _id } = useParams();
    const { loading, data } = useQuery(GET_QUIZ,
        { variables: { quizId: _id } });

    const { loading: loading1, data: data1 } = useQuery(GET_ME);
    const user = data1?.me || {};

    const [addQuizResponse, { error }] = useMutation(ADD_QUIZ_RESPONSE);

    const quiz = data?.getSingleQuiz || [];
    const questions = quiz.questions || [];


    // Track quiz states
    const [score, setScore] = useState(0);
    const [responsesArray, setResponsesArray] = useState([]);

    const checkAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            setScore(score + 1);
        }

        setResponsesArray([...responsesArray, answer]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const scores = (score / questions.length) * 100;

        const studentResponse = {
            responses: responsesArray,
            student: user._id,
            rawScore: scores,
            quizId: _id
        };

        try {
            const { data } = await addQuizResponse({
                variables: studentResponse
            });
            console.log("data: ", data);
        } catch (e) {
            console.error(e);
        }
    };



    if (loading || loading1) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Helmet>
                <title>Quiz Page </title>
            </Helmet>
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">
                    <Typography variant="h1" align='center' color='primary.main' fontWeight={'bolder'} >
                        {quiz.title}
                    </Typography>
                    <Typography sx={{m: 2}}>
                        <Link variant="subtitle2" 
                        onClick={() => window.location.assign('/dashboard/quizzes')}
                        sx={{ cursor: 'pointer', textAlign: 'center' }}
                        >Cancel</Link>
                    </Typography>
                    <Typography variant="h6" align='center' fontStyle={'italic'} color='primary.light' >
                        This quiz will be due on:
                    </Typography>
                    <Typography variant="h6" align='center' underline='always'>
                        {quiz.dueDate}
                    </Typography>
                    <Grid container spacing={3} sx={{ m: 2 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary title="Timer" total={714000} color="info" icon={'ant-design:android-filled'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary title="Duration" total={1352831} color="warning" icon={'ant-design:apple-filled'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary title="Score" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3} color="error" >
                            <AppWidgetSummary title="Grade" total={234} color="error" icon={'ant-design:bug-filled'} />
                        </Grid>
                    </Grid>
                    <Typography variant="h5" align='center' pt={3} fontStyle={'italic'} color='primary.main' >
                        Please Answer the Following Questions:
                        <div>
                            ______________________________________________________________
                        </div>
                        {questions.map((question, index) => (
                            <>
                            <div key={index}>
                                <Typography variant="h5" align='center' color='common.black' fontWeight={'bold'} sx={{ m: 2 }} >
                                        ({index + 1}.) {question.title}
                                </Typography>

                                    {question.options.map((option, index) => (
                                        <Button key={index} variant="contained" sx={{ m: 2 }} onClick={() => { checkAnswer(option, question.answer); }}>
                                        {option}
                                    </Button>
                                ))}
                            </div>
                                <div>
                                    ______________________________________________________________
                                </div>
                            </>
                        ))}
                    </Typography>
                    <Button variant="contained" align="center" startIcon={<Iconify icon="eva:plus-fill" />}
                        sx={{ mt: 10 }}
                        onClick={handleSubmit}
                    >
                        Submit Quiz
                    </Button>
                </Container>
            </ThemeProvider>
        </>
    );
}
