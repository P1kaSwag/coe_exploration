import React, { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import ResultsComponent from './ResultsComponent';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('question');
  const [userAnswers, setUserAnswers] = useState({});

  const handleNext = (selectedOption, isFinalQuestion) => {
    // Add logic to handle moving to the next question and updating userAnswers state
    setUserAnswers(prevAnswers => ({ ...prevAnswers, [currentPage]: selectedOption }));

    // If it's the final question, display results
    if (isFinalQuestion) {
      setCurrentPage('results');
    }
  };

  return (
    <div>
      {currentPage === 'question' && (
        <QuestionComponent onNext={handleNext} />
      )}
      {currentPage === 'results' && (
        <ResultsComponent userAnswers={userAnswers} />
      )}
    </div>
  );
};

export default App;
