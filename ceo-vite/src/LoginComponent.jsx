const LoginComponent = ( ) => {

    return (
      <div className='login'>
        <h1>Login Page</h1>
        <div class="login_container">
          <label id="userlabel"> Username </label>
          <input type="text" placeholder="Enter Username" name="username"/>
          <label id='passlabel'> Password </label>
          <input type="password" placeholder="Enter Password" name="password"/>
          <button type="submit" id="loginButton" 
            onClick={(e) => {e.preventDefault(); window.location.href='/quiz/';
            }}> Login </button>
        </div>
      </div>
    );
  };
  
  export default LoginComponent;
  