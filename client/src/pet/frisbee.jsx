import { useState, useEffect } from 'react';
import frisbee from '/src/assets/Decorations/frisbee.png';

function FrisbeeReward({ onThrow, resetPosition }) {
  const [position, setPosition] = useState({ top: '70%', left: '20%' });
  const [isThrown, setIsThrown] = useState(false);

  const handleThrow = () => {
    // Send the frisbee off screen
    const newTop = '10%';
    const newLeft = '-30%';

    setPosition({ top: newTop, left: newLeft });
    setIsThrown(true);
    onThrow({ top: newTop, left: newLeft });

    // Reset position after 3 seconds
    setTimeout(() => {
      setIsThrown(false);
      setPosition({ top: '50%', left: '50%' });
      resetPosition();
    }, 3000);
  };

  return (
    <img className='frisbee'
      src={frisbee}
      style={{
        top: position.top,
        left: position.left,
        transition: isThrown ? 'top 2s, left 3s, transform 1s' : 'none',
        transform: isThrown ? 'scale(0.5)' : 'scale(1)',
        pointerEvents: isThrown ? 'none' : 'auto',
      }}
      onClick={handleThrow}
      alt="frisbee"
    />
  );
}

export default FrisbeeReward;
