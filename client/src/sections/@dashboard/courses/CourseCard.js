import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  return (
      <Grid item xs={12} md={6} key={course._id}>
        <Stack spacing={2} sx={{ height: '100%' }}>
          <Typography variant='h3' align='center' pb={2} color='primary.main'>{course.title}</Typography>
          <Typography variant='h4' align='center'>{course.description}</Typography>
          <Typography variant='h5' pb={4} align='center'>Course Starts: {course.startDate}</Typography>
          <Button fullWidth size="large" type="submit" variant="contained" onClick={() => navigate(`/dashboard/course/${course._id}`)}>
            View Course
          </Button>
        </Stack>
      </Grid>
  );
}