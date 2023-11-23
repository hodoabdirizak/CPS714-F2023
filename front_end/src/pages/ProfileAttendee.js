import React, { useState , useEffect } from 'react';
import './SignupPage.css';
import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export const ProfileAttendee = () => {
  const location = useLocation();
  // const email = location?.state?.params;
  const email = "hanaan.amin@torontomu.ca"
  const [newUserAccount, setUserAccount] = useState({Email: email, Full_name: '', 
                                                    Phone_number: '', Pronouns: ''});

  const setInput = (e) => {
    const {name, value} = e.target;
    if (name === 'Phone_number'){
      setUserAccount(prevState => ({
        ...prevState,
        [name]: parseInt(value)
      }));
      return;
    } 

    setUserAccount(prevState => ({
      ...prevState,
      [name]: value
    }));
    return;
  }

  const getUserAccount = async () => {
    let response = await fetch('/api/account/getuseraccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    });

    const data = await response.text();
    const items = data.split(" ");
    setUserAccount(prevState => ({
      ...prevState,
      Full_name: `${items[0]} ${items[1]}`,
      Phone_number: `${items[2]}`,
      Pronouns: `${items[3]}`
    }));
    return;
  }

  const updateUserAccount = async () => {
    let response = await fetch('/api/account/updateuseraccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...newUserAccount
      })
    });

    const data = await response.text();
    if (data==='Success') {
      alert(`Account information has been updated.`);
    } else {
      alert('An error has occurred. We were unable to update your account information.')
    }
  }

  useEffect(() => {
    getUserAccount(); 
  }, []);

  const handleProfileUpdate = (e) => {
    console.log('-----------------');
    // e.preventDefault();
    updateUserAccount();
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-container" style={{ backgroundColor: `white` }}>
        <img src={logo} alt="Logo" />
        <h1>Edit Profile</h1>
        <form onSubmit={handleProfileUpdate}>
          <div className="form-group-item">
            <input
              type="text"
              id="fullName"
              name="Full_name"
              placeholder="Full Name"
              value={newUserAccount.Full_name}
              onChange={setInput}
              required
              className="input-style-5"
            />
          </div>
          <div className="form-group-item">
            <input
              type="text"
              id="phoneNumber"
              name="Phone_number"
              placeholder="Phone Number"
              value={newUserAccount.Phone_number}
              onChange={setInput}
              required
              className="input-style-5"
            />
          </div>
          <div className="form-group">
            <div className="form-group-item">
              <input
                type="text"
                id="pronouns"
                name="Pronouns"
                placeholder="Pronouns"
                value={newUserAccount.Pronouns}
                onChange={setInput}
                required
                className="input-style-5"
              />
            </div>
          </div>
          <br></br>
          <button
            style={{
              backgroundColor: 'gray',
              borderRadius: '15px',
              fontSize: '1.2rem',    // Increase the font size
              width: '50%',          // Set the width to 50% of its container
              padding: '10px 20px',  // Add padding to control the button size
            }}
          >Cancel</button>
          <button 
            onClick={() => handleProfileUpdate()}
            type="submit" 
            style={{
              backgroundColor: '#E98123',
              borderRadius: '15px',
              fontSize: '1.2rem',    // Increase the font size
              width: '50%',          // Set the width to 50% of its container
              padding: '10px 20px',  // Add padding to control the button size
            }}
          >Update</button>
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