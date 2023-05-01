import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { GET_QUIZZES, GET_ME } from '../utils/queries';
import Iconify from '../components/iconify';
import QuizCard from '../sections/@dashboard/Assignments/QuizCard';

// ----------------------------------------------------------------------

export default function QuizzesPage() {
    const { loading, data } = useQuery(GET_QUIZZES);
    const { loading: loading2, data: userData } = useQuery(GET_ME);
    const quizzes = data?.getQuiz || [];
    const user = userData?.me || {};

    if (loading || loading2) { return <div>Loading...</div>; }

    if (user.role.name === 'student') {
        return (
            <>
                <Helmet>
                    <title>Quizzes</title>
                </Helmet>

                <Container>
                    <Grid container spacing={3}>
                        {quizzes.map((quiz, index) => (
                            <QuizCard key={quiz._id} quiz={quiz} index={index} />
                        ))}
                    </Grid>
                </Container>
            </>
        );
    }


    if (user.role.name === 'teacher' || user.role.name === 'admin') {
        return (
            <>
                <Helmet>
                    <title>Quizzes</title>
                </Helmet>

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Quiz
                        </Typography>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => window.location.assign('/dashboard/quizzes/new')}>
                            New Quiz
                        </Button>
                    </Stack>
                    <Grid container spacing={3}>
                        {quizzes.map((quiz, index) => (
                            <QuizCard key={quiz._id} quiz={quiz} index={index} />
                        ))}
                    </Grid>
                </Container>
            </>
        );
    }
}
