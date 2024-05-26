import React, { useEffect, useState } from 'react';
import wordsearch from 'wordsearch-generator';
import { useParams } from 'react-router-dom'; // Import useParams hook
import './Wordsearch.css'; // Import CSS file for styling

const sentences = {
    Radiation: "Radiation shapes health and physics, guiding our understanding with its invisible force.",
    Health: "Radiation health physicists wield knowledge to protect life, vigilantly guarding against unseen threats.",
    Dosimetry: "Dosimetry, pivotal in radiation health physics, measures and manages radiation exposure.",
    Protection: "Protection, paramount in radiation health physics, shields against radiation's invisible dangers.",
    Radiobiology: "Radiobiology explores radiation's impact on life, unraveling its effects at the cellular level.",
    Medical: "Medical imaging, vital in radiation health physics, reveals health insights through radiation's lens.",
    Nuclear: "Nuclear medicine, merging physics and medicine, heals with radiation under safety's watchful eye.",
    Regulation: "Regulation anchors radiation health physics, ensuring safe and ethical radiation use across disciplines."
};

const WordSearchGame = () => {
    const { majorId } = useParams(); // Retrieve majorId from URL parameters (not needed anymore but keeping it for future use)
    const [words, setWords] = useState([
        'Radiation',
        'Health',
        'Dosimetry',
        'Protection',
        'Radiobiology',
        'Medical',
        'Nuclear',
        'Regulation'
    ]);
    const [puzzle, setPuzzle] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);
    const [isMouseDown, setIsMouseDown] = useState(false); // Track mouse down state
    const [startCell, setStartCell] = useState(null); // Track start cell of selection
    const [foundSentence, setFoundSentence] = useState('');

    useEffect(() => {
<<<<<<< HEAD
=======
        const fetchWords = async () => {
            try {
                const response = await fetch(`/api/majors/16/words`);
                const data = await response.json();
                const wordsData = data.map(item => item.word);
                setWords(wordsData);
            } catch (error) {
                console.error('Error fetching words: ', error);
            }
        };

        fetchWords();
    }, [majorId]);

    useEffect(() => {
>>>>>>> main
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
        // Do not clear selectedCells state on mouse down
        // setSelectedCells([]);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        setStartCell(null);
    };

    const handleMouseEnter = (rowIndex, columnIndex) => {
        if (isMouseDown) {
            const endCell = { row: rowIndex, column: columnIndex };
            const cellsToSelect = getCellsBetween(startCell, endCell);
            // Add newly selected cells to the existing list, ensuring no duplicates
            setSelectedCells(prevSelectedCells => Array.from(new Set([...prevSelectedCells, ...cellsToSelect])));
        }
    };

    const getCellsBetween = (startCell, endCell) => {
        if (!startCell || !endCell) return [];

        const { row: startRow, column: startColumn } = startCell;
        const { row: endRow, column: endColumn } = endCell;
        const cells = [];

        // Check if cells are in the same row or column
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

        // Display sentence
        const word = words[index];
        const sentence = sentences[word];
        setFoundSentence(sentence);
    };

    return (
        <div className="word-search-container">
            <div className="word-list">
                <h1>Radiation Health Physics Wordsearch</h1>
                <ul>
                    <li>Click and drag to highlight words from the list below</li>
                    <li>When found, click the 'X' button next to the word to mark it off</li>
                    <li>Click 'play again' for a new game or use the Navigation to explore more!</li>
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
