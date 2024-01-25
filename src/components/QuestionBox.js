import React, { useState } from 'react';
import questions from '../questions';
import './question.css';

export default function QuestionBox() {                         // Defining the main QuestionBox component and State variables for managing the state of the quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);    // Index of the current question
  const [showScore, setShowScore] = useState(false);            // To determine whether to display the final score
  const [score, setScore] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);          // Change for dark mode
  const [highlight, setHighlight] = useState(false);            // Highlight the current question

  const backgroundChange = () => {             // Function to change between light and dark mode
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    const newBodyColor = newDarkMode ? 'rgba(0, 0, 0, 0.714)' : '#ffdada';       // Changing the background color
    document.body.style.backgroundColor = newBodyColor;

    const appColor = newDarkMode ? '#F9B872' : '#fda1a2a1';             // Change the background color of the .app class where question are shown
    document.querySelector('.app').style.backgroundColor = appColor;
  };

  const handleAnswerOptionClick = (isCorrect) => {        // Function to handle the click on an answer option
    if (isCorrect) {
      setScore(score + 1);                                // Increase the score if the selected option is correct
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setHighlight(false);                              // Reset the highlight when moving to the next question
    } else {
      setShowScore(true);                               // Display the final score when all questions are answered
    }
  };

  const handleRestartGame = () => {                   // Function to restart button
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
    setHighlight(false);
  };

  const handleHighlight = () => {                // Function to change the highlight for the current question
    setHighlight(!highlight);
  };

  return (
    <div className='app'>
      {showScore ? (
        <div className={`score ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <span className='final'><h2>Final Score</h2></span> <br/>
          You scored {score} out of {questions.length} - ({((score / questions.length) * 100)}%)
          <button className='lightdark' onClick={backgroundChange}> {isDarkMode ? 'Light' : 'Dark'} </button><br/>
          <button className='restart' onClick={handleRestartGame}> Restart Game </button>
        </div>
      ) : (
        <div className='full'>
          <button className='lightdark' onClick={backgroundChange}> {isDarkMode ? 'Light' : 'Dark'} </button>
          <div className='mainquestion'>
            <div className='noquestion'>
              <span>Question : {currentQuestion + 1} Out of {questions.length}</span>
            </div>
            <div className='questionword' style={{ color: highlight ? 'red' : 'darkblue' }}> {questions[currentQuestion].text} </div>
          </div>
          <div className='answeroption'>
            {questions[currentQuestion].options.map((answerOption) => (
              <button key={answerOption.text} className='option' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}> {answerOption.text} </button>
            ))}
          </div>
          <div className='highlight'>
            <button className='lightred' onClick={handleHighlight}> {highlight ? 'Remove Highlight' : 'Highlight'} </button>
          </div>
        </div>
      )}
    </div>
  );
}
