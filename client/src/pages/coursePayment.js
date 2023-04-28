import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Typography, Grid, Box } from '@mui/material';
import { createTheme,ThemeProvider, styled } from '@mui/material/styles';
import { GET_COURSE } from '../utils/queries';

const theme = createTheme();

export default function CoursePayment() {
  const { _id: courseId } = useParams();
  
  const { loading, data } = useQuery(GET_COURSE,
    { variables: { courseId:`${courseId}` } }
  );
  const course = data?.course || [];

  console.log(course);

  return (
    <>
      <Helmet>
        <title>Course Payment Page </title>
      </Helmet>

      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Typography variant='h2' align='center' pt={10} color='primary.darker'>Register For The Course</Typography>
          <Grid container py={4} spacing={2} justifyContent='space-evenly'>
            <Grid item xs={12} md={6}>
              <Typography variant='h3' align='center' color='primary.main'>{course.title}</Typography>
              <Typography variant='h4' align='center'>{course.description}</Typography>
              <Typography variant='h4' align='center'>{course.startDate}</Typography>
              <Typography variant='h4' align='center'>{course.price}</Typography>
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