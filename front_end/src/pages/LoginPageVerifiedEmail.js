// pages/LoginPage.js
import React, { useState , useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './LoginPage.css';

import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';

export const LoginPageVerifiedEmail = () => {
  const [loginInfo, setLoginInfo] = useState({username: '', password: ''});
  const history = useHistory();

  const setInput = (e) => {
    const {name, value} = e.target;
    setLoginInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
    return;
  };

  useEffect(() => {
    const updateAccountVerificationStatus = async () => {         
      console.log("Verifying account...");
      
      const urlParams = new URLSearchParams(window.location.search);
      const yourDynamicEmail = urlParams.get('email');
      let response = await fetch(`/api/loginverify?email=${encodeURIComponent(yourDynamicEmail)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const verified_email = await response.text();
      console.log('Verified email', verified_email);
  
      let response2 = await fetch('/api/account/updateaccountverificationstatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: verified_email
        })
      });
      
      const result = await response2.text();
      console.log(result);
    };
    updateAccountVerificationStatus();
  }, []);

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
      let response2 = await fetch('/api/account/getaccounttype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: loginInfo.username
        })
      });
      
      const accType = await response2.text();
      
      let response3 = await fetch('/api/account/isaccountverified', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: loginInfo.username
        })
      });

      const accountVerified = await response3.text();
      
      if (accountVerified==='False'){
        alert('Please follow the instructions sent to your email to verify your account before proceeding.')
      } else {
        history.push('/', { isLoggedIn: 'true', username: loginInfo.username, accountType: accType });
      }

    } else if (data==='False') {
      alert(`Invalid/Incorrect email or password.`);
    } else {
      alert('An error has occurred.');
    }
  }
  
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Username: ${loginInfo.username}, Password: ${loginInfo.password}`);
    verifyLogin();
  };

  return (
    <div style={{
      backgroundImage: `url(${bg})`, height: '100vh', backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat', margin: '1'
    }}>      
      <div className="login-container" style={{ backgroundColor: `white` }}>
      <br></br>
      <img src={logo} alt="Logo" />
      <h1>Login</h1>
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button
          type="button"
          onClick={() => history.push('/', {})}
          style={{
            backgroundColor: 'gray',
            borderRadius: '15px',
            fontSize: '1rem',    // Increase the font size
            width: '90%',          // Set the width to 50% of its container
            padding: '10px 20px'  // Add padding to control the button size
          }}
          >Return to Home Page
        </button>
        <br></br>
      </div>
  <div>
  <br></br>
  </div>
    </div>
  </div>
  );
}