import React, { useEffect, useState } from 'react';
import wordsearch from 'wordsearch-generator';
import { useParams } from 'react-router-dom'; // Import useParams hook
import './Wordsearch.css'; // Import CSS file for styling

const sentences = {
    Interdisciplinary: "Interdisciplinary approaches in engineering science foster innovation by integrating diverse fields of knowledge.",
    Research: "Research in engineering science drives technological advancements and solves complex problems through systematic investigation.",
    Analysis: "Analysis is crucial in engineering science, breaking down complex systems to understand their components and interactions.",
    Modeling: "Modeling in engineering science creates representations of real-world systems, allowing for predictions and optimizations.",
    Simulation: "Simulation uses computational tools to replicate and study the behavior of systems under various conditions.",
    Optimization: "Optimization in engineering science seeks the most efficient solutions by refining processes and systems.",
    Theory: "Theory provides the foundational principles in engineering science, guiding research and practical applications.",
    Experimentation: "Experimentation tests hypotheses in engineering science, validating theories and informing improvements in technology."
};

const WordSearchGame = () => {
    const { majorId } = useParams(); // Retrieve majorId from URL parameters
    const [words, setWords] = useState([
        'Interdisciplinary', 
        'Research', 
        'Analysis', 
        'Modeling', 
        'Simulation', 
        'Optimization', 
        'Theory', 
        'Experimentation'
    ]);
    const [puzzle, setPuzzle] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);
    const [isMouseDown, setIsMouseDown] = useState(false); // Track mouse down state
    const [startCell, setStartCell] = useState(null); // Track start cell of selection
    const [foundSentence, setFoundSentence] = useState('');

    useEffect(() => {
        if (words.length > 0) {
            const puzzleGrid = wordsearch.createPuzzle(20, 20, 'en', words);
            const hiddenGrid = wordsearch.hideWords(puzzleGrid, 'en'); // Hide the words
            setPuzzle(hiddenGrid);
        }
    }, [words]);

    const handleMouseDown = (event, rowIndex, columnIndex) => {
        event.preventDefault(); // Prevent default behavior to avoid selecting text
        setIsMouseDown(true);
        setStartCell({ row: rowIndex, column: columnIndex });
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        setStartCell(null);
    };

    const handleMouseEnter = (rowIndex, columnIndex) => {
        if (isMouseDown) {
            const endCell = { row: rowIndex, column: columnIndex };
            const cellsToSelect = getCellsBetween(startCell, endCell);
            setSelectedCells(prevSelectedCells => Array.from(new Set([...prevSelectedCells, ...cellsToSelect])));
        }
    };

    const getCellsBetween = (startCell, endCell) => {
        if (!startCell || !endCell) return [];

        const { row: startRow, column: startColumn } = startCell;
        const { row: endRow, column: endColumn } = endCell;
        const cells = [];

        if (startRow === endRow) { // Horizontal selection
            for (let col = Math.min(startColumn, endColumn); col <= Math.max(startColumn, endColumn); col++) {
                cells.push(`${startRow}-${col}`);
            }
        } else if (startColumn === endColumn) { // Vertical selection
            for (let row = Math.min(startRow, endRow); row <= Math.max(startRow, endRow); row++) {
                cells.push(`${row}-${startColumn}`);
            }
        }

        return cells;
    };

    const handleWordFound = (index) => {
        const buttons = document.querySelectorAll('.word-list button');
        buttons[index].innerText = 'Found';
        const wordSpan = document.querySelectorAll('.word-list span');
        wordSpan[index].style.textDecoration = 'line-through';

        const word = words[index];
        const sentence = sentences[word];
        setFoundSentence(sentence);
    };

    return (
        <div className="word-search-container">
            <div className="word-list">
                <h1>Engineering Science Wordsearch</h1>
                <ul>
                    <li>Click and drag to highlight words from the list below</li>
                    <li>When found, click the 'X' button next to the word to mark it off</li>
                    <li>Click 'Play Again' for a new game or use the Navigation to explore more!</li>
                </ul>
                <h2>Word List</h2>
                <ul>
                    {words.map((word, index) => (
                        <li key={index}>
                            <span>{word}</span>
                            <button className="button" onClick={() => handleWordFound(index)}>X</button>
                        </li>
                    ))}
                </ul>
                <div>
                    {foundSentence && (
                        <div>
                            <p>{foundSentence}</p>
                        </div>
                    )}
                </div>
                <br />
                <button onClick={() => window.location.reload()}>Play Again!</button>
            </div>
            <div
                className="word-search-grid"
                onMouseDown={(event) => setIsMouseDown(true)}
                onMouseUp={handleMouseUp}
            >
                {puzzle.map((row, rowIndex) => (
                    <div className="word-search-row" key={rowIndex}>
                        {row.map((letter, columnIndex) => (
                            <div
                                className={`word-search-cell ${selectedCells.includes(`${rowIndex}-${columnIndex}`) ? 'selected' : ''}`}
                                key={`${rowIndex}-${columnIndex}`}
                                onMouseDown={(event) => handleMouseDown(event, rowIndex, columnIndex)}
                                onMouseEnter={() => handleMouseEnter(rowIndex, columnIndex)}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WordSearchGame;
