// QuestionDefinitions.jsx
import React from 'react';

const Question1 = ({ selectedOption, onOptionChange, onNext }) => (
  <div>
    <p>Question 1: Which area of technology fascinates you the most?</p>
    <input
      type="radio"
      name="q1"
      value="Computer Science,Construction Engineering Management,"
      checked={selectedOption === "Computer Science,Construction Engineering Management,"}
      onChange={onOptionChange}
    />
    A. Infrastructure and urban development
    <br />
    <input
      type="radio"
      name="q1"
      value="Civil Engineering,Architectural Engineering,"
      checked={selectedOption === "Civil Engineering,Architectural Engineering,"}
      onChange={onOptionChange}
    />
    B. Software engineering and digital solutions
    <br />
    <input
      type="radio"
      name="q1"
      value="Electrical and Computer Engineering,Bioengineering,Environmental Engineering,Chemical Engineering,Ecological Engineering"
      checked={selectedOption === "Electrical and Computer Engineering,Bioengineering,Environmental Engineering,Chemical Engineering,Ecological Engineering"}
      onChange={onOptionChange}
    />
    C. Energy production and environmental sustainability
    <br />
    <input
      type="radio"
      name="q1"
      value="Mechanical Engineering,Industrial Engineering,Manufacturing Engineering"
      checked={selectedOption === "Mechanical Engineering,Industrial Engineering,Manufacturing Engineering"}
      onChange={onOptionChange}
    />
    D. Machinery and industrial automation
    <br />
    <br />
    {/* <button onClick={() => onNext(selectedOption)}>Next</button> */}
  </div>
);

const Question2 = ({ selectedOption, onOptionChange, onNext }) => (
  <div>
    <p>Question 2:What kind of projects would you enjoy working on?</p>
    <input
      type="radio"
      name="q2"
      value="Computer Science,Energy Systems Engineering (Cascades),"
      checked={selectedOption === "Computer Science,Energy Systems Engineering (Cascades),"}
      onChange={onOptionChange}
    />
    A. Architectural design and construction management
    <br />
    <input
      type="radio"
      name="q2"
      value="Civil Engineering,Environmental Engineering,Energy Systems Engineering (Cascades),Ecological Engineering"
      checked={selectedOption === "Civil Engineering,Environmental Engineering,Energy Systems Engineering (Cascades),Ecological Engineering"}
      onChange={onOptionChange}
    />
    B. Software development and data analytics
    <br />
    <input
      type="radio"
      name="q2"
      value="Aerospace Engineering,Chemical Engineering,Bioengineering,Radiation Health Physics,Engineering Science (Cascades)"
      checked={selectedOption === "Aerospace Engineering,Chemical Engineering,Bioengineering,Radiation Health Physics,Engineering Science (Cascades)"}
      onChange={onOptionChange}
    />
    C. Renewable energy and ecological engineering
    <br />
    <input
      type="radio"
      name="q2"
      value="Mechanical Engineering,Manufacturing Engineering,Industrial Engineering"
      checked={selectedOption === "Mechanical Engineering,Manufacturing Engineering,Industrial Engineering"}
      onChange={onOptionChange}
    />
    D. Manufacturing processes and supply chain management
    <br />
    <br />
    {/* <button onClick={() => onNext(selectedOption)}>Next</button> */}
  </div>
);

const Question3 = ({ selectedOption, onOptionChange, onNext }) => (
  <div>
    <p>Question 3:What aspect of engineering interests you the most?</p>
    <input
      type="radio"
      name="q3"
      value="Computer Science,Engineering Science (Cascades),Bioengineering"
      checked={selectedOption === "Computer Science,Engineering Science (Cascades),Bioengineering"}
      onChange={onOptionChange}
    />
    A. Structural design and urban planning
    <br />
    <input
      type="radio"
      name="q3"
      value="Civil Engineering,Nuclear Engineering,Architectural Engineering,Energy Systems Engineering (Cascades)"
      checked={selectedOption === "Civil Engineering,Nuclear Engineering,Architectural Engineering,Energy Systems Engineering (Cascades)"}
      onChange={onOptionChange}
    />
    B. Programming and software architecture
    <br />
    <input
      type="radio"
      name="q3"
      value="Aerospace Engineering,Radiation Health Physics,Electrical and Computer Engineering,Mechanical Engineering"
      checked={selectedOption === "Aerospace Engineering,Radiation Health Physics,Electrical and Computer Engineering,Mechanical Engineering"}
      onChange={onOptionChange}
    />
    C. Environmental conservation and resource management
    <br />
    <input
      type="radio"
      name="q3"
      value="Mechanical Engineering,Outdoor Products (Cascades),Industrial Engineering,Environmental Engineering"
      checked={selectedOption === "Mechanical Engineering,Outdoor Products (Cascades),Industrial Engineering,Environmental Engineering"}
      onChange={onOptionChange}
    />
    D. Industrial optimization and process engineering
    <br />
    <br />
    {/* <button onClick={() => onNext(selectedOption)}>Next</button> */}
  </div>
);

