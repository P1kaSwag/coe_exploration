import { useEffect, useState } from 'react';
import pet from './assets/pet.png';
import './App.css';
import BottomNavBar from './navigation.jsx';


function App() {
  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
  });

  useEffect(() => {
    fetch("/data").then((res) =>
      res.json().then((data) => {
        setdata({
          name:data.Name,
          age:data.Age,
          date:data.Date,
        });
      })
    );
  }, []);

  return (
    <>
      <div>
        <p>Pet name: {data.name}</p>
        <p>Pet Age: {data.age}</p>
        <p>Current Date: {data.date}</p>
        <a>
          <img src={pet} className="pet" alt="pet asset" />
        </a>
      </div>
      <div>
        <BottomNavBar />
      </div>
      
    </>
  );
}

export default App;