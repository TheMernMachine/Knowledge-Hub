import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GET_QUIZ } from '../utils/queries';
import Iconify from '../components/iconify';

const theme = createTheme();

export default function SinglequizPage() {
    const { _id } = useParams();
    const { loading, data } = useQuery(GET_QUIZ,
        { variables: { quizId: `${_id}` } });

    const quiz = data?.getSingleQuiz || [];
    const questions = quiz.questions || [];
    console.log(quiz);
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
                        {quiz.due_date}
                    </Typography>
                    <Typography variant="h5" align='center' pt={3} fontStyle={'italic'} color='primary.main' >
                        Please Answer the Following Questions:
                        <div>
                            ______________________________________________________________
                        </div>
                        {questions.map((question, index) => (
                            <>
                            <div key={index}>
                                <Typography variant="h5" align='center' color='common.black' fontWeight={'bold'} sx={{ m: 2 }} >
                                    {question.title}
                                </Typography>

                                {question.options.map((option, index) => (
                                    <Button key={index} variant="contained" sx={{ m: 2 }} >
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
                    >
                        Submit Quiz
                    </Button>
                </Container>
            </ThemeProvider>
        </>
    );
}
