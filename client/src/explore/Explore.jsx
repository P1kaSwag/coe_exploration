import React, { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useParams } from "react-router-dom";

import '../assets/explore.css'
import Background from '../assets/majorsbg.jpg'

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
    <div className="majors" style={{backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll'}}>
      {majors.map(major => (
        <div key={major.majorID} class="major">
          {console.log(major.majorName)}
          {console.log(major.majorID)}
          <NavLink to={`/explore/${encodeURIComponent(major.majorName)}?majorID=${major.majorID}`} style={{ textDecoration: 'none', color: 'black' }}>
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
      <div className="majorInfo">
        <h3>Top Professors</h3> 
          <div className="center">
            <div className="professorCard"> {majorInfo.topProfessor1} </div>
            <div className="professorCard"> {majorInfo.topProfessor2} </div>
            <div className="professorCard"> {majorInfo.topProfessor3} </div>
          </div>
        {/*<p>{majorInfo.topProfessors}</p>*/}
      </div>

      <div className="majorInfo"> 
        <h3>Student Quotes</h3> 
        <ul class="leftText">
          <li>{majorInfo.studentQuote1}</li>
          <li>{majorInfo.studentQuote2}</li>
        </ul>
      </div>

      <div className="majorInfo">
        <h3>Careers </h3>
        <p>{majorInfo.careers}</p>
      </div>

      <div className="majorInfo">
        <h3>Potential Minors</h3>
        <p>{majorInfo.minors}</p>
      </div>

      <div className="majorInfo">
        <h3>Skills Current Students Recommend to be Successfull in {majorName} </h3>
        <p>{majorInfo.skills}</p>
      </div>

      <div className="majorInfo">
        <h3>Interests that led Current Students to {majorName}</h3> 
        <p>{majorInfo.interests}</p>
      </div>

      <div className="playButton"><NavLink to={`/explore/${majorName}/minigame`} style={{ textDecoration: 'none', color: 'black' }}>Play the {majorName} Game</NavLink></div>
    </>
  );
}