import React, { useState } from 'react';
import './SignupPage.css';
import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';

export const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [interests, setInterests] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [dob, setDob] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); // State to track the selected radio button

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option when a radio button is clicked
  };

<<<<<<< Updated upstream
  const handleLogin = (e) => {
    e.preventDefault();
    if (firstName === 'Admin' && password === 'Admin') {
      alert('Successful Login');
=======
    if (data==='2627') {
      alert(`An account for this email already exists.`);
    } else if (data==='') {
      if (newUserAccount.Account_type==='Organizer') {
        let response = await fetch('/api/account/getuseridbyemail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: newUserAccount.Email
          })
        });
        const new_user_id = await response.text();
        addOrganizerAccount(new_user_id);
      } else if (newUserAccount.Account_type==='Caterer') {
        let response = await fetch('/api/account/getuseridbyemail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: newUserAccount.Email
          })
        });
        const new_user_id = await response.text();
        addCatererAccount(new_user_id);
      } else {
      }
      history.push('/login',{params:'true'});
      history.go(0);
>>>>>>> Stashed changes
    } else {
      alert('Invalid/Incorrect Username or Password');
    }

    console.log(`First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Password: ${password}, Interests: ${interests}, Pronouns: ${pronouns}, Date of Birth: ${dob}`);
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-container" style={{ backgroundColor: `white` }}>
        <img src={logo} alt="Logo" />
        <h1>Create an Account</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <div className="form-group-item">
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="input-style"
              />
            </div>
            <div className="form-group-item">
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="input-style"
              />
            </div>
          </div>
          <div className="form-group-item">
            <input
              type="text"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-style-2"
            />
          </div>
          <div className="form-group-item">
            <input
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-style-5"
              type="password"
            />
          </div>
          <div className="form-group-item">
            <input
              id="interests"
              placeholder="Types of Events you are interested in..."
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              required
              className="input-style-5"
            />
          </div>
          <div className="form-group">
            <div className="form-group-item">
              <input
                type="text"
                id="pronouns"
                placeholder="Pronouns"
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                required
                className="input-style-3"
              />
            </div>
            <div className="form-group-item">
              <input
                type="text"
                id="dob"
                placeholder="Date of Birth DD/MM/YYYY"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="input-style-3"
              />
            </div>
          </div>
          <div className="form-group">
            <span style={{ marginLeft: "2vw", color: "grey" }}>Account Type</span>
          </div>
          <div className="form-group">
            <label className="radio-label">
              <input
                type="radio"
                name="userType"
                value="Attendee"
                checked={selectedOption === 'Attendee'}
                onChange={handleOptionChange}
              />
              Attendee
            </label>
            <br />

            <label className="radio-label">
              <input
                type="radio"
                name="userType"
                value="Creator"
                checked={selectedOption === 'Creator'}
                onChange={handleOptionChange}
              />
              Creator
            </label>

            <br />

            <label className="radio-label">
              <input
                type="radio"
                name="userType"
                value="Vendor"
                checked={selectedOption === 'Vendor'}
                onChange={handleOptionChange}
              />
              Vendor
            </label>
          </div>
          <button type="submit" 
            style={{
              backgroundColor: '#E98123',
              borderRadius: '15px',
              fontSize: '1.5rem',    // Increase the font size
              width: '50%',          // Set the width to 50% of its container
              padding: '10px 20px',  // Add padding to control the button size
            }}
          >Login</button>
        </form>
        <div>
          <h6>Forgot your password? <a href="google.ca">Click Here!</a></h6>
        </div>
        <div></div>
      </div>
      </div>
  );
};