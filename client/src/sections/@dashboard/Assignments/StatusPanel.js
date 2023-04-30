import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { AppWidgetSummary, AppWidgetInfo } from '../app';

import { GET_STUDENT_RESPONSES } from '../../../utils/queries';

// ----------------------------------------------------------------------

// score, grade,
export default function StatusPanel({ quizId, studentId, duration, quizStart, stopTimer, submitResults }) {

  const { loading, data } = useQuery(GET_STUDENT_RESPONSES, { variables: { quizId, studentId } });

  const previousResponse = data?.getStudentQuizResponse || [];
  console.log(previousResponse);
  console.log(previousResponse.length > 0);

  const [allowQuiz, setAllowQuiz] = useState(previousResponse.length > 0);
  // const [rawScore, setRawScore] = useState(allowQuiz ? previousResponse[0].rawScore : 0);
  // const [grade, setGrade] = useState(allowQuiz ? previousResponse[0].grade : 'N/A');
  const [timer, setTimer] = useState(0);
  const [quizDisplay, setQuizDisplay] = useState(allowQuiz ? "Click to Start" : "Timer");
  const [timerColor, setTimerColor] = useState('lightBlue');
  console.log('allowQuiz', allowQuiz);

  const decrementTimer = useCallback(() => {
    setTimer((oldTimer) => oldTimer - 1);
  }, []);

  useEffect(async () => {
    async function fetchData() {
      await submitResults();
    }
    if (timer <= 0) {
      fetchData();
      setTimerColor('lightBlue');
      return () => clearInterval(decrementTimer);
    }

    if (timer < 11) {
      setTimerColor('#dda0dd');
    }
    const timeoutFunction = setInterval(decrementTimer, 1000);
    return () => clearInterval(timeoutFunction);
  }, [decrementTimer, timer]);

  if (stopTimer) {
    clearInterval(decrementTimer);
  }

  const startQuiz = () => {
    // reset the local storage
    if (!allowQuiz) return;

    setQuizDisplay('Timer');
    setAllowQuiz(false);
    setTimer(duration);
    quizStart();
  };

  if (loading) return (<div>Loading...</div>);

  return (
    <Grid container spacing={3} sx={{ m: 2 }}>
      <Grid item xs={12} sm={6} md={3} onClick={startQuiz}>
        <AppWidgetSummary title={quizDisplay} total={timer || 'N/A'} color="warning" icon={'ant-design:android-filled'} sx={{ background: timerColor }} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetInfo title="Duration" total={`${duration}s`} color="warning" icon={'ant-design:apple-filled'} sx={{ background: 'lightGreen' }} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Score" total={previousResponse.length > 0 ? previousResponse[0].rawScore : 0} color="warning" icon={'ant-design:windows-filled'} sx={{ background: 'lightBlue' }} />
      </Grid>

      {<Grid item xs={12} sm={6} md={3} color="error" >
        <AppWidgetInfo title="Grade" total={previousResponse.length > 0 ? previousResponse[0].grade : 'N/A'} color="error" icon={'ant-design:bug-filled'} sx={{ background: '#00FFFF' }} />
      </Grid>}
    </Grid>
  );
}

