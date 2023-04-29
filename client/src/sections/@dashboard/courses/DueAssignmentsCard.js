import React from 'react';
import { useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Grid, Button, Container, Stack, Typography, Box, Card, CardContent, Link } from '@mui/material';
import images from '../../../assets/covers/index'

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export default function DueAssignmentsCard({ courseWork: { _id, title, dueDate, __typename } }) {
  const navigate = useNavigate();
  console.log(__typename)
  let url = `/dashboard/quiz/${_id}`;
  if (__typename === 'Assignments') {
    __typename = 'Assignment'
    url = `/dashboard/assignment/${_id}`;
  }
  const img = images[Math.floor(Math.random() * images.length)];

  return (
    <Grid item xs={12} sm={6} md={3} key={_id}>
      <Card sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate(url)}>
        <StyledCardMedia
          sx={{
            pt: 'calc(100% * 4 / 3)',
            '&:after': {
              top: 0,
              content: "''",
              width: '100%',
              height: '100%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }}
        >
          <StyledCover alt={title} src={img} />
        </StyledCardMedia>
        <CardContent sx={{ pt: 4, bottom: 0, width: '100%', position: 'absolute' }}>

          <Typography 
            color="inherit" 
            variant='subtitle2' 
            sx={{ color: 'common.white', display: 'block', typography: 'subtitle1', height: 100, textDecoration: 'underline' }}
          >
            {title}
          </Typography>

          <Typography gutterBottom variant="caption" sx={{ color: 'secondary.light', display: 'block', typography: 'subtitle2' }}>
            {__typename} Due: {dueDate}
          </Typography>
          
        </CardContent>
      </Card>
    </Grid>
  );
}