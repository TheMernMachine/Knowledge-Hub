import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Grid, Container, Stack, Typography, ThemeProvider, Card, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { GET_COURSE } from '../utils/queries';
import DueAssignmentsContainer from '../sections/@dashboard/courses/DueAssignmentsContainer';

// ----------------------------------------------------------------------
const theme = createTheme();

export default function CoursePage() {
  const { _id: courseId } = useParams();

    const { loading, data, error } = useQuery(GET_COURSE,
      { variables: { courseId: `${courseId}` } }
    );

  if (loading) { return <div>Loading...</div>; }
  if (error) { return <div>Error! {error.message}</div>; }

  const course = data?.course || [];

  return (
    <>
      <Helmet>
        <title>Course Page </title>
      </Helmet>

      <ThemeProvider theme={theme}>
        <Container maxWidth="2xl" >
          <Card sx={{ padding: 2, width: "90%"}}>

            <Grid container spacing={2} sx={{ paddingX: 2, paddingY: 4 }}>
              <Grid item xs={12} md={9}>
                <Typography variant='h3' align='center' pb={2} color='primary.main'>{course.title}</Typography>
                <Typography variant='h4' align='center'>{course.description}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack direction='column' spacing={2}>
                  <Typography variant='h4' align='center' pb={2} color='primary.main'>Course Instructor</Typography>
                  <Typography variant='h5' align='center'>{course.teacher.username}</Typography>
                  <Typography variant='h6' align='center'>{course.teacher.email}</Typography>
                </Stack>
              </Grid>
            </Grid>

            <Box sx={{ backgroundColor: "#E5E5E5", borderRadius: 1, padding: 2 }}>
              <Typography variant='h5' pb={4} align='center' color='primary.darker'>Upcoming Assignments</Typography>
              <Grid container spacing={3}>

                {course ? (<DueAssignmentsContainer course={course} />) : (<div>Course not found</div>)}

              </Grid>
            </Box>
          </Card>

        </Container>
      </ThemeProvider>
    </>
  );
}