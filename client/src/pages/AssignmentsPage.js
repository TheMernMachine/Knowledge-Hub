import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { GET_ASSIGNMENTS } from '../utils/queries';
import Iconify from '../components/iconify';
import AssignmentPostCard from '../sections/@dashboard/Assignments/AssignmentPostCard';


// ----------------------------------------------------------------------

export default function AssignmentsPage() {
  const { loading, data } = useQuery(GET_ASSIGNMENTS);
  console.log(data)
  const assignments = data?.assignments || [];
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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
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
