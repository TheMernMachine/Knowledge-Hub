import { Grid } from '@mui/material';
import { useState } from 'react';
import AnswerElement from './AnswerElement';
import { saveUserResponse } from '../../../utils/helpers';

// ----------------------------------------------------------------------


export default function OptionsLayer({ question, questionNumber, enableQuiz }) {
  const tempArray = new Array(question.options.length).fill('primary');
  const [colorArray, setColorArray] = useState([...tempArray]);

  const checkLayer = (result, position, answer) => {
    if (!enableQuiz) return;
    const newArray = [...tempArray];
    newArray[position] = 'success';
    setColorArray([...newArray]);
    saveUserResponse(result, answer, questionNumber);
  };

  const displayComponent = (option, color, position) => {
    return <AnswerElement key={position} option={option} answer={question.answer} index={position} layerCheck={checkLayer} color={color} enableQuiz={enableQuiz} />;
  };


  return (
    <Grid>
      {question.options.map((option, index) => (
        displayComponent(option, colorArray[index], index)
      ))}
    </Grid>
  );
}

