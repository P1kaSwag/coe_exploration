import React, { useState } from 'react';
import './ComputerScienceGame.css';
import { Question1, Question2, Question3, Reward} from "./CodeBlocks";
import RewardNotification from './RewardNotificationComponent';

const ComputerScienceGame = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [code, setClickedWord] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showReward, setShowReward] = useState(false);

  const handleWordClick = (word) => {
    setClickedWord(word);
    setPopupVisible(true);
  };

  const turnOffReward = () => {
    setShowReward(false);
  };


  const closePopup = () => {
    setCurrentQuestion(currentQuestion + 1);
    
    if(currentQuestion === 3){
      setShowReward(true);
    }
    setPopupVisible(false);
    
  };

  
  return (
    <div className="box">
      {/* Show find error in code header only if showReward is set to false, otherwise show a "You won" header */}
      { !showReward && <div> 
        <h1>Find the error in the code.</h1>
        <p>Click on the error in the code</p>
      </div> }
      { showReward && <h1>You won!</h1> }

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

      { showReward && <RewardNotification rewardId={5} rewardName={"Virtual Reality Headset"} onClose={turnOffReward} />}
  
      {popupVisible && (
        <div>
          <div className="popup-background"></div>
          <div className="popup">
            <p>Correct! The correct code is: {code}</p>
            <button className='CSButton' onClick={() => closePopup()}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ComputerScienceGame;