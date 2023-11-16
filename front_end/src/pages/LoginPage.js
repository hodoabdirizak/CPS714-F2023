// pages/LoginPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './LoginPage.css';

import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';

export const LoginPage = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [loginInfo, setLoginInfo] = useState({username: '', password: ''});
  const history = useHistory();

  const setInput = (e) => {
    const {name, value} = e.target;
    setLoginInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
    return;
  }

  const verifyLogin = async () => {
    let response = await fetch('/api/account/verifylogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: loginInfo.username, 
        password: loginInfo.password
      })
    });

    // Response return 
    const data = await response.text();
    // refer to SingUpPage.js line 99
    // if data returns a userID:
    // alert the user that their exists
    //   history.push('/',{params:'true'});
    //   history.go(0);

    // else if returns ''
    // alert the user that their account doesnt exist

  }

  const handleLogin = (e) => {
    e.preventDefault();
    verifyLogin();

    // Add your authentication logic here
    // if(username === "Admin" && password === "Admin"){
    //   history.push('/',{params:'true'});
    //   history.go(0);
    // }
    // else{
    //   alert("Invalid/Incorrect Username or Password");
    // }

    console.log(`Username: ${loginInfo.username}, Password: ${loginInfo.password}`);
  };

    return (
      <div style={{ backgroundImage: `url(${bg})` }}>
        <div className="login-container" style={{ backgroundColor: `white` }}>
        <img src={logo} alt="Logo" />
        <h1>Event Viewer Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="Username"
              value={loginInfo.username}
	            placeholder="Username"
              onChange={setInput}
              required
	            className="input-style-3"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="Password"
              value={loginInfo.password}
	            placeholder="Password"
              onChange={setInput}
              required
	            className="input-style-3"
            />
          </div>
          <br></br>
          <button 
            type="submit"
	          style={{
              backgroundColor: '#E98123',
              borderRadius: '15px',
              fontSize: '1.2rem',    // Increase the font size
              width: '50%',          // Set the width to 50% of its container
              padding: '10px 20px',  // Add padding to control the button size
            }}>Login
          </button>
        </form>
        <div>
      	  <h5>Forgot your password? <a href = "/eventCreation">Click Here!</a></h5>
          <h5>Don't have an account? <a href = "/signup">Register Now!</a></h5>
        </div>
	<div>
	  <br></br>
	  <br></br>
	  <br></br>
	  <br></br>
	  <br></br>
	  <br></br>
	  <br></br>
	  <br></br>
	  <br></br>
  	</div>
      </div>
    </div>
    );
}