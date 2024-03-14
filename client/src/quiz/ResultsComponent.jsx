import React from "react";
import "./QuizStyling.css"; // Import your CSS file for additional styling
import { NavLink } from "react-router-dom";

const ResultsComponent = ({ userAnswers }) => {
  console.log("User Answers:", userAnswers);
  const stringsOfMajors = userAnswers.join("").split(",");
  console.log("new Array== ", stringsOfMajors);
  // Function to calculate the top three results
  const majorCounts = {};
  stringsOfMajors.forEach((major) => {
    major = major.trim();
    majorCounts[major] = (majorCounts[major] || 0) + 1;
  });

  // Sort majors by their counts in descending order
  const sortedMajors = Object.keys(majorCounts).sort(
    (a, b) => majorCounts[b] - majorCounts[a]
  );

  // Get the top three majors
  const topThreeMajors = sortedMajors.slice(0, 3);

  return (
    <div className="results-container"> {/* Apply a wrapper container with additional styling */}
      <h2 className="results-heading">Top Three Majors for (insert username here...)</h2>
      <ul className="results-list">
        {topThreeMajors.map((major, index) => (
          <li key={index} className="result-item">
            <NavLink to={`/explore/${major}`}>{major}: associated {majorCounts[major]} times</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsComponent;

