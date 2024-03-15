import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from "react-router-dom";

const Explore = () => {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    // Fetch data from the Flask server
    fetch('http://localhost:8000/api/majors')
      .then(response => response.json())
      .then(data => setMajors(data))
      .catch(error => console.error('Error fetching majors:', error));
  }, []);

  return (
    <div className="majors">
      {majors.map(major => (
        <div key={major.majorID} className="major">
          <NavLink to={`/explore/${major.majorName}`}><h2>{major.majorName}</h2></NavLink>
          <p>{major.majorDescription}</p>
          <p>Career Prospects: {major.careerProspects}</p>
        </div>
      ))}
    </div>
  );
};

export default Explore;

export function MajorInfo() {
  const [majorInfo, setMajorInfo] = useState([]);
  const params = useParams();
  const majorItem = majorInfo[params.majorItem]

  useEffect(() => {
    fetch('http://localhost:8000//api/majors/majorinformation')
      .then(response => response.json())
      .then(data => setMajorInfo(data))
      .catch(error => console.error('Error fetching majors:', error));
  }, []);
  
  return (
    <>
      <h1>{majorItem.majorName} Info</h1>

      {/* Make this into a navlink for the game? */}
      <button type="button">Play the Game</button>
    </>
  );
}