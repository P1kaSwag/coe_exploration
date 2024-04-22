import React, { useState } from 'react';
import './ComputerScienceGame.css';
import { Question1, Question2, Question3, Reward} from "./CodeBlocks";


const ComputerScienceGame = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [code, setClickedWord] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleWordClick = (word) => {
    setClickedWord(word);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setCurrentQuestion(currentQuestion + 1);
    setPopupVisible(false);
  };

  return (
    <div class="box">
      <h1>Find the error in the code.</h1>
      <p> Click on the error in the code.</p>

      {currentQuestion === 1 && (
        <Question1
        handleWordClick={handleWordClick}
        />
      )}

      {currentQuestion === 2 && (
        <Question2
        handleWordClick={handleWordClick}
        />
      )}

      {currentQuestion === 3 && (
        <Question3
        handleWordClick={handleWordClick}
        />
      )}

      {currentQuestion === 4 && (
        <Reward
        />
      )}

      {popupVisible && (
        <div>
          <div className="popup-background"></div>
          <div className="popup">
            <p>Correct! The correct code is: {code}</p>
            <button onClick={() => closePopup()}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ComputerScienceGame;