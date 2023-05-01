import { useCallback, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Grid, Container, Typography, Button, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GET_QUIZ, GET_ME, GET_STUDENT_RESPONSES } from '../utils/queries';
import { ADD_QUIZ_RESPONSE } from '../utils/mutations';
import { generateRandomTest, readUserResponse, resetUserResponse } from '../utils/helpers';
import Iconify from '../components/iconify';
import OptionsLayer from '../sections/@dashboard/Assignments/OptionsLayer';
import StatusPanel from '../sections/@dashboard/Assignments/StatusPanel';
import { AppWidgetSummary, AppWidgetInfo } from '../sections/@dashboard/app';

const theme = createTheme();
const quizDuration = 15;

export default function SinglequizPage() {
    const [addQuizResponse, { error }] = useMutation(ADD_QUIZ_RESPONSE);

    const { _id } = useParams();
    const { loading, data } = useQuery(GET_QUIZ, { variables: { quizId: _id } });

    const { loading: loading1, data: data1 } = useQuery(GET_ME);
    const user = data1?.me || {};

    const { loading: loading2, data: data2 } = useQuery(GET_STUDENT_RESPONSES, { variables: { quizId: _id, studentId: user._id } });

    // Get the previous response of the student to display the score and grade
    const previousResponse = data2?.getStudentQuizResponse;
    const quiz = data?.getSingleQuiz || [];
    const questions = quiz.questions || [];
    const scorePre = previousResponse?.rawScore || "N/A";
    const gradePre = previousResponse?.grade || 'N/A';

    // All quizzes are disabled by default
    const [allowQuiz, setAllowQuiz] = useState(false);
    const [customQuestions, setCustomQuestions] = useState(questions);
    const [activateQuiz, setActivateQuiz] = useState(false);
    const [rawScore, setRawScore] = useState(scorePre);
    const [grade, setGrade] = useState(gradePre);

    const [timer, setTimer] = useState(0);
    const [quizDisplay, setQuizDisplay] = useState("Timer");
    const [timerColor, setTimerColor] = useState('lightBlue');

    const decrementTimer = useCallback(() => {
        setTimer((oldTimer) => oldTimer - 1);
    }, []);

    useEffect(() => {
        if (timer <= 0) {
            setTimerColor('lightBlue');
            if (activateQuiz) {
                handleSubmit();
            }
            return () => clearInterval(decrementTimer);
        }

        if (timer < 11) {
            setTimerColor('#dda0dd');
        }
        const timeoutFunction = setInterval(decrementTimer, 1000);
        return () => clearInterval(timeoutFunction);
    }, [decrementTimer, timer]);

    useEffect(() => {
        setCustomQuestions(questions);
    }, [questions]);

    const updateScore = () => {
        return <StatusPanel quizId={_id} studentId={user._id} />;
    };

    const handleSubmit = async () => {
        if (!activateQuiz || !allowQuiz) return;
        clearInterval(decrementTimer);
        const scoreArray = readUserResponse('scoreArray');
        const responsesArray = readUserResponse('responseArray');
        if (scoreArray.length === 0) return;
        const studentScore = scoreArray.reduce((sum, score) => score ? sum + score : sum + 0, 0);
        const score = (studentScore / questions.length) * 100;

        const responses = responsesArray.map(response => response || "unanswered");
        resetUserResponse();

        const studentResponse = {
            responses,
            student: user._id,
            rawScore: score,
            quizId: _id
        };

        try {
            const { data } = await addQuizResponse({ variables: studentResponse });
            console.log(data);
            setRawScore(data.addQuizResponse.rawScore);
            setGrade(data.addQuizResponse.grade);
            setQuizDisplay('Time Up!');
            setAllowQuiz(false);
            updateScore();
            // setGrade(data.addQuizResponse.grade);
            // 👇 Will scroll smoothly to the top of the next section
            document.getElementById('quizPanel').scrollIntoView({ behavior: 'smooth' });
        } catch (e) {
            console.error(e);
        }

    };

    const startQuiz = () => {
        if (!allowQuiz || activateQuiz) return;
        setActivateQuiz(true);
        resetUserResponse();
        const randomQuestions = generateRandomTest(questions);
        setCustomQuestions(randomQuestions);
        setQuizDisplay('Time Remaining');
        setTimer(quizDuration);
    };

    const updateAllowQuiz = () => {
        if (allowQuiz) return;
        setAllowQuiz(true);
        setQuizDisplay("Click to Start");
    };

    const displayResults = () => {
        if (activateQuiz && !timer) {
            return (
                <>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Score" total={rawScore} color="warning" icon={'ant-design:windows-filled'} sx={{ background: 'lightBlue' }} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} color="error" >
                        <AppWidgetInfo title="Grade" total={grade} color="error" icon={'ant-design:bug-filled'} sx={{ background: '#00FFFF' }} />
                    </Grid>
                </>
            );
        }

        return (
            <StatusPanel quizId={_id} studentId={user._id} updateQuiz={updateAllowQuiz} />
        );

    };

    if (loading || loading1 || loading2) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Helmet>
                <title>Quiz Page </title>
            </Helmet>
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg" id="quizPanel" >
                    <Typography variant="h1" align='center' color='primary.main' fontWeight={'bolder'} >
                        {quiz.title}
                    </Typography>
                    <Typography sx={{m: 2}}>
                        <Link variant="subtitle2" 
                        onClick={() => window.location.assign('/dashboard/quizzes')}
                        sx={{ cursor: 'pointer', textAlign: 'center' }}
                        >Cancel</Link>
                    </Typography>
                    <Typography variant="h6" align='center' fontStyle={'italic'} color='primary.light'>
                        This quiz will be due on:
                    </Typography>
                    <Typography variant="h6" align='center' underline='always'>
                        {quiz.dueDate}
                    </Typography>

                    <Grid container spacing={3} sx={{ m: 2 }}>
                        <Grid item xs={12} sm={6} md={3} onClick={startQuiz}>
                            <AppWidgetSummary title={quizDisplay} total={timer || 'N/A'} color="warning" icon={'ant-design:android-filled'} sx={{ background: timerColor }} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppWidgetInfo title="Duration" total={`${quizDuration}s`} color="warning" icon={'ant-design:apple-filled'} sx={{ background: 'lightGreen' }} />
                        </Grid>
                        {displayResults()}
                    </Grid>

                    <Typography variant="h5" align='center' pt={3} fontStyle={'italic'} color='primary.main' >
                        Please Answer the Following Questions:
                        <div>
                            ______________________________________________________________
                        </div>
                        {customQuestions.map((question, index) => (
                            <>
                            <div key={index}>
                                <Typography variant="h5" align='center' color='common.black' fontWeight={'bold'} sx={{ m: 2 }} >
                                        ({index + 1}.) {question.title}
                                </Typography>

                                    <OptionsLayer question={question} questionNumber={index} enableQuiz={activateQuiz} />

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
