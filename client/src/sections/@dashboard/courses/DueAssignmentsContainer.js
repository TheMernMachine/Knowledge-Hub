import React, { useState, useEffect } from "react";
import { Grid, Button, Container, Stack, Typography, Card, Box } from '@mui/material';
import DueAssignmentsCard from './DueAssignmentsCard';

// ----------------------------------------------------------------------
// Functional Component for displaying the due assignments for a course
export default function DueAssignmentsContainer({ course }) {
  // Set the course data to the course prop
  const [courseData, setCourseData] = useState(course);
  useEffect(() => {
    setCourseData(course);
  }, []);

  // Function to render the due assignments
  const renderWork = () => {
    const assignments = courseData.assignment;
    const quizzes = courseData.quiz;
    const upcomingCourseWork = assignments.concat(quizzes);
    const courseWork = upcomingCourseWork.sort((a, b) => a.dueDate - b.dueDate);
    const courseWork4 = courseWork.slice(0, 4);
    // If there are no assignments, display a message
    if (!courseWork) {
      return (
        <Typography variant='h2' align='center' pt={10} color='primary.darker'>No Upcoming Assignments</Typography>
      );
    }
    // If there are less than 4 assignments, display all of them
    if (courseWork4.length === 4) {
      return (
        <>
          {courseWork4.map((singleCourseWork) => (
            <DueAssignmentsCard key={singleCourseWork._id} courseWork={singleCourseWork} />
          ))}
        </>
      );
    }
    // If there are less than 4 assignments, display all of them and display a message saying there are no more assignments
    return (
      <>
        {courseWork4.map((singleCourseWork) => (
          <DueAssignmentsCard key={singleCourseWork._id} courseWork={singleCourseWork} />
        ))}
        <Typography variant='h2' align='center' pt={10} color='primary.darker'>No Upcoming Assignments Due at This Time</Typography>
      </>
    );
  };
  return (
    <>
      {renderWork()}
    </>
  );
}
