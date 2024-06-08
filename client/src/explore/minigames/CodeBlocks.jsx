import React from 'react';

const Question1 = ({ handleWordClick }) => (
    <div>
        <pre>
            {`
def sum(a, b):
      `}<span onClick={() => handleWordClick("c = a + b")}>a + b</span> = c
            {`
      return c
  
  result = sum(3, 4)
  print(result)
        `}
        </pre>
    </div>
);

const Question2 = ({ handleWordClick }) => (
    <div>
        <pre>
            {`
  def sum(a, b):
      c = a + b
      `}<span onClick={() => handleWordClick("return c")}>retun c</span>{`
  
  result = sum(3, 4)
  print(result)
        `}
        </pre>
    </div>
);



const Question3 = ({ handleWordClick }) => (
    <div>
        <pre>
            {`
  def sum(a, b):
      c = a + b
      return c
  
  result = sum(3, 4)
  print(`}<span onClick={() => handleWordClick("result")}>results</span>{`)
        `}
        </pre>
    </div>
);


const Reward = () => (
    <div>
        You win!
    </div>
);

export { Question1, Question2, Question3, Reward };