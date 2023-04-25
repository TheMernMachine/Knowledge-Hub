import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import { GET_ASSIGNMENTS, GET_ASSIGNMENT } from '../utils/queries';
import Iconify from '../components/iconify';
import  AssignmentPostCard  from '../sections/@dashboard/blog/AssignmentPostCard';

// ----------------------------------------------------------------------

export default function AssignmentPage() {
//   const { loading, data } = useQuery(GET_ASSIGNMENTS);
//   const assignments = data?.assignments || [];
//   return (
//     <>
//       <Helmet>
//         <title>Assignment Page </title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//           <Typography variant="h4" gutterBottom>
//             Blog
//           </Typography>
//           <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
//             New Post
//           </Button>
//         </Stack>
//         <Grid container spacing={3}>
//           {assignments.map((assignment, index) => (
//             <AssignmentPostCard key={assignment._id} assignment={assignment} index={index} />
//           ))}
//         </Grid>
//       </Container>
//     </>
//   );
}
