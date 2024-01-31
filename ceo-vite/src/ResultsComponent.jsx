const ResultsComponent = ({ userAnswers }) => {
    // Function to calculate the top result
    const calculateTopResult = () => {
      const answerCounts = {
        "Computer Science": 0,
        "Civil Engineering": 0,
        "Chemistry": 0,
      };
  
      // Count the occurrences of each answer
      for (const answer of Object.values(userAnswers)) {
        answerCounts[answer]++;
      }
  
      // Determine the top result
      const topResult = Object.keys(answerCounts).reduce((a, b) => answerCounts[a] > answerCounts[b] ? a : b);
      return topResult;
    };
  
    const topResult = calculateTopResult();
  
    return (
      <div className='results'>
        <h1>Results Page</h1>
        <p>Your top result is: {topResult}</p>
      </div>
    );
  };
  
  export default ResultsComponent;
  