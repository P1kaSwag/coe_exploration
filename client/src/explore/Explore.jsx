import React, { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useParams } from "react-router-dom";

import '../assets/explore.css'

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
          {console.log(major.majorName)}
          {console.log(major.majorID)}
          <NavLink to={`/explore/${encodeURIComponent(major.majorName)}?majorID=${major.majorID}`}>
              <h2>{major.majorName}</h2></NavLink>
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
  const [serachParams] = useSearchParams();
  const { majorName } = useParams();
  const majorID = serachParams.get('majorID');

  useEffect(() => {
    const fetchMajorInfo = async () => {
    // Send a request to the server to get the major information
    const response = await fetch(`http://localhost:8000/api/majors/majorinformation/${majorID}`);

    // Check if the request was successful (response code 200-299)
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMajorInfo(data.majorInfo);
    } else {
        console.error('Error status: ${response.status}');
    }
    };
    fetchMajorInfo();
  }, [majorID]);
  
  return (
    <>
      <h1>{majorInfo.majorName} Info</h1>
      <p>Top Professors: {majorInfo.topProfessors}</p>
      <p>Student Quotes: {majorInfo.studentQuotes}</p>
      <p>Careers: {majorInfo.careers}</p>
      <NavLink to={`/explore/${majorName}/minigame`}>Play {majorName} Game</NavLink>
    </>
  );
}