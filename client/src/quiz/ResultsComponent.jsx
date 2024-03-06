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
    <div>
      <h2>Top Three Majors for (insert username here...)</h2>
      <ul>
        {topThreeMajors.map((major, index) => (
          <li key={index}>
            {major}: associated {majorCounts[major]} times
          </li>
        ))}
      </ul>
    </div>
  );
};


export default ResultsComponent;
//   const calculateTopResults = () => {
//     const answerCounts = {};

//     // Count the occurrences of each answer
//     for (const answers of Object.values(userAnswers)) {
//       for (const answer of answers) {
//         if (!answerCounts[answer]) {
//           answerCounts[answer] = 0;
//         }
//         answerCounts[answer]++;
//       }
//     }

//     // Sort the answer counts in descending order
//     const sortedAnswers = Object.entries(answerCounts).sort(
//       (a, b) => b[1] - a[1]
//     );

//     // Extract the top three results
//     const topResults = sortedAnswers.slice(0, 3).map((entry) => entry[0]);
//     return topResults;
//   };

//   const handleClick = (e, topResult) => {
//     e.preventDefault();
//     // Update the window location to the dynamic value
//     window.location.href = `../explore/${topResult}/`;
//   };

//   const topResults = calculateTopResults();

//   return (
//     <div className="results">
//       <h1>Results Page</h1>
//       <p>Your top three results are:</p>
//       <ul>
//         {topResults.map((result, index) => (
//           <li key={index}>{result}</li>
//         ))}
//       </ul>
//       <button
//         type="submit"
//         id="loginButton"
//         onClick={(e) => handleClick(e, topResults[0])}
//       >
//         Learn More
//       </button>
//     </div>
//   );
// };


