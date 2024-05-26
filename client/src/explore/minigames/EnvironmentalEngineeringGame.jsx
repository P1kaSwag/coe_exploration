import React, { useState, useEffect } from 'react';
import './ElectricalAndComputerEngineeringGame.css';

const ElectricalAndComputerEngineeringGame = () => {
    const dictionary = {
      Sustainability: 'Avoidance of the depletion of natural resources to maintain ecological balance',
      Ecosystem: 'A community of living organisms and their interactions with the enviornment',
      Pollution: 'The introduction of harmful substances or products into the environment',
      Bioremdiation: 'The use of living organisms to remove or neutralize contaminents',
      Biodiversity: 'The variety of life in a particular habitat or ecosystem',
      Microplastics: 'Small plastic particles that result from the breakdown of larger debris',
      Toxicology: 'The scientific study of the harmful effect of chemicals and other agents on living organisms',
      Desalination: 'The process of removing salt and other impurities from water for consumption or irrigation'
    };

    const [cards, setCards] = useState(generateCards());
    const [flippedIndexes, setFlippedIndexes] = useState([]);
    const [numMatched, setNumMatched] = useState(0);
    const [gameEnd, setGameEnd] = useState(false);

    function generateCards() {
      const cards = [];
      const entries = Object.entries(dictionary);
      const shuffledEntries = entries.sort(() => Math.random() - 0.5);
 
      shuffledEntries.forEach(([entry, def]) => {
        cards.push({ content: entry, isFlipped: false, isMatched: false });
        cards.push({ content: def, isFlipped: false, isMatched: false });
      });  

      const shuffledCards = cards.sort(() => Math.random() - 0.5);
      // Prints the order of the cards to the console
      //console.log(shuffledCards);
      return shuffledCards;
    }

    function handleCardClick(index) {
      if (flippedIndexes.length < 2) {
        if (!cards[index].isFlipped) {
          const newCards = [...cards];
          newCards[index].isFlipped = true;
  
          const newFlippedIndexes = [...flippedIndexes, index];
          setFlippedIndexes(newFlippedIndexes);
  
          if (newFlippedIndexes.length === 2) {
            const [firstIndex, secondIndex] = newFlippedIndexes;
            if (cards[firstIndex].content === dictionary[cards[secondIndex].content] || 
                cards[secondIndex].content === dictionary[cards[firstIndex].content]) {
              setTimeout(() => {
                const matchedCards = cards.map((card, i) => (
                  i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
                ));
                setCards(matchedCards);
                setFlippedIndexes([]);
                setNumMatched(numMatched + 2);
                console.log(numMatched);
                
                if(numMatched == 14){
                  setGameEnd(true);
                }
              }, 1000);
            } else {
              setTimeout(() => {
                const resetCards = cards.map((card, i) => (
                  i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
                ));
                setFlippedIndexes([]);
                setCards(resetCards);
              }, 1000);
            }
          }
        }
      }
    }

    function renderCard(card, index) {
      return (
        <div
          key={index}
          className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
          onClick={() => handleCardClick(index)}
        >
          {card.isFlipped ? (
            <div className="front">{card.content}</div>
          ) : (
            <div className="back"></div>
          )}
        </div>
      );
    }
    
    // Maybe change to a function, if it's needed to give the rewards
    const Reward = () =>(
      <div>
          You win!
          <p>Here are the terms you matched:</p>
          <ul>
            {Object.entries(dictionary).map(([term, definition]) => (
              <li key={term}>
                <strong>{term}:</strong> {definition}
              </li>
            ))}
          </ul>
          <button onClick={() => window.location.reload()}>Play again?</button>
          
      </div>
      
    );

    function renderGrid() {
      return (
        <div className="grid">
          {cards.map((card, index) => renderCard(card, index))}
        </div>
      );
    }
  
    return (
      <div className="ece-game">
        <h1>Electrical and Computer Engineering Matching Game</h1>
        {gameEnd ? <Reward /> : renderGrid()}
      </div>
    );
    
  };

export default ElectricalAndComputerEngineeringGame;
