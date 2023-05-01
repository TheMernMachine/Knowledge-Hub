import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { AppWidgetSummary, AppWidgetInfo } from '../app';

import { GET_STUDENT_RESPONSES } from '../../../utils/queries';

// ----------------------------------------------------------------------

// Display the score and grade of the student
export default function StatusPanel({ quizId, studentId, updateQuiz }) {

  const { loading, data } = useQuery(GET_STUDENT_RESPONSES, { variables: { quizId, studentId } });

  const previousResponse = data?.getStudentQuizResponse;
  const score = previousResponse.rawScore || "N/A";
  const grade = previousResponse.grade || 'N/A';

  // Allow the quiz to be taken again if the score is N/A
  if (score === "N/A") updateQuiz();

  if (loading) return (<div>Loading...</div>);

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Score" total={0 || score} color="warning" icon={'ant-design:windows-filled'} sx={{ background: 'lightBlue' }} />
      </Grid>

      {<Grid item xs={12} sm={6} md={3} color="error" >
        <AppWidgetInfo title="Grade" total={grade} color="error" icon={'ant-design:bug-filled'} sx={{ background: '#00FFFF' }} />
      </Grid>}
    </>
  );
}

