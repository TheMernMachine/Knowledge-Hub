import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import {Typography } from '@mui/material';
import { GET_USER } from '../utils/queries';
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

export default function StudentOne() {
const {_id} = useParams();
console.log('id', _id);
const userId = _id;
const { loading, data } = useQuery(GET_USER,
{ variables: { id: userId } });
console.log(data)
const user = data?.getUser || [];

console.log('user', user);


  return (
    <StyledRoot>
      <CardWrapper>
        <AvatarImage src={imageSrc} />
        <Typography variant="h1" style={{ wordWrap: 'break-word' }}>{user.firstName} {user.lastName}</Typography>
        <Typography variant="h6" style={{ wordWrap: 'break-word' }}>{user.email}</Typography>
        <Typography variant="h6" style={{ wordWrap: 'break-word' }}>{user.dateJoined}</Typography>
        <Typography variant="h7" style={{ wordWrap: 'break-word' }}>{user.status}</Typography>
      </CardWrapper>
    </StyledRoot>
  );}

