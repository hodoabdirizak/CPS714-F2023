// pages/LoginPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './LoginPage.css';

import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';

export const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({username: '', password: ''});
  const [accountType, setAccountType] = useState({type: ''});
  const history = useHistory();

  const setInput = (e) => {
    const {name, value} = e.target;
    setLoginInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
    return;
  };
  
  const getAccountType = async () => {
    let response = await fetch('/api/account/getaccounttype', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: loginInfo.username
      })
    });

    const data = await response.text();
    setAccountType(prevState => ({
      ...prevState,
      type: data
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

    const data = await response.text();
    if (data==='True') {
      getAccountType();
      history.push('/', { isLoggedIn: 'true', username: loginInfo.username, accountType: accountType.type });
    } else if (data==='False') {
      alert(`Invalid/Incorrect email or password.`);
    } else {
      alert('An error has occurred.')
    }
  }
  
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Username: ${loginInfo.username}, Password: ${loginInfo.password}`);
    verifyLogin();
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
              name="username"
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
              name="password"
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
      	  <h5>Forgot your password? <a href = "/forgot-password">Click Here!</a></h5>
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
    <br></br>
	  <br></br>
    <br></br>
  	</div>
      </div>
    </div>
    );
}