import React, { useState } from 'react';
import './ChemicalEngineeringGame.css';
import { row1, row2, row3, row4, row5, row6, row7, row8, row9, empty } from './PeriodicTable';
// https://codepen.io/kevinmarks/pen/qjqXxG
const ChemicalEngineeringGame = () => {
  const [inputValue, setInputValue] = useState('');
  const [removedElement, setRemovedElement] = useState(null);
  const [rowIndex, setRowIndex] = useState(null);
  const [removedIndex, setRemovedIndex] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [periodicTable, setPeriodicTable] = useState({
    row1: row1,
    row2: row2,
    row3: row3,
    row4: row4,
    row5: row5,
    row6: row6,
    row7: row7,
    empty: empty,
    row8: row8,
    row9: row9
  });

  const removeRandomElement = () => {
    var element = { atomicNumber: 0, symbol: '', name: '', atomicMass: '' };
    while (element.atomicNumber === 0) {
      const randomRow = Math.floor(Math.random() * 9) + 1;
      const row = periodicTable['row' + randomRow];
      const randomElementIndex = Math.floor(Math.random() * row.length);
      element = row[randomElementIndex];

      if (element.atomicNumber !== 0) {
        row[randomElementIndex] = { ...element, symbol: '?', name: '?' };
        setRowIndex(randomRow);
        setRemovedIndex(randomElementIndex);
        setRemovedElement(element);
      }
    }
    setShowButton(true);
    elementAnswer();
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const elementAnswer = () => {
    if (removedElement && inputValue.toLowerCase() === removedElement.name.toLowerCase()) {
      const updatedTable = { ...periodicTable };
      const indexedRow = updatedTable['row' + rowIndex];
      indexedRow[removedIndex] = removedElement;
      setPeriodicTable(updatedTable);
    }
  };

  const giveHint = () => {
    const updatedTable = { ...periodicTable };
    const indexedRow = updatedTable['row' + rowIndex];
    indexedRow[removedIndex] = { ... removedElement, name: '?'}
    setShowButton(false);

  }

  const renderRow = (elements) => {
    return (
      <div class="periodic-row">
        {elements.map(element => (
          <div class="cell" key={element.atomicNumber}>
            {element.atomicNumber === 0 ? null : (
              <div class="element">
                <div class="atomic_num">{element.atomicNumber}</div>
                <div class="symbol">{element.symbol}</div>
                <div class="atomic_mass">{element.name}<br />{element.atomicMass}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div class="periodic">
      <h1>What's the missing element?</h1>
      <p> Click on the error in the code.</p>
      <button onClick={removeRandomElement}>Remove Random Element</button>
      <div>Removed Element: {removedElement ? `${removedElement.name} (${removedElement.symbol})` : 'None'}</div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter replacement text"
      />
      <button onClick={elementAnswer}>Confirm</button>

      {showButton ? (<button onClick={giveHint}>Hint</button>) : null }

      {Object.keys(periodicTable).map(rowKey => (
        <React.Fragment key={rowKey}>
          {renderRow(periodicTable[rowKey])}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ChemicalEngineeringGame;
