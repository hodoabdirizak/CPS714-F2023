// pages/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css';

export const LoginPage = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    if(username === "Admin" && password === "Admin"){
      alert("Successfull Login");
      setIsLoggedIn(true);
    }
    else{
      alert("Invalid/Incorrect Username or Password");
    }

    console.log(`Username: ${username}, Password: ${password}`);
  };

    return (
        <>
        <div className="login-container">
      <h1>Event Viewer Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
      	<h6>Forgot your password? <a href = "google.ca">Click Here!</a></h6>
      </div>
      <div>
        <h6>Don't have an account? <a href = "signup">Register Now!</a></h6>
      </div>
    </div>
        </>
    )
}