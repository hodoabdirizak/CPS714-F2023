// Navbar.js

import React  from 'react';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';

function Navbar({ isLoggedIn }) {
    return (
      <div className="navbar">
        <div className="left-section">
          <div className="logo">
          <a href="/">
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
            <li><a href="/">Find Events</a></li>
            <li><a href="/">FAQ</a></li>
            <li><a href="/myEvents">My Events</a></li>
            <li><a href="/calendar">My Calendar</a></li>
            {/* If user is logged in, they will have the Profile navbar item
            instead of Sign In */}
            { isLoggedIn 
              ? <li className="profile-item">
              <a href="/profile">
                <div className="profile-icon">
                  <FontAwesomeIcon icon={faUser} size="lg" style={{ color: "#1e0900" }} />
                </div>
                Profile
              </a>
            </li>
            : <li><a href="/login">Sign In</a></li>
            }
        </ul>
      </div>
    );
  }
  

export default Navbar;
