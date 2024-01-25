import React, { useState } from 'react';
import questions from '../questions';
import './question.css';

export default function QuestionBox() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const backgroundChange = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    const newBodyColor = newDarkMode ? 'rgba(0, 0, 0, 0.714)' : '#ffdada';
    document.body.style.backgroundColor = newBodyColor;

    // Change the background color of the .app class
    const appColor = newDarkMode ? '#F9B872' : '#fda1a2a1';
    document.querySelector('.app').style.backgroundColor = appColor;
  };

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setHighlight(false); // Reset the highlight when moving to the next question
    } else {
      setShowScore(true);
    }
  };

  const handleRestartGame = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
    setHighlight(false);
  };

  const handleHighlight = () => {
    setHighlight(!highlight);
  };

  return (
    <div className='app'>
      {showScore ? (
        <div className={`score-section ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <span className='final'><h2>Final Score</h2></span> <br/>
          You scored {score} out of {questions.length} - ({((score / questions.length) * 100)}%)
          <button className='toggle-button' onClick={backgroundChange}>
            {isDarkMode ? 'Light' : 'Dark'}
          </button><br/>
          <button className='restart-button' onClick={handleRestartGame}>
            Restart Game
          </button>
        </div>
      ) : (
        <div className='full'>
          <button className='toggle-button' onClick={backgroundChange}>
            {isDarkMode ? 'Light' : 'Dark'}
          </button>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question : {currentQuestion + 1} Out of {questions.length}</span>
            </div>
            <div className='question-text' style={{ color: highlight ? 'red' : 'darkblue' }}>
              {questions[currentQuestion].text}
            </div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].options.map((answerOption) => (
              <button key={answerOption.text} className='option' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                {answerOption.text}
              </button>
            ))}
          </div>
          <div className='highlight'>
            <button className='lightred' onClick={handleHighlight}>
              {highlight ? 'Remove Highlight' : 'Highlight'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
