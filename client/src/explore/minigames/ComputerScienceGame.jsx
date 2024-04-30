import React, { useEffect, useState } from 'react';
import wordsearch from 'wordsearch-generator';
import './WordSearchGame.css'; // Import CSS file for styling

const WordSearchGame = () => {
    const [words, setWords] = useState([]);
    const [puzzle, setPuzzle] = useState([]);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [selectedWord, setSelectedWord] = useState('');

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/majors/4/words');
                const data = await response.json();
                const wordsData = data.map(item => ({
                    word: item.word,
                    selected: false
                }));
                setWords(wordsData);
            } catch (error) {
                console.error('Error fetching words: ', error);
            }
        };

        fetchWords();
    }, []);

    useEffect(() => {
        if (words.length > 0) {
            const puzzleGrid = wordsearch.createPuzzle(25, 25, 'en', words.map(item => item.word));
            const hiddenGrid = wordsearch.hideWords(puzzleGrid, 'en'); // Hide the words
            setPuzzle(hiddenGrid);
        }
    }, [words]);

    const handleMouseDown = () => {
        setSelectedLetters([]);
        setSelectedWord('');
    };

    const handleMouseEnter = (rowIndex, colIndex) => {
        if (selectedLetters.length > 0) {
            const lastSelectedLetter = selectedLetters[selectedLetters.length - 1];
            const adjacentLetterIndices = [
                [rowIndex - 1, colIndex], [rowIndex + 1, colIndex], [rowIndex, colIndex - 1], [rowIndex, colIndex + 1],
                [rowIndex - 1, colIndex - 1], [rowIndex - 1, colIndex + 1], [rowIndex + 1, colIndex - 1], [rowIndex + 1, colIndex + 1]
            ];
            const isAdjacent = adjacentLetterIndices.some(([r, c]) => r === lastSelectedLetter[0] && c === lastSelectedLetter[1]);
            if (isAdjacent && !selectedLetters.some(([r, c]) => r === rowIndex && c === colIndex)) {
                setSelectedLetters([...selectedLetters, [rowIndex, colIndex]]);
            }
        }
    };

    const handleMouseUp = () => {
        const selectedWord = getSelectedWord();
        setSelectedWord(selectedWord);
        const updatedWords = words.map(item => {
            if (item.word === selectedWord) {
                return { ...item, selected: true };
            }
            return item;
        });
        setWords(updatedWords);
    };

    const getSelectedWord = () => {
        const selectedWord = selectedLetters.reduce((word, [rowIndex, colIndex]) => {
            return word + puzzle[rowIndex][colIndex];
        }, '');
        return selectedWord;
    };

    const formattedPuzzle = puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="word-search-row">
            {row.map((letter, colIndex) => {
                const isSelected = selectedLetters.some(([r, c]) => r === rowIndex && c === colIndex);
                return (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`word-search-cell ${isSelected ? 'selected' : ''}`}
                        onMouseDown={handleMouseDown}
                        onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                        onMouseUp={handleMouseUp}
                    >
                        {letter}
                    </div>
                );
            })}
        </div>
    ));

    return (
        <div className="word-search-container">
            <div className="word-list">
                <h2>Word List</h2>
                <ul>
                    {words.map((item, index) => (
                        <li key={index} className={item.selected ? 'selected' : ''}>{item.word}</li>
                    ))}
                </ul>
            </div>
            <div className="word-search-grid">
                {formattedPuzzle}
            </div>
        </div>
    );
};

export default WordSearchGame;
