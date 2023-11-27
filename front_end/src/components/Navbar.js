// Navbar.js

import React  from 'react';
import logo from '../assets/logo.png';
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';
import { EventCreationForm } from '../pages/EventCreationForm';

function Navbar({ isLoggedIn, username, accountType, userID }) {
  const history = useHistory();

  const goToProfile = (e) => {
    e.preventDefault();
    let url = '';

    if (accountType === 'Attendee') {
      url = '/profile-attendee';
    } else if (accountType === 'Organizer') {
      url = '/profile-organizer';
    } else {
      url = '/profile-caterer';
    }

    history.push({
      pathname: url,
      state: { isLoggedIn: true, username: username },
    });
    };

    const gotoCalendar = (e) => {
        e.preventDefault();
        let url = "/calendar"

        history.push({
            pathname: url,
            state: { isLoggedIn: isLoggedIn, username: username, accountType: accountType, userID: userID },
        });
    };

    const goHome = (e) => {
        e.preventDefault();
        let url = "/"

        history.push({
            pathname: url,
            state: { isLoggedIn: isLoggedIn, username: username, accountType: accountType, userID: userID },
        });
    };

    const signOut = (e) => {
      e.preventDefault();
      let url = "/"

      history.push({
          pathname: url,
          state: { },
      });  
  };
  const createEvent = (e) => {
    e.preventDefault();
    // Redirect to the event creation page
    history.push('/EventCreation'); // Update the path according to your route
  };


  return (
    <div className="navbar">
      <div className="left-section">
        <div className="logo">
          <a onClick={goHome} href="/">
          <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="search-bar">
          <FontAwesomeIcon icon={ faSearch } />
          <input type="text" 
          placeholder='Search for an event'
          className="rounded-input" 
          />
        </div>
      </div>
      <ul className="nav-items">
          <li><a onClick={goHome} href="/">Find Events</a></li>
          <li><a onClick={goHome} href="/">FAQ</a></li>
          <li><a onClick={goHome}  href="/">My Events</a></li>
          <li><a onClick={gotoCalendar} href="/calendar">My Calendar</a></li>
          
          {/* If user is logged in, they will have the Profile navbar item
          instead of Sign In */}
          {isLoggedIn && accountType === 'Organizer' && (
          <li>
            <button onClick={createEvent}>Create Event</button>
          </li>
        )}
          { isLoggedIn 
            ? <li className="profile-item">
                  <a href='/' onClick={goToProfile}>
                    <div className="profile-icon">
                      <FontAwesomeIcon icon={faUser} size="lg" style={{ color: "#1e0900" }} />
                    </div>
                    {username}
                  </a>
              </li>
            : null
          } 

          { isLoggedIn 
            ? <li><a href='/' onClick={signOut}>Sign Out</a></li>         
            : <li><a href="/login">Sign In</a></li>
          }
      </ul>
    </div>
  );
}
  
export default Navbar;
