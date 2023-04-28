import React from 'react';
import { useQuery } from '@apollo/client';
import { alpha, styled } from '@mui/material/styles';
import { Card, CardContent, Typography } from '@mui/material';
import { GET_USERS } from '../utils/queries';
import imageSrc from '../assets/images/icons/avatar_19.jpg';

const CardWrapper = styled('div')({
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  width: 'calc(50% - 10px)',
  marginBottom: '20px',
  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
});

const AvatarImage = styled('img')({
  width: '48px',
  height: '48px',
  marginRight: '16px',
  borderRadius: '50%',
  overflow: 'hidden',
});

const StyledRoot = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  height: 'auto',
  overflow: 'hidden',
  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
});

function StudentOne() {
  const { loading, data, error } = useQuery(GET_USERS);
  console.log(data);

  if (loading) {
    <p>Loading...</p>; }if (error) {
    return <p>Error: {error.message}</p>;}

  const me = data?.users || [];
  const getSingleStudent = Array.isArray(me) ? me.filter(me => me.role.name === 'teacher') : [];

  return (
    <StyledRoot>
      {getSingleStudent.map(me => (
        <CardWrapper key={me.id}>
          <AvatarImage src={imageSrc} />
          <Typography variant="h1" style={{ wordWrap: 'break-word' }}>{me.firstName} {me.lastName}</Typography>
          <Typography variant="h4" style={{ wordWrap: 'break-word' }}>{me.email}</Typography>
          <Typography variant="body1" style={{ wordWrap: 'break-word' }}>{me.dateJoined}</Typography>
          <Typography variant="h3" style={{ wordWrap: 'break-word' }}>{me.status}</Typography>
          <Typography variant="h4" style={{ wordWrap: 'break-word' }}>{me.role.name}</Typography>
        </CardWrapper>
      ))}
    </StyledRoot>
  );
}

export default StudentOne;
