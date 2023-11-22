import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignupPage.css';
import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';

export const ForgotPassword = () => {
  const [userInfo, setUserInfo] = useState({Email: '',Pswd: ''});
  const history = useHistory();

  const setInput = (e) => {
    const {name, value} = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
    return;
  }

  const changePassword = async () => {
    let response = await fetch('/api/account/changepassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: userInfo.Email,
        password: userInfo.Pswd
      })
    });

    const data = await response.text();
    if (data==='True') {
      alert(`Password has been updated successfully.`);
      history.push('/login',{params:'true'});
      history.go(0);
    } else {
      alert('We were unable to reset your password.')
    }
  }

  const verifyEmail = async () => {
    let response = await fetch('/api/account/verifyemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: userInfo.Email
      })
    });

    const data = await response.text();
    if (data==='True') {
      changePassword();
    } else {
      alert('An account for that email does not exist.')
    }
  }

  const handlePasswordReset = (e) => {
    console.log('-----------------');
    e.preventDefault();
    console.log(userInfo);
    verifyEmail();
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-container" style={{ backgroundColor: `white` }}>
        <img src={logo} alt="Logo" />
        <h1>Password Reset</h1>
        <form onSubmit={handlePasswordReset}>
          <div className="form-group-item">
            <input
              type="text"
              id="email"
              name="Email" 
              placeholder="Email Address"
              value={userInfo.Email}
              onChange={setInput}
              required
              className="input-style-5"
            />
          </div>
          <div className="form-group-item">
            <input
              type="text"
              id="verification-code"
              placeholder="Verification Code Sent to Email"
              // value={userInfo.Pswd}
              // onChange={setInput}
              required
              className="input-style-5"
            />
          </div>
          <div className="form-group-item">
            <input
              type="password"
              id="password"
              name="Pswd"
              placeholder="New Password"
              value={userInfo.Pswd}
              onChange={setInput}
              required
              className="input-style-5"
            />
          </div>
          <br></br>
          <button 
            // onClick={() => handleSignUp()}
            type="submit" 
            style={{
              backgroundColor: '#E98123',
              borderRadius: '15px',
              fontSize: '1.1rem',    // Increase the font size
              width: '60%',          // Set the width to 50% of its container
              padding: '10px 20px',  // Add padding to control the button size
            }}
          >Reset Password</button>
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
        </form>
      </div>
    </div>
  );
};