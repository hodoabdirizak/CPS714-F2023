import React, { useState } from 'react';
import Select from "react-dropdown-select";
import './SignupPage.css';
import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';
import { useHistory } from 'react-router-dom';

export const SignUpPage = () => {
  const [newUserAccount, setUserAccount] = useState({Email: '', Full_name: '', 
                                                  Phone_number: '', Pronouns: '', Account_type: '', Pswd: ''});
  const [userId, setUserId] = useState({User_id: 0});
  const history = useHistory();
  const options = [
    { 
      value: "Attendee",
      label: "Attendee"
    },
    {
      value: "Organizer",
      label: "Organizer"
    },
    {
      value: "Caterer",
      label: "Caterer"
    }
  ];                                                  

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

  const setAccountType = (e) => {
    const type = e[0]['value'];
    console.log("Account type", type);
    setUserAccount(prevState => ({
      ...prevState,
      Account_type: type 
    }));
    return;
  }

  const getUserIdByEmail = async () => {
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

    const data = await response.text();
    setUserId(prevState => ({
      ...prevState,
      User_id: data 
    }));
  }

  const addOrganizerAccount = async () => {
    await fetch('/api/account/addorganizeraccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        userId: userId.User_id
      })
    });
  }

  const addCatererAccount = async () => {
    await fetch('/api/account/addcatereraccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        userId: userId.User_id
      })
    });
  }

  const addAccount = async () => {
    let response = await fetch('/api/account/addaccount', {
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

    if (data==='2627') {
      alert(`An account for this email already exists.`);
    } else if (data==='') {
      if (newUserAccount.Account_type==='Organizer') {
        getUserIdByEmail();
        addOrganizerAccount();
        alert(`Organizer account has been created successfully.`);
      } else if (newUserAccount.Account_type==='Caterer') {
        getUserIdByEmail();
        addCatererAccount();
        alert(`Caterer account has been created successfully.`);
      } else {
        alert(`User account has been created successfully.`);
      }
      history.push('/login',{params:'true'});
      history.go(0);
    } else {
      alert('An error has occurred. We were unable to create your account.')
    }
  }

  const handleSignUp = (e) => {
    console.log('-----------------');
    e.preventDefault();
    console.log(newUserAccount);
    addAccount();
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-container" style={{ backgroundColor: `white` }}>
        <img src={logo} alt="Logo" />
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
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
              id="email"
              name="Email" 
              placeholder="Email Address"
              value={newUserAccount.Email}
              onChange={setInput}
              required
              className="input-style-5"
            />
          </div>
          <div className="form-group-item">
            <input
              type="password"
              id="password"
              name="Pswd"
              placeholder="Password"
              value={newUserAccount.Password}
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
            <div className="form-group-item">
              <Select 
                type="text"
                id="accountType"
                name="Account_type"
                placeholder="Account Type"  
                value={newUserAccount.Account_type}              
                options={options} 
                onChange={setAccountType} 
                required
                className="input-style-3"
                style={{
                  margin: '23px 10px',
                  padding: '10px 10px'
                }}
              />
            </div>
          </div>
          <br></br>
          <button 
            // onClick={() => handleSignUp()}
            type="submit" 
            style={{
              backgroundColor: '#E98123',
              borderRadius: '15px',
              fontSize: '1.2rem',    // Increase the font size
              width: '50%',          // Set the width to 50% of its container
              padding: '10px 20px',  // Add padding to control the button size
            }}
          >Create Account</button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </form>
      </div>
    </div>
  );
};