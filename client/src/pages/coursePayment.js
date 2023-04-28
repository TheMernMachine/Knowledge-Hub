import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Typography, Grid, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { createTheme,ThemeProvider, styled } from '@mui/material/styles';
import { GET_COURSE, GET_ME } from '../utils/queries';
import { ADD_STUDENT_TO_COURSE } from '../utils/mutations';

const theme = createTheme();

export default function CoursePayment() {
  const { _id: courseId } = useParams();
  
  const { loading, data } = useQuery(GET_COURSE,
    { variables: { courseId:`${courseId}` } }
  );
  const course = data?.course || [];
  console.log(course);

  const { loading: loading2, data: data2 } = useQuery(GET_ME);
  const me = data2?.me || [];
  console.log(me);

  const [registerStudent, { error }] = useMutation(ADD_STUDENT_TO_COURSE);

  const handleRegister = (event) => {
    event.preventDefault();
    console.log('Registering for course');
    try {
      const result = registerStudent({ variables: {courseId: `${courseId}`, studentId: `${me._id}`} });
      console.log(result);
    } catch (e) {
      console.error(e, error);
    }
  };


  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Typography variant='h2' align='center' pt={10} color='primary.darker'>Register For The Course</Typography>
          <Grid container py={4} spacing={2} justifyContent='space-evenly'>
            <Grid item xs={12} md={6}>
              <Typography variant='h3' align='center' color='primary.main'>{course.title}</Typography>
              <Typography variant='h4' align='center'>{course.description}</Typography>
              <Typography variant='h4' align='center'>{course.startDate}</Typography>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleRegister}>
                Register for Course {course.price ? (`- $${course.price}`) : (`for Free`) }
              </LoadingButton>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant='h3' align='center'>Course Instructor</Typography>
              <image src="https://via.placeholder.com/150" alt="Instructor Image" />
              <Typography variant='h4' align='center'>{course.title}</Typography>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}