const Question4 = ({ selectedOption, onOptionChange, onNext }) => (
  <div>
    <p>Question 4:Which field of study aligns with your career aspirations?</p>
    <input
      type="radio"
      name="q4"
      value="Computer Science,Ecological Engineering,Engineering Science (Cascades),"
      checked={selectedOption === "Computer Science,Ecological Engineering,Engineering Science (Cascades),"}
      onChange={onOptionChange}
    />
    A. Civil engineering and infrastructure development
    <br />
    <input
      type="radio"
      name="q4"
      value="Civil Engineering,Chemical Engineering,Industrial Engineering"
      checked={selectedOption === "Civil Engineering,Chemical Engineering,Industrial Engineering"}
      onChange={onOptionChange}
    />
    B. Computer science and information technology
    <br />
    <input
      type="radio"
      name="q4"
      value="Aerospace Engineering,Industrial Engineering,Mechanical Engineering"
      checked={selectedOption === "Aerospace Engineering,Industrial Engineering,Mechanical Engineering"}
      onChange={onOptionChange}
    />
    C. Environmental engineering and sustainable design
    <br />
    <input
      type="radio"
      name="q4"
      value="Mechanical Engineering,Bioengineering,Civil Engineering,Architectural Engineering"
      checked={selectedOption === "Mechanical Engineering,Bioengineering,Civil Engineering,Architectural Engineering"}
      onChange={onOptionChange}
    />
    D. Industrial engineering and manufacturing systems
    <br />
    <br />
    {/* <button onClick={() => onNext(selectedOption)}>Next</button> */}
  </div>
);

const Question5 = ({ selectedOption, onOptionChange, onNext }) => (
  <div>
    <p>Question 5:What motivates you to pursue a career in engineering?</p>
    <input
      type="radio"
      name="q5"
      value="Computer Science,Construction Engineering Management,"
      checked={selectedOption === "Computer Science,Construction Engineering Management,"}
      onChange={onOptionChange}
    />
    A. Creating sustainable and resilient urban environments
    <br />
    <input
      type="radio"
      name="q5"
      value="Civil Engineering,Architectural Engineering"
      checked={selectedOption === "Civil Engineering,Architectural Engineering"}
      onChange={onOptionChange}
    />
    B. Innovating with technology and digital solutions
    <br />
    <input
      type="radio"
      name="q5"
      value="Electrical and Computer Engineering,Bioengineering,Environmental Engineering,Chemical Engineering,Ecological Engineering"
      checked={selectedOption === "Electrical and Computer Engineering,Bioengineering,Environmental Engineering,Chemical Engineering,Ecological Engineering"}
      onChange={onOptionChange}
    />
    C. Addressing environmental challenges and climate change
    <br />
    <input
      type="radio"
      name="q5"
      value="Mechanical Engineering,Industrial Engineering,Manufacturing Engineering"
      checked={selectedOption === "Mechanical Engineering,Industrial Engineering,Manufacturing Engineering"}
      onChange={onOptionChange}
    />
    D. Optimizing production processes and industrial systems
    <br />
    <br />
    {/* <button onClick={() => onNext(selectedOption)}>Next</button> */}
  </div>
);

const Question6 = ({ selectedOption, onOptionChange, onNext }) => (
  <div>
    <p>Question 6:What type of course are you most interested in taking?</p>
    <input
      type="radio"
      name="q6"
      value="Computer Science,Construction Engineering Management,"
      checked={selectedOption === "Computer Science,Construction Engineering Management,"}
      onChange={onOptionChange}
    />
    A. Programming and Software Development
    <br />
    <input
      type="radio"
      name="q6"
      value="Civil Engineering,Architectural Engineering,"
      checked={selectedOption === "Civil Engineering,Architectural Engineering,"}
      onChange={onOptionChange}
    />
    B. Engineering and Design
    <br />
    <input
      type="radio"
      name="q6"
      value="Bioengineering,Environmental Engineering,Chemical Engineering,Ecological Engineering"
      checked={selectedOption === "Bioengineering,Environmental Engineering,Chemical Engineering,Ecological Engineering"}
      onChange={onOptionChange}
    />
    C. Scientific Research and Analysis
    <br />
    <input
      type="radio"
      name="q6"
      value="Mechanical Engineering,Industrial Engineering,Manufacturing Engineering"
      checked={selectedOption === "Mechanical Engineering,Industrial Engineering,Manufacturing Engineering"}
      onChange={onOptionChange}
    />
    D. Project Management and Leadership
    <br />
    <br />
    {/* <button onClick={() => onNext(selectedOption)}>Submit</button> */}
  </div>
);

export { Question1, Question2, Question3, Question4, Question5, Question6 };

