import React, { useState } from 'react';
import Select from "react-dropdown-select";
import './SignupPage.css';
import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';

export const SignUpPage = () => {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [accountType, setAccountType] = useState(''); // State to track the selected radio button
  const [emailExists, setEmailExists] = useState('');
  const [newUserAccount, setUserAccount] = useState({User_id: 0, Email: '', Full_name: '', 
                                                  Phone_number: 0, Pronouns: '', Account_type: '', Password: ''});

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
  // const handleOptionChange = (event) => {
  //   setAccountType(event.target.value); // Update the selected option when a radio button is clicked
  // };

  const getUserId = async () => {
    try {
      let response = await fetch('/api/account/getuserid', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
  
      // console.log("HTTP Status Code:",response.status)
      const data = await response.text();
      setUserId(data); // Update state with the user ID

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  const noDupEmails = async () => {
    try {
      let response = await fetch('/api/account/nodupemails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      });
  
      // console.log("HTTP Status Code:",response.status)
      const data = await response.text();
      setEmailExists(data); 

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const addAccount = async () => {
    await fetch('/api/account/addaccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...newUserAccount
      })
    })
  }

  const createAccount = async () => {
    const newAccount = {
      User_id: `${userId}`, 
      Email: `${email}`, 
      Full_name: `${firstName.concat(" ",lastName)}`, 
      Phone_number: `${phoneNumber}`, 
      Pronouns: `${pronouns}`, 
      Account_type: `${accountType[0]['value']}`, 
      Password: `${password}`
    };

    setUserAccount(newAccount);

    // addAccount();
    // console.log('account_added');
    // noDupEmails();
    // if (emailExists === "true") {
    //   alert(`An account for ${email} has been successfully created.`)
    // }
  }

  const handleSignUp = (e) => {
    console.log('-----------------');
    e.preventDefault();
    noDupEmails();

    if (emailExists === "true") {
      alert(`An account for ${email} already exists.`)
    } else {
      getUserId();
      createAccount();
    }

  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-container" style={{ backgroundColor: `white` }}>
        <img src={logo} alt="Logo" />
        <h1>Create an Account</h1>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <div className="form-group-item">
              <input
                type="text"
                id="firstName"
                placeholder="  First Name"
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
          <br></br>
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
              id="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="input-style-5"
            />
          </div>
          <div className="form-group">
            <div className="form-group-item">
              <input
                type="text"
                id="pronouns"
                placeholder="  Pronouns"
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                required
                className="input-style-3"
              />
            </div>
            <div className="form-group-item">
              <Select 
                id="accountType"
                placeholder="Account Type"                
                options={options} 
                onChange={(value) => {setAccountType(value)}} 
                required
                className="input-style-3"
              />
            </div>
          </div>
          <br></br>
          <button type="submit" 
            style={{
              backgroundColor: '#E98123',
              borderRadius: '15px',
              fontSize: '1.2rem',    // Increase the font size
              width: '50%',          // Set the width to 50% of its container
              padding: '10px 20px',  // Add padding to control the button size
            }}
          >Create Account</button>
        </form>
      </div>
      </div>
  );
};