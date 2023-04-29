import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// useQuery
import { useQuery } from '@apollo/client';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppWidgetSummary,
  AppCurrentSubject,
} from '../sections/@dashboard/app';
import { GET_ME, GET_COURSES } from '../utils/queries';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const theme = useTheme();
  const { loading, error, data } = useQuery(GET_ME);
  const { loading: loading1, error: error1, data: data1 } = useQuery(GET_COURSES);

  const user = data?.me || {};
  const courses = data1?.courses || [];

  console.log("user: ", user, "courses: ", courses);
  const fullName = `${user.firstName} ${user.lastName}`;

  const availableCourses = courses.filter(course => course.teacher._id === user._id);
  const enrolledCourses = courses.filter(course => course.students_id === user._id);
  const availableQuizzes = availableCourses.map(course => course.quiz);
  const availableAssignments = availableCourses.map(course => course.assignment);
  console.log('availebleQuizzes: ', availableQuizzes, 'availableAssignments: ', availableAssignments);

  const quizTitles = availableQuizzes.flatMap((quiz) =>
    quiz.map((quiz) => quiz.title)
  );

  const assignmentTitles = availableAssignments.flatMap((assignment) =>
    assignment.map((assignment) => assignment.title)
  );


  console.log('assignmentTitles: ', assignmentTitles);

  if (loading) {
    return <div>Loading...</div>
  } if (user.role.name === 'student') {
    return (
      <>
        <Helmet>
          <title> Dashboard </title>
        </Helmet>

        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Hi, Welcome {user.firstName}!
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Assignments Completed" total={714000} icon={'ant-design:android-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Current Courses" total={1352831} color="info" icon={'ant-design:apple-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Assignments" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Posts" total={234} color="error" icon={'ant-design:bug-filled'} />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate
                title="Assignments"
                list={assignmentTitles.map((assignment, index) => ({
                  title: assignment,
                  image: `/assets/images/covers/cover_${index + 1}.jpg`
                }))}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline
                title="Course Timeline"
                list={[...Array(3)].map((_, index) => ({
                  id: faker.datatype.uuid(),
                  title: [
                    'Class Started',
                    'First Assignment',
                    'First Quiz',
                  ][index],
                  type: `order${index + 1}`,
                  time: faker.date.past(),
                }))}
              />
            </Grid>


            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate
                title="Quizzes"
                list={quizTitles.map((quiz, index) => ({
                  title: quiz,
                  image: `/assets/images/covers/cover_${index + 1}.jpg`
                }))}  
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject
                title="Current Subject"
                chartLabels={['HTML', 'CSS', 'Javascript', 'MongoDB', 'React', 'Node']}
                chartData={[
                  { name: 'Course Material', data: [80, 50, 30, 40, 100, 20] },
                  { name: 'Assignments', data: [10, 30, 70, 100, 20, 80] },
                  { name: 'Quizzes', data: [100, 20, 100, 60, 60, 20] },
                ]}
                chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppTasks
                title="TO DO LIST"
                list={[
                  { id: '1', label: 'Create FireStone Logo' },
                  { id: '2', label: 'Add SCSS and JS files if required' },
                  { id: '3', label: 'Stakeholder Meeting' },
                  { id: '4', label: 'Scoping & Estimations' },
                  { id: '5', label: 'Sprint Showcase' },
                ]}
              />
            </Grid>

          </Grid>
        </Container>
      </>
    )

  } if (user.role.name === 'teacher') {
    return (
      <>
        <Helmet>
          <title> Dashboard </title>
        </Helmet>

        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Hi, Welcome {user.firstName}!
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Students" total={714000} icon={'ant-design:android-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Current Courses" total={1352831} color="info" icon={'ant-design:apple-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Assignments" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Posts" total={234} color="error" icon={'ant-design:bug-filled'} />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline
                title="Course Timeline"
                list={[...Array(3)].map((_, index) => ({
                  id: faker.datatype.uuid(),
                  title: [
                    'Teacher Placment Day',
                    'Teacher Planning Day',
                    'Class Starts',
                  ][index],
                  type: `order${index + 1}`,
                  time: faker.date.past(),
                }))}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate
                title="Assignments"
                list={assignmentTitles.map((assignment, index) => ({
                  title: assignment,
                  image: `/assets/images/covers/cover_${index + 1}.jpg`
                }))}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate
                title="Quizzes"
                list={quizTitles.map((quiz, index) => ({
                  title: quiz,
                  image: `/assets/images/covers/cover_${index + 1}.jpg`
                }))}  
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject
                title="Current Subject"
                chartLabels={['HTML', 'CSS', 'Javascript', 'MongoDB', 'React', 'Node']}
                chartData={[
                  { name: 'Course Material', data: [80, 50, 30, 40, 100, 20] },
                  { name: 'Assignments', data: [10, 30, 70, 100, 20, 80] },
                  { name: 'Quizzes', data: [100, 20, 100, 60, 60, 20] },
                ]}
                chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppTasks
                title="TO DO LIST"
                list={[
                  { id: '1', label: 'Create FireStone Logo' },
                  { id: '2', label: 'Add SCSS and JS files if required' },
                  { id: '3', label: 'Stakeholder Meeting' },
                  { id: '4', label: 'Scoping & Estimations' },
                  { id: '5', label: 'Sprint Showcase' },
                ]}
              />
            </Grid>

          </Grid>
        </Container>
      </>
    );
  }
}
