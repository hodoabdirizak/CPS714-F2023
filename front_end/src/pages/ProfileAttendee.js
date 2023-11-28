import React, { useState , useEffect } from 'react';
import Modal from 'react-modal';
import './SignupPage.css';
import DeleteAccount from '../components/DeleteAccount';
import logo from '../assets/logo.png';
import bg from '../assets/logo200.png';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";

Modal.setAppElement('#root'); 

export const ProfileAttendee = () => {
  const location = useLocation();
  const email = location?.state?.username;
  const history = useHistory();
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
    const items = data.split("|");
      setUserAccount(prevState => ({
        ...prevState,
        Full_name: `${items[0]}`,
        Phone_number: `${items[1]}`,
        Pronouns: `${items[2]}`
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
    if (data==='True') {
      alert(`Account information has been updated.`);
    } else {
      alert('An error has occurred. We were unable to update your account information.')
    }
  }

  const deleteUserAccount = async () => {
    let response = await fetch('/api/account/deleteaccountattendee', {
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
    console.log(data);
    if (data==='True') {
      history.push('/', {});
    } else {
      alert('An error has occurred. We were unable to delete your account Try again later.')
    }
  }

  useEffect(() => {
    getUserAccount(); 
  }, []);

  const handleProfileUpdate = (e) => {
    console.log('-----------------');
    e.preventDefault();
    updateUserAccount();
  };

  const goBack = (e) => {
    history.push('/', { isLoggedIn: 'true', username: email, accountType: "Attendee" });
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = (e) => {
    setModalOpen(true);
  };
  const closeModal = (e) => {
    setModalOpen(false);
  };
  const handleDeleteAccount = () => {
    deleteUserAccount();
    closeModal();
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-container" style={{ backgroundColor: `white` }}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button
          type="button"
          onClick={() => goBack()}
          style={{
            backgroundColor: 'gray',
            borderRadius: '15px',
            fontSize: '1rem',    // Increase the font size
            width: '25%',          // Set the width to 50% of its container
            padding: '10px 20px'  // Add padding to control the button size
          }}
          >Return to Home Page
        </button>
        <h1>Edit Profile</h1>
        <h2>{email}</h2>
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
          <br></br>
          <button 
            type="submit" 
            style={{
              backgroundColor: '#E98123',
              borderRadius: '15px',
              fontSize: '1.2rem',    // Increase the font size
              width: '50%',          // Set the width to 50% of its container
              padding: '10px 20px',  // Add padding to control the button size
            }}
          >Edit Profile</button>
          <button 
            onClick={() => openModal()}
            type="button"
            style={{
              backgroundColor: 'red',
              borderRadius: '15px',
              fontSize: '1.2rem',    // Increase the font size
              width: '60%',          // Set the width to 50% of its container
              padding: '10px 20px',  // Add padding to control the button size
            }}
          >Delete Account</button>
          <DeleteAccount
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleDeleteAccount}
          />
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