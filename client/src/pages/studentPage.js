import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {alpha,styled} from '@mui/material/styles';
import {Card,CardContent,Typography } from '@mui/material';
import { GET_USERS } from '../utils/queries';
import imageSrc from '../assets/images/icons/avatar_19.jpg';

// --------------------------------------------------------------------------

// MAKES THE CARD WRAPPER
const CardWrapper = styled('div')({
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  width: 'calc(50% - 10px)',
  marginBottom: '20px',
  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
  
});


// THIS BRINGS STYLE TO IMAGE
const AvatarImage = styled('img')({
  width: '48px',
  height: '48px',
  marginRight: '16px',
  borderRadius: '50%',
  overflow: 'hidden',
});

// THIS BRINGS STYLE TO THE CARD
const StyledRoot = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  height: 'auto',
  overflow: 'hidden',
  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
  
  
});



// THIS FUNCTION IS LOADING THE DATA FROM THE DATABASE
function StudentsPage() {
  const { loading, data, error } = useQuery(GET_USERS);
  if (loading) {
    <p>Loading...</p>; }if (error) {
    return <p>Error: {error.message}</p>;}
    const users = data?.users || [];
  const allStudents = users.filter(user => user.role.name === 'student');
  

  // --------------------------------------------------------------------------

  return (
<StyledRoot>
  {allStudents.map(user => (
    <CardWrapper key={user.id}>
      <AvatarImage src={imageSrc} />
       <Typography variant="h1" style={{ wordWrap: 'break-word' }}>{user.firstName} {user.lastName}</Typography>
      <Typography variant="h6" style={{ wordWrap: 'break-word' }}>{user.email}</Typography>
      <Typography variant="h6" style={{ wordWrap: 'break-word' }}>{user.dateJoined}</Typography>
      <Typography variant="h7" style={{ wordWrap: 'break-word' }}>{user.status}</Typography>
      <Typography variant="h5" style={{ wordWrap: 'break-word' }}>{user.role.name}</Typography>
    </CardWrapper>
  ))}
</StyledRoot>
);}
export default StudentsPage;


