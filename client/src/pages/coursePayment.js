import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Typography, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { createTheme,ThemeProvider, styled } from '@mui/material/styles';
import { GET_COURSE, GET_ME } from '../utils/queries';
import { ADD_STUDENT_TO_COURSE } from '../utils/mutations';

const theme = createTheme();

export default function CoursePayment() {
  const navigate = useNavigate();
  const { _id: courseId } = useParams();

  const { loading, data } = useQuery(GET_COURSE,
    { variables: { courseId:`${courseId}` } }
  );

  const course = data?.course || [];
  console.log(course);

  const { loading: loading2, data: data2 } = useQuery(GET_ME);
  const me = data2?.me || [];

  const [registerStudent, { error }] = useMutation(ADD_STUDENT_TO_COURSE);

  const handleRegister = () => {
    console.log('Registering for course');

    try {
      const result = registerStudent({ variables: {courseId: `${courseId}`, studentId: `${me._id}`} })
      .then(() => {
        navigate(`/dashboard/course/${courseId}`);
      });
    } catch (e) {
      console.error(e, error);
    }
  };

  if (loading) { return <div>Loading...</div>; }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Typography variant='h2' align='center' pt={10} color='primary.darker'>Register For The Course</Typography>
          <Grid container py={4} spacing={4} justifyContent='space-evenly'>
            <Grid item xs={12} md={6}>
              <Typography variant='h3' align='center' pb={2} color='primary.main'>{course.title}</Typography>
              <Typography variant='h4' align='center'>{course.description}</Typography>
              <Typography variant='h5' pb={4} align='center'>Course Starts: {course.startDate}</Typography>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleRegister}>
                Register for Course {course.price ? (`- $${course.price}`) : (`for Free`) }
              </LoadingButton>
            </Grid>

            <Grid item xs={12} md={6} >
              <Typography variant='h3' pb={2} align='center'>Course Instructor</Typography>
              <Typography variant='h4' align='center'>{course.teacher.username}</Typography>
              <Typography variant='h4' align='center'>{course.teacher.email}</Typography>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}