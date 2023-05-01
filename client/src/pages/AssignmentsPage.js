import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { GET_ASSIGNMENTS, GET_ME } from '../utils/queries';
import Iconify from '../components/iconify';
import AssignmentPostCard from '../sections/@dashboard/Assignments/AssignmentPostCard';

// ----------------------------------------------------------------------

export default function AssignmentsPage() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GET_ASSIGNMENTS);
  const { loading: loading2, data: userData } = useQuery(GET_ME);
  const assignments = data?.assignments || [];
  const user = userData?.me || {};

  const handleOnClick = () => {
    const url = '/dashboard/assignments/new';
    navigate(url);
  }

  if (loading || loading2) {return <div>Loading...</div>}

  if (user.role.name === 'student') {
    return (
      <>
        <Helmet>
          <title>Assignments Page </title>
        </Helmet>

        <Container>
          <Grid container spacing={3}>

            {assignments.map((assignment, index) => (
              <AssignmentPostCard key={assignment._id} assignment={assignment} index={index} />
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
          <title>Assignments Page </title>
        </Helmet>

        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Assignments
            </Typography>
            <Button onClick={handleOnClick} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Assignment
            </Button>
          </Stack>
          <Grid container spacing={3}>

            {assignments.map((assignment, index) => (
              <AssignmentPostCard key={assignment._id} assignment={assignment} index={index} />
            ))}

          </Grid>
        </Container>
      </>
    );
  }
}
