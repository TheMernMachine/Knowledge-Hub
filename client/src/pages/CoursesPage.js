import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { GET_USERS_COURSES } from '../utils/queries';
import Iconify from '../components/iconify';
import CourseCard from '../components/CourseComponents/CourseCard';

// ----------------------------------------------------------------------

export default function CoursesPage() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GET_USERS_COURSES);
  console.log(data)
  const courses = data?.userCourses || [];

  if (loading) { return <div>Loading...</div>; }
  return (
    <>
      <Helmet>
        <title>Courses Page </title>
      </Helmet>

      <Container maxWidth="lg">
        <Typography variant='h2' align='center' pt={10} color='primary.darker'>Courses</Typography>
        <Grid container py={4} spacing={4}>
          {courses.map((course) => (
            <CourseCard course={course} />
          ))}
        </Grid>
      </Container>
    </>
  );
}