import React, { useState } from 'react';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleLogin = async () => {
    // TODO: Change localhost to something else
    const response = await fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    
    if (data.message === 'Login successful') {
      window.location.href = '/quiz';
    } 
    else {
      setErrorMessage('Incorrect username or password');
    }

  };

  return (
    <div className='login'>
      <h1>Login Page</h1>
      <div className="login_container">
        <label id="userlabel"> Username </label>
        <input 
          type="text" 
          placeholder="Enter Username" 
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label id='passlabel'> Password </label>
        <input 
          type="password" 
          placeholder="Enter Password" 
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button 
          type="submit" 
          id="loginButton" 
          onClick={handleLogin}
        > 
          Login 
        </button>
        <button 
          type="submit" 
          id="registerButton" 
          onClick={() => { window.location.href = '/register'; }}
          > 
          Register 
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;