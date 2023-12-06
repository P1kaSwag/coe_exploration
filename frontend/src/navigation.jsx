import React from 'react';
import './navigation.css'; // Importing the CSS file for styling

const BottomNavBar = () => {
  return (
    <div className="bottom-nav">
      {/* Navigation items */}
      <div className="nav-item">Profile</div>
      <div className="nav-item"></div>
      <div className="nav-item">Pet</div>
      <div className="nav-item">Play</div>
      <div className="nav-item">Feed</div>
      <div className="nav-item">Dress</div>
      <div className="nav-item"></div>
      <div className="nav-item">Explore</div>
    </div>
  );
};

export default BottomNavBar;