// pages/LoginPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './LoginPage.css';

import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    if(username === "Admin" && password === "Admin"){
      alert("Successfull Login");
      history.push('/',{params:'true'});
      history.go(0);
    }
    else{
      alert("Invalid/Incorrect Username or Password");
    }

    console.log(`Username: ${username}, Password: ${password}`);
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
              value={username}
	      placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
	      className="input-style"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
	      placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
	      className="input-style"
            />
          </div>
          <button type="submit"
	style={{
              backgroundColor: '#E98123',
              borderRadius: '15px',
              fontSize: '1.5rem',    // Increase the font size
              width: '50%',          // Set the width to 50% of its container
              padding: '10px 20px',  // Add padding to control the button size
            }}>Login</button>
        </form>
        <div>
      	  <h6>Forgot your password? <a href = "/eventCreation">Click Here!</a></h6>
        </div>
        <div>
          <h6>Don't have an account? <a href = "/signup">Register Now!</a></h6>
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