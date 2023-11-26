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

  const sendVerificationCode = async () => {
    try {
      const response = await fetch('/api/account/sendverificationcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: userInfo.Email,
        }),
      });
  
      const data = await response.text();
      alert(data); // You can replace this with a more user-friendly notification
  
      // Optionally, redirect the user to another page or update the UI
    } catch (error) {
      console.error('Error sending verification code:', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
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


  const handlePasswordReset = async (e) => {
    console.log('-----------------');
    e.preventDefault();
    console.log(userInfo);
    verifyEmail();
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-container" style={{ backgroundColor: `white` }}>
        <br></br>
        <br></br>
        <img src={logo} alt="Logo" />
        <h1>Password Reset</h1>
        <button
          type="button"
          onClick={sendVerificationCode}
          style={{
            backgroundColor: '#E98123',
            borderRadius: '10px',
            fontSize: '1rem',
            width: '40%',
            padding: '8px 16px',
            marginTop: '20px',
        }}
      >
          Send Verification Code
  </button>
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
          <br></br>
          <button 
            type="submit" 
            onClick={handlePasswordReset}
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
          <button
            type="button"
            onClick={() => history.push('/', {})}
            style={{
              backgroundColor: 'gray',
              borderRadius: '15px',
              fontSize: '1.1rem',    // Increase the font size
              width: '80%',          // Set the width to 50% of its container
              padding: '10px 20px'  // Add padding to control the button size
            }}
            >Return to Home Page
          </button>
          <br></br>
          <br></br>
        </form>
      </div>
    </div>
  );
};