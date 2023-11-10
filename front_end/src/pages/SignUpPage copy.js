import React, { useState } from 'react';
import Select from "react-dropdown-select";
import './SignupPage.css';
import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';

export const SignUpPage = () => {
  // const [emailExists, setEmailExists] = useState({Exists:''});
  const [newUserAccount, setUserAccount] = useState({Email: '', Full_name: '', 
                                                  Phone_number: 0, Pronouns: '', Account_type: '', Pswd: ''});

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

  // const getUserId = async () => {
  //   try {
  //     let response = await fetch('/api/account/getuserid', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       }
  //     });
  
  //     // console.log("HTTP Status Code:",response.status)
  //     const data = await response.text();

  //     setUserAccount(prevState => ({
  //       ...prevState,
  //       User_id: parseInt(data)
  //     }));
  //     return;
  //   } catch (error) {
  //     console.error('Error fetching User ID:', error);
  //     return 'error';
  //   }
  // }

  // const noDupEmails = async () => {
  //   try {
  //     let response = await fetch('/api/account/nodupemails', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         email: newUserAccount.Email
  //       })
  //     });
  
  //     // console.log("HTTP Status Code:",response.status)
  //     const data = await response.text();
  //     setEmailExists(prevState => ({
  //       ...prevState,
  //       Exists: data
  //     }));

  //     console.log(emailExists.Exists);

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     console.log('Duplicate email');
  //   }
  // }

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
      alert(`Account has been created successfully.`);
    } else {
      alert('An error has occurred. We were unable to create your account.')
    }

  } 
  
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

  const handleSignUp = (e) => {
    console.log('-----------------');
    e.preventDefault();
    console.log(newUserAccount);
    addAccount();
    
    // noDupEmails();
    // console.log('line 124',emailExists.Exists);
    // if (emailExists.Exists === "true") {
    //   alert(`An account for ${newUserAccount.Email} already exists.`);
    // } 
    
    // else if (emailExists.Exists === "false") {
    //   console.log(newUserAccount);
      // try {
      //   addAccount();
      // } catch (err) {
      //   console.log(`Unable to add account`,err);
      // }
    // } 
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-container" style={{ backgroundColor: `white` }}>
        <img src={logo} alt="Logo" />
        <h1>Create an Account</h1>
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
              className="input-style"
            />
          </div>
          <br></br>
          <div className="form-group-item">
            <input
              type="text"
              id="email"
              name="Email" 
              placeholder="Email Address"
              value={newUserAccount.Email}
              onChange={setInput}
              required
              className="input-style-2"
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
                placeholder="  Pronouns"
                value={newUserAccount.Pronouns}
                onChange={setInput}
                required
                className="input-style-3"
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
        </form>
      </div>
    </div>
  );
};