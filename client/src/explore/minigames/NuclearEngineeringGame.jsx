import React, { useState } from 'react';
import './NuclearEngineeringGame.css';
import reactorImage from './reactorImage/reactor-image.png';

const parts = [
  { name: 'Fuel Rods', letter: 'A' },
  { name: 'Coolant', letter: 'B' },
  { name: 'Turbine', letter: 'C' },
  { name: 'Reactor Vessel', letter: 'D' },
  { name: 'Generator', letter: 'E' },
];

const NuclearEngineeringGame = () => {
  const [selectedParts, setSelectedParts] = useState({});
  const [results, setResults] = useState(null);

  const handlePartChange = (event, part) => {
    const selectedLetter = event.target.value;
    setSelectedParts((prev) => ({
      ...prev,
      [part.name]: selectedLetter,
    }));
  };

  const checkResults = () => {
    const correctAnswers = parts.reduce((acc, part) => {
      acc[part.name] = part.letter;
      return acc;
    }, {});

    const result = Object.keys(correctAnswers).map((key) => ({
      part: key,
      correct: selectedParts[key] === correctAnswers[key],
    }));

    setResults(result);
  };

  const restartGame = () => {
    setSelectedParts({});
    setResults(null);
  };

  return (
    <div className="Ercan-game-container">
      <h1>Welcome to the Nuclear Reactor Engineering Game</h1>
      <p>Instructions: Select the correct letter for each part of the reactor from the dropdown menus and then click "Check Results!" to see if you are correct.</p>
      <div className="Ercan-reactor-section">
        <div className="Ercan-reactor-image">
          <img src={reactorImage} alt="Reactor" />
          <div className="Ercan-part-label Ercan-part-A">A</div>
          <div className="Ercan-part-label Ercan-part-B">B</div>
          <div className="Ercan-part-label Ercan-part-C">C</div>
          <div className="Ercan-part-label Ercan-part-D">D</div>
          <div className="Ercan-part-label Ercan-part-E">E</div>
        </div>
      </div>
      <div className="Ercan-parts-section">
        <div className="Ercan-parts-list">
          {parts.map((part) => (
            <div key={part.name} className="Ercan-part-item">
              <label>{part.name}</label>
              <select value={selectedParts[part.name] || ''} onChange={(event) => handlePartChange(event, part)}>
                <option value="">Select</option>
                {['A', 'B', 'C', 'D', 'E'].map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button className="Ercan-check-button" onClick={checkResults}>Check Results!</button>
        </div>
        {results && (
          <div className="Ercan-results">
            {results.map((result) => (
              <div key={result.part} className={result.correct ? 'Ercan-correct' : 'Ercan-wrong'}>
                Part {result.part}: {result.correct ? 'Correct' : 'Wrong'}
              </div>
            ))}
            <button className="Ercan-restart-button" onClick={restartGame}>Start Over</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NuclearEngineeringGame;
