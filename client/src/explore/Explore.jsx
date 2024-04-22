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
        <div key={major.majorID} class="major">
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
      <h1>{majorName} Information</h1>
      <div class="majorInfo">
        <h3>Top Professors</h3> 
        {/* Figure out a way to put professor images here? */}
        <p>{majorInfo.topProfessors}</p>
      </div>

      <div class="majorInfo"> 
        <h3>Student Quotes</h3> 
        <ul class="leftText">
          <li>{majorInfo.studentQuotes}</li>
        </ul>
      </div>

      <div class="majorInfo">
        <h3>Careers </h3>
        <p>{majorInfo.careers}</p>
      </div>

      <div class="majorInfo">
        <h3>Minors</h3>
        <p>{majorInfo.minors}</p>
      </div>

      <div class="majorInfo">
        <h3>Skills Current Students Recommend to be Successfull in {majorName} </h3>
        <p>{majorInfo.skills}</p>
      </div>

      <div class="majorInfo">
        <h3>Interests that led Current Students to {majorName}</h3> 
        <p>{majorInfo.interests}</p>
      </div>

      <div class="playButton"><NavLink to={`/explore/${majorName}/minigame`}>Play the {majorName} Game</NavLink></div>
    </>
  );
}