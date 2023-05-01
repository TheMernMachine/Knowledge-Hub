import { Button } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------


export default function AnswerElement({ option, answer, index, layerCheck, color, enableQuiz }) {
  const handleClick = () => {
    if (!enableQuiz) return;
    layerCheck(option === answer ? 1 : 0, index, option);
  };

  return (
    <>
      <Button key={index} color={color} variant="contained" sx={{ m: 2 }} onClick={handleClick}>
        {option}
      </Button>
    </>
  );
}