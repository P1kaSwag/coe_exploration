import React, { useState, useEffect } from 'react';

const MajorRequirements = ({ major }) => {
    const [data, setData] = useState({ classes: {}, other_requirements: {} });
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Dynamically import the JSON file based on the major
          const data = await import(
            `./classes/${major.replace(/ /g, '')}Classes.json`
          );
          setData(data);
        } catch (error) {
          console.error('Error fetching JSON:', error);
          setError(error.message);
        }
      };
  
      fetchData();
    }, [major]);
  
    if (error) {
      return <div>Unable to find classes for {major}</div>; // Display a more user-friendly error message instead of the raw error
    }
  
    return (
      <div>
        <h1>{major} - Class Lists</h1>
        <ul>
          {Object.entries(data.classes).map(([key, value]) => (
            <li key={key}>
              <strong>{key}</strong>: {value.title} ({value.credits} credits)
            </li>
          ))}
        </ul>
  
        <h1>{major} - Other Requirements</h1>
        <ul>
          {Object.entries(data.other_requirements).map(([key, value]) => (
            <li key={key}>
              <strong>{key}</strong> {value.title} ({value.credits} credits)
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MajorRequirements;
  