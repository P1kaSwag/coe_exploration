import React from 'react';
import { useParams, NavLink } from 'react-router-dom';

const MajorDetails = () => {
  const { majorName } = useParams(); // Extract the major name from the URL
  // Fetch more detailed data about the major if needed

  return (
    <div>
      <h1>{majorName} Major</h1>
      <NavLink to={`/explore/${majorName}/minigame`}>Play {majorName} Game</NavLink>
    </div>
  );
};

export default MajorDetails;