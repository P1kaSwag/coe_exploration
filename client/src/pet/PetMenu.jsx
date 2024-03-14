import React from 'react';
import './pet_styles.css'; // Import the CSS for styling

const PetMenu = ({ x, y, onOptionSelected }) => {
    return (
        <div className="pet-menu" style={{ top: y, left: x }}>
            <button className="menu-option top" onClick={() => onOptionSelected('pet')}>Pet</button>
            <button className="menu-option right" onClick={() => onOptionSelected('play')}>Play</button>
            <button className="menu-option bottom" onClick={() => onOptionSelected('feed')}>Feed</button>
            <button className="menu-option left" onClick={() => onOptionSelected('wash')}>Wash</button>
        </div>
    );
};

export default PetMenu;