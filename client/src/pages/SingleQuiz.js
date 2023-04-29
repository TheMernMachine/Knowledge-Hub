import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Grid, Container, Typography, Button, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GET_QUIZ, GET_ME } from '../utils/queries';
import { ADD_QUIZ_RESPONSE } from '../utils/mutations';
import { randomizeArray, randomAnswers } from '../utils/helpers';
import Iconify from '../components/iconify';
import { AppWidgetSummary, AppWidgetInfo } from '../sections/@dashboard/app';

const theme = createTheme();

export default function SinglequizPage() {
    const { _id } = useParams();
    const { loading, data } = useQuery(GET_QUIZ, { variables: { quizId: _id } });

    const { loading: loading1, data: data1 } = useQuery(GET_ME);
    const user = data1?.me || {};

    const [addQuizResponse, { error }] = useMutation(ADD_QUIZ_RESPONSE);

    const quiz = data?.getSingleQuiz || [];
    const rawQuestions = quiz.questions || [];


    // Track quiz states
    const [scoreArray, setScoreArray] = useState([]);
    const [responsesArray, setResponsesArray] = useState([]);
    const [rawScore, setRawScore] = useState('N/A');
    const [grade, setGrade] = useState('N/A');
    const [timer, setTimer] = useState(60);
    const [questions, setQuestions] = useState([]);
    const [buttonColor, setButtonColor] = useState('primary');

    useEffect(() => {
        const studentQuestions = randomizeArray(rawQuestions);
        const randomQuestions = randomAnswers(studentQuestions);
        setQuestions([...randomQuestions]);
    }, [rawQuestions]);

    const checkAnswer = (answer, question) => {
        const index = questions.indexOf(question);
        const responses = [...scoreArray];
        if (answer === question.answer) {
            responses[index] = 1;
        } else {
            responses[index] = 0;
        }

        setScoreArray([...responses]);
        const answers = [...responsesArray];
        answers[index] = answer;
        setResponsesArray([...answers]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const studentScore = scoreArray.reduce((sum, score) => score ? sum + score : sum + 0, 0);
        const score = (studentScore / questions.length) * 100;
        setRawScore(score);

        const responses = responsesArray.map(response => response || "unanswered");
        const studentResponse = {
            responses,
            student: user._id,
            rawScore: score,
            quizId: _id
        };

        try {
            const { data } = await addQuizResponse({ variables: studentResponse });
            setGrade(data.addQuizResponse.grade);
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
                            <AppWidgetSummary title="Timer" total={timer} color="info" icon={'ant-design:android-filled'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetInfo title="Duration" total={"60s"} color="warning" icon={'ant-design:apple-filled'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetSummary title="Score" total={rawScore} color="warning" icon={'ant-design:windows-filled'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3} color="error" >
                            <AppWidgetInfo title="Grade" total={grade} color="error" icon={'ant-design:bug-filled'} />
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
                                        <Button key={index} color={buttonColor} variant="contained" sx={{ m: 2 }} onClick={() => { checkAnswer(option, question); }}>
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
