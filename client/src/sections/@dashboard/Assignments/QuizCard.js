import { useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Link, Card, Grid, Typography, CardContent } from '@mui/material';
import images from '../../../assets/covers/index'

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------


export default function QuizCard({ quiz, index }) {
  const navigate = useNavigate();
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const img = images[Math.floor(Math.random() * images.length)];

  const handleClick = (id) => {
    navigate(`/dashboard/quiz/${id}`);
  };

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
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
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          <StyledCover alt={quiz.title} src={img} />
        </StyledCardMedia>
        <CardContent
          sx={{
            pt: 4,
            bottom: 0,
            width: '100%',
            position: 'absolute',
          }}

          onClick={() => {
            handleClick(quiz._id);
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'secondary.light', display: 'block', typography: 'subtitle1' }}>
            {quiz.dueDate}
          </Typography>

          <Typography
            color="inherit"
            variant="subtitle2"
            sx={{
              color: 'common.white', display: 'block', typography: 'h5',
              height: 100, textDecoration: 'underline', cursor: 'pointer'
            }}
          >
            {quiz.title}
          </Typography>
        </CardContent>

      </Card>
    </Grid>
  );
}