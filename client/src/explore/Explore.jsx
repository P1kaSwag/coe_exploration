import React, { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useParams } from "react-router-dom";

import './explore.css'
import Background from '../assets/majorsbg.png'
import MajorBackground from '../assets/exploremajorbg.png'

const Explore = () => {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    // Fetch data from the Flask server
    fetch('/api/majors')
      .then(response => response.json())
      .then(data => setMajors(data))
      .catch(error => console.error('Error fetching majors:', error));
  }, []);

  return (
    <div className="majors" style={{backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}>
      {majors.map(major => (
        <NavLink to={`/explore/${encodeURIComponent(major.majorName)}?majorID=${major.majorID}`} key={major.majorID} style={{ textDecoration: 'none', color: 'black' }}>
          <div className="major">
            <h2 className="leftText">{major.majorName}</h2>
            <p>{major.majorDescription}</p>
            <p>Career Ideas: {major.careerProspects}</p>
          </div>
        </NavLink>
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
    const response = await fetch(`/api/majors/majorinformation/${majorID}`);

    // Check if the request was successful (response code 200-299)
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMajorInfo(data.majorInfo);
    } else {
      console.error(`Error status: ${response.status}`);
    }
    };
    fetchMajorInfo();
  }, [majorID]);
  
  return (
    <>
      <div style={{backgroundImage: `url(${MajorBackground})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}>
        <h1>{majorName} Information</h1>
        <div className="majorInfo">
          <h3>Top Professors</h3> 
            <div className="center">
              <div className="professorCard"> <img src="https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY" className="professorImage"></img>{majorInfo.topProfessor1} </div>
              <div className="professorCard"> <img src="https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY" className="professorImage"></img> {majorInfo.topProfessor2} </div>
              <div className="professorCard"> <img src="https://engineering.oregonstate.edu/sites/engineering.oregonstate.edu/files/styles/profile_image/public/default_images/profile_preview.png?itok=5RN_oJyY" className="professorImage"></img> {majorInfo.topProfessor3} </div>
            </div>
          {/*<p>{majorInfo.topProfessors}</p>*/}
        </div>

        <div className="majorInfo"> 
          <h3>Student Quotes</h3> 
          <ul className="leftText">
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
          <h3>Skills Current Students Recommend to be Successful in {majorName} </h3>
          <p>{majorInfo.skills}</p>
        </div>

        <div className="majorInfo">
          <h3>Interests that led Current Students to {majorName}</h3> 
          <p>{majorInfo.interests}</p>
        </div>

        <div className="playButton"><NavLink to={`/explore/${majorName}/minigame`} style={{ textDecoration: 'none', color: 'black' }}>Play the {majorName} Game</NavLink></div>
      </div>
    </>
  );
}