//

//  Desc: This file contains all the helper functions that are used in the application

// ----------------------------------------------------------------------

// Randomize any array using the Durstenfeld shuffle algorithm
export const randomizeArray = (lockArray) => {
  const myArray = [...lockArray];
  let currentIndex = myArray.length - 1;
  while (currentIndex > 0) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    const value = myArray[currentIndex];
    myArray[currentIndex] = myArray[randomIndex];
    myArray[randomIndex] = value;
    currentIndex -= 1;
  }

  return myArray;
}

// ----------------------------------------------------------------------

export const randomAnswers = (question) => {
  const someQuestions = [...question];
  const newAnswers = [];
  for (let i = 0; i < someQuestions.length; i += 1) {
    const answers = randomizeArray(someQuestions[i].options);
    newAnswers.push({ ...someQuestions[i], options: answers });
  }
  return newAnswers;
}

export const generateRandomTest = (allQuestions) => {
  const randomQuestions = randomizeArray(allQuestions);
  const newQuestions = randomAnswers(randomQuestions);
  return newQuestions;
};

export const checkExist = (obj) => {
  if (obj) {
    return false;
  }
  return true;
}

// ----------------------------------------------------------------------

// save the day's schedule
export const saveUserResponse = (result, answer, question) => {
  const getResults = readUserResponse('scoreArray');
  getResults[question] = result;
  localStorage.setItem('scoreArray', JSON.stringify(getResults));
  const getAnswers = readUserResponse('responseArray');
  getAnswers[question] = answer;
  localStorage.setItem('responseArray', JSON.stringify(getAnswers));
};

// Get or generate a new empty day schedule
export const readUserResponse = (key) => {
  const response = JSON.parse(localStorage.getItem(key));
  if (!response) {
    return [];
  }

  return response;
};

export const resetUserResponse = () => {
  localStorage.removeItem('scoreArray');
  localStorage.removeItem('responseArray');
};
