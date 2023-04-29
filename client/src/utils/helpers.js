//

//  Desc: This file contains all the helper functions that are used in the application

// ----------------------------------------------------------------------

// Randomize any array using the Durstenfeld shuffle algorithm
export function randomizeArray(lockArray) {
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

export function randomAnswers(question) {
  const someQuestions = [...question];
  const newAnswers = [];
  for (let i = 0; i < someQuestions.length; i += 1) {
    const answers = randomizeArray(someQuestions[i].options);
    newAnswers.push({ ...someQuestions[i], options: answers });
  }
  return newAnswers;
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// color = { buttonColor };
// color = { buttonColor[`${getUniqueKey(question, index)}`] || "success" };