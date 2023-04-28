import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GET_ASSIGNMENT } from '../utils/queries';
import AssignmentPostCard from '../sections/@dashboard/Assignments/AssignmentPostCard';
import SubmitForm from '../components/forms/SubmitForm';

const theme = createTheme();

export default function SingleAssignmentPage() {
    const { _id: assignmentId } = useParams();
    console.log(assignmentId);
    const { loading, data } = useQuery(GET_ASSIGNMENT,
    { variables: { id: `${assignmentId}` } });
    const assignment = data?.assignment || [];
    console.log(assignment);

    return (
        <>
            <Helmet>
                <title>Assignment Page </title>
            </Helmet>

            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">

                    <AssignmentPostCard key={assignment._id} assignment={assignment} index={0} />

                    <Typography variant="h3" align='center' pt={10} color='primary.darker' >
                        {assignment.title}
                    </Typography>
                    <Typography variant="h6" align='center' fontStyle={'italic'} color='primary.main' >
                        This Assignment will be due on:
                    </Typography>
                    <Typography variant="h6" align='center' underline='always'>
                        {assignment.dueDate}
                    </Typography>
                    <Typography variant="h5" align='center' pt={3} fontStyle={'italic'} color='primary.main' >
                        This Assignment's Instructions:
                    </Typography>
                    <Typography variant="h6" align='center' >
                        {assignment.question}
                    </Typography>
                    <SubmitForm type={'Assignment'} />
                </Container>

            </ThemeProvider>


        </>
    );
}
