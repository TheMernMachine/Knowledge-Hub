import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { GET_COURSE } from '../utils/queries';
import Iconify from '../components/iconify';

export default function CoursePage() {
  const { _id: courseId } = useParams();

  const { loading, data } = useQuery(GET_COURSE,
    { variables: { id: `${courseId}` } });

  const course = data?.course || [];
  console.log(course);

  if (loading) { return <div>Loading...</div>; }
  return (
    <>
      <Helmet>
        <title>Course Page </title>
      </Helmet>

      
    </>
  );
}