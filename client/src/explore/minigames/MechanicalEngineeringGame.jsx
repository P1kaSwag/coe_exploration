import React, { useState, useEffect } from 'react';
import './MechanicalEngineeringGame.css';
import checkmark from './gearImages/checkmark.png';
import crossmark from './gearImages/crossmark.png';

import gear1 from './gearImages/gear1.png';
import gear2 from './gearImages/gear2.png';
import gear3 from './gearImages/gear3.png';
import gear4 from './gearImages/gear4.png';
import gear5 from './gearImages/gear5.png';
import gear6 from './gearImages/gear6.png';
import gear7 from './gearImages/gear7.png';
import gear8 from './gearImages/gear8.png';

const gearImages = { 1: gear1, 2: gear2, 3: gear3, 4: gear4, 5: gear5, 6: gear6, 7: gear7, 8: gear8 };

const MechanicalEngineeringGame = () => {
  const [shuffledGears, setShuffledGears] = useState([]);
  const [selectedGears, setSelectedGears] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ type: '', message: '', visible: false });
  const [remainingTime, setRemainingTime] = useState(45); // Initialize with 45 seconds

  useEffect(() => {
    if (round <= 7) {
      shuffleGears();
      setRemainingTime(45); // Reset the timer to 45 seconds
    } else {
      setFeedback({ type: 'end', message: 'Game Over! Here are your results:', visible: true });
    }
  }, [round]);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (remainingTime === 0) {
      setFeedback({ type: 'timeout', message: 'Hey, the time has run out! Please start again and try to beat the time.', visible: true });
    }
  }, [remainingTime]);

  const shuffleGears = () => {
    const gearKeys = Object.keys(gearImages);
    const selectedKeys = gearKeys.sort(() => 0.5 - Math.random()).slice(0, 4);
    const doubledKeys = [...selectedKeys, ...selectedKeys].sort(() => 0.5 - Math.random());
    setShuffledGears(doubledKeys.map(key => ({ id: key, matched: false })));
    setMatchedPairs([]);
    setSelectedGears([]);
  };

  const handleRestart = () => {
    setRound(1);
    setScore(0);
    setMatchedPairs([]);
    setFeedback({ type: '', message: '', visible: false });
    shuffleGears();
    setRemainingTime(45);
  };

  const handleGearClick = (id, index) => {
    if (matchedPairs.includes(index) || selectedGears.some(gear => gear.index === index)) {
      return;
    }
    const newSelectedGears = [...selectedGears, { id, index }];
    setSelectedGears(newSelectedGears);

    if (newSelectedGears.length === 2) {
      if (newSelectedGears[0].id === newSelectedGears[1].id) {
        const newMatches = [...matchedPairs, newSelectedGears[0].index, newSelectedGears[1].index];
        setMatchedPairs(newMatches);
        setScore(score + 1);
        setFeedback({ type: 'correct', message: 'Correct!', visible: true });

        setTimeout(() => {
          setFeedback({ type: '', message: '', visible: false });
          setSelectedGears([]);
          if (newMatches.length === shuffledGears.length) {
            if (round < 7) {
              setRound(round + 1);
            } else {
              setFeedback({ type: 'end', message: 'Game Over! Here are your results:', visible: true });
            }
          }
        }, 1000);
      } else {
        setFeedback({ type: 'incorrect', message: 'Incorrect!', visible: true });
        setTimeout(() => {
          setFeedback({ type: '', message: '', visible: false });
          setSelectedGears([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="me-game-container">
      <div className="me-game-header">
        <h1>Match the Gears - Round {round}</h1>
        <p>Click on two gears of the same size to match them!</p>
        {feedback.type === 'end' || feedback.type === 'timeout' ? (
          <div className="me-scoreboard-container">
            <div className="me-scoreboard-final">Score: {score}, Gears Matched: {matchedPairs.length / 2}</div>
            <button className="me-restart-button" onClick={handleRestart}>Restart Game</button>
          </div>
        ) : (
          <div className="me-scoreboard">
            Score: {score}, Gears Matched: {matchedPairs.length / 2} | Time Remaining: {remainingTime}s
          </div>
        )}
      </div>
      {feedback.visible && (
        <div className={`me-feedback-message ${feedback.type}`}>
          <img src={feedback.type === 'correct' || feedback.type === 'end' ? checkmark : crossmark} alt={feedback.type} />
          <p>{feedback.message}</p>
          {feedback.type === 'timeout' && (
            <button className="me-start-again-button" onClick={handleRestart}>Start Again</button>
          )}
        </div>
      )}
      <div className="me-gear-grid">
        {round <= 7 && shuffledGears.map((gear, index) => (
          <div key={index} className={`me-gear-container ${matchedPairs.includes(index) ? 'me-matched' : ''}`}>
            <img
              src={gearImages[gear.id]}
              alt={`Gear ${gear.id}`}
              onClick={() => handleGearClick(gear.id, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MechanicalEngineeringGame;
