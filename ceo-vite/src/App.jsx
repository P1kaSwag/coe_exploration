// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React, { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import ResultsComponent from './ResultsComponent';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('question');
  const [userAnswers, setUserAnswers] = useState({});

  const handleNext = (selectedOption, isFinalQuestion) => {
    setUserAnswers(prevAnswers => ({ ...prevAnswers, [currentPage]: selectedOption }));

    // If it's the final question, display results
    if (isFinalQuestion) {
      setCurrentPage('results');
    }
  };

  return (
    <div>
      {currentPage === 'question' && (
        <QuestionComponent onNext={handleNext} />
      )}
      {currentPage === 'results' && (
        <ResultsComponent userAnswers={userAnswers} />
      )}
    </div>
  );
};

export default App